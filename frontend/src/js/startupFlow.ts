import { enableIframeWebsocketProxying } from "./shared/iframeWsProxy/iframeWsProxy";
import { waitfor } from "./shared/util";
import { frontendConnMngr } from "./frontendConnManager";
import { URL_PARAMS } from "./frontendConsts";
import { modalAlert, modalConfirm } from "../components/Modals/modals";
import { log, logDebug, logInfo, logWarn, logError } from "../js/shared/logging"
import { isBrowserSupported } from "livekit-client";

export class FrontendStartupFlowClass {

    async start() {
        await this.checkIfInIframe()
    }

    checkLivekitSupported() {
        if (isBrowserSupported()) {
            return true;
        } else {
            modalConfirm("Browser Not Supported", {
                body: `Live connectivity features are missing<br/>
                       Use an updated browser such as <b>Chrome, Edge, Firefox</b>, or <b>Safari</b>.<br/>`,
                modalClasses: "w-fit max-w-xs px-6 py-5 variant-filled-error !bg-error-500",
                buttonTextCancel: "Check Connection",
                buttonTextConfirm: "Ok",
                response: (r) => {
                    if (!r) window.location.href = "https://livekit.io/webrtc/browser-test";
                }
            })
            return false;
        }
    }

    async checkIfInIframe() {
        if (!this.checkLivekitSupported()) return false;
        if (window.parent === window) {
            logDebug("We are not in an iframe, trying to connect to Livekit Cloud...");
            try {
                await frontendConnMngr.initUsingCloudLivekitConnection()
            } catch (err) {
                await this.failedToConnectToLivekitCloud(err)
            }
        } else {
            log("We are in an iframe, alerting user");
            modalConfirm("Uh oh, rov control won't work here", {
                body: "Click OK to open this page outside BlueOS",
                response: () => {
                    window.open(window.location.toString())
                }
            })
            // log("We are in an iframe, enabling iframe proxying to local Livekit...");
            // try {
            //     enableIframeWebsocketProxying();
            //     logWarn("TODO: Connect to local Livekit server...")
            //     // await frontendConnMngr.initUsingLocalLivekitConnection()
            // } catch (err) {
            //     await this.failedToConnectToLocalLivekit(err)
            // }
        }
    }

    async failedToConnectToLivekitCloud(error: any) {
        logError("Livekit Cloud Not Accessable", error)
        // await waitfor(2000)
        // await this.navigateToROVLocalIframePage()
        throw new Error("Byeeeee!")
    }


    async failedToConnectToLocalLivekit(error: any) {
        logError("Local Livekit Server Not Accessable: ", error)
    }

    async navigateToROVLocalIframePage() {
        window.location.href = URL_PARAMS.LIVEKIT_LOCAL_ENDPOINT + "/offlineframe"
    }

}

export const frontendStartupFlow = new FrontendStartupFlowClass()
