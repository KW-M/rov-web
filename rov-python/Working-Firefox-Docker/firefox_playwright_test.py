import asyncio
from playwright.async_api import async_playwright, Playwright
from pprint import pprint

# from pyvirtualdisplay import Display
# firejail /dev/ /sys/ must be exposed readonly


async def run_firefox(playwright: Playwright):
    browser_context = None
    try:
        # necessary to make virtual display to run graphical applications in headless mode
        # display = Display(visible=0, size=(800, 600))
        # display.start()

        firefox = playwright.firefox
        browser_context = await firefox.launch(
            # executable_path="/Applications/Firefox Nightly.app/Contents/MacOS/firefox",
            # args=["--enable-logging", "--v=1", "--use-fake-ui-for-media-stream"],
            headless=False,
            firefox_user_prefs={
                "devtools.chrome.enabled": True,
                "devtools.debugger.remote-enabled": True,
                "devtools.debugger.prompt-connection": False,
                "devtools.debugger.remote-port": 9224,
                "devtools.debugger.remote-host": "127.0.0.1",
                "devtools.debugger.remote-websocket": True,
                "devtools.console.stdout.chrome": True,
                "devtools.console.stdout.content": True,
                "permissions.default.microphone": 1,
                "permissions.default.camera": 1,
                # "permissions.default.geo": 1,
            },
            # args=[
            #     "--url",
            #    uRL,
            # ],
        )
        page = await browser_context.new_page()
        page.on(
            "console",
            lambda msg: print(
                "WEB CONSOLE "
                + msg.type.rjust(7, " ")
                + ": "
                + msg.text
                + ": "
                + str(msg.args)
            ),
        )
        await page.goto(URL)
        while True:
            await asyncio.sleep(100)

    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        await asyncio.sleep(0.1)
        if browser_context is not None:
            await browser_context.close()

    except asyncio.CancelledError:
        print("CancelledError")
        await asyncio.sleep(0.1)
        if browser_context is not None:
            await browser_context.close()


async def main():
    async with async_playwright() as playwright:
        await run_firefox(playwright)


asyncio.run(main())
# EGL_PLATFORM=surfaceless MESA_VK_DEVICE_SELECT=14e4:be485fd3 /usr/bin/chromium-shell --headless=new --enable-features=VaapiVideoEncoder,VaapiVideoDecoder --use-gl=angle --use-angle=gl-egl  --remote-debugging-port=9224 --remote-debugging-address=0.0.0.0  https://austin-eng.com/
