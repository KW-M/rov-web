import { DECODE_TXT, ENCODE_TXT } from "../../shared/js/consts";
import { proxyMessageTypes } from "../../shared/js/iframeWsProxy/iframeWsProxy";
import { setSendProxyMessageCallback } from "../../shared/js/iframeWsProxy/iframeWsProxyReceiver";
import { waitfor } from "../../shared/js/util";

setSendProxyMessageCallback((data) => {
    console.log("Sending Msg Through proxy. JK! ", DECODE_TXT(data));
})
let msg = JSON.stringify({
    url: 'http://wow.com',
    body: new Array(...ENCODE_TXT("ALL")),
    type: proxyMessageTypes.socketMsg
})
console.log("smg", msg)
await waitfor(5000);

msg = JSON.stringify({
    url: 'http://wow.com',
    body: new Array(...ENCODE_TXT("BO")),
    type: proxyMessageTypes.socketMsg
})
console.log("smg", msg)
