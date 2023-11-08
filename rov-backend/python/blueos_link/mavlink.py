"""
Example of how to connect to the autopilot by using mavproxy's
--udpin:0.0.0.0:14558 endpoint from the companion computer (raspberry-pi) itself
Notes:
 * All method parameters related to time are based on milliseconds.
"""


# Disable "Bare exception" warning
# pylint: disable=W0702

import time
import asyncio
from pymavlink import mavutil
from pymavlink.dialects.v20 import ardupilotmega as mavlink2

# https://www.ardusub.com/developers/pymavlink.html#run-pymavlink-on-the-surface-computer
# https://discuss.bluerobotics.com/t/sending-and-recieving-heartbeats-to-bluerov-from-surface-computer-using-pymavlink/10940
# https://github.com/egebilecen/eb-python/blob/6fba992f05b7b3bbc19383d816d7dc730427677c/eb/mavlink/vehicle.py

class RovWebMavlink:

    master: mavutil.mavudp

    async def start(self):

        # Create the connection
        #  Blueos must be configured to allow script connections under the port 14558
        # Note: The connection is done with 'udpout' and not 'udpin'.
        #  You can check in http:192.168.1.2:2770/mavproxy that the communication made for 14558
        #  uses a 'udp' (server) and not 'udpout' (client).
        # source system is any number between 1 and 255 used to identify this python script as a mavlink system
        self.master = mavutil.mavlink_connection('udpout:host.docker.internal:8235',source_system=254,source_component=240,autoreconnect=True,retries=200)

        # Send a ping to start connection and wait for any reply.
        #  This function is necessary when using 'udpout',
        #  as described before, 'udpout' connects to 'udpin',
        #  and needs to send something to allow 'udpin' to start
        #  sending data.
        await self.wait_conn()

    async def wait_conn(self):
        """
        Sends a ping to estabilish the UDP communication and awaits for a response
        """
        msg = None
        while not msg:
            self.master.mav.ping_send(
                int(time.time() * 1e6), # Unix time in microseconds
                0, # Ping number
                0, # Request ping of all systems
                0 # Request ping of all components
            )
            msg = self.master.recv_match() # wait for the first message that comes back
            time.sleep(0.5)

    def cleanup(self):
        self.master.close()

    async def send_heartbeat_loop(self, base_mode=192, custom_mode=0, system_status=mavlink2.MAV_STATE_ACTIVE):
        while True:
            self.send_heartbeat(base_mode,custom_mode,system_status)
            await asyncio.sleep(1.0)

    def send_heartbeat(self, base_mode=192, custom_mode=0, system_status=mavlink2.MAV_STATE_ACTIVE):
        try:
            self.master.mav.heartbeat_send(
                mavlink2.MAV_TYPE_GCS,
                mavlink2.MAV_AUTOPILOT_INVALID,
                base_mode,
                custom_mode,
                system_status,
                3 # MAVLink version
            )
        except Exception as e:
            print(e)
            pass


    async def handle_mavlink_msgs(self):
        # Get some information !
        while True:
            try:
                msg = self.master.recv_match()
                if msg:
                    print("mavlink_msg: ",str(msg.to_dict()))
            except Exception as e:
                print(e)
                pass
            await asyncio.sleep(0.1)

    def arm(self):
        self.master.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,21196,0,0,0,0,0) # 21196 = force arm
        # self.master.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,0,0,0,0,0,0) # 0 = normal arm
        print("MAV arm sent---------------")

    def disarm(self):
        self.master.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,0,21196,0,0,0,0,0) # 21196 = force disarm
        # self.master.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,0,0,0,0,0,0,0) # 0 = normal disarm
        print("MAV disarm sent---------------")

    def set_manual_flight_mode(self):
       self.master.mav.set_mode_send(1,mavlink2.MAV_MODE_MANUAL_ARMED,0)

    def set_guided_flight_mode(self):
        self.arm()
        self.master.mav.set_mode_send(1,mavlink2.MAV_MODE_GUIDED_ARMED,0)

    def set_stabalize_flight_mode(self):
        self.arm()
        self.master.mav.set_mode_send(1,mavlink2.MAV_MODE_STABILIZE_ARMED,0)

    def set_surface_flight_mode(self):
        self.master.mav.command_long_send(1,1,mavlink2.MAVLINK_MSG_ID_SET_MODE,1,9,0,0,0,0,0,0,False)

    def send_movement(self,x,y,z,r):
        x = int(x * 1000)
        y = int(y * 1000)
        z = int(z * 1000)
        r = int(r * 1000)
        try:
            print(f"||||||||| Sending mavlink joy movement: {x},{y},{z},{r}")
            # self.master.mav.manual_control_send(1,x,y,z,r,0)
            # self.master.mav.command_long_send(1,1,mavlink2.MAVLINK_MSG_ID_MANUAL_CONTROL,0,x,y,z,r,0,0,0,False)
            self.master.mav.rc_channels_override_send(1,1,x,y,z,r,0,0,0,0)
        except Exception as e:
            print(e)
            pass

rov_web_mavlink = RovWebMavlink()

if __name__ == "__main__":
    # mav: mavlink2.MAVLink = mavlink2.MAVLink(0,0)
    # mavlink2.MAVLINK_MSG_ID_HEARTBEAT
    # mavlink2.MAVLINK_MSG_ID_SET_MODE
    # mav.set_mode_send(1,mavlink2.MAV_MODE_MANUAL_ARMED,0)

    async def move_loop():
        await asyncio.sleep(4)
        print("starting loop---------------")

        # for i in range(2):
        #     await asyncio.sleep(5)
        #     rov_web_mavlink.arm()
        #     print("MAV arm sent---------------")
        #     await asyncio.sleep(2)
        #     rov_web_mavlink.disarm()
        #     print("MAV disarm sent---------------")

        await asyncio.sleep(2)
        rov_web_mavlink.arm()
        print("MAV arm sent---------------")

        while True:
            print("MAV mode sent---------------")
            rov_web_mavlink.send_heartbeat()
            await asyncio.sleep(0.3)
            # rov_web_mavlink.send_movement(0.9,-1,0.08,0)
            # mav.manual_control_send()
            rov_web_mavlink.master.mav.ping_send(int(time.time_ns()/1000),0,0,0)
            await asyncio.sleep(0.3)
            # rov_web_mavlink.master.mav.manual_control_send(1,0,0,500,80,1536,True)
            rov_web_mavlink.send_movement(0.5,0,0.5,0.2)

            print("MAV movement sent---------------")
            # rov_web_mavlink.send_movement(0,0,0,0)
            await asyncio.sleep(3)

    async def main():
        await rov_web_mavlink.start()
        await asyncio.gather(rov_web_mavlink.handle_mavlink_msgs(),move_loop())

    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        rov_web_mavlink.disarm()
        print("Disarm...")
        rov_web_mavlink.cleanup()
        print("Exiting...")
    except Exception as e:
        rov_web_mavlink.cleanup()
        print(e)
        print("Exiting...")
