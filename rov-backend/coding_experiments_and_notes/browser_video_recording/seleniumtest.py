
import asyncio
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service as ChromeService
# from pyvirtualdisplay import Display
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
import time

class WebdriverManager:
    url = ""

    def init(self, url):
        self.running = False
        self.url = url
        return self


    def start(self):
        self.running = True

        # necessary to make virtual display to run graphical applications in headless mode
        # self.display = Display(visible=0, size=(800, 600))
        # self.display.start()

        # WARNING: these hardcoded paths must be correct
        # TODO these URLs should be accepted as parameters in some way.q
        browser_binary_path = r'/usr/bin/chromium'
        driver_path = r'/usr/bin/chromedriver'

        # Object that can be used to pass in command line option flags when starting chromium apps
        # (anything that can otherwise be passed through CLI is valid here.)
        chrome_options = webdriver.ChromeOptions()
        chrome_options.binary_location=browser_binary_path
        chrome_options.set_capability("goog:loggingPrefs", {'browser': 'ALL'})
        chrome_options.add_argument("--use-fake-ui-for-media-stream")
        chrome_options.add_argument("--enable-logging")
        chrome_options.add_argument("--v=1")
        chrome_options.add_argument("--headless")
        # chrome_options.add_argument("--remote-debugging-port=9222") # Breaks chrome driver
        # chrome_options.add_argument("--remote-debugging-address=0.0.0.0")
        # chrome_options.add_experimental_option("detach", True)

        # Instantiate driver and navigate to appropriate webpage
        service = ChromeService(executable_path=driver_path)
        self.driver = webdriver.Chrome(service=service, options=chrome_options)

        self.driver.get(self.url)


    """This function will periodically check if the driver is alive while the manager is set to running
       if this isn't the case (which could maybe happen because the browser crashes or there's a network issue),
         then it'll try to fix everything by just restarting.
    """
    async def manage_driver_loop(self):
        while True:
            await asyncio.sleep(10) # arbitrary timeout for periodic checks
            alive = self.driver_is_alive()
            running = self.running
            if running and not alive:
                print("We have a problem, for some reason the webdriver is supposed to be running but it's not. Maybe the browser has crashed? or there's a network issue? Attempting to restart webdriver.")
                self.stop()
                self.start()

    async def start_video_recording(self, button_selector, filepath):
        self.driver.find_element(By.CSS_SELECTOR, button_selector).click()


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


if __name__ == "main":
    print("hi")
    # Node.JS code for selenium to choose a file from the file picker

    # # // wait for the window to appear
    # WebDriverWait wait = new WebDriverWait(driver, 10);
    # wait.until(ExpectedConditions.alertIsPresent());

    # # // switch to the file upload window
    # Alert alert = driver.switchTo().alert();
    # #
    # # // enter the filename
    # alert.sendKeys(fileName);

    # # // hit enter
    # Robot r = new Robot();
    # r.keyPress(KeyEvent.VK_ENTER);
    # r.keyRelease(KeyEvent.VK_ENTER);

    # # // switch back
    # driver.switchTo().activeElement();
