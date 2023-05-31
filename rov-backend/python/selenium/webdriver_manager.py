
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from pyvirtualdisplay import Display


class WebdriverManager:
	
    def init(self):
        pass

    def start(self):     

        # necessary to make virtual display to run graphical applications in headless mode
        self.display = Display(visible=0, size=(800, 600))
        self.display.start()

        # 
        
        browser_binary_path = '/usr/bin/chromium-browser'
        driver_path = '/usr/lib/chromium-browser/chromedriver'

        chrome_options = Options()
        # chrome_options.add_experimental_option("detach", True)
        chrome_options.binary_location=browser_binary_path
        # chrome_options.add_argument("--headless")
        chrome_options.add_argument("--use-fake-ui-for-media-stream")

        self.driver = webdriver.Chrome(driver_path, options=chrome_options)

        self.driver.get("https://kw-m.github.io/internal_irov_website/backend/index.html")

    def stop(self):
        self.driver.quit()

    def test_fetch_title(self):
        title = self.driver.title
        print("The title of the page in the headless webdriver instance is ", title)


#Code to model this module off of.
"""
class WebSocketServer:

    def init(self, msgReceivedFn):
        self.msgReceivedFn = msgReceivedFn
        self.connections = set()

    async def _register(self, websocket, path):
        self.connections.add(websocket)
        print("Client connected to Web Socket Server: ", websocket)

        # While client is connected, await messages and process them
        # with the provided message-received-function
        async for message in websocket:
            self.msgReceivedFn(message, "Dummy") # For now, add dummy metadata. TODO extract with protobuf

        print("Client disconnected from Web Socket Server: ", websocket)
        self.connections.remove(websocket)

    async def broadcast(self, message):
        websockets.broadcast(self.connections, message)


    async def start_wss(self):
        async with websockets.serve(self._register, "localhost", 8765):
            await asyncio.Future()  # run forever

    def is_connected(self):
        return len(self.connections) > 0

websocket_server = WebSocketServer()

"""