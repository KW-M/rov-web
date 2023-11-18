import asyncio
from playwright.async_api import async_playwright, Playwright

# from pyvirtualdisplay import Display


async def run(playwright: Playwright):
    try:
        # necessary to make virtual display to run graphical applications in headless mode
        # display = Display(visible=0, size=(800, 600))
        # display.start()

        chromium = playwright.chromium
        browser_context = await chromium.launch(
            args=["--enable-logging", "--v=1", "--use-fake-ui-for-media-stream"],
            # viewport={"width": 800, "height": 600},
            chromium_sandbox=True,
            headless=True,
        )
        # browser_context = await chromium.launch_persistent_context(
        #     user_data_dir="",
        #     permissions=["microphone", "camera", "geolocation"],
        #     # args=["--enable-logging", "--v=1"],
        #     # viewport={"width": 700, "height": 500},
        #     # chromium_sandbox=True,
        #     # screen={"width": 800, "height": 600},
        #     headless=True,
        # )
        page = await browser_context.new_page(
            permissions=["microphone", "camera", "geolocation"]
        )
        await page.goto(
            "http://localhost:8080/internal?LivekitCloudUrl=https%3A%2F%2Frov-web.livekit.cloud&LivekitApiKey=APIHd7Boa9RUUiT&LivekitSecretKey=OEnyn7xw5d0vKNqLlKDSD6UXaSvoVQ8uLDiZycjb8pH&RovName=Kyle-9&RovControlPassword=1234&AuthTokenTimeout=86400"
        )
        page.on(
            "console",
            lambda msg: print(
                "WEB CONSOLE " + msg.type.rjust(6, " ") + ": " + msg.text
            ),
        )
        while True:
            await asyncio.sleep(100)

    except KeyboardInterrupt:
        print("KeyboardInterrupt")
        await asyncio.sleep(0.1)
        await browser_context.close()

    except asyncio.CancelledError:
        print("CancelledError")
        await asyncio.sleep(0.1)
        await browser_context.close()


async def main():
    async with async_playwright() as playwright:
        await run(playwright)


asyncio.run(main())
