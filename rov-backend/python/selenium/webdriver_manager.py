
import asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from pyvirtualdisplay import Display
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
        browser_binary_path = '/usr/bin/chromium-browser'
        driver_path = '/usr/lib/chromium-browser/chromedriver'

        # Object that can be used to pass in command line option flags when starting chromium apps
        # (anything that can otherwise be passed through CLI is valid here.)
        chrome_options = Options()
        # chrome_options.add_experimental_option("detach", True)
        chrome_options.binary_location=browser_binary_path
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--use-fake-ui-for-media-stream")

        # Instantiate driver and navigate to appropriate webpage
        self.driver = webdriver.Chrome(driver_path, options=chrome_options)
        self.driver.get("https://kw-m.github.io/internal_irov_website/backend/index.html") #TODO should point to appropriate website. (M) if it's static content couldn't we fetch it from the local file system?

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


rovWebdriverManager = WebdriverManager()

# Testing scripts
if __name__=="__main__":
    rovWebdriverManager.init()
    rovWebdriverManager.start()
    rovWebdriverManager.test_fetch_title()
    print("started manager, ", rovWebdriverManager.is_running())
    rovWebdriverManager.stop()
    print("stopped manager, ", rovWebdriverManager.is_running())
