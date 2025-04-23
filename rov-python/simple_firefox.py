from os import environ, path, getcwd
from subprocess import Popen, run
from sys import platform
import tempfile
from time import sleep
from urllib.parse import urlencode

# ----- Allowed environment variables (with examples): -----
# BROWSER_LOGGING_ENABLED=false
# FAKE_STREAM_ENABLED=false
# DISABLE_WEBRTC_ENCRYPTION=false
# VIRTUAL_DISPLAY_ENABLED=true
# BROWSER_DEBUGING_ADDRESS=host.docker.internal
# BROWSER_DEBUGING_PORT=9224

# INTERNAL_WEBPAGE_URL=http://localhost:8080/internal
# ROV_NAME=Default-ROV
# ROV_CONTROL_PASSWORD=12ryo3
# PYTHON_WEBSOCKET_PORT=1234
# LIVEKIT_CLOUD_URL=https://rov-web.livekit.cloud
# LIVEKIT_API_KEY=1abc123456
# LIVEKIT_SECRET_KEY=1abc123456
# TWITCH_STREAM_KEY=1abc123456
# SEND_LOGS=true
# DEBUG_MODE=false
# BLUEOS_APIS_ENDPOINT=http://host.docker.internal

is_linux = platform.startswith("linux")
is_mac = platform.startswith("darwin")

BROWSER_BINARY_PATH = "/usr/bin/firefox"
LOG_PATH = "/home/pi/firefox.log"
WEBRTC_LOG_PATH = "/home/pi/firefox_webrtc.log"

if is_mac:
    LOG_PATH = path.expanduser("~/Downloads/firefox.log")
    WEBRTC_LOG_PATH = path.expanduser("~/Downloads/firefox_webrtc.log")
    BROWSER_BINARY_PATH = r"/Applications/Firefox Nightly.app/Contents/MacOS/firefox"


def run_firefox():

    # ---- URL Parameters ----

    query_params = {
        "ROV_NAME": environ.get("ROV_NAME", "Default-ROV"),
        "ROV_CONTROL_PASSWORD": environ.get("ROV_CONTROL_PASSWORD", ""),
        "DEBUG_MODE": environ.get("DEBUG_MODE", "false").upper() == "TRUE",
        "SEND_LOGS": environ.get("SEND_LOGS", "true").upper() == "TRUE",
        "BLUEOS_APIS_ENDPOINT": environ.get(
            "BLUEOS_APIS_ENDPOINT", "http://host.docker.internal"
        ),
        "PYTHON_WEBSOCKET_PORT": environ.get("PYTHON_WEBSOCKET_PORT", 0),
        "LIVEKIT_CLOUD_URL": environ.get(
            "LIVEKIT_CLOUD_URL", "https://rov-web.livekit.cloud"
        ),
        "LIVEKIT_API_KEY": environ.get("LIVEKIT_API_KEY", ""),
        "LIVEKIT_SECRET_KEY": environ.get("LIVEKIT_SECRET_KEY", ""),
        "TWITCH_STREAM_KEY": environ.get("TWITCH_STREAM_KEY", ""),
    }

    # add query string to url from query_params dict using url encoding:
    url = environ.get("INTERNAL_WEBPAGE_URL", "http://localhost:8080/internal")
    url += "?" + urlencode(query_params)

    # ---- FIREFOX PROFILE ----

    # create a temp folder for the firefox profile
    profile_dir = tempfile.mkdtemp()
    user_prefs_path = path.join(profile_dir, "user.js")
    user_prefs_content = ""

    # get the path to the current script
    dir_path = path.dirname(path.realpath(__file__))
    preset_user_prefs_path = path.join(dir_path, "firefox_user.js")

    # Read the preset user prefs from the file in the docker image
    with open(preset_user_prefs_path, "r", encoding="utf-8") as f:
        user_prefs_content = f.read()

    user_prefs_content += environ.get("FIREFOX_EXTRA_USER_PREFS", "")

    # and write user prefs to the user prefs file in the firefox temp profile dir
    with open(user_prefs_path, "w", encoding="utf-8") as f:
        f.write(user_prefs_content)

    browser_debugging_address = environ.get("BROWSER_DEBUGING_ADDRESS", None)
    browser_debugging_port = environ.get("BROWSER_DEBUGING_PORT", None)

    # ----- FIREFOX Command line ARGS -----

    browser_args = []

    # add run-xvfb to run in a virtual display:
    if is_linux and environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
        browser_args.append("xvfb-run")
        extra_xvfb_args = environ.get("VIRTUAL_DISPLAY_ARGS", "").strip()
        if extra_xvfb_args != "":
            browser_args.extend(extra_xvfb_args.split(" "))

    browser_args.extend(
        [
            BROWSER_BINARY_PATH,
            # ----- vital flags for headless mode: -----
            "--new-instance",
            "--headless",
            # "--safe-mode",
            "--profile",
            profile_dir,
            "--url",
            url,
        ]
    )

    if browser_debugging_port is not None:
        browser_args.append("--start-debugger-server")
        if browser_debugging_address is not None:
            browser_args.append(f"{browser_debugging_address}:{browser_debugging_port}")
        else:
            browser_args.append(str(browser_debugging_port))

    if environ.get("BROWSER_LOGGING_ENABLED", "false").upper() == "TRUE":
        browser_args.append("--webrtc-event-logging=" + WEBRTC_LOG_PATH)
        browser_args.append("--enable-logging")
        browser_args.append("--log-level=2")
        browser_args.append("--v=2")

    # add any extra browser args from the environment:
    browser_args.extend(
        [a for a in environ.get("EXTRA_FIREFOX_ARGS", "").split(" ") if a != ""]
    )

    # kill existing browser processes just to make sure we are starting fresh:
    print("Killing all existing browser processes:")
    run(["killall", "firefox", "xvfb", "chromium"], check=False)

    env_vars = {
        **environ,
        "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/1000/bus",
    }

    if environ.get("DEBUG_ENVIRONMENT", "false").lower() == "true":
        print("sys.platform = " + platform)
        print("Running Processes (ps aux):")
        run(["ps", "aux"], check=False)
        print("\nEnvironment Variables:")
        print(env_vars)
        print("\nRunning Browser:")
        print(" ".join(browser_args) + "\n")
    # https://stackoverflow.com/questions/5772873/python-spawn-off-a-child-subprocess-detach-and-exit
    browser_process = Popen(
        args=browser_args,
        shell=False,
        env=env_vars,
        cwd=getcwd(),
    )

    try:
        # wait for the browser process to finish
        return_code = browser_process.wait()
        print("return_code=" + str(return_code))
        # Wait a bit in case we are in a crashing loop
        if return_code != 0:
            sleep(4)
        exit(return_code)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
    except Exception as e:
        raise e
    finally:
        browser_process.terminate()
        run(["killall", "firefox", "xvfb"], check=False)


if __name__ == "__main__":
    run_firefox()
