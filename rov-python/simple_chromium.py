import os
import subprocess
import sys
import tempfile
from urllib.parse import urlencode

print("sys.platform=" + sys.platform)
is_liniux = sys.platform.startswith("linux")
is_mac = sys.platform.startswith("darwin")

LOG_PATH = "/home/pi/chromedriver.log"
BROWSER_DATA_DIR = tempfile.mkdtemp()
BROWSER_BINARY_PATH = r"/usr/bin/chromium"
BROWSER_REMOTE_DEBUGGING_PORT = 9226
if is_mac:
    LOG_PATH = "~/Downloads/chromedriver.log"
    BROWSER_BINARY_PATH = r"/Applications/Chromium.app/Contents/MacOS/Chromium"

if __name__ == "__main__":
    query_params = {
        "ROV_NAME": os.environ.get("ROV_NAME", "Default-ROV"),
        "ROV_CONTROL_PASSWORD": os.environ.get("ROV_CONTROL_PASSWORD", ""),
        "DEBUG_MODE": os.environ.get("DEBUG_MODE", "false").upper() == "TRUE",
        "SEND_LOGS": os.environ.get("SEND_LOGS", "false").upper() == "TRUE",
        "BLUEOS_APIS_ENDPOINT": os.environ.get(
            "BLUEOS_APIS_ENDPOINT", "http://host.docker.internal"
        ),
        "PYTHON_WEBSOCKET_PORT": os.environ.get("PYTHON_WEBSOCKET_PORT", 0),
        "LIVEKIT_CLOUD_URL": os.environ.get(
            "LIVEKIT_CLOUD_URL", "https://rov-web.livekit.cloud"
        ),
        "LIVEKIT_API_KEY": os.environ.get("LIVEKIT_API_KEY", ""),
        "LIVEKIT_SECRET_KEY": os.environ.get("LIVEKIT_SECRET_KEY", ""),
        "TWITCH_STREAM_KEY": os.environ.get("TWITCH_STREAM_KEY", ""),
    }
    # add query string to url from query_params dict using url encoding:
    URL = os.environ.get("INTERNAL_WEBPAGE_URL", "http://localhost:8080/internal")
    URL += "?" + urlencode(query_params)
    URL = "http://localhost:5174?ROV_NAME=Kyle-8&DEBUG_MODE=False&SEND_LOGS=True&ROV_CONTROL_PASSWORD=1234&BLUEOS_APIS_ENDPOINT=&PYTHON_WEBSOCKET_PORT=0&LIVEKIT_CLOUD_URL=https%3A%2F%2Frov-web.livekit.cloud&LIVEKIT_API_KEY=APIHd7Boa9RUUiT&LIVEKIT_SECRET_KEY=OEnyn7xw5d0vKNqLlKDSD6UXaSvoVQ8uLDiZycjb8pH&TWITCH_STREAM_KEY="
    print(URL)

    args = [
        BROWSER_BINARY_PATH,
        "--auto-accept-camera-and-microphone-capture",
        "--auto-accept-this-tab-capture",
        # "--enable-logging",
        "--v=1",
        "--headless",
        "--no-sandbox",
        # "--disable-web-security",
        # "--allow-running-insecure-content",
        "--user-data-dir=" + BROWSER_DATA_DIR,
        "--remote-debugging-port=" + str(BROWSER_REMOTE_DEBUGGING_PORT),
        "--remote-debugging-address=0.0.0.0",
        URL,
    ]
    # launch chromium using process:
    args_string = '"' + '" "'.join(args) + '"'
    browser_process = subprocess.Popen(
        args=args,
        # shell=True,
        env=os.environ,
        cwd=os.getcwd(),
    )

    try:
        return_code = browser_process.wait()
        print("return_code=" + str(return_code))
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        browser_process.terminate()
        # return_code = browser_process.wait()
        # print("return_code=" + str(return_code))

    # asyncio.run(main())
