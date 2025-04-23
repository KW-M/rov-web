from os import environ, path, getcwd
from subprocess import Popen, run
from sys import platform
import tempfile
from time import sleep
from urllib.parse import urlencode


# ----- Allowed environment variables (with examples): -----
# BROWSER_LOGGING_ENABLED=false
# FAKE_STREAM_ENABLED=false
# DISABLE_WEBRTC_ENCRYPTION=false
# VIRTUAL_DISPLAY_ENABLED=true
# BROWSER_DEBUGING_ADDRESS=host.docker.internal
# BROWSER_DEBUGING_PORT=9224

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
BROWSER_BINARY_PATH = r"/usr/bin/chromium-shell"
BROWSER_DEBUGING_ADDRESS = environ.get("BROWSER_DEBUGING_ADDRESS", None)
BROWSER_DEBUGING_PORT = environ.get("BROWSER_DEBUGING_PORT", None)

is_linux = platform.startswith("linux")
is_mac = platform.startswith("darwin")

if is_mac:
    LOG_PATH = path.expanduser("~/Downloads/chromedriver.log")
    WEBRTC_LOG_PATH = path.expanduser("~/Downloads/chromium_webrtc.log")
    BROWSER_BINARY_PATH = r"/Applications/Chromium.app/Contents/MacOS/Chromium"


def run_chromium():
    """
    Run the Chromium browser with the specified arguments and environment variables.
    """

    # # pylint: disable=C0103
    # vdisplay = None
    # if is_linux and environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
    #     from pyvirtualdisplay.display import Display

    #     size = tuple(
    #         int(x) for x in environ.get("VIRTUAL_DISPLAY_SIZE", "800x600").split("x")
    #     )
    #     if len(size) != 2:
    #         print("Invalid VIRTUAL_DISPLAY_SIZE use format WIDTHxHEIGHT")
    #         size = (800, 600)

    #     # running a virtual display (xvfb) seems necessary to run
    #     # graphical applications (chromium) in headless mode.
    #     vdisplay = Display(
    #         visible=False, backend="xvfb", size=(800, 600), color_depth=8
    #     )
    #     vdisplay.start()
    #     if vdisplay.is_alive() is False:
    #         print("Failed to start virtual display", vdisplay)
    #         exit(1)

    query_params = {
        "ROV_NAME": environ.get("ROV_NAME", "Default-ROV"),
        "ROV_CONTROL_PASSWORD": environ.get("ROV_CONTROL_PASSWORD", ""),
        "DEBUG_MODE": environ.get("DEBUG_MODE", "false").upper() == "TRUE",
        "SEND_LOGS": environ.get("SEND_LOGS", "true").upper() == "TRUE",
        "BLUEOS_APIS_ENDPOINT": environ.get(
            "BLUEOS_APIS_ENDPOINT", "http://host.docker.internal"
        ),
        "PYTHON_WEBSOCKET_PORT": environ.get("PYTHON_WEBSOCKET_PORT", 0),
        "LIVEKIT_CLOUD_URL": environ.get(
            "LIVEKIT_CLOUD_URL", "https://rov-web.livekit.cloud"
        ),
        "LIVEKIT_API_KEY": environ.get("LIVEKIT_API_KEY", ""),
        "LIVEKIT_SECRET_KEY": environ.get("LIVEKIT_SECRET_KEY", ""),
        "TWITCH_STREAM_KEY": environ.get("TWITCH_STREAM_KEY", ""),
    }
    # add query string to url from query_params dict using url encoding:
    URL = environ.get("INTERNAL_WEBPAGE_URL", "http://localhost:8080/internal")
    URL += "?" + urlencode(query_params)

    browser_args = []

    # add run-xvfb to run in a virtual display:
    if is_linux and environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
        browser_args.append("xvfb-run")
        extra_xvfb_args = environ.get("VIRTUAL_DISPLAY_ARGS", "").strip()
        if extra_xvfb_args != "":
            browser_args.extend(extra_xvfb_args.split(" "))

    browser_args.extend(
        [
            BROWSER_BINARY_PATH,
            # ----- vital flags for headless mode: -----
            "--headless=new",
            "--user-data-dir=" + BROWSER_DATA_DIR,
            "--auto-accept-camera-and-microphone-capture",
            "--auto-accept-this-tab-capture",
            "--no-first-run",
            # ----------- other flags: ----------------
            "--ash-no-nudges",
            "--allow-pre-commit-input",
            "--force-color-profile=srgb",
            "--metrics-recording-only",
            "--no-default-browser-check",
            "--password-store=basic",
            "--use-mock-keychain",
            "--no-service-autorun",
            "--hide-scrollbars",
            "--mute-audio",
            "--as-browser",  # run tests in main browser process
            "--safebrowsing-disable-auto-update",
            "--noerrdialogs",
            "--metrics-recording-only",
            "--allow-file-access",
            "--allow-file-access-from-files=about:blank",
            "--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4",
            "--enable-features=NetworkService,NetworkServiceInProcess",
            # ---------- disable features: ------------
            "--dns-prefetch-disable",
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
            "--disable-chrome-browser-cloud-management"
            "--disable-client-side-phishing-detection",
            "--disable-component-extensions-with-background-pages",
            "--disable-default-apps",
            "--disable-drive-fs-for-testing",
            "--disable-browser-side-navigation",
            "--disable-dev-shm-usage",
            "--disable-search-engine-choice-screen",
            "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate,InterestFeedContentSuggestions,IsolateOrigins,site-per-process",
            "--disable-hang-monitor",
            "--disable-popup-blocking",
            "--disable-prompt-on-repost",
            "--disable-renderer-backgrounding",
            "--disable-sync",
            "--disable-notifications",
            "--disable-system-font-check",
            "--disable-speech-api",
            # Other Chromium Flags that May be Useful:
            # "--enable-automation",
            # "--single-process", # not supported, may be harmful in modern chrome
            # "--dom-automation",
            # "--full-memory-crash-report",
            # "--test-type=ui",
            # "--remote-debugging-pipe", # use a file pipe instead of a network socket for remote debugging
            # "--testing-channel=ChromeTestingInterface:1972.1",
            # "--no-startup-window", # seems to break headless mode
            # "--disable-gpu",
            # "--disable-ipc-flooding-protection",
            # "--disable-stack-profiler",
            # # -- Reduce security features to allow for lower memory usage, see also above disable-features=IsolateOrigins,site-per-process ---
            # "--disable-site-isolation-trials",
            # "--disable-web-security",
            # "--disable-gpu-sandbox",
            # # -- GPU Things ---
            # "--in-process-gpu",
            # "--disable-webgl",
            # "--disable-threaded-compositing",
            # "--disable-frame-rate-limit",
            # "--window-size=800,600",
            # "--virtual-time-budget=60000",
            ## -- Security Things --- Use with caution
            # "--allow-running-insecure-content",
            # "--ignore-certificate-errors",
            # "--safebrowsing-disable-download-protection",
        ]
    )

    # if vdisplay is not None and vdisplay.is_alive():
    #     browser_args.append("--display=" + str(vdisplay.new_display_var))

    if BROWSER_DEBUGING_PORT is not None:
        browser_args.append("--remote-debugging-port=" + str(BROWSER_DEBUGING_PORT))

    if BROWSER_DEBUGING_ADDRESS is not None:
        browser_args.append(
            "--remote-debugging-address=" + str(BROWSER_DEBUGING_ADDRESS)
        )

    if environ.get("BROWSER_LOGGING_ENABLED", "false").upper() == "TRUE":
        browser_args.append("--webrtc-event-logging=" + WEBRTC_LOG_PATH)
        browser_args.append("--enable-logging")
        browser_args.append("--log-level=2")
        browser_args.append("--v=2")

    if environ.get("FAKE_STREAM_ENABLED", "false").upper() == "TRUE":
        browser_args.append("--use-fake-device-for-media-stream")

    if environ.get("DISABLE_WEBRTC_ENCRYPTION", "false").upper() == "TRUE":
        # WARNING: seems to break webrtc connections
        browser_args.append("--disable-webrtc-encryption")

    if environ.get("DISABLE_CHROMIUM_SANDBOX", "false").upper() == "TRUE":
        # may be necessary to disable the sandbox for root docker containers
        browser_args.append("--no-sandbox")

    if environ.get("DISABLE_CHROMIUM_CRASHPAD", "true").upper() == "TRUE":
        browser_args.append("--disable-breakpad")
        browser_args.append("--disable-crash-reporter")
        browser_args.append("--disable-crashpad-for-testing")

    if environ.get("DISABLE_GPU", "false").upper() == "TRUE":
        browser_args.append("--disable-gpu")

    if environ.get("DISABLE_WEBRTC_HW_ENCODING", "false").upper() == "TRUE":
        browser_args.append("--disable-accelerated-video-encode")
        browser_args.append("--disable-accelerated-video-decode")

    if environ.get("PRINT_PDF", "false").upper() == "TRUE":
        browser_args.append("--print-to-pdf=./website.pdf")

    # add any extra chromium args from the environment:
    browser_args.extend(
        [a for a in environ.get("EXTRA_browser_args", "").split(" ") if a != ""]
    )

    # kill existing chromium processes just to make sure we are starting fresh:
    print("Killing all existing chromium processes:")
    run(["killall", "Chromium", "xvfb", "firefox"], check=False)

    # launch chromium with the specified args:
    # add the URL to the end of the args list to open the webpage
    browser_args.append(URL)

    env_vars = {
        **environ,
        "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/1000/bus",
    }
    # if vdisplay is not None and vdisplay.is_alive():
    #     environmentVars["DISPLAY"] = vdisplay.new_display_var

    if environ.get("DEBUG_ENVIRONMENT", "false").lower() == "true":
        print("sys.platform = " + platform)
        print("Running Processes (ps aux):")
        run(["ps", "aux"], check=False)
        print("\nEnvironment Variables:")
        print(env_vars)
        print("\nRunning Browser:")
        print(" ".join(browser_args) + "\n")

    # https://stackoverflow.com/questions/5772873/python-spawn-off-a-child-subprocess-detach-and-exit
    browser_process = Popen(
        args=browser_args,
        shell=False,
        env=env_vars,
        cwd=getcwd(),
    )

    try:
        RETURN_CODE = browser_process.wait()  # wait for the browser process to finish
        print("return_code=" + str(RETURN_CODE))
        # wait a sec in case the browser process is still shutting down or there is a crashing loop
        if RETURN_CODE != 0:
            sleep(3)
        exit(RETURN_CODE)
    except KeyboardInterrupt:
        print("KeyboardInterrupt")
    except Exception as e:
        raise e
    finally:
        browser_process.terminate()
        run(["killall", "Chromium", "xvfb"], check=False)
        # if vdisplay is not None:
        #     vdisplay.stop()
