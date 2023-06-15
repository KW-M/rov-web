

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from pyvirtualdisplay import Display

display = Display(visible=0, size=(800, 600))
display.start()

chrome_options = Options()
# chrome_options.add_experimental_option("detach", True)
browser_binary_path = '/usr/bin/chromium-browser'

driver_path = '/usr/lib/chromium-browser/chromedriver'

chrome_options.binary_location=browser_binary_path
# chrome_options.add_argument("--headless")
chrome_options.add_argument("--use-fake-ui-for-media-stream")

driver = webdriver.Chrome(driver_path, options=chrome_options)

# driver.get("https://kw-m.github.io/internal_irov_website/backend/index.html")

# This is useful for testing
driver.get("https://www.selenium.dev/selenium/web/web-form.html")



# Here I run a test to just grab the title of the webpage and quit
title = driver.title
print("The title of this page is ", title)

try:
	while True:
		pass
finally:
	print("executing finally block...")
	driver.quit()
	print("quit driver")
