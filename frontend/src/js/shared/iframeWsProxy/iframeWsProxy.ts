// https://stackoverflow.com/questions/61865890/run-websocket-in-web-worker-or-service-worker-javascript
// https://github.com/skepticfx/wshook
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
// Some Ideas

import { DECODE_TXT, ENCODE_TXT, PROXY_PREFIX } from "../consts";
import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import hookWebsockets from "../libraries/websocketHook/wsHook";

export enum proxyMessageTypes {
    openWebsocket,
    socketMsg,
    outgoingHttpReq,
    incomingHttpReq,
}

export type proxyInterchangeFormat = {
    type: proxyMessageTypes;
    url: string;
    body: number[]; // binary data
    result: object; // for fetch response
}

export function enableIframeWebsocketProxying() {
    if (!window.parent || window.parent === window) return logWarn("enableFrameProxy() called without this page being inside an iframe!")

    // const origin = window.parent.location.protocol.replace(":", "") + "://" + window.parent.location.host;
    const receiveProxiedMsg = startWebsocketProxying((url: string) => true, (data) => {
        window.parent.postMessage(data, "*")
    })
    window.addEventListener('message', (msg) => {
        // if (msg.origin === origin) { // security check
        log("Got iframe parent message", msg)
        receiveProxiedMsg(msg.data)
        // }
    })
}

function startWebsocketProxying(isProxiedUrl: (url: string) => boolean, sendProxyMessageCallback: (data: Uint8Array) => void) {
    const proxiedWsObjects: { [key: string]: WebSocket } = {};

    // Monkey Patch the native websocket object
    const wsHook = hookWebsockets();

    wsHook.allowNewSocket = (url) => {
        log("Checking ws url: ", url)
        if (isProxiedUrl(url)) {
            log("Proxying ws url: ", url)
            return false;
        } else return true;
    };

    wsHook.modifyUrl = (url: string | URL) => {
        url = url.toString();
        if (isProxiedUrl(url)) url = url.substring(PROXY_PREFIX.length)
        log("modifyUrl: ", url)
        return url
    };


    wsHook.afterInit = (wsObject) => {
        const url = wsObject.url;
        if (!wsObject.isReal) {
            proxiedWsObjects[url] = wsObject;
            setTimeout(() => {
                wsHook.triggerOnOpen(wsObject);
                sendNewConnMsgThruProxy(url);
            }, 1)
        }
        return wsObject;
    };

    wsHook.beforeSend = (data, url, wsObject) => {
        if (wsObject.isReal) {
            return data;
        } else {
            log("beforeSend: ", wsObject.isReal, wsObject.url, data)
            sendDataThruProxy(url, new Uint8Array(data as ArrayBuffer))
            return null
        }
    }

    function sendNewConnMsgThruProxy(url: string) {
        const proxiedMsg = {
            type: proxyMessageTypes.openWebsocket,
            url: url,
        } as proxyInterchangeFormat
        log("Sending openWebsocket msg Thru Proxy", proxiedMsg)
        if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify(proxiedMsg)))
    }

    function sendDataThruProxy(url: string, data: Uint8Array) {
        const binary = new Uint8Array(data)
        const proxiedMsg = {
            type: proxyMessageTypes.socketMsg,
            url: url,
            body: new Array(...binary)
        } as proxyInterchangeFormat
        log("Sending Data Thru Proxy", proxiedMsg)
        if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify(proxiedMsg)))
    }

    return function receiveProxiedMsg(rawMsg: Uint8Array) {
        const proxiedMsg = JSON.parse(DECODE_TXT(rawMsg)) as proxyInterchangeFormat;
        if (proxiedMsg.type === proxyMessageTypes.socketMsg) {
            const ws = proxiedWsObjects[proxiedMsg.url]
            const body = new Uint8Array(proxiedMsg.body)
            log("Received Proxy Message", proxiedMsg, body)
            if (ws) wsHook.triggerOnMessage(ws, body)
        }
    }
}
