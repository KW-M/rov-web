import asyncio
import os
from urllib.parse import urlencode
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
from pyvirtualdisplay import Display
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

# /usr/bin/chromium --use-fake-ui-for-media-stream --enable-logging --v=1 --headless


class WebdriverMediaDeviceError(Exception):
    """Exception raised when the webdriver detects a MediaDeviceError in the browser logs"""

    pass


class WebdriverManager:
    url = ""
    running = False
    display = None

    def init(self, url):
        self.running = False
        self.url = url
        return self

    def start(self):
        self.running = True

        # necessary to make virtual display to run graphical applications in headless mode
        self.display = Display(visible=0, size=(800, 600))
        self.display.start()

        # WARNING: these hardcoded paths must be correct
        # TODO these URLs should be accepted as parameters in some way.q
        browser_binary_path = r"/usr/bin/chromium"
        driver_path = r"/usr/bin/chromedriver"

        # Object that can be used to pass in command line option flags when starting chromium apps
        # (anything that can otherwise be passed through CLI is valid here.)
        chrome_options = webdriver.ChromeOptions()
        chrome_options.binary_location = browser_binary_path
        chrome_options.set_capability("goog:loggingPrefs", {"browser": "ALL"})
        chrome_options.add_argument("--use-fake-ui-for-media-stream")
        chrome_options.add_argument("--enable-logging")
        chrome_options.add_argument("--v=1")
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--no-sandbox")
        chrome_options.add_argument("--disable-web-security")
        chrome_options.add_argument("--allow-running-insecure-content")
        chrome_options.add_argument("--user-data-dir=/tmp/user-data")

        # chrome_options.add_argument("--remote-debugging-port=9222") # Breaks chrome driver
        # chrome_options.add_argument("--remote-debugging-address=0.0.0.0")
        # chrome_options.add_experimental_option("detach", True)

        # Instantiate driver and navigate to appropriate webpage
        service = ChromeService(
            executable_path=driver_path,
            log_path="/home/pi/chromedriver.log",
            service_args=["--verbose", "--log-path=/home/pi/chromedriver.log"],
        )
        self.driver = webdriver.Chrome(service=service, options=chrome_options)

        self.driver.get(self.url)

    """This function will periodically check if the driver is alive while the manager is set to running
       if this isn't the case (which could maybe happen because the browser crashes or there's a network issue),
         then it'll try to fix everything by just restarting.
    """

    async def manage_driver_loop(self):
        while True:
            await asyncio.sleep(10)  # arbitrary timeout for periodic checks
            alive = self.driver_is_alive()
            running = self.running
            if running and not alive:
                print(
                    "We have a problem, for some reason the webdriver is supposed to be running but it's not. Maybe the browser has crashed? or there's a network issue? Attempting to restart webdriver."
                )
                self.stop()
                self.start()

    def stop(self):
        self.running = False
        self.driver.quit()

    def test_fetch_title(self):
        title = self.driver.title
        print("The title of the page in the headless webdriver instance is ", title)

    def driver_is_alive(self):
        """returns true if the webdriver is running, false otherwise"""
        try:
            # This will throw an exception if the driver is not running
            return self.driver.title != ""
        except Exception:
            return False

    def get_browser_log(self):
        return self.driver.get_log("browser")

    def start_browser_logging_loop(self):
        """
        Function that will continuously check the browser being driven for new js logs
        and print them to the console. This is good to use for debugging purposes.
        Note this has the potential to really clutter your log output, so it's probably
        best to run it in a separate terminal session.
        """
        L = 0  # Track Length of latest received log array
        count_mdc = 0  # Tracks number of times "MediaDevicesChanged" message has come up in logs

        # Continuously check for new logs and print them.
        while True:
            logs = self.driver.get_log("browser")
            for log in logs[L : len(logs)]:  # only print new ones
                print(log["message"] + "\n")

                # The following code checks for a known error ocurring
                if "MediaDevicesChanged" in log["message"]:
                    count_mdc += 1
                if count_mdc > 2:
                    raise WebdriverMediaDeviceError()

            L = len(logs)
            time.sleep(1)  # Wait for 1 second before checking again


# Singleton export pattern; anyone importing this module will be able to access this particular instance.
rovWebdriverManager = WebdriverManager()

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
    print(URL)

    rovWebdriverManager.init(URL)
    rovWebdriverManager.start()
    rovWebdriverManager.test_fetch_title()
    rovWebdriverManager.start_browser_logging_loop()
