import{D as d,E as f}from"./consts-b81d311f.js";import{p as s}from"./iframeWsProxy-d634e15c.js";const l={},r={};let a;function g(e){a=e}function p(e){if(r[e])return r[e];const o=r[e]=new WebSocket(e);return o.binaryType="arraybuffer",o.addEventListener("message",n=>{let t=typeof n.data=="string"?f(n.data):n.data;const c=new Uint8Array(t);a&&a(f(JSON.stringify({type:s.socketMsg,body:new Array(...c),url:e})))}),o.addEventListener("error",n=>{console.warn("ws err "+e,n)}),o.addEventListener("close",n=>{console.warn("ws close "+e,n)}),o}function w(e,o){let n=r[e];n||(n=p(e)),n.readyState!==WebSocket.OPEN?(console.log("osending",d(o),n.readyState,WebSocket.OPEN),n.addEventListener("open",()=>n.send(o))):(console.log("sending"),n.send(o))}function b(e,o){if(l[e]!=null)return;(l[e]=fetch(e,o)).then(async t=>{console.log("fetch result",t);let c=new Uint8Array(await t.arrayBuffer());a&&a(f(JSON.stringify({type:s.outgoingHttpReq,result:t,body:new Array(...c),url:e})))}).catch(t=>{console.log("fetch err",t)})}function m(e){const o=JSON.parse(d(e));console.log("Received Proxy Message",o),o.type===s.openWebsocket?p(o.url):o.type===s.socketMsg?w(o.url,new Uint8Array(o.body)):o.type===s.incomingHttpReq&&b(o.url,JSON.parse(d(new Uint8Array(o.body))))}const i=document.createElement("iframe"),y=window.location.protocol.replace(":","")+"://"+window.location.host;i.src=y+"/frontend/index.html";i.setAttribute("sandbox","allow-scripts");i.onload=()=>{console.info("iframe loaded")};document.body.appendChild(i);g(e=>{i.contentWindow.postMessage(e,y)});window.addEventListener("message",e=>{e.origin===y&&(console.log("Got message",e.data),m(e.data))});
//# sourceMappingURL=index-57e0f627.js.map
