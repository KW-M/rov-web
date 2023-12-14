import { enableIframeWebsocketProxying } from "./shared/iframeWsProxy/iframeWsProxy";
import { waitfor } from "./shared/util";
import { frontendConnMngr } from "./frontendConnManager";
import { URL_PARAMS } from "./frontendConsts";
import { modalConfirm } from "./uiDialogs";


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
            console.log("We are in an iframe, alerting user");
            modalConfirm("Uh oh, rov control won't work here", "Click ok to open this page outside BlueOS", () => {
                window.open(window.location.toString())
            })
            // console.log("We are in an iframe, enabling iframe proxying to local Livekit...");
            // try {
            //     enableIframeWebsocketProxying();
            //     console.warn("TODO: Connect to local Livekit server...")
            //     // await frontendConnMngr.initUsingLocalLivekitConnection()
            // } catch (err) {
            //     await this.failedToConnectToLocalLivekit(err)
            // }
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
        window.location.href = URL_PARAMS.LIVEKIT_LOCAL_ENDPOINT + "/offlineframe"
    }

}

export const frontendStartupFlow = new FrontendStartupFlowClass()
