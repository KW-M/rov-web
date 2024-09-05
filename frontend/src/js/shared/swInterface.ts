/// @ts-ignore
import swFile from "../serviceworker?url"
import { log, logDebug, logInfo, logWarn, logError } from "./logging"

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        log("serviceWorker swFile", swFile)
        try {
            navigator.serviceWorker.getRegistration().then(function (registration) {
                if (registration) {
                    log("SW Already Registered, Unregistering")
                    registration.unregister();
                    // window.location.reload();
                }
            });
            const registration = await navigator.serviceWorker.register(swFile, {
                // scope: "/",
            });
            if (registration.installing) {
                log("Service worker installing");
            } else if (registration.waiting) {
                log("Service worker installed");
            } else if (registration.active) {
                log("Service worker active");
            }
        } catch (error) {
            logError(`SW Registration failed with ${error}`);
        }
    }
};
