
import asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from pyvirtualdisplay import Display
import time
# import socket
# import httplib
# from selenium.webdriver.remote.command import Command






class WebdriverManager:

    def init(self):
        self.running = False


    def start(self):
        self.running = True

        # necessary to make virtual display to run graphical applications in headless mode
        self.display = Display(visible=0, size=(800, 600))
        self.display.start()

        # WARNING: these hardcoded paths must be correct
        # TODO these URLs should be accepted as parameters in some way.q
        browser_binary_path = r'/usr/bin/chromium-browser'
        driver_path = r'/usr/lib/chromium-browser/chromedriver'

        # Object that can be used to pass in command line option flags when starting chromium apps
        # (anything that can otherwise be passed through CLI is valid here.)
        chrome_options = webdriver.ChromeOptions()
        # chrome_options.add_experimental_option("detach", True)
        chrome_options.binary_location=browser_binary_path
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--use-fake-ui-for-media-stream")
        chrome_options.set_capability("loggingPrefs", {'browser': 'ALL'})
        chrome_options.set_capability("goog:loggingPrefs", {'browser': 'ALL'})

        # Instantiate driver and navigate to appropriate webpage
        service = Service(executable_path=driver_path)
        self.driver = webdriver.Chrome(service=service, options=chrome_options)

        #TODO should point to appropriate website (DONE). (M) if it's static content couldn't we fetch it from the local file system? - yes but we should pass it the  url query parameters at runtime / not hard-coded like it is now.
        # self.driver.get("https://kw-m.github.io/internal_irov_website/backend/index.html")
        self.driver.get("http://localhost:80/internal/index.html?ForceLocal=false&RovRoomName=ROV123&CloudAPIKey=APIkoE7m3Zqd5dJ&CloudSecretKey=YbHcJZmAAbuI4S5Ba0LHAaXx6v9kfAlyLnviB2aRWSG&LocalAPIKey=NOTSET&LocalSecretKey=NOTSET")


    """This function will periodically check if the driver is alive while the manager is set to running
       if this isn't the case (which could maybe happen because the browser crashes or there's a network issue),
         then it'll try to fix everything by just restarting.
    """
    # async def manage_driver_loop(self):
    #     while True:
    #         await asyncio.sleep(10) # arbitrary timeout for periodic checks
    #         alive = self.driver_is_alive()
    #         running = self.running
    #         if running and not alive:
    #             print("We have a problem, for some reason the webdriver is supposed to be running but it's not. Maybe the browser has crashed? or there's a network issue? Attempting to restart webdriver.")
    #             self.stop()
    #             self.start()


    def stop(self):
        self.running = False
        self.driver.quit()

    def test_fetch_title(self):
        title = self.driver.title
        print("The title of the page in the headless webdriver instance is ", title)


    """returns true if the webdriver is running, false otherwise"""
    def driver_is_alive(self):
        # return "unknown"
        try:
            self.driver.title
            return True
        except:
            return False

    def get_browser_log(self):
        return self.driver.get_log("browser")

    """Function that will continuously check the browser being driven for new js logs
        and print them to the console. This is good to use for debugging purposes.
        Note this has the potential to really clutter your log output, so it's probably
        best to run it in a separate terminal session.
    """
    def start_browser_logging_loop(self):

        L = 0 # Track Length of latest received log array

        # Continuously check for new logs and print them.
        while True:
            logs = self.driver.get_log('browser')
            for log in logs[L:len(logs)]: #only print new ones
                print(log['message']+"\n")
            L = len(logs)
            time.sleep(1)  # Wait for 1 second before checking again


# Singleton export pattern; anyone importing this module will be able to access this particular instance.
rovWebdriverManager = WebdriverManager()

# Testing scripts. If you run this module as main, you'll get to see a
# live output of the logs in the headless browser being controlled by the webdriver.
if __name__=="__main__":
    rovWebdriverManager.init()
    rovWebdriverManager.start()
    rovWebdriverManager.test_fetch_title()
    log = rovWebdriverManager.get_browser_log()

    try:
        rovWebdriverManager.start_browser_logging_loop()
    except KeyboardInterrupt:
        pass
    finally:
        rovWebdriverManager.stop()

    # print("started manager, ", rovWebdriverManager.is_running())
    # rovWebdriverManager.stop()
    # print("stopped manager, ", rovWebdriverManager.is_running())
