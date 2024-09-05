import logging
import asyncio
from blueos_link.mavlink import rov_web_mavlink

# import our python files from the same directory
from config_reader import read_config_file, get_log_level
from motion.motion_controller import motion_ctrl
from status_led import status_led_ctrl
from rov_security.auth_tokens import readAuthStateFromDisk
from utilities import is_in_docker
from websocket_server import websocket_server
from mesage_handler import message_handler
from sensors.sensors_controller import sensor_ctrl

# from sensors.sensors_datalog import sensor_log
from gpio.gpio_interface import GPIO_ctrl

rov_config = read_config_file()
readAuthStateFromDisk()

###### Setup Logging #######
############################

# set the Loglevel from command line argument or config file. Use --LogLevel=DEBUG
logging.basicConfig(level=get_log_level(rov_config["LogLevel"]))
log = logging.getLogger(__name__)


######## Main Program Loop ###########
######################################
async def main():

    ##### Setup Controllers #####
    ############################

    if not is_in_docker():
        GPIO_ctrl.init()
        status_led_ctrl.init(21).on()
        sensor_ctrl.init()
    else:
        await rov_web_mavlink.start()
    motion_ctrl.init()
    message_handler.init()
    websocket_server.init(message_handler.handle_incoming_msg)

    # sensor_log.init()
    # sensor_log.create_csv_file()
    # sensor_log.start()

    parallel_tasks = [
        websocket_server.start_wss(port=rov_config.get("PythonWebsocketPort", 8765)),
        message_handler.status_broadcast_loop(),
        motion_ctrl.motor_setup_loop(),
        # start_aiohttp_api_server(),
        # monitor_tasks() # debug
    ]

    if not is_in_docker():
        parallel_tasks.extend(
            [
                sensor_ctrl.sensor_setup_loop(),
            ]
        )
    else:
        parallel_tasks.extend(
            [
                rov_web_mavlink.send_heartbeat_loop(),
                rov_web_mavlink.handle_mavlink_msgs(),
            ]
        )

    # setup the asyncio loop to run each of these async functions aka "tasks" aka "coroutines" concurently
    await asyncio.gather(*parallel_tasks)


##### run the main program loop, and exit quietly if ctrl-c is pressed  #####
try:
    asyncio.run(main(), debug=False)
except KeyboardInterrupt:
    pass
finally:
    # finally block is stuff that will always run no matter what
    motion_ctrl.stop_motors()
    if not is_in_docker():
        status_led_ctrl.off()
        sensor_ctrl.cleanup()
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
