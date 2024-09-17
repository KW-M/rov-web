import os
import subprocess
import sys
import tempfile
from time import sleep
from urllib.parse import urlencode


# ----- Allowed environment variables (with examples): -----
# BROWSER_LOGGING_ENABLED=false
# FAKE_STREAM_ENABLED=false
# DISABLE_WEBRTC_ENCRYPTION=false
# VIRTUAL_DISPLAY_ENABLED=true
# CHROMIUM_DEBUGING_ADDRESS=host.docker.internal
# CHROMIUM_DEBUGING_PORT=9222

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


LOG_PATH = "/home/pi/chromedriver.log"
WEBRTC_LOG_PATH = "/home/pi/chromium_webrtc.log"
BROWSER_DATA_DIR = tempfile.mkdtemp()
BROWSER_BINARY_PATH = r"/usr/bin/chromium"
CHROMIUM_DEBUGING_ADDRESS = os.environ.get("CHROMIUM_DEBUGING_ADDRESS", None)
CHROMIUM_DEBUGING_PORT = os.environ.get("CHROMIUM_DEBUGING_PORT", None)

print("sys.platform = " + sys.platform)
is_linux = sys.platform.startswith("linux")
is_mac = sys.platform.startswith("darwin")

if is_mac:
    LOG_PATH = os.path.expanduser("~/Downloads/chromedriver.log")
    WEBRTC_LOG_PATH = os.path.expanduser("~/Downloads/chromium_webrtc.log")
    BROWSER_BINARY_PATH = r"/Applications/Chromium.app/Contents/MacOS/Chromium"

if __name__ == "__main__":

    # pylint: disable=C0103
    vdisplay = None
    if is_linux and os.environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
        from pyvirtualdisplay.display import Display

        # running a virtual display (xvfb) is necessary to run graphical applications (chromium) in headless mode for some reason
        vdisplay = Display(visible=True, size=(800, 600))
        vdisplay.start()

    query_params = {
        "ROV_NAME": os.environ.get("ROV_NAME", "Default-ROV"),
        "ROV_CONTROL_PASSWORD": os.environ.get("ROV_CONTROL_PASSWORD", ""),
        "DEBUG_MODE": os.environ.get("DEBUG_MODE", "false").upper() == "TRUE",
        "SEND_LOGS": os.environ.get("SEND_LOGS", "true").upper() == "TRUE",
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

    chromium_args = [
        BROWSER_BINARY_PATH,
        # ----- vital flags for headless mode: -----
        "--headless=new",
        "--user-data-dir=" + BROWSER_DATA_DIR,
        "--auto-accept-camera-and-microphone-capture",
        "--no-first-run",
        # ----------- other flags: ----------------
        "--auto-accept-this-tab-capture",
        "--ash-no-nudges",
        "--allow-pre-commit-input",
        "--force-color-profile=srgb",
        "--metrics-recording-only",
        "--no-default-browser-check",
        "--password-store=basic",
        "--use-mock-keychain",
        "--no-service-autorun",
        "--export-tagged-pdf",
        "--hide-scrollbars",
        "--mute-audio",
        "--safebrowsing-disable-auto-update",
        "--noerrdialogs",
        "--metrics-recording-only",
        "--allow-file-access",
        "--allow-file-access-from-files=about:blank",
        "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
        "--enable-features=NetworkService,NetworkServiceInProcess",
        # ---------- disable features: ------------
        "--disable-extensions",
        "--disable-translate",
        "--disable-web-resources",
        "--disable-component-update",
        "--disable-field-trial-config",
        "--disable-background-networking",
        "--disable-zero-browsers-open-for-tests",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-back-forward-cache",
        "--disable-breakpad",  # Disables the crash reporting.
        "--disable-crash-reporter",  # Disables the crash reporting.
        "--disable-chrome-browser-cloud-management"
        "--disable-client-side-phishing-detection",
        "--disable-component-extensions-with-background-pages",
        "--disable-default-apps",
        "--disable-drive-fs-for-testing",
        "--disable-browser-side-navigation",
        "--disable-dev-shm-usage",
        "--disable-search-engine-choice-screen",
        "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate,InterestFeedContentSuggestions",
        "--disable-hang-monitor",
        "--disable-popup-blocking",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-sync",
        "--disable-notifications",
        "--dns-prefetch-disable",
    ]

    if CHROMIUM_DEBUGING_PORT is not None:
        chromium_args.append("--remote-debugging-port=" + str(CHROMIUM_DEBUGING_PORT))

    if CHROMIUM_DEBUGING_ADDRESS is not None:
        chromium_args.append(
            "--remote-debugging-address=" + str(CHROMIUM_DEBUGING_ADDRESS)
        )

    if os.environ.get("BROWSER_LOGGING_ENABLED", "false").upper() == "TRUE":
        chromium_args.append("--webrtc-event-logging=" + WEBRTC_LOG_PATH)
        chromium_args.append("--enable-logging")
        chromium_args.append("--log-level=2")
        chromium_args.append("--v=2")

    if os.environ.get("FAKE_STREAM_ENABLED", "false").upper() == "TRUE":
        chromium_args.append("--use-fake-device-for-media-stream")

    if os.environ.get("DISABLE_WEBRTC_ENCRYPTION", "false").upper() == "TRUE":
        # WARNING: seems to break webrtc connections
        chromium_args.append("--disable-webrtc-encryption")

    if os.environ.get("DISABLE_CHROMIUM_SANDBOX", "false").upper() == "TRUE":
        # may be necessary to disable the sandbox for root docker containers
        chromium_args.append("--no-sandbox")

    # kill existing chromium processes just to make sure we are starting fresh:
    print("Killing all existing chromium processes:")
    subprocess.run(["killall", "Chromium"], check=False)

    # launch chromium with the specified args:
    # add the URL to the end of the args list to open the webpage
    chromium_args.append(URL)
    ARGS_STRING = '"' + '" "'.join(chromium_args) + '"'
    print("Running chromium:")
    print(ARGS_STRING)
    browser_process = subprocess.Popen(
        args=["DISPLAY=:0 " + ARGS_STRING],
        shell=True,
        env=os.environ,
        cwd=os.getcwd(),
    )

    try:
        RETURN_CODE = browser_process.wait()  # wait for the browser process to finish
        print("return_code=" + str(RETURN_CODE))
        # wait a sec in case the browser process is still shutting down or there is a crashing loop
        sleep(1)
        exit(RETURN_CODE)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
    except Exception as e:
        raise e
    finally:
        browser_process.terminate()
        subprocess.run(["killall", "Chromium"], check=False)
        if vdisplay is not None:
            vdisplay.stop()

        # Other Chromium Flags that May be Useful:
        # "--enable-automation",

        # "--single-process",
        # "--in-process-gpu",
        # "--disable-web-security",
        # "--allow-running-insecure-content",
        # "--ignore-certificate-errors",
        # "--safebrowsing-disable-download-protection",
        # "--dom-automation",
        # "--full-memory-crash-report",
        # "--test-type=ui",
        # "--remote-debugging-pipe", # use a file pipe instead of a network socket for remote debugging
        # "--testing-channel=ChromeTestingInterface:1972.1",
        # "--no-startup-window", # seems to break headless mode
        # "--disable-gpu",
        # "--disable-ipc-flooding-protection",
