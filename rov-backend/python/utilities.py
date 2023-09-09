from functools import wraps
from typing import Any, AsyncGenerator, Callable
import os

known_is_raspberry_pi = None
def is_raspberry_pi():
    """Returns True if the code is running on a raspberry pi, False otherwise."""
    global known_is_raspberry_pi
    if known_is_raspberry_pi is not None:
        return known_is_raspberry_pi
    try:
        with open('/proc/cpuinfo', 'r') as f:
            txt = f.read()
            is_pi = 'Raspberry Pi' in txt
            print(txt, is_pi)
            known_is_raspberry_pi = is_pi
            return is_pi
    except:
        return False

known_is_docker = None
def is_in_docker():
    """Returns True if the code is running in a docker container, False otherwise."""
    global known_is_docker
    if known_is_docker is not None:
        return known_is_docker
    try:
        known_is_docker = os.path.exists("/.dockerenv") # this file only exists in our docker container because we added it in the dockerfile
        return known_is_docker
    except:
        return False

def only_on_raspi(func):
    """Decorator that only runs the given function if it is running on a raspberry pi."""
    @wraps(func)
    def wrapper_func(*args, **kwargs):
        func(*args, **kwargs)
    return wrapper_func

def clamp(minimum: float, value: float, maximum: float):
    return max(minimum, min(value, maximum))


def get_rounded_string(value):
    # from: https://stackoverflow.com/questions/20457038/how-to-round-to-2-decimals-with-python/20457284#20457284
    return f'{value:0.3f}'

async def map_for_async_generator(iterable: AsyncGenerator[Any,Any], func: Callable,  *args, **kwargs):
    """Returns another async generator that applies the given function to each item in the iterable as it comes in.
    pass additional arguments to the function with *args and **kwargs
    the function will get called with the item from the iterable as the first argument, followed by the additional arguments."""
    async for item in iterable:
        yield func(item, *args, **kwargs)



# -------------------------------------------------------------------------------------

# last_err_message = ""

# def pretty_print_exception(exception, show_traceback=False, msg_socket=None):
#     global last_err_message
#     err_msg = str(exception)
#     if err_msg != last_err_message:
#         if show_traceback:
#             traceback.print_exc()
#             err_msg = traceback.format_exc()
#             if msg_socket:
#                 try:  # try to send the full traceback to the clients's web browser
#                     msg_socket.send_socket_message(
#                         json.dumps({'error': err_msg}))
#                 except:
#                     pass
#         else:
#             print(err_msg)
#         last_err_message = err_msg
#     else:
#         print(".", end='')  # print a dot to show the same error happend again.
