# Taken from:
# https://stackoverflow.com/questions/45364877/interpreting-keypresses-sent-to-raspberry-pi-through-uv4l-webrtc-datachannel
# based on:
# https://raspberrypigpi.stackexchange.com/questions/29480/how-to-use-pigpio-to-control-a-servo-motor-with-a-keyboard
# public domain
# https://raw.githubusercontent.com/sivel/speedtest-cli/master/speedtest.py

import logging
import asyncio

# import our python files from the same directory
from config_reader import read_config_file, get_log_level
from gpio_interface import GPIO_ctrl
from motion.motion_controller import motion_ctrl
from status_led import status_led_ctrl
from rov_security.auth_tokens import readAuthStateFromDisk

from websocket_server import websocket_server
from mesage_handler import message_handler
from sensors.sensors_controller import sensor_ctrl
# from sensor_log import Sensor_Log

config = read_config_file()
readAuthStateFromDisk()

###### Setup Logging #######
############################

# set the Loglevel from command line argument or config file. Use --LogLevel=DEBUG
logging.basicConfig(level=get_log_level(config['LogLevel']))
log = logging.getLogger(__name__)

######## Main Program Loop ###########
######################################
async def main():

    ##### Setup Controllers #####
    ############################

    GPIO_ctrl.init()
    status_led_ctrl.init(21)
    status_led_ctrl.on()
    message_handler.init()
    websocket_server.init(message_handler.handle_incoming_msg)
    motion_ctrl.init()
    sensor_ctrl.init()
    # sensor_log.start(sensors.all_sensors)

    # setup the asyncio loop to run each of these async functions aka "tasks" aka "coroutines" concurently
    await asyncio.gather(
        sensor_ctrl.sensor_setup_loop(),
        motion_ctrl.motor_setup_loop(),
        websocket_server.start_wss(),
        message_handler.status_broadcast_loop(),
        # start_aiohttp_api_server(),
        # monitor_tasks() # debug
    )


##### run the main program loop, and exit quietly if ctrl-c is pressed  #####
try:
    asyncio.run(main(), debug=False)
except KeyboardInterrupt:
    pass
finally:
    # finally block is stuff that will always run no matter what
    status_led_ctrl.off()
    sensor_ctrl.cleanup()
    motion_ctrl.stop_motors()
    GPIO_ctrl.cleanup()

#### ASYNCIO DEBUG ####

# async def monitor_tasks():
#     '''Prints stack traces of all tasks when Enter is pressed.
#     Add to the event loop with:
#     asyncio.run(main(),debug=True)
#     asyncio.gather(..., monitor_tasks())
#     '''

#     print("Press Enter to print stack traces of all tasks...")
#     while True:
#         if select.select([
#                 sys.stdin,
#         ], [], [], 0.01)[0]:
#             char = sys.stdin.read(1)
#             tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
#             [t.print_stack(limit=5) for t in tasks]
