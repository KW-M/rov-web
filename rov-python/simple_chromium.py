import os
import subprocess
import sys
import tempfile
from time import sleep
from urllib.parse import urlencode

print("sys.platform = " + sys.platform)
is_linux = sys.platform.startswith("linux")
is_mac = sys.platform.startswith("darwin")

# if is_linux:
#     from pyvirtualdisplay import Display

LOG_PATH = "/home/pi/chromedriver.log"
BROWSER_DATA_DIR = tempfile.mkdtemp()
BROWSER_BINARY_PATH = r"/usr/bin/chromium"
BROWSER_REMOTE_DEBUGGING_PORT = 9224
if is_mac:
    LOG_PATH = "~/Downloads/chromedriver.log"
    BROWSER_BINARY_PATH = r"/Applications/Chromium.app/Contents/MacOS/Chromium"

if __name__ == "__main__":
    # running a virtual display (xvfb) is necessary to run graphical applications (chromium) in headless mode for some reason

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

    args = [
        BROWSER_BINARY_PATH,
        "--auto-accept-camera-and-microphone-capture",
        "--use-fake-ui-for-media-stream",  # probably redundant
        # "--auto-accept-this-tab-capture",
        "--enable-logging",
        "--log-level=2",
        "--headless=new",
        "--no-sandbox",
        "--single-process",
        # "--in-process-gpu",
        # "--disable-web-security",
        # "--allow-running-insecure-content",
        # "--user-data-dir=" + BROWSER_DATA_DIR,
        "--disable-field-trial-config",
        "--disable-background-networking",
        "--enable-features=NetworkService,NetworkServiceInProcess",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-back-forward-cache",
        "--disable-breakpad",
        "--disable-chrome-browser-cloud-management"
        "--disable-client-side-phishing-detection",
        "--disable-component-extensions-with-background-pages",
        "--disable-default-apps",
        "--disable-browser-side-navigation",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,MediaRouter,DialMediaRouteProvider,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate,InterestFeedContentSuggestions",
        "--ash-no-nudges",
        "--disable-search-engine-choice-screen",
        "--allow-pre-commit-input",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-popup-blocking",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-sync",
        "--force-color-profile=srgb",
        "--metrics-recording-only",
        "--no-first-run",
        "--enable-automation",
        "--password-store=basic",
        "--use-mock-keychain",
        "--no-service-autorun",
        "--export-tagged-pdf",
        "--hide-scrollbars",
        "--mute-audio",
        # "--dom-automation",
        # "--full-memory-crash-report",
        "--disable-translate",
        "--disable-web-resources",
        "--safebrowsing-disable-auto-update",
        "--safebrowsing-disable-download-protection",
        "--disable-component-update",
        "--ignore-certificate-errors",
        "--no-default-browser-check",
        # "--test-type=ui",
        "--noerrdialogs",
        "--metrics-recording-only",
        "--disable-zero-browsers-open-for-tests",
        "--allow-file-access",
        "--allow-file-access-from-files=about:blank",
        "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
        #  "--remote-debugging-pipe",
        # "--testing-channel=ChromeTestingInterface:1972.1",
        "--remote-debugging-port=" + str(BROWSER_REMOTE_DEBUGGING_PORT),
        "--remote-debugging-address=0.0.0.0",
        "--no-startup-window",
        URL,
    ]
    # launch chromium using process:
    args_string = '"' + '" "'.join(args) + '"'
    print(args_string)
    print("Killing all Chromium processes:")
    subprocess.run(["killall", "Chromium"], check=False)
    browser_process = subprocess.Popen(
        # args=args,
        args=["DISPLAY=:0 " + args_string],
        shell=True,
        env=os.environ,
        cwd=os.getcwd(),
    )

    try:
        return_code = browser_process.wait()
        print("return_code=" + str(return_code))
        sleep(1)
        exit(return_code)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        browser_process.terminate()
        subprocess.run(["killall", "Chromium"], check=False)
    except Exception as e:
        browser_process.terminate()
        subprocess.run(["killall", "Chromium"], check=False)
        raise e

    # asyncio.run(main())
