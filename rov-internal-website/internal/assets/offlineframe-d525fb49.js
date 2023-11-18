import{g as d,E as f}from"./consts-49c45d49.js";var i=(e=>(e[e.openWebsocket=0]="openWebsocket",e[e.socketMsg=1]="socketMsg",e[e.outgoingHttpReq=2]="outgoingHttpReq",e[e.incomingHttpReq=3]="incomingHttpReq",e))(i||{});const g={},a={};let s;function w(e){s=e}function b(e){if(a[e])return a[e];const t=a[e]=new WebSocket(e);return t.binaryType="arraybuffer",t.addEventListener("message",n=>{let o=typeof n.data=="string"?f(n.data):n.data;const r=new Uint8Array(o);s&&s(f(JSON.stringify({type:i.socketMsg,body:new Array(...r),url:e})))}),t.addEventListener("error",n=>{console.warn("ws err "+e,n)}),t.addEventListener("close",n=>{console.warn("ws close "+e,n)}),t}function p(e,t){let n=a[e];n||(n=b(e)),n.readyState!==WebSocket.OPEN?(console.log("osending",d(t),n.readyState,WebSocket.OPEN),n.addEventListener("open",()=>n.send(t))):(console.log("sending"),n.send(t))}function y(e,t){if(g[e]!=null)return;(g[e]=fetch(e,t)).then(async o=>{console.log("fetch result",o);let r=new Uint8Array(await o.arrayBuffer());s&&s(f(JSON.stringify({type:i.outgoingHttpReq,result:o,body:new Array(...r),url:e})))}).catch(o=>{console.log("fetch err",o)})}function k(e){const t=JSON.parse(d(e));console.log("Received Proxy Message",t),t.type===i.openWebsocket?b(t.url):t.type===i.socketMsg?p(t.url,new Uint8Array(t.body)):t.type===i.incomingHttpReq&&y(t.url,JSON.parse(d(new Uint8Array(t.body))))}const c=document.createElement("iframe"),l=window.location.protocol.replace(":","")+"://"+window.location.host;c.src=l+"/frontend/index.html";c.setAttribute("sandbox","allow-scripts");c.onload=()=>{console.info("iframe loaded")};document.body.appendChild(c);w(e=>{c.contentWindow.postMessage(e,l)});window.addEventListener("message",e=>{e.origin===l&&(console.log("Got message",e.data),k(e.data))});
//# sourceMappingURL=offlineframe-d525fb49.js.map
