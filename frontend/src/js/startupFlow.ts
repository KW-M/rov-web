import { enableFrameProxy as enableIframeWebsocketProxying } from "./iframeWsProxying";
import { waitfor } from "../../../shared/js/util";
import { frontendConnMngr } from "./connectionManager";
import { LIVEKIT_LOCAL_ENDPOINT } from "../../../shared/js/consts";


export class FrontendStartupFlow {

    async start() {
        await this.checkIfInIframe()
    }

    async checkIfInIframe() {
        if (window.parent !== window) {
            console.log("We are in an iframe");
            enableIframeWebsocketProxying();
            await frontendConnMngr.startUsingLocalLivekitConnection()
        } else {
            console.log("We are not in an iframe");
            await this.tryToConnectToLivekitCloud()
        }
    }

    async tryToConnectToLivekitCloud() {
        try {
            await frontendConnMngr.startUsingCloudLivekitConnection()
        } catch (e) {
            console.error("Livekit Cloud Not Accessable", e)
            await waitfor(2000)
            this.navigateToROVLocalIframe()
            throw new Error("Byeeeee!")
        }
    }

    navigateToROVLocalIframe() {
        window.location.href = LIVEKIT_LOCAL_ENDPOINT + "/offlineframe"
    }

}
