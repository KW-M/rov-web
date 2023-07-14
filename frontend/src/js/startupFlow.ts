import { enableIframeWebsocketProxying } from "../../../shared/js/iframeWsProxy/iframeWsProxy";
import { waitfor } from "../../../shared/js/util";
import { frontendConnMngr } from "./frontendConnManager";
import { LIVEKIT_LOCAL_ENDPOINT } from "../../../shared/js/consts";


export class FrontendStartupFlowClass {

    async start() {
        await this.checkIfInIframe()
    }

    async checkIfInIframe() {
        if (window.parent === window) {
            console.log("We are not in an iframe, trying to connect to Livekit Cloud...");
            try {
                await frontendConnMngr.initUsingCloudLivekitConnection()
            } catch (err) {
                await this.failedToConnectToLivekitCloud(err)
            }
        } else {
            console.log("We are in an iframe, enabling iframe proxying to local Livekit...");
            try {
                enableIframeWebsocketProxying();
                await frontendConnMngr.initUsingLocalLivekitConnection()
            } catch (err) {
                await this.failedToConnectToLocalLivekit(err)
            }
        }
    }

    async failedToConnectToLivekitCloud(error: any) {
        console.error("Livekit Cloud Not Accessable", error)
        // await waitfor(2000)
        // await this.navigateToROVLocalIframePage()
        throw new Error("Byeeeee!")
    }


    async failedToConnectToLocalLivekit(error: any) {
        console.error("Local Livekit Server Not Accessable: ", error)
    }

    async navigateToROVLocalIframePage() {
        window.location.href = LIVEKIT_LOCAL_ENDPOINT + "/offlineframe"
    }

}

export const frontendStartupFlow = new FrontendStartupFlowClass()
