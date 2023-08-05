import logging
import asyncio
from urllib.parse import urlencode

# import our python files from the same directory
from selenium.webdriver_manager import rovWebdriverManager
from config_reader import read_config_file, get_log_level
rov_config = read_config_file()

###### Setup Logging #######
############################

# set the Loglevel from command line argument or config file. Use --LogLevel=DEBUG
logging.basicConfig(level=get_log_level(rov_config['LogLevel']))
log = logging.getLogger(__name__)

### Assemble URL for internal web browser ###
############################################
url = rov_config.get('InternalWebpageUrl', "http://localhost:80/internal/index.html")
query_params = rov_config.get('InternalWebpageUrlQueryParams', {})
query_params['RovName'] = rov_config.get('RovName')
query_params['RovControlPassword'] = rov_config.get('RovControlPassword')
query_params['AuthTokenTimeout'] = rov_config.get('AuthTokenTimeout')
query_params['PythonWebsocketPort'] = rov_config.get('PythonWebsocketPort')
# add query string to url from query_params dict using url encoding:
url += "?" + urlencode(query_params)
print (url)

# Start the webdriver manager
rovWebdriverManager.init(url).start()
rovWebdriverManager.test_fetch_title()
log = rovWebdriverManager.get_browser_log()

try:
    rovWebdriverManager.start_browser_logging_loop()
except KeyboardInterrupt:
    pass
finally:
    rovWebdriverManager.stop()
