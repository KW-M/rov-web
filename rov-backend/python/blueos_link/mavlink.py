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
    mav: mavlink2.MAVLink

    async def start(self):

        # Create the connection
        #  Blueos must be configured to allow script connections under the port 14558
        # Note: The connection is done with 'udpout' and not 'udpin'.
        #  You can check in http:192.168.1.2:2770/mavproxy that the communication made for 14558
        #  uses a 'udp' (server) and not 'udpout' (client).
        # source system is any number between 1 and 255 used to identify this python script as a mavlink system
        self.master = mavutil.mavlink_connection('udpout:host.docker.internal:14550',source_system=171,autoreconnect=True,retries=200)
        self.mav = self.master.mav

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
            self.mav.ping_send(
                int(time.time() * 1e6), # Unix time in microseconds
                0, # Ping number
                0, # Request ping of all systems
                0 # Request ping of all components
            )
            msg = self.master.recv_match(timeout=100) # wait for the first message that comes back
            time.sleep(0.5)

    def cleanup(self):
        self.master.close()

    async def send_heartbeat_loop(self, base_mode=0, custom_mode=0, system_status=0):
        while True:
            try:
                self.mav.heartbeat_send(
                    mavlink2.MAV_TYPE_GCS,
                    mavutil.mavlink.MAV_AUTOPILOT_INVALID,
                    base_mode,
                    custom_mode,
                    system_status
                )
            except Exception as e:
                print(e)
                pass
            await asyncio.sleep(1.0)


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
        self.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,21196,0,0,0,0,0) # 21196 = force arm
        # self.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,0,0,0,0,0,0) # 0 = normal arm
        print("MAV arm sent---------------")

    def disarm(self):
        self.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,0,21196,0,0,0,0,0) # 21196 = force disarm
        # self.mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,0,0,0,0,0,0,0) # 0 = normal disarm
        print("MAV disarm sent---------------")

    def set_manual_flight_mode(self):
       self.arm()
       self.mav.set_mode_send(1,mavlink2.MAV_MODE_MANUAL_ARMED,0)

    def set_guided_flight_mode(self):
        self.arm()
        self.mav.set_mode_send(1,mavlink2.MAV_MODE_GUIDED_ARMED,0)

    def set_stabalize_flight_mode(self):
        self.arm()
        self.mav.set_mode_send(1,mavlink2.MAV_MODE_STABILIZE_ARMED,0)

    def send_movement(self,x,y,z,r):
        x = int(x * 1000)
        y = int(y * 1000)
        z = int(z * 1000)
        r = int(r * 1000)
        try:
            print(f"Sending mavlink joy movement: {x},{y},{z},{r}")
            self.mav.manual_control_send(1,x,y,z,r,0)
        except Exception as e:
            print(e)
            pass

rov_web_mavlink = RovWebMavlink()
