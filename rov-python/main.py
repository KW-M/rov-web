from os import environ
from time import sleep
from simple_chromium import run_chromium
from simple_firefox import run_firefox


######## Main Entrypoint ###########
######################################
def main():
    try:
        browser_used = environ.get("BROWSER_USED", "chromium").lower()
        if browser_used == "firefox":
            run_firefox()
        elif browser_used == "chromium":
            run_chromium()
        else:
            print(
                f"Unknown browser: {browser_used}. Please set BROWSER_USED env var to 'firefox' or 'chromium'."
            )
            print("DOING NOTHING...")
            sleep(294967)

    except KeyboardInterrupt:
        print("KeyboardInterrupt: Exiting the program.")


if __name__ == "__main__":
    main()
