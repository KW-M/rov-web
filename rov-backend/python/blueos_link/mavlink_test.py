"""
Example of how to connect to the autopilot by using mavproxy's
--udpin:0.0.0.0:9000 endpoint from the companion computer itself
"""

# Disable "Bare exception" warning
# pylint: disable=W0702

import time
import asyncio
import random
# Import mavutil
from pymavlink import mavutil
from pymavlink.dialects.v20 import ardupilotmega as mavlink2

# https://www.ardusub.com/developers/pymavlink.html#run-pymavlink-on-the-surface-computer

def wait_conn():
    """
    Sends a ping to estabilish the UDP communication and awaits for a response
    """
    msg = None
    while not msg:
        mav.ping_send(
            int(time.time() * 1e6), # Unix time in microseconds
            0, # Ping number
            0, # Request ping of all systems
            0 # Request ping of all components
        )
        msg = master.recv_match()
        time.sleep(0.5)

# Create the connection
#  Companion is already configured to allow script connections under the port 9000
# Note: The connection is done with 'udpout' and not 'udpin'.
#  You can check in http:192.168.1.2:2770/mavproxy that the communication made for 9000
#  uses a 'udp' (server) and not 'udpout' (client).
master: mavutil.mavudp = mavutil.mavlink_connection('udpout:0.0.0.0:14558',source_system=171,autoreconnect=True)
mav: mavlink2.MAVLink = master.mav

# Send a ping to start connection and wait for any reply.
#  This function is necessary when using 'udpout',
#  as described before, 'udpout' connects to 'udpin',
#  and needs to send something to allow 'udpin' to start
#  sending data.
wait_conn()

async def get_mavlink_msgs():
    # Get some information !
    while True:
        try:
            print(master.recv_match().to_dict())
        except Exception as e:
            print(e)
            pass
        await asyncio.sleep(0.1)

async def send_heartbeats():
    # Get some information !
    while True:
        try:
            mav.heartbeat_send(mavlink2.MAV_TYPE_GCS,mavlink2.MAV_AUTOPILOT_INVALID,0,0,0)
        except Exception as e:
            print(e)
            pass
        await asyncio.sleep(1.0)

async def send_control():
    # Get some information !
    await asyncio.sleep(1)
    # mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,21196,0,0,0,0,0)
    mav.command_long_send(1,0,mavlink2.MAV_CMD_COMPONENT_ARM_DISARM,0,1,0,0,0,0,0,0)
    print("MAV arm sent---------------")
    await asyncio.sleep(1)
    mav.set_mode_send(1,mavlink2.MAV_MODE_MANUAL_ARMED,0)
    print("MAV mode sent---------------")
    counter = 0
    while True:
        counter += 1
        try:
            if counter % 6 == 0:
                mav.manual_control_send(1,random.randrange(1,2) * 5,0,0,0,0)
            else:
                mav.manual_control_send(1,0,0,0,0,0)
            # mav.manual_control_send(1,1000,-1000,0,0,0)
            # mav.rc_channels_override_send(1,1,num,num*2,num*3,num*4,num*5,num*6,num*8,num*9)
        except Exception as e:
            print(e)
            pass
        await asyncio.sleep(.5)

async def main():
    await asyncio.gather(get_mavlink_msgs(),send_heartbeats(),send_control())

asyncio.run(main())
