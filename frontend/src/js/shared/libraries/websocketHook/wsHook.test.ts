import hookWebsockets from "./wsHook";

function waitfor(millisec) {
    return new Promise(resolve => setTimeout(() => { resolve('') }, millisec))
}

/**
 * Test the functions of the wsHook library
 */
export function testWsHook() {

    // !important!  hookWebsockets() must be called before any websockets are created (EG: new Websocket(url))
    const wsHook = hookWebsockets();

    async function testTriggers(wsObject: WebSocket) {
        await waitfor(1000);
        log("Triggering Open")
        wsHook.triggerOnOpen(wsObject);
        await waitfor(1000);
        log("Triggering MSG")
        wsHook.triggerOnMessage(wsObject, new Uint8Array([1, 2, 3, 5, 7, 13, 20]));
        await waitfor(1000);
        log("Triggering ERR")
        wsHook.triggerOnError(wsObject);
        await waitfor(1000);
        log("Triggering Close")
        wsHook.triggerOnClose(wsObject);
    }

    wsHook.allowNewSocket = (url) => {
        return false;
    };
    wsHook.modifyUrl = (url: string | URL) => {
        log("modifyUrl: ", url)
        return url
    };
    wsHook.afterInit = (wsObject) => {
        testTriggers(wsObject).then()
        return wsObject;
    };
    wsHook.beforeOpen = (ev, url, wsObject) => {
        log("intercepted open: ", url, ev)
        return null;
    };
    wsHook.beforeError = (ev, url, wsObject) => {
        log("intercepted err: ", url, ev)
        return null;
    };
    wsHook.beforeClose = (ev, url, wsObject) => {
        log("intercepted close: ", url, ev)
        return null;
    };
    wsHook.beforeSend = (data, url, wsObject) => {
        log("intercepted send: ", url, data)
        return null;
    };
    wsHook.afterRecive = (ev, url, wsObject) => {
        log("intercepted Recive: ", url, ev)
        return ev;
    };

    let a = new WebSocket("ws://example.com")
    a.onopen = (e) => { log("open", e) }
    a.onmessage = (e) => { log("mesage", e) }
    a.onclose = (e) => { log("close", e) }
    a.onerror = (e) => { log("error", e) }

    // a.addEventListener("open", (e) => { log("open", e) })
    // a.addEventListener("error", (e) => { log("errror", e) })
    // a.addEventListener("message", (e) => { log("msg", e) })
    // a.addEventListener("close", (e) => { log("msg", e) })
    // a.onmessage = (e) => { log("mesage", e) }
    // a.onclose = (e) => { log("close", e) }
    // a.onerror = (e) => { log("error", e) }
    a.send("hi");

}
