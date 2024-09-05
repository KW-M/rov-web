import { type proxyInterchangeFormat, proxyMessageTypes } from "./iframeWsProxy";
import { log, logDebug, logInfo, logWarn, logError } from "../logging"
import { DECODE_TXT, ENCODE_TXT } from "../consts";

const openHttpConnections: { [key: string]: Promise<Response> } = {}
const openWebsocketConnections: { [key: string]: WebSocket } = {}

let sendProxyMessageCallback: (rawMsg: ArrayBufferLike) => void;
export function setSendProxyMessageCallback(callback: (data: ArrayBufferLike) => void) {
    sendProxyMessageCallback = callback;
}

function openWebsocket(url: string) {
    if (openWebsocketConnections[url]) return openWebsocketConnections[url];
    const ws = openWebsocketConnections[url] = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.addEventListener('message', (ev) => {
        let data = typeof ev.data === typeof '' ? ENCODE_TXT(ev.data) : ev.data;
        const binary = new Uint8Array(data)
        if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify({
            type: proxyMessageTypes.socketMsg,
            body: new Array(...binary),
            url: url,
        } as proxyInterchangeFormat)))
    })
    ws.addEventListener('error', (ev) => {
        logWarn('ws err ' + url, ev)
    })
    ws.addEventListener('close', (ev) => {
        logWarn('ws close ' + url, ev)
    })
    return ws;
}

function sendWebsocketMsg(url: string, data: ArrayBufferLike) {
    let ws = openWebsocketConnections[url];
    if (!ws) ws = openWebsocket(url)
    if (ws.readyState !== WebSocket.OPEN) {
        log("osending", DECODE_TXT(data), ws.readyState, WebSocket.OPEN)
        ws.addEventListener('open', () => ws.send(data))
    } else {
        log("sending")
        ws.send(data);
    }
}

function sendHttpRequest(url: string, fetchOptions: object) {
    if (openHttpConnections[url] != undefined) return;
    const f = openHttpConnections[url] = fetch(url, fetchOptions);
    f.then(async (result) => {
        log("fetch result", result)
        let body = new Uint8Array(await result.arrayBuffer())
        if (sendProxyMessageCallback) sendProxyMessageCallback(ENCODE_TXT(JSON.stringify({
            type: proxyMessageTypes.outgoingHttpReq,
            result: result,
            body: new Array(...body),
            url: url,
        } as proxyInterchangeFormat)))
    }).catch((err) => {
        log("fetch err", err)
    });
}

export function receiveProxiedMsg(rawMsg: ArrayBufferLike) {
    const proxiedMsg = JSON.parse(DECODE_TXT(rawMsg)) as proxyInterchangeFormat;
    log("Received Proxy Message", proxiedMsg)
    if (proxiedMsg.type === proxyMessageTypes.openWebsocket) {
        openWebsocket(proxiedMsg.url)
    } else if (proxiedMsg.type === proxyMessageTypes.socketMsg) {
        sendWebsocketMsg(proxiedMsg.url, new Uint8Array(proxiedMsg.body))
    } else if (proxiedMsg.type === proxyMessageTypes.incomingHttpReq) {
        sendHttpRequest(proxiedMsg.url, JSON.parse(DECODE_TXT(new Uint8Array(proxiedMsg.body))))
    }
}
