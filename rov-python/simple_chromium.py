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
BROWSER_BINARY_PATH = r"/usr/bin/chromium-shell"
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

    # # pylint: disable=C0103
    # vdisplay = None
    # if is_linux and os.environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
    #     from pyvirtualdisplay.display import Display

    #     size = tuple(
    #         int(x) for x in os.environ.get("VIRTUAL_DISPLAY_SIZE", "800x600").split("x")
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

    chromium_args = []

    # add run-xvfb to run in a virtual display:
    if is_linux and os.environ.get("VIRTUAL_DISPLAY_ENABLED", "TRUE").upper() == "TRUE":
        chromium_args.append("xvfb-run")
        extra_xvfb_args = os.environ.get("VIRTUAL_DISPLAY_ARGS", "").strip()
        if extra_xvfb_args != "":
            chromium_args.extend(extra_xvfb_args.split(" "))

    #!CHROME GPU WORKS ON BOOKWORM WITH THIS !!!: EGL_PLATFORM=surfaceless MESA_VK_DEVICE_SELECT=14e4:be485fd3 /usr/bin/chromium-shell --headless=new --enable-features=VaapiVideoEncoder,VaapiVideoDecoder,UseOzonePlatform --ignore-gpu-blocklist --use-gl=angle --use-angle=gl-egl --test-type --no-sandbox --temp-profile --user-data-dir --disable-smooth-scrolling --disable-low-res-tiling --enable-low-end-device-mode --num-raster-threads=4 --profiler-timing=0 --disable-composited-antialiasing --enable-logging --remote-debugging-port=9224 --remote-debugging-address=0.0.0.0  https://austin-eng.com

    # --flag-switches-begin --use-angle=metal --disable-features=FileSystemAccessAPI --flag-switches-end --component-updater=url-source=https://go-updater.brave.com/extensions
    # EGL_PLATFORM=surfaceless MESA_VK_DEVICE_SELECT=14e4:be485fd3 /usr/bin/chromium-shell --headless=new --enable-features=Vulkan,VaapiVideoEncoder,VaapiVideoDecoder,UseOzonePlatform --use-vulkan=native --enable-logging --disable-vulkan-fallback-to-gl-for-testing   --ignore-gpu-blocklist --use-angle=vulkan --remote-debugging-port=9224 --remote-debugging-address=0.0.0.0  https://austin-eng.com/
    # --ozone-platform=drm --ignore-gpu-blocklist --use-gl=angle --use-angle=gl-egl --disable-oop-rasterization --enable-features=Vulkan,UseSkiaRenderer,VaapiVideoEncoder,VaapiVideoDecoder
    chromium_args.extend(
        [
            BROWSER_BINARY_PATH,
            # ----- vital flags for headless mode: -----
            "--headless=new",
            "--user-data-dir=" + BROWSER_DATA_DIR,
            "--auto-accept-camera-and-microphone-capture",
            "--auto-accept-this-tab-capture",
            "--no-first-run",
            # "--enable-gpu",  # https://chromium-review.googlesource.com/c/chromium/src/+/5731222/3/docs/gpu/using-gpu-hardware-in-headless-chrome.md#7
            # "--ignore-gpu-blocklist",
            # "--ozone-platform=dma"  # for linux to use gpu acceleration without a windowing/x11 server (use --ozone-latform=headless to disable gpu accel and display) https://chromium.googlesource.com/chromium/src.git/+/HEAD/docs/ozone_overview.md
            "--use-gl=angle",
            "--use-angle=gl-egl",  # https://issues.chromium.org/issues/40540071#comment61
            # "--use-angle=vulkan",  # https://github.com/puppeteer/puppeteer/issues/8638
            # https://github.com/m1k1o/neko/blob/c1360d3abcfea9104e355f90f5e353205f70f743/.docker/google-chrome/supervisord.nvidia.conf#L14-L15
            "--disable-oop-rasterization",  # https://www.reddit.com/r/chrome/comments/rdxxnu/the_affect_of_outofprocess_rasterization_on/
            # "--enable-features=NetworkService,NetworkServiceInProcess",
            "--enable-features=VaapiVideoEncoder,VaapiVideoDecoder",
            # ----------- other flags: ----------------
            "--bwsi",  # chrome guest mode
            "--kiosk",
            "--noerrdialogs",
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
            # ---------- disable features: ------------
            "--dns-prefetch-disable",
            "--disable-extensions",
            "--disable-translate",
            "--disable-web-resources",
            "--disable-component-update",
            "--disable-field-trial-config",
            "--disable-restore-session-state",
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
            "--disable-features=ImprovedCookieControls,LazyFrameLoading,GlobalMediaControls,DestroyProfileOnBrowserClose,AcceptCHFrame,AutoExpandDetailsElement,CertificateTransparencyComponentUpdater,AvoidUnnecessaryBeforeUnloadCheckSync,Translate,InterestFeedContentSuggestions,ConversionMeasurement,AttributionReportingCrossAppWeb,IsolateOrigins,site-per-process",
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
            #   --disable-file-system
            # "--disable-seccomp-filter-sandbox",  # maybe less severe alternative to --no-sandbox?
            # # -- GPU Things ---
            # "--in-process-gpu",
            # "--disable-webgl",
            # "--disable-threaded-compositing",
            # "--disable-frame-rate-limit",
            "--disable-oop-rasterization",
            # "--window-size=800,600",
            # "--virtual-time-budget=60000",
            ## -- Security Things --- Use with caution
            # "--allow-running-insecure-content",
            # "--ignore-certificate-errors",
            # "--safebrowsing-disable-download-protection",
            # --temp-profile --user-data-dir --disable-smooth-scrolling --disable-low-res-tiling --enable-low-end-device-mode --profiler-timing=0 --disable-composited-antialiasing
        ]
    )

    # if vdisplay is not None and vdisplay.is_alive():
    #     chromium_args.append("--display=" + str(vdisplay.new_display_var))

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

    if os.environ.get("DISABLE_CHROMIUM_CRASHPAD", "true").upper() == "TRUE":
        chromium_args.append("--disable-breakpad")
        chromium_args.append("--disable-crash-reporter")
        chromium_args.append("--disable-crashpad-for-testing")

    if os.environ.get("DISABLE_GPU", "false").upper() == "TRUE":
        chromium_args.append("--disable-gpu")

    if os.environ.get("DISABLE_WEBRTC_HW_ENCODING", "false").upper() == "TRUE":
        chromium_args.append("--disable-accelerated-video-encode")
        chromium_args.append("--disable-accelerated-video-decode")

    if os.environ.get("PRINT_PDF", "false").upper() == "TRUE":
        chromium_args.append("--print-to-pdf=./website.pdf")

    # add any extra chromium args from the environment:
    chromium_args.extend(
        [a for a in os.environ.get("EXTRA_CHROMIUM_ARGS", "").split(" ") if a != ""]
    )

    # kill existing chromium processes just to make sure we are starting fresh:
    print("Killing all existing chromium processes:")
    subprocess.run(["killall", "Chromium", "xvfb"], check=False)
    subprocess.run(["ps"], check=False)

    # launch chromium with the specified args:
    # add the URL to the end of the args list to open the webpage
    chromium_args.append(URL)

    environmentVars = {
        **os.environ,
        "DBUS_SESSION_BUS_ADDRESS": "unix:path=/run/user/1000/bus",
        "EGL_PLATFORM": "surfaceless",
    }
    # if vdisplay is not None and vdisplay.is_alive():
    #     environmentVars["DISPLAY"] = vdisplay.new_display_var

    print("Environment Variables:")
    print(environmentVars)
    print("Running chromium:")
    print(" ".join(chromium_args))
    # https://stackoverflow.com/questions/5772873/python-spawn-off-a-child-subprocess-detach-and-exit
    browser_process = subprocess.Popen(
        args=chromium_args,
        shell=False,
        env=environmentVars,
        cwd=os.getcwd(),
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
        subprocess.run(["killall", "Chromium", "xvfb"], check=False)
        # if vdisplay is not None:
        #     vdisplay.stop()
