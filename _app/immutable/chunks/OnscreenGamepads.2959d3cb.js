var Nf=Object.defineProperty;var Uf=(i,e,t)=>e in i?Nf(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var oe=(i,e,t)=>(Uf(i,typeof e!="symbol"?e+"":e,t),t);import{w as Ou}from"./index.3ee1224b.js";import{T as Si,a0 as Bu,u as Ff,a1 as Mc,_ as Ec,s as Zn,e as Sc,i as Rn,d as ct,O as Of,z as Bf,f as di,l as kf,a as fr,g as fi,h as Wt,m as zf,c as pr,j as Ft,D as fn,n as Vf,w as ku,B as Ct,P as zs,H as Mi,Q as Vs,G as Ei,R as an,x as xe,r as Kt,y as Gs,S as on,C as Hs,F as ye,o as zu,p as Vu,L as Qs,V as Gf}from"./scheduler.b49bd52b.js";import{e as bc,g as Ws}from"./RadioSelectGrid.1c44be4f.js";import{S as Qn,i as Jn,a as to,g as Hf,c as Wf,t as Tc,k as Ca}from"./index.eaa2bd3e.js";import{l as ut,a as It,n as Xt,R as lt,T as Xf,C as at,p as qf,q as ti,P as Kf,M as wc,r as Yf,u as vi,b as Wi,v as Gu,w as pn,U as Pt,x as jf,y as Ci,z as Mn,S as Zf,A as ni,B as Cc,D as Qf,F as Rc,G as Lc,H as Jf,I as $f,O as _a,J as Ic,K as Pc,N as cn,Q as Js,h as ep,t as An,W as tp,X as np,Y as va,Z as ip,_ as sp,$ as no}from"./popup.51566690.js";import{u as rp,o as ap,l as op,p as Hu,q as lp,d as cp,r as hp,w as up,v as dp,x as fp,y as pp,s as st,T as rt,n as mp,z as gp}from"./vehicleStats.c70bc62b.js";const Wu="drawerStore";function DE(){const i=Si(Wu);if(!i)throw new Error("drawerStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return i}function NE(){const i=_p();return Bu(Wu,i)}function _p(){const{subscribe:i,set:e,update:t}=Ou({});return{subscribe:i,set:e,update:t,open:n=>t(()=>({open:!0,...n})),close:()=>t(n=>(n.open=!1,n))}}const Xu="modalStore";function vp(){const i=Si(Xu);if(!i)throw new Error("modalStore is not initialized. Please ensure that `initializeStores()` is invoked in the root layout file of this app!");return i}function UE(){const i=xp();return Bu(Xu,i)}function xp(){const{subscribe:i,set:e,update:t}=Ou([]);return{subscribe:i,set:e,update:t,trigger:n=>t(s=>(s.push(n),s)),close:()=>t(n=>(n.length>0&&n.shift(),n)),clear:()=>e([])}}function FE(i){return i*i*i}function qu(i){const e=i-1;return e*e*e+1}function Ra(i,{delay:e=0,duration:t=400,easing:n=Ff}={}){const s=+getComputedStyle(i).opacity;return{delay:e,duration:t,easing:n,css:r=>`opacity: ${r*s}`}}function OE(i,{delay:e=0,duration:t=400,easing:n=qu,x:s=0,y:r=0,opacity:a=0}={}){const o=getComputedStyle(i),l=+o.opacity,c=o.transform==="none"?"":o.transform,h=l*(1-a),[u,d]=Mc(s),[f,g]=Mc(r);return{delay:e,duration:t,easing:n,css:(_,m)=>`
			transform: ${c} translate(${(1-_)*u}${d}, ${(1-_)*f}${g});
			opacity: ${l-h*m}`}}function BE(i,{delay:e=0,duration:t=400,easing:n=qu,start:s=0,opacity:r=0}={}){const a=getComputedStyle(i),o=+a.opacity,l=a.transform==="none"?"":a.transform,c=1-s,h=o*(1-r);return{delay:e,duration:t,easing:n,css:(u,d)=>`
			transform: ${l} scale(${1-c*d});
			opacity: ${o-h*d}
		`}}function kE(i,e){const{transition:t,params:n,enabled:s}=e;return s?t(i,n):"duration"in n?t(i,{duration:0}):{duration:0}}let vr;const zE=()=>{vr=vp()};function Or(i,e,t){const n={type:"confirm",title:i,body:e,response:s=>{s&&t&&t()}};vr.trigger(n)}let Br=!1;function yp(i,e=""){return new Promise((t,n)=>{if(Br)return n("Password modal already open");Br=!0;const s={type:"prompt",title:i,body:e,valueAttr:{type:"text",placeholder:"password",required:!0},response:r=>{ut("modalPasswordPrompt response",r),Br=!1,t(r)}};try{vr.trigger(s)}catch(r){Br=!1,n(r)}})}function Ap(i,e,t){const n={type:"alert",title:i,body:e,response:s=>{t&&t(s)}};return vr.trigger(n),s=>{vr.update(r=>{let a=r.indexOf(n);return r[a].body=r[a].body+`
`+s,r})}}async function Mp(i,e){return await fetch(i+"/twirp/livekit.RoomService/ListRooms",{method:"POST",cache:"no-cache",mode:"cors",body:"{}",headers:{"Content-Type":"application/json",Authorization:"Bearer "+e}}).then(t=>t.json()).then(t=>{const n=t.rooms;if(!Array.isArray(n))throw new Error(`Error getting livekit room list from ${i} - ${JSON.stringify(t)}`);return n.filter(s=>s.num_participants>0)}).catch(t=>{throw new Error(`Error getting livekit room list from  - ${i}: ${t}`)})}function Ep(i,e="accessTokens"){try{const n=JSON.parse(i).accessTokens;if(!n||!Array.isArray(n)||n.length===0)return It("Failed to get tokens list from livekit room metadata"),null;{const s=n[Math.floor(Math.random()*1e5)%n.length],r=s.split("|");if(r.length===4){const[a,o,l,c]=r;return{encrypted:!0,salt:o,iv:l,token:c,userGivenIdentity:a}}else if(r.length===2){const a=s.split("|"),[o,l]=a;return{encrypted:!1,token:l,userGivenIdentity:o}}else return ut("Invalid auth token found in metadata: "+s),null}}catch(t){return It("Error parsing livekit room metadata: "+i,t),null}}function Ku(i){return new Promise(e=>{setTimeout(()=>{e()},i)})}function $s(i,e){let t=!1;return i.subscribe(s=>{if(t==!1){t=!0;return}e(s)})}function Sp(i,e){const t=i.subscribe(n=>{n&&setTimeout(()=>{t(),e(n)})});return t}function bp(i,e=!1){return i.replace("http","ws")}var Yu={exports:{}};const ju=i=>typeof i=="object"&&i!==null,Zu=Symbol("skip"),Dc=i=>ju(i)&&!(i instanceof RegExp)&&!(i instanceof Error)&&!(i instanceof Date),Wo=(i,e,t,n=new WeakMap)=>{if(t={deep:!1,target:{},...t},n.has(i))return n.get(i);n.set(i,t.target);const{target:s}=t;delete t.target;const r=a=>a.map(o=>Dc(o)?Wo(o,e,t,n):o);if(Array.isArray(i))return r(i);for(const[a,o]of Object.entries(i)){const l=e(a,o,i);if(l===Zu)continue;let[c,h,{shouldRecurse:u=!0}={}]=l;c!=="__proto__"&&(t.deep&&u&&Dc(h)&&(h=Array.isArray(h)?r(h):Wo(h,e,t,n)),s[c]=h)}return s};Yu.exports=(i,e,t)=>{if(!ju(i))throw new TypeError(`Expected an object, got \`${i}\` (${typeof i})`);return Wo(i,e,t)};Yu.exports.mapObjectSkip=Zu;var Qu={exports:{}};const Tp=/[\p{Lu}]/u,wp=/[\p{Ll}]/u,Nc=/^[\p{Lu}](?![\p{Lu}])/gu,Ju=/([\p{Alpha}\p{N}_]|$)/u,$u=/[_.\- ]+/,Cp=new RegExp("^"+$u.source),Uc=new RegExp($u.source+Ju.source,"gu"),Fc=new RegExp("\\d+"+Ju.source,"gu"),Rp=(i,e,t)=>{let n=!1,s=!1,r=!1;for(let a=0;a<i.length;a++){const o=i[a];n&&Tp.test(o)?(i=i.slice(0,a)+"-"+i.slice(a),n=!1,r=s,s=!0,a++):s&&r&&wp.test(o)?(i=i.slice(0,a-1)+"-"+i.slice(a-1),r=s,s=!1,n=!0):(n=e(o)===o&&t(o)!==o,r=s,s=t(o)===o&&e(o)!==o)}return i},Lp=(i,e)=>(Nc.lastIndex=0,i.replace(Nc,t=>e(t))),Ip=(i,e)=>(Uc.lastIndex=0,Fc.lastIndex=0,i.replace(Uc,(t,n)=>e(n)).replace(Fc,t=>e(t))),ed=(i,e)=>{if(!(typeof i=="string"||Array.isArray(i)))throw new TypeError("Expected the input to be `string | string[]`");if(e={pascalCase:!1,preserveConsecutiveUppercase:!1,...e},Array.isArray(i)?i=i.map(r=>r.trim()).filter(r=>r.length).join("-"):i=i.trim(),i.length===0)return"";const t=e.locale===!1?r=>r.toLowerCase():r=>r.toLocaleLowerCase(e.locale),n=e.locale===!1?r=>r.toUpperCase():r=>r.toLocaleUpperCase(e.locale);return i.length===1?e.pascalCase?n(i):t(i):(i!==t(i)&&(i=Rp(i,t,n)),i=i.replace(Cp,""),e.preserveConsecutiveUppercase?i=Lp(i,t):i=t(i),e.pascalCase&&(i=n(i.charAt(0))+i.slice(1)),Ip(i,n))};Qu.exports=ed;Qu.exports.default=ed;class Pp{constructor(e={}){if(!(e.maxSize&&e.maxSize>0))throw new TypeError("`maxSize` must be a number greater than 0");this.maxSize=e.maxSize,this.onEviction=e.onEviction,this.cache=new Map,this.oldCache=new Map,this._size=0}_set(e,t){if(this.cache.set(e,t),this._size++,this._size>=this.maxSize){if(this._size=0,typeof this.onEviction=="function")for(const[n,s]of this.oldCache.entries())this.onEviction(n,s);this.oldCache=this.cache,this.cache=new Map}}get(e){if(this.cache.has(e))return this.cache.get(e);if(this.oldCache.has(e)){const t=this.oldCache.get(e);return this.oldCache.delete(e),this._set(e,t),t}}set(e,t){return this.cache.has(e)?this.cache.set(e,t):this._set(e,t),this}has(e){return this.cache.has(e)||this.oldCache.has(e)}peek(e){if(this.cache.has(e))return this.cache.get(e);if(this.oldCache.has(e))return this.oldCache.get(e)}delete(e){const t=this.cache.delete(e);return t&&this._size--,this.oldCache.delete(e)||t}clear(){this.cache.clear(),this.oldCache.clear(),this._size=0}*keys(){for(const[e]of this)yield e}*values(){for(const[,e]of this)yield e}*[Symbol.iterator](){for(const e of this.cache)yield e;for(const e of this.oldCache){const[t]=e;this.cache.has(t)||(yield e)}}get size(){let e=0;for(const t of this.oldCache.keys())this.cache.has(t)||e++;return Math.min(this._size+e,this.maxSize)}}var Dp=Pp;const Np=Dp;new Np({maxSize:1e5});const Mt=ut;class Up{constructor(){oe(this,"config");oe(this,"lastMsgRecivedTimestamp");oe(this,"connectionState");oe(this,"latestRecivedDataMessage");oe(this,"participantConnectionEvents");oe(this,"_rovRoomName");oe(this,"_accessToken");oe(this,"_reconnectAttemptCount",0);oe(this,"_shouldReconnect");oe(this,"_roomConn");this.config={},this._shouldReconnect=!0,this.connectionState=Xt(at.init),this.latestRecivedDataMessage=Xt(null),this.participantConnectionEvents=Xt(null)}async init(e){this.config=e,this._shouldReconnect=!0,this._roomConn=new qf(e.roomConfig),this._roomConn.on(lt.DCBufferStatusChanged,t=>{Mt("LK: DCBufferStatusChanged ",t)}).on(lt.SignalConnected,async()=>{Mt(`LK: Signal connection established to ${this.config.hostUrl}`)}).on(lt.Connected,async()=>{Mt(`LK: Connected to room: ${this._roomConn.name} via ${this.config.hostUrl}`),this.connectionState.set(at.connected)}).on(lt.Disconnected,t=>{this.connectionState.set(at.disconnectedOk);let n=this._shouldReconnect&&!!this._roomConn;t===ti.DUPLICATE_IDENTITY?(It("LK: disconnected from room - duplicate identity"),n=!1):t===ti.CLIENT_INITIATED?(ut("LK: disconnected from room - client initiated"),n=!1):t===ti.SERVER_SHUTDOWN?(ut("LK: disconnected from room - server shutdown"),n=!1):t===ti.PARTICIPANT_REMOVED?(ut("LK: disconnected from room - participant removed"),n=!1):t===ti.ROOM_DELETED?(ut("LK: disconnected from room - room deleted"),n=!1):t===ti.STATE_MISMATCH?(ut("LK: disconnected from room - state mismatch"),n=!1):t===ti.JOIN_FAILURE?ut("LK: disconnected from room - join failure"):t===ti.UNKNOWN_REASON&&ut("LK: disconnected from room - unknown reason"),n?this._reconnect():this.close()}).on(lt.Reconnecting,()=>{Mt(`LK: Reconnecting to room ${this._roomConn.name} via ${this.config.hostUrl}`),this.connectionState.set(at.reconnecting)}).on(lt.Reconnected,async()=>{Mt("LK: Successfully reconnected. server",await this._roomConn.engine.getConnectedServerAddress()),this.connectionState.set(at.connected)}).on(lt.ParticipantMetadataChanged,t=>{Mt("LK: Participant Metadata Changed",t)}).on(lt.ParticipantConnected,async t=>{Mt(`LK: Participant ${t.identity} (${t.sid}) connected`,t.metadata),this.participantConnectionEvents.set({id:t.identity,joined:!0}),t.on(Kf.ConnectionQualityChanged,()=>{Mt("LK: ParticipantEvent.ConnectionQualityChanged",t.connectionQuality)})}).on(lt.ParticipantDisconnected,t=>{Mt(`LK: Participant ${t.identity} (${t.sid}) disconnected`),this.participantConnectionEvents.set({id:t.identity,joined:!1})}).on(lt.MediaDevicesError,t=>{const n=wc.getFailure(t);Mt("LK: Media device failure",n)}).on(lt.ConnectionQualityChanged,(t,n)=>{Mt(`LK: connection quality for ${n?n.identity:"[no identity]"} changed to ${t}`)}).on(lt.RoomMetadataChanged,t=>{try{Mt("LK: New metadata for room",JSON.parse(t))}catch{Mt("LK: New metadata for room (NOT VALID JSON)",t)}}).on(lt.MediaDevicesChanged,()=>{Mt("LK: MediaDevicesChanged")}).on(lt.LocalTrackUnpublished,(t,n)=>{Mt("LK: LocalTrackUnpublished",t.trackSid,"by participant",n.identity,"source",t.track?t.track.source:"[no track found]")}).on(lt.LocalTrackPublished,(t,n)=>{Mt("LK: LocalVideoTrackPublished",t.trackSid,"by participant",n.identity,"source",t.track?t.track.source:"[no track found]")}).on(lt.MediaDevicesError,t=>{const n=wc.getFailure(t);Mt("LK: media device failure",n)}).on(lt.AudioPlaybackStatusChanged,()=>{Mt("LK: AudioPlaybackStatusChanged. canPlaybackAudio =",this._roomConn.canPlaybackAudio)})}async start(e,t){this._rovRoomName=e,this._accessToken=t,this._shouldReconnect=!0;const n=Date.now();ut(`LK: Starting conn with ${e} via ${this.config.hostUrl} token = ${t}`);try{const s=setTimeout(()=>{ut(`livekit connect timeout for ${this.config.hostUrl}. Reconnecting...`),this._reconnect()},16e3);await this._connect(),clearTimeout(s),ut(`LK: Connected in ${Date.now()-n}ms ${this.config.hostUrl}`)}catch(s){ut(`LK: Error connecting to ${this.config.hostUrl}. Reconnecting...`,s),this._reconnect()}}async sendMessage(e,t=!0,n=[]){if(!this._roomConn||this._roomConn.state!==Yf.Connected||this.connectionState.get()!=at.connected)return It("LK: Can't send message, room not connected");n.length==0&&(n=[...this._roomConn.remoteParticipants.values()].map(r=>r.identity)),n.map(r=>{const a=this.getParticipantSid(r);return a||It("LK: SendMessge: No participant found for livekit identity: ",r),a||null}).filter(r=>r!=null).length!=0&&await this._roomConn.localParticipant.publishData(e,{reliable:t,destinationIdentities:n})}getParticipantSid(e){const t=[...this._roomConn.remoteParticipants.values()].find(n=>n.identity===e);return t?t.sid:null}getLivekitIdentitiy(){return this._roomConn?this._roomConn.localParticipant.identity:null}getRoomName(){return this._roomConn?this._roomConn.name:this._rovRoomName}async close(){this._shouldReconnect=!1,this._roomConn&&(vi("LK: Closing Livekit Connection: ",this._rovRoomName,this.config.hostUrl),await this._roomConn.disconnect(!0))}async _connect(){await this._roomConn.connect(bp(this.config.hostUrl),this._accessToken,this.config.roomConnectionConfig),vi("LK: Connected to room",this._roomConn.name,this._roomConn)}async _reconnect(){try{await this._roomConn.disconnect(!0)}catch(e){Wi("LK: Error disconnecting from room",e)}if(this._shouldReconnect!=!1)if(this._reconnectAttemptCount<this.config.reconnectAttempts){const e=this._reconnectAttemptCount*800;this._reconnectAttemptCount++,await Ku(e);try{await this._connect()}catch(t){throw Wi("LK: Error reconnecting to room",t),t}}else Wi("LK: Failed to reconnect after ",this._reconnectAttemptCount,"/",this.config.reconnectAttempts,"attempts"),this._fail()}_fail(){this._shouldReconnect=!1,this.connectionState.set(at.failed)}}class Fp extends Up{constructor(){super();oe(this,"remoteVideoTracks");this.remoteVideoTracks=Xt(new Map)}subscribeToTracks(t){this._rovRoomName===t.identity&&t.trackPublications.forEach(n=>{n.setSubscribed(!0)})}async init(t){await super.init(t),this._roomConn.on(lt.DataReceived,async(n,s)=>{if(!s)return It("LK: Ignoring received data message with no participant. This can happen when the message is sent before connection completes or if the message comes from the server: ",n);if(s.identity!==this._rovRoomName)return;const r=s.identity;s.sid,this.lastMsgRecivedTimestamp=Date.now(),this.latestRecivedDataMessage.set({senderId:r,msg:n})}).on(lt.Connected,()=>{const n=this._roomConn.remoteParticipants.get(this._rovRoomName);n&&this.subscribeToTracks(n)}).on(lt.ParticipantConnected,n=>{n.identity===this._rovRoomName&&(console.log("LK: ROV Participant connected: ",n.identity),this.subscribeToTracks(n))}).on(lt.ParticipantDisconnected,n=>{n.identity===this._rovRoomName&&console.log("LK: ROV Participant disconnected: ",n.identity)}).on(lt.TrackPublished,(n,s)=>{s.identity===this._rovRoomName&&(console.log("LK: ROV Participant track published: ",s.identity,n.kind,n.trackSid),this.subscribeToTracks(s))}).on(lt.TrackSubscribed,(n,s,r)=>{var o;if(n.kind!==Xf.Kind.Video)return It("LK: Subscribed to unknown track kind: ",n.kind,n.source);const a=this.remoteVideoTracks.get();if(a.has(n.source)){if(a.get(n.source)==n)return;It("LK: already subscribed to video track "+n.source+", unsubscribing from old track"),(o=a.get(n.source))==null||o.stop()}Mt("LK: subscribed to video",n.source),a.set(n.source,n),this.remoteVideoTracks.set(a),n.on("upstreamPaused",()=>{ut("LK: video upstream paused")}),n.on("muted",()=>{ut("LK: video muted")}),n.on("ended",()=>{ut("LK: video ended")})}).on(lt.TrackUnsubscribed,(n,s,r)=>{ut("LK: Unsubscribed from track",s.source,s.trackSid," from participant: ",r.identity),this.remoteVideoTracks.update(a=>(a.delete(s.source),a))})}}var Xo={exports:{}},io,Oc;function Op(){if(Oc)return io;Oc=1;var i=1e3,e=i*60,t=e*60,n=t*24,s=n*7,r=n*365.25;io=function(h,u){u=u||{};var d=typeof h;if(d==="string"&&h.length>0)return a(h);if(d==="number"&&isFinite(h))return u.long?l(h):o(h);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(h))};function a(h){if(h=String(h),!(h.length>100)){var u=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(h);if(u){var d=parseFloat(u[1]),f=(u[2]||"ms").toLowerCase();switch(f){case"years":case"year":case"yrs":case"yr":case"y":return d*r;case"weeks":case"week":case"w":return d*s;case"days":case"day":case"d":return d*n;case"hours":case"hour":case"hrs":case"hr":case"h":return d*t;case"minutes":case"minute":case"mins":case"min":case"m":return d*e;case"seconds":case"second":case"secs":case"sec":case"s":return d*i;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return d;default:return}}}}function o(h){var u=Math.abs(h);return u>=n?Math.round(h/n)+"d":u>=t?Math.round(h/t)+"h":u>=e?Math.round(h/e)+"m":u>=i?Math.round(h/i)+"s":h+"ms"}function l(h){var u=Math.abs(h);return u>=n?c(h,u,n,"day"):u>=t?c(h,u,t,"hour"):u>=e?c(h,u,e,"minute"):u>=i?c(h,u,i,"second"):h+" ms"}function c(h,u,d,f){var g=u>=d*1.5;return Math.round(h/d)+" "+f+(g?"s":"")}return io}function Bp(i){t.debug=t,t.default=t,t.coerce=l,t.disable=r,t.enable=s,t.enabled=a,t.humanize=Op(),t.destroy=c,Object.keys(i).forEach(h=>{t[h]=i[h]}),t.names=[],t.skips=[],t.formatters={};function e(h){let u=0;for(let d=0;d<h.length;d++)u=(u<<5)-u+h.charCodeAt(d),u|=0;return t.colors[Math.abs(u)%t.colors.length]}t.selectColor=e;function t(h){let u,d=null,f,g;function _(...m){if(!_.enabled)return;const p=_,b=Number(new Date),M=b-(u||b);p.diff=M,p.prev=u,p.curr=b,u=b,m[0]=t.coerce(m[0]),typeof m[0]!="string"&&m.unshift("%O");let S=0;m[0]=m[0].replace(/%([a-zA-Z%])/g,(w,C)=>{if(w==="%%")return"%";S++;const U=t.formatters[C];if(typeof U=="function"){const E=m[S];w=U.call(p,E),m.splice(S,1),S--}return w}),t.formatArgs.call(p,m),(p.log||t.log).apply(p,m)}return _.namespace=h,_.useColors=t.useColors(),_.color=t.selectColor(h),_.extend=n,_.destroy=t.destroy,Object.defineProperty(_,"enabled",{enumerable:!0,configurable:!1,get:()=>d!==null?d:(f!==t.namespaces&&(f=t.namespaces,g=t.enabled(h)),g),set:m=>{d=m}}),typeof t.init=="function"&&t.init(_),_}function n(h,u){const d=t(this.namespace+(typeof u>"u"?":":u)+h);return d.log=this.log,d}function s(h){t.save(h),t.namespaces=h,t.names=[],t.skips=[];let u;const d=(typeof h=="string"?h:"").split(/[\s,]+/),f=d.length;for(u=0;u<f;u++)d[u]&&(h=d[u].replace(/\*/g,".*?"),h[0]==="-"?t.skips.push(new RegExp("^"+h.slice(1)+"$")):t.names.push(new RegExp("^"+h+"$")))}function r(){const h=[...t.names.map(o),...t.skips.map(o).map(u=>"-"+u)].join(",");return t.enable(""),h}function a(h){if(h[h.length-1]==="*")return!0;let u,d;for(u=0,d=t.skips.length;u<d;u++)if(t.skips[u].test(h))return!1;for(u=0,d=t.names.length;u<d;u++)if(t.names[u].test(h))return!0;return!1}function o(h){return h.toString().substring(2,h.toString().length-2).replace(/\.\*\?$/,"*")}function l(h){return h instanceof Error?h.stack||h.message:h}function c(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")}return t.enable(t.load()),t}var kp=Bp;(function(i,e){e.formatArgs=n,e.save=s,e.load=r,e.useColors=t,e.storage=a(),e.destroy=(()=>{let l=!1;return()=>{l||(l=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),e.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"];function t(){if(typeof window<"u"&&window.process&&(window.process.type==="renderer"||window.process.__nwjs))return!0;if(typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1;let l;return typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&(l=navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/))&&parseInt(l[1],10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}function n(l){if(l[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+l[0]+(this.useColors?"%c ":" ")+"+"+i.exports.humanize(this.diff),!this.useColors)return;const c="color: "+this.color;l.splice(1,0,c,"color: inherit");let h=0,u=0;l[0].replace(/%[a-zA-Z%]/g,d=>{d!=="%%"&&(h++,d==="%c"&&(u=h))}),l.splice(u,0,c)}e.log=console.debug||console.log||(()=>{});function s(l){try{l?e.storage.setItem("debug",l):e.storage.removeItem("debug")}catch{}}function r(){let l;try{l=e.storage.getItem("debug")}catch{}return!l&&typeof Ec.process<"u"&&"env"in Ec.process&&(l={}.DEBUG),l}function a(){try{return localStorage}catch{}}i.exports=kp(e);const{formatters:o}=i.exports;o.j=function(l){try{return JSON.stringify(l)}catch(c){return"[UnexpectedJSONParseError]: "+c.message}}})(Xo,Xo.exports);var zp=Xo.exports;const Vp=Gu(zp),Xn=typeof window<"u"?window:self,qo=Xn.RTCPeerConnection||Xn.mozRTCPeerConnection||Xn.webkitRTCPeerConnection,Gp=Xn.RTCSessionDescription||Xn.mozRTCSessionDescription||Xn.webkitRTCSessionDescription,Hp=Xn.RTCIceCandidate||Xn.mozRTCIceCandidate||Xn.webkitRTCIceCandidate;var Fl={exports:{}},ys=typeof Reflect=="object"?Reflect:null,Bc=ys&&typeof ys.apply=="function"?ys.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)},xa;ys&&typeof ys.ownKeys=="function"?xa=ys.ownKeys:Object.getOwnPropertySymbols?xa=function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:xa=function(e){return Object.getOwnPropertyNames(e)};function Wp(i){console&&console.warn&&console.warn(i)}var td=Number.isNaN||function(e){return e!==e};function it(){it.init.call(this)}Fl.exports=it;Fl.exports.once=Yp;it.EventEmitter=it;it.prototype._events=void 0;it.prototype._eventsCount=0;it.prototype._maxListeners=void 0;var kc=10;function za(i){if(typeof i!="function")throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof i)}Object.defineProperty(it,"defaultMaxListeners",{enumerable:!0,get:function(){return kc},set:function(i){if(typeof i!="number"||i<0||td(i))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+i+".");kc=i}});it.init=function(){(this._events===void 0||this._events===Object.getPrototypeOf(this)._events)&&(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0};it.prototype.setMaxListeners=function(e){if(typeof e!="number"||e<0||td(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this};function nd(i){return i._maxListeners===void 0?it.defaultMaxListeners:i._maxListeners}it.prototype.getMaxListeners=function(){return nd(this)};it.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var s=e==="error",r=this._events;if(r!==void 0)s=s&&r.error===void 0;else if(!s)return!1;if(s){var a;if(t.length>0&&(a=t[0]),a instanceof Error)throw a;var o=new Error("Unhandled error."+(a?" ("+a.message+")":""));throw o.context=a,o}var l=r[e];if(l===void 0)return!1;if(typeof l=="function")Bc(l,this,t);else for(var c=l.length,h=od(l,c),n=0;n<c;++n)Bc(h[n],this,t);return!0};function id(i,e,t,n){var s,r,a;if(za(t),r=i._events,r===void 0?(r=i._events=Object.create(null),i._eventsCount=0):(r.newListener!==void 0&&(i.emit("newListener",e,t.listener?t.listener:t),r=i._events),a=r[e]),a===void 0)a=r[e]=t,++i._eventsCount;else if(typeof a=="function"?a=r[e]=n?[t,a]:[a,t]:n?a.unshift(t):a.push(t),s=nd(i),s>0&&a.length>s&&!a.warned){a.warned=!0;var o=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit");o.name="MaxListenersExceededWarning",o.emitter=i,o.type=e,o.count=a.length,Wp(o)}return i}it.prototype.addListener=function(e,t){return id(this,e,t,!1)};it.prototype.on=it.prototype.addListener;it.prototype.prependListener=function(e,t){return id(this,e,t,!0)};function Xp(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,arguments.length===0?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function sd(i,e,t){var n={fired:!1,wrapFn:void 0,target:i,type:e,listener:t},s=Xp.bind(n);return s.listener=t,n.wrapFn=s,s}it.prototype.once=function(e,t){return za(t),this.on(e,sd(this,e,t)),this};it.prototype.prependOnceListener=function(e,t){return za(t),this.prependListener(e,sd(this,e,t)),this};it.prototype.removeListener=function(e,t){var n,s,r,a,o;if(za(t),s=this._events,s===void 0)return this;if(n=s[e],n===void 0)return this;if(n===t||n.listener===t)--this._eventsCount===0?this._events=Object.create(null):(delete s[e],s.removeListener&&this.emit("removeListener",e,n.listener||t));else if(typeof n!="function"){for(r=-1,a=n.length-1;a>=0;a--)if(n[a]===t||n[a].listener===t){o=n[a].listener,r=a;break}if(r<0)return this;r===0?n.shift():qp(n,r),n.length===1&&(s[e]=n[0]),s.removeListener!==void 0&&this.emit("removeListener",e,o||t)}return this};it.prototype.off=it.prototype.removeListener;it.prototype.removeAllListeners=function(e){var t,n,s;if(n=this._events,n===void 0)return this;if(n.removeListener===void 0)return arguments.length===0?(this._events=Object.create(null),this._eventsCount=0):n[e]!==void 0&&(--this._eventsCount===0?this._events=Object.create(null):delete n[e]),this;if(arguments.length===0){var r=Object.keys(n),a;for(s=0;s<r.length;++s)a=r[s],a!=="removeListener"&&this.removeAllListeners(a);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(t=n[e],typeof t=="function")this.removeListener(e,t);else if(t!==void 0)for(s=t.length-1;s>=0;s--)this.removeListener(e,t[s]);return this};function rd(i,e,t){var n=i._events;if(n===void 0)return[];var s=n[e];return s===void 0?[]:typeof s=="function"?t?[s.listener||s]:[s]:t?Kp(s):od(s,s.length)}it.prototype.listeners=function(e){return rd(this,e,!0)};it.prototype.rawListeners=function(e){return rd(this,e,!1)};it.listenerCount=function(i,e){return typeof i.listenerCount=="function"?i.listenerCount(e):ad.call(i,e)};it.prototype.listenerCount=ad;function ad(i){var e=this._events;if(e!==void 0){var t=e[i];if(typeof t=="function")return 1;if(t!==void 0)return t.length}return 0}it.prototype.eventNames=function(){return this._eventsCount>0?xa(this._events):[]};function od(i,e){for(var t=new Array(e),n=0;n<e;++n)t[n]=i[n];return t}function qp(i,e){for(;e+1<i.length;e++)i[e]=i[e+1];i.pop()}function Kp(i){for(var e=new Array(i.length),t=0;t<e.length;++t)e[t]=i[t].listener||i[t];return e}function Yp(i,e){return new Promise(function(t,n){function s(a){i.removeListener(e,r),n(a)}function r(){typeof i.removeListener=="function"&&i.removeListener("error",s),t([].slice.call(arguments))}ld(i,e,r,{once:!0}),e!=="error"&&jp(i,s,{once:!0})})}function jp(i,e,t){typeof i.on=="function"&&ld(i,"error",e,t)}function ld(i,e,t,n){if(typeof i.on=="function")n.once?i.once(e,t):i.on(e,t);else if(typeof i.addEventListener=="function")i.addEventListener(e,function s(r){n.once&&i.removeEventListener(e,s),t(r)});else throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof i)}var Zp=Fl.exports,Qp=typeof queueMicrotask=="function"?queueMicrotask:i=>Promise.resolve().then(i),Jp=class{constructor(e){if(!(e>0)||e-1&e)throw new Error("Max size for a FixedFIFO should be a power of two");this.buffer=new Array(e),this.mask=e-1,this.top=0,this.btm=0,this.next=null}clear(){this.top=this.btm=0,this.next=null,this.buffer.fill(void 0)}push(e){return this.buffer[this.top]!==void 0?!1:(this.buffer[this.top]=e,this.top=this.top+1&this.mask,!0)}shift(){const e=this.buffer[this.btm];if(e!==void 0)return this.buffer[this.btm]=void 0,this.btm=this.btm+1&this.mask,e}peek(){return this.buffer[this.btm]}isEmpty(){return this.buffer[this.btm]===void 0}};const zc=Jp;var $p=class{constructor(e){this.hwm=e||16,this.head=new zc(this.hwm),this.tail=this.head,this.length=0}clear(){this.head=this.tail,this.head.clear(),this.length=0}push(e){if(this.length++,!this.head.push(e)){const t=this.head;this.head=t.next=new zc(2*this.head.buffer.length),this.head.push(e)}}shift(){this.length!==0&&this.length--;const e=this.tail.shift();if(e===void 0&&this.tail.next){const t=this.tail.next;return this.tail.next=null,this.tail=t,this.tail.shift()}return e}peek(){const e=this.tail.peek();return e===void 0&&this.tail.next?this.tail.next.peek():e}isEmpty(){return this.length===0}},cd=class{constructor(e){this.decoder=new TextDecoder(e==="utf16le"?"utf16-le":e)}decode(e){return this.decoder.decode(e,{stream:!0})}flush(){return this.decoder.decode(new Uint8Array(0))}};const em=cd,tm=cd;var nm=class{constructor(e="utf8"){switch(this.encoding=im(e),this.encoding){case"utf8":this.decoder=new tm;break;case"utf16le":case"base64":throw new Error("Unsupported encoding: "+this.encoding);default:this.decoder=new em(this.encoding)}}push(e){return typeof e=="string"?e:this.decoder.decode(e)}write(e){return this.push(e)}end(e){let t="";return e&&(t=this.push(e)),t+=this.decoder.flush(),t}};function im(i){switch(i=i.toLowerCase(),i){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return i;default:throw new Error("Unknown encoding: "+i)}}const{EventEmitter:sm}=Zp,Va=new Error("Stream was destroyed"),so=new Error("Premature close"),hd=Qp,ud=$p,rm=nm,ft=(1<<29)-1,Qi=1,Ol=2,Xi=4,xr=8,dd=ft^Qi,am=ft^Ol,Cr=16,yr=32,Xs=64,xi=128,Rr=256,Bl=512,qi=1024,Ko=2048,kl=4096,zl=8192,vn=16384,As=32768,Ga=65536,Ki=131072,fd=Rr|Bl,om=Cr|Ga,lm=Xs|Cr,cm=kl|xi,Vl=Rr|Ki,hm=ft^Cr,um=ft^Xs,dm=ft^(Xs|Ga),Vc=ft^Ga,fm=ft^Rr,pm=ft^(xi|zl),mm=ft^qi,Gc=ft^fd,pd=ft^As,gm=ft^yr,md=ft^Ki,_m=ft^Vl,bi=1<<18,Cs=2<<18,Lr=4<<18,Yi=8<<18,Ir=16<<18,Ji=32<<18,Yo=64<<18,Ms=128<<18,Gl=256<<18,Rs=512<<18,Ha=1024<<18,gd=ft^(bi|Gl),_d=ft^Lr,vm=ft^Rs,xm=ft^Ir,ym=ft^Yi,vd=ft^Ms,Am=ft^Cs,xd=ft^Ha,Ar=Cr|bi,yd=ft^Ar,Hl=vn|Ji,qn=Xi|xr|Ol,en=qn|Qi,Ad=qn|Hl,Mm=_d&um,Wl=Ms|As,Em=Wl&yd,Md=en|Em,Sm=en|qi|vn,Hc=en|vn|xi,bm=en|qi|xi,Tm=en|kl|xi|zl,wm=en|Cr|qi|vn|Ga|Ki,Cm=qn|qi|vn,Rm=yr|en|As|Xs,Lm=en|Rs|Ji,Im=Yi|Ir,Ed=Yi|bi,Pm=Yi|Ir|en|bi,Wc=en|bi|Yi|Ha,Dm=Lr|bi,Nm=bi|Gl,Um=en|Rs|Ed|Ji,Fm=Ir|qn|Rs|Ji,Om=Cs|en|Ms|Lr,kr=Symbol.asyncIterator||Symbol("asyncIterator");class Sd{constructor(e,{highWaterMark:t=16384,map:n=null,mapWritable:s,byteLength:r,byteLengthWritable:a}={}){this.stream=e,this.queue=new ud,this.highWaterMark=t,this.buffered=0,this.error=null,this.pipeline=null,this.drains=null,this.byteLength=a||r||Id,this.map=s||n,this.afterWrite=Hm.bind(this),this.afterUpdateNextTick=qm.bind(this)}get ended(){return(this.stream._duplexState&Ji)!==0}push(e){return this.map!==null&&(e=this.map(e)),this.buffered+=this.byteLength(e),this.queue.push(e),this.buffered<this.highWaterMark?(this.stream._duplexState|=Yi,!0):(this.stream._duplexState|=Im,!1)}shift(){const e=this.queue.shift();return this.buffered-=this.byteLength(e),this.buffered===0&&(this.stream._duplexState&=ym),e}end(e){typeof e=="function"?this.stream.once("finish",e):e!=null&&this.push(e),this.stream._duplexState=(this.stream._duplexState|Rs)&_d}autoBatch(e,t){const n=[],s=this.stream;for(n.push(e);(s._duplexState&Wc)===Ed;)n.push(s._writableState.shift());if(s._duplexState&en)return t(null);s._writev(n,t)}update(){const e=this.stream;e._duplexState|=Cs;do{for(;(e._duplexState&Wc)===Yi;){const t=this.shift();e._duplexState|=Nm,e._write(t,this.afterWrite)}e._duplexState&Dm||this.updateNonPrimary()}while(this.continueUpdate()===!0);e._duplexState&=Am}updateNonPrimary(){const e=this.stream;if((e._duplexState&Um)===Rs){e._duplexState=(e._duplexState|bi)&vm,e._final(Gm.bind(this));return}if((e._duplexState&qn)===Xi){e._duplexState&Wl||(e._duplexState|=Ar,e._destroy(bd.bind(this)));return}(e._duplexState&Md)===Qi&&(e._duplexState=(e._duplexState|Ar)&dd,e._open(Td.bind(this)))}continueUpdate(){return this.stream._duplexState&Ms?(this.stream._duplexState&=vd,!0):!1}updateCallback(){(this.stream._duplexState&Om)===Lr?this.update():this.updateNextTick()}updateNextTick(){this.stream._duplexState&Ms||(this.stream._duplexState|=Ms,this.stream._duplexState&Cs||hd(this.afterUpdateNextTick))}}class Bm{constructor(e,{highWaterMark:t=16384,map:n=null,mapReadable:s,byteLength:r,byteLengthReadable:a}={}){this.stream=e,this.queue=new ud,this.highWaterMark=t===0?1:t,this.buffered=0,this.readAhead=t>0,this.error=null,this.pipeline=null,this.byteLength=a||r||Id,this.map=s||n,this.pipeTo=null,this.afterRead=Wm.bind(this),this.afterUpdateNextTick=Xm.bind(this)}get ended(){return(this.stream._duplexState&vn)!==0}pipe(e,t){if(this.pipeTo!==null)throw new Error("Can only pipe to one destination");if(typeof t!="function"&&(t=null),this.stream._duplexState|=Bl,this.pipeTo=e,this.pipeline=new zm(this.stream,e,t),t&&this.stream.on("error",Xc),Er(e))e._writableState.pipeline=this.pipeline,t&&e.on("error",Xc),e.on("finish",this.pipeline.finished.bind(this.pipeline));else{const n=this.pipeline.done.bind(this.pipeline,e),s=this.pipeline.done.bind(this.pipeline,e,null);e.on("error",n),e.on("close",s),e.on("finish",this.pipeline.finished.bind(this.pipeline))}e.on("drain",Vm.bind(this)),this.stream.emit("piping",e),e.emit("pipe",this.stream)}push(e){const t=this.stream;return e===null?(this.highWaterMark=0,t._duplexState=(t._duplexState|qi)&dm,!1):this.map!==null&&(e=this.map(e),e===null)?(t._duplexState&=Vc,this.buffered<this.highWaterMark):(this.buffered+=this.byteLength(e),this.queue.push(e),t._duplexState=(t._duplexState|xi)&Vc,this.buffered<this.highWaterMark)}shift(){const e=this.queue.shift();return this.buffered-=this.byteLength(e),this.buffered===0&&(this.stream._duplexState&=pm),e}unshift(e){const t=[this.map!==null?this.map(e):e];for(;this.buffered>0;)t.push(this.shift());for(let n=0;n<t.length-1;n++){const s=t[n];this.buffered+=this.byteLength(s),this.queue.push(s)}this.push(t[t.length-1])}read(){const e=this.stream;if((e._duplexState&Hc)===xi){const t=this.shift();return this.pipeTo!==null&&this.pipeTo.write(t)===!1&&(e._duplexState&=Gc),e._duplexState&Ko&&e.emit("data",t),t}return this.readAhead===!1&&(e._duplexState|=Ki,this.updateNextTick()),null}drain(){const e=this.stream;for(;(e._duplexState&Hc)===xi&&e._duplexState&fd;){const t=this.shift();this.pipeTo!==null&&this.pipeTo.write(t)===!1&&(e._duplexState&=Gc),e._duplexState&Ko&&e.emit("data",t)}}update(){const e=this.stream;e._duplexState|=yr;do{for(this.drain();this.buffered<this.highWaterMark&&(e._duplexState&wm)===Ki;)e._duplexState|=om,e._read(this.afterRead),this.drain();(e._duplexState&Tm)===cm&&(e._duplexState|=zl,e.emit("readable")),e._duplexState&lm||this.updateNonPrimary()}while(this.continueUpdate()===!0);e._duplexState&=gm}updateNonPrimary(){const e=this.stream;if((e._duplexState&bm)===qi&&(e._duplexState=(e._duplexState|vn)&mm,e.emit("end"),(e._duplexState&Ad)===Hl&&(e._duplexState|=Xi),this.pipeTo!==null&&this.pipeTo.end()),(e._duplexState&qn)===Xi){e._duplexState&Wl||(e._duplexState|=Ar,e._destroy(bd.bind(this)));return}(e._duplexState&Md)===Qi&&(e._duplexState=(e._duplexState|Ar)&dd,e._open(Td.bind(this)))}continueUpdate(){return this.stream._duplexState&As?(this.stream._duplexState&=pd,!0):!1}updateCallback(){(this.stream._duplexState&Rm)===Xs?this.update():this.updateNextTick()}updateNextTick(){this.stream._duplexState&As||(this.stream._duplexState|=As,this.stream._duplexState&yr||hd(this.afterUpdateNextTick))}}class km{constructor(e){this.data=null,this.afterTransform=Ym.bind(e),this.afterFinal=null}}class zm{constructor(e,t,n){this.from=e,this.to=t,this.afterPipe=n,this.error=null,this.pipeToFinished=!1}finished(){this.pipeToFinished=!0}done(e,t){if(t&&(this.error=t),e===this.to&&(this.to=null,this.from!==null)){(!(this.from._duplexState&vn)||!this.pipeToFinished)&&this.from.destroy(this.error||new Error("Writable stream closed prematurely"));return}if(e===this.from&&(this.from=null,this.to!==null)){e._duplexState&vn||this.to.destroy(this.error||new Error("Readable stream closed before ending"));return}this.afterPipe!==null&&this.afterPipe(this.error),this.to=this.from=this.afterPipe=null}}function Vm(){this.stream._duplexState|=Bl,this.updateCallback()}function Gm(i){const e=this.stream;i&&e.destroy(i),e._duplexState&qn||(e._duplexState|=Ji,e.emit("finish")),(e._duplexState&Ad)===Hl&&(e._duplexState|=Xi),e._duplexState&=gd,e._duplexState&Cs?this.updateNextTick():this.update()}function bd(i){const e=this.stream;!i&&this.error!==Va&&(i=this.error),i&&e.emit("error",i),e._duplexState|=xr,e.emit("close");const t=e._readableState,n=e._writableState;if(t!==null&&t.pipeline!==null&&t.pipeline.done(e,i),n!==null){for(;n.drains!==null&&n.drains.length>0;)n.drains.shift().resolve(!1);n.pipeline!==null&&n.pipeline.done(e,i)}}function Hm(i){const e=this.stream;i&&e.destroy(i),e._duplexState&=gd,this.drains!==null&&Km(this.drains),(e._duplexState&Pm)===Ir&&(e._duplexState&=xm,(e._duplexState&Yo)===Yo&&e.emit("drain")),this.updateCallback()}function Wm(i){i&&this.stream.destroy(i),this.stream._duplexState&=hm,this.readAhead===!1&&!(this.stream._duplexState&Rr)&&(this.stream._duplexState&=md),this.updateCallback()}function Xm(){this.stream._duplexState&yr||(this.stream._duplexState&=pd,this.update())}function qm(){this.stream._duplexState&Cs||(this.stream._duplexState&=vd,this.update())}function Km(i){for(let e=0;e<i.length;e++)--i[e].writes===0&&(i.shift().resolve(!0),e--)}function Td(i){const e=this.stream;i&&e.destroy(i),e._duplexState&Xi||(e._duplexState&Sm||(e._duplexState|=Xs),e._duplexState&Lm||(e._duplexState|=Lr),e.emit("open")),e._duplexState&=yd,e._writableState!==null&&e._writableState.updateCallback(),e._readableState!==null&&e._readableState.updateCallback()}function Ym(i,e){e!=null&&this.push(e),this._writableState.afterWrite(i)}function jm(i){this._readableState!==null&&(i==="data"&&(this._duplexState|=Ko|Vl,this._readableState.updateNextTick()),i==="readable"&&(this._duplexState|=kl,this._readableState.updateNextTick())),this._writableState!==null&&i==="drain"&&(this._duplexState|=Yo,this._writableState.updateNextTick())}class Xl extends sm{constructor(e){super(),this._duplexState=0,this._readableState=null,this._writableState=null,e&&(e.open&&(this._open=e.open),e.destroy&&(this._destroy=e.destroy),e.predestroy&&(this._predestroy=e.predestroy),e.signal&&e.signal.addEventListener("abort",rg.bind(this))),this.on("newListener",jm)}_open(e){e(null)}_destroy(e){e(null)}_predestroy(){}get readable(){return this._readableState!==null?!0:void 0}get writable(){return this._writableState!==null?!0:void 0}get destroyed(){return(this._duplexState&xr)!==0}get destroying(){return(this._duplexState&qn)!==0}destroy(e){this._duplexState&qn||(e||(e=Va),this._duplexState=(this._duplexState|Xi)&Mm,this._readableState!==null&&(this._readableState.highWaterMark=0,this._readableState.error=e),this._writableState!==null&&(this._writableState.highWaterMark=0,this._writableState.error=e),this._duplexState|=Ol,this._predestroy(),this._duplexState&=am,this._readableState!==null&&this._readableState.updateNextTick(),this._writableState!==null&&this._writableState.updateNextTick())}}class Mr extends Xl{constructor(e){super(e),this._duplexState|=Qi|Ji|Ki,this._readableState=new Bm(this,e),e&&(this._readableState.readAhead===!1&&(this._duplexState&=md),e.read&&(this._read=e.read),e.eagerOpen&&this._readableState.updateNextTick(),e.encoding&&this.setEncoding(e.encoding))}setEncoding(e){const t=new rm(e),n=this._readableState.map||$m;return this._readableState.map=s,this;function s(r){const a=t.push(r);return a===""?null:n(a)}}_read(e){e(null)}pipe(e,t){return this._readableState.updateNextTick(),this._readableState.pipe(e,t),e}read(){return this._readableState.updateNextTick(),this._readableState.read()}push(e){return this._readableState.updateNextTick(),this._readableState.push(e)}unshift(e){return this._readableState.updateNextTick(),this._readableState.unshift(e)}resume(){return this._duplexState|=Vl,this._readableState.updateNextTick(),this}pause(){return this._duplexState&=this._readableState.readAhead===!1?_m:fm,this}static _fromAsyncIterator(e,t){let n;const s=new Mr({...t,read(a){e.next().then(r).then(a.bind(null,null)).catch(a)},predestroy(){n=e.return()},destroy(a){if(!n)return a(null);n.then(a.bind(null,null)).catch(a)}});return s;function r(a){a.done?s.push(null):s.push(a.value)}}static from(e,t){if(ig(e))return e;if(e[kr])return this._fromAsyncIterator(e[kr](),t);Array.isArray(e)||(e=e===void 0?[]:[e]);let n=0;return new Mr({...t,read(s){this.push(n===e.length?null:e[n++]),s(null)}})}static isBackpressured(e){return(e._duplexState&Cm)!==0||e._readableState.buffered>=e._readableState.highWaterMark}static isPaused(e){return(e._duplexState&Rr)===0}[kr](){const e=this;let t=null,n=null,s=null;return this.on("error",c=>{t=c}),this.on("readable",r),this.on("close",a),{[kr](){return this},next(){return new Promise(function(c,h){n=c,s=h;const u=e.read();u!==null?o(u):e._duplexState&xr&&o(null)})},return(){return l(null)},throw(c){return l(c)}};function r(){n!==null&&o(e.read())}function a(){n!==null&&o(null)}function o(c){s!==null&&(t?s(t):c===null&&!(e._duplexState&vn)?s(Va):n({value:c,done:c===null}),s=n=null)}function l(c){return e.destroy(c),new Promise((h,u)=>{if(e._duplexState&xr)return h({value:void 0,done:!0});e.once("close",function(){c?u(c):h({value:void 0,done:!0})})})}}}class wd extends Xl{constructor(e){super(e),this._duplexState|=Qi|vn,this._writableState=new Sd(this,e),e&&(e.writev&&(this._writev=e.writev),e.write&&(this._write=e.write),e.final&&(this._final=e.final),e.eagerOpen&&this._writableState.updateNextTick())}cork(){this._duplexState|=Ha}uncork(){this._duplexState&=xd,this._writableState.updateNextTick()}_writev(e,t){t(null)}_write(e,t){this._writableState.autoBatch(e,t)}_final(e){e(null)}static isBackpressured(e){return(e._duplexState&Fm)!==0}static drained(e){if(e.destroyed)return Promise.resolve(!1);const t=e._writableState,s=(ag(e)?Math.min(1,t.queue.length):t.queue.length)+(e._duplexState&Gl?1:0);return s===0?Promise.resolve(!0):(t.drains===null&&(t.drains=[]),new Promise(r=>{t.drains.push({writes:s,resolve:r})}))}write(e){return this._writableState.updateNextTick(),this._writableState.push(e)}end(e){return this._writableState.updateNextTick(),this._writableState.end(e),this}}class ql extends Mr{constructor(e){super(e),this._duplexState=Qi|this._duplexState&Ki,this._writableState=new Sd(this,e),e&&(e.writev&&(this._writev=e.writev),e.write&&(this._write=e.write),e.final&&(this._final=e.final))}cork(){this._duplexState|=Ha}uncork(){this._duplexState&=xd,this._writableState.updateNextTick()}_writev(e,t){t(null)}_write(e,t){this._writableState.autoBatch(e,t)}_final(e){e(null)}write(e){return this._writableState.updateNextTick(),this._writableState.push(e)}end(e){return this._writableState.updateNextTick(),this._writableState.end(e),this}}class Cd extends ql{constructor(e){super(e),this._transformState=new km(this),e&&(e.transform&&(this._transform=e.transform),e.flush&&(this._flush=e.flush))}_write(e,t){this._readableState.buffered>=this._readableState.highWaterMark?this._transformState.data=e:this._transform(e,this._transformState.afterTransform)}_read(e){if(this._transformState.data!==null){const t=this._transformState.data;this._transformState.data=null,e(null),this._transform(t,this._transformState.afterTransform)}else e(null)}destroy(e){super.destroy(e),this._transformState.data!==null&&(this._transformState.data=null,this._transformState.afterTransform())}_transform(e,t){t(null,e)}_flush(e){e(null)}_final(e){this._transformState.afterFinal=e,this._flush(Qm.bind(this))}}class Zm extends Cd{}function Qm(i,e){const t=this._transformState.afterFinal;if(i)return t(i);e!=null&&this.push(e),this.push(null),t(null)}function Jm(...i){return new Promise((e,t)=>Rd(...i,n=>{if(n)return t(n);e()}))}function Rd(i,...e){const t=Array.isArray(i)?[...i,...e]:[i,...e],n=t.length&&typeof t[t.length-1]=="function"?t.pop():null;if(t.length<2)throw new Error("Pipeline requires at least 2 streams");let s=t[0],r=null,a=null;for(let c=1;c<t.length;c++)r=t[c],Er(s)?s.pipe(r,l):(o(s,!0,c>1,l),s.pipe(r)),s=r;if(n){let c=!1;const h=Er(r)||!!(r._writableState&&r._writableState.autoDestroy);r.on("error",u=>{a===null&&(a=u)}),r.on("finish",()=>{c=!0,h||n(a)}),h&&r.on("close",()=>n(a||(c?null:so)))}return r;function o(c,h,u,d){c.on("error",d),c.on("close",f);function f(){if(h&&c._readableState&&!c._readableState.ended||u&&c._writableState&&!c._writableState.ended)return d(so)}}function l(c){if(!(!c||a)){a=c;for(const h of t)h.destroy(c)}}}function $m(i){return i}function Ld(i){return!!i._readableState||!!i._writableState}function Er(i){return typeof i._duplexState=="number"&&Ld(i)}function eg(i){return!!i._readableState&&i._readableState.ended}function tg(i){return!!i._writableState&&i._writableState.ended}function ng(i,e={}){const t=i._readableState&&i._readableState.error||i._writableState&&i._writableState.error;return!e.all&&t===Va?null:t}function ig(i){return Er(i)&&i.readable}function sg(i){return typeof i=="object"&&i!==null&&typeof i.byteLength=="number"}function Id(i){return sg(i)?i.byteLength:1024}function Xc(){}function rg(){this.destroy(new Error("Stream aborted."))}function ag(i){return i._writev!==wd.prototype._writev&&i._writev!==ql.prototype._writev}var og={pipeline:Rd,pipelinePromise:Jm,isStream:Ld,isStreamx:Er,isEnded:eg,isFinished:tg,getStreamError:ng,Stream:Xl,Writable:wd,Readable:Mr,Duplex:ql,Transform:Cd,PassThrough:Zm};function qc(i,e){for(const t in e)Object.defineProperty(i,t,{value:e[t],enumerable:!0,configurable:!0});return i}function lg(i,e,t){if(!i||typeof i=="string")throw new TypeError("Please pass an Error to err-code");t||(t={}),typeof e=="object"&&(t=e,e=""),e&&(t.code=e);try{return qc(i,t)}catch{t.message=i.message,t.stack=i.stack;const s=function(){};return s.prototype=Object.create(Object.getPrototypeOf(i)),qc(new s,t)}}var cg=lg;const Ge=Gu(cg);/* Common package for dealing with hex/string/uint8 conversions (and sha1 hashing)
*
* @author   Jimmy Wärting <jimmy@warting.se> (https://jimmy.warting.se/opensource)
* @license  MIT
*/const Kc="0123456789abcdef",Pd=[];for(let i=0;i<256;i++)Pd[i]=Kc[i>>4&15]+Kc[i&15];const Yc=i=>{const e=i.length;let t="",n=0;for(;n<e;)t+=Pd[i[n++]];return t};var jc="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",hg=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(var zr=0;zr<jc.length;zr++)hg[jc.charCodeAt(zr)]=zr;new TextDecoder;const ug=new TextEncoder,dg=i=>ug.encode(i),Zc=typeof window<"u"?window:self,jo=Zc.crypto||Zc.msCrypto||{};jo.subtle||jo.webkitSubtle;const Qc=i=>{const e=new Uint8Array(i);return jo.getRandomValues(e)};/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */const fg=Vp("simple-peer"),ro=64*1024,pg=5*1e3,mg=5*1e3;function Jc(i){return i.replace(/a=ice-options:trickle\s\n/g,"")}function gg(i){console.warn(i)}let Wa=class Zo extends og.Duplex{constructor(t){t=Object.assign({allowHalfOpen:!1},t);super(t);oe(this,"_pc");if(this.__objectMode=!!t.objectMode,this._id=Yc(Qc(4)).slice(0,7),this._debug("new peer %o",t),this.channelName=t.initiator?t.channelName||Yc(Qc(20)):null,this.initiator=t.initiator||!1,this.channelConfig=t.channelConfig||Zo.channelConfig,this.channelNegotiated=this.channelConfig.negotiated,this.config=Object.assign({},Zo.config,t.config),this.offerOptions=t.offerOptions||{},this.answerOptions=t.answerOptions||{},this.sdpTransform=t.sdpTransform||(n=>n),this.trickle=t.trickle!==void 0?t.trickle:!0,this.allowHalfTrickle=t.allowHalfTrickle!==void 0?t.allowHalfTrickle:!1,this.iceCompleteTimeout=t.iceCompleteTimeout||pg,this._destroying=!1,this._connected=!1,this.remoteAddress=void 0,this.remoteFamily=void 0,this.remotePort=void 0,this.localAddress=void 0,this.localFamily=void 0,this.localPort=void 0,!qo)throw Ge(typeof window>"u"?new Error("No WebRTC support: Specify `opts.wrtc` option in this environment"):new Error("No WebRTC support: Not a supported browser"),"ERR_WEBRTC_SUPPORT");this._pcReady=!1,this._channelReady=!1,this._iceComplete=!1,this._iceCompleteTimer=null,this._channel=null,this._pendingCandidates=[],this._isNegotiating=!1,this._firstNegotiation=!0,this._batchedNegotiation=!1,this._queuedNegotiation=!1,this._sendersAwaitingStable=[],this._closingInterval=null,this._remoteTracks=[],this._remoteStreams=[],this._chunk=null,this._cb=null,this._interval=null;try{this._pc=new qo(this.config)}catch(n){this.__destroy(Ge(n,"ERR_PC_CONSTRUCTOR"));return}this._isReactNativeWebrtc=typeof this._pc._peerConnectionId=="number",this._pc.oniceconnectionstatechange=()=>{this._onIceStateChange()},this._pc.onicegatheringstatechange=()=>{this._onIceStateChange()},this._pc.onconnectionstatechange=()=>{this._onConnectionStateChange()},this._pc.onsignalingstatechange=()=>{this._onSignalingStateChange()},this._pc.onicecandidate=n=>{this._onIceCandidate(n)},typeof this._pc.peerIdentity=="object"&&this._pc.peerIdentity.catch(n=>{this.__destroy(Ge(n,"ERR_PC_PEER_IDENTITY"))}),this.initiator||this.channelNegotiated?this._setupData({channel:this._pc.createDataChannel(this.channelName,this.channelConfig)}):this._pc.ondatachannel=n=>{this._setupData(n)},this._debug("initial negotiation"),this._needsNegotiation(),this._onFinishBound=()=>{this._onFinish()},this.once("finish",this._onFinishBound)}get bufferSize(){return this._channel&&this._channel.bufferedAmount||0}get connected(){return this._connected&&this._channel.readyState==="open"}address(){return{port:this.localPort,family:this.localFamily,address:this.localAddress}}signal(t){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot signal after peer is destroyed"),"ERR_DESTROYED");if(typeof t=="string")try{t=JSON.parse(t)}catch{t={}}this._debug("signal()"),t.renegotiate&&this.initiator&&(this._debug("got request to renegotiate"),this._needsNegotiation()),t.transceiverRequest&&this.initiator&&(this._debug("got request for transceiver"),this.addTransceiver(t.transceiverRequest.kind,t.transceiverRequest.init)),t.candidate&&(this._pc.remoteDescription&&this._pc.remoteDescription.type?this._addIceCandidate(t.candidate):this._pendingCandidates.push(t.candidate)),t.sdp&&this._pc.setRemoteDescription(new Gp(t)).then(()=>{this.destroyed||(this._pendingCandidates.forEach(n=>{this._addIceCandidate(n)}),this._pendingCandidates=[],this._pc.remoteDescription.type==="offer"&&this._createAnswer())}).catch(n=>{this.__destroy(Ge(n,"ERR_SET_REMOTE_DESCRIPTION"))}),!t.sdp&&!t.candidate&&!t.renegotiate&&!t.transceiverRequest&&this.__destroy(Ge(new Error("signal() called with invalid signal data"),"ERR_SIGNALING"))}}_addIceCandidate(t){const n=new Hp(t);this._pc.addIceCandidate(n).catch(s=>{!n.address||n.address.endsWith(".local")?gg("Ignoring unsupported ICE candidate."):this.__destroy(Ge(s,"ERR_ADD_ICE_CANDIDATE"))})}send(t){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot send after peer is destroyed"),"ERR_DESTROYED");this._channel.send(t)}}_needsNegotiation(){this._debug("_needsNegotiation"),!this._batchedNegotiation&&(this._batchedNegotiation=!0,queueMicrotask(()=>{this._batchedNegotiation=!1,this.initiator||!this._firstNegotiation?(this._debug("starting batched negotiation"),this.negotiate()):this._debug("non-initiator initial negotiation request discarded"),this._firstNegotiation=!1}))}negotiate(){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot negotiate after peer is destroyed"),"ERR_DESTROYED");this.initiator?this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("start negotiation"),setTimeout(()=>{this._createOffer()},0)):this._isNegotiating?(this._queuedNegotiation=!0,this._debug("already negotiating, queueing")):(this._debug("requesting negotiation from initiator"),this.emit("signal",{type:"renegotiate",renegotiate:!0})),this._isNegotiating=!0}}_final(t){this._readableState.ended||this.push(null),t(null)}__destroy(t){this.end(),this._destroy(()=>{},t)}_destroy(t,n){this.destroyed||this._destroying||(this._destroying=!0,this._debug("destroying (error: %s)",n&&(n.message||n)),setTimeout(()=>{if(this._connected=!1,this._pcReady=!1,this._channelReady=!1,this._remoteTracks=null,this._remoteStreams=null,this._senderMap=null,clearInterval(this._closingInterval),this._closingInterval=null,clearInterval(this._interval),this._interval=null,this._chunk=null,this._cb=null,this._onFinishBound&&this.removeListener("finish",this._onFinishBound),this._onFinishBound=null,this._channel){try{this._channel.close()}catch{}this._channel.onmessage=null,this._channel.onopen=null,this._channel.onclose=null,this._channel.onerror=null}if(this._pc){try{this._pc.close()}catch{}this._pc.oniceconnectionstatechange=null,this._pc.onicegatheringstatechange=null,this._pc.onsignalingstatechange=null,this._pc.onicecandidate=null,this._pc.ontrack=null,this._pc.ondatachannel=null}this._pc=null,this._channel=null,n&&this.emit("error",n),t()},0))}_setupData(t){if(!t.channel)return this.__destroy(Ge(new Error("Data channel event is missing `channel` property"),"ERR_DATA_CHANNEL"));this._channel=t.channel,this._channel.binaryType="arraybuffer",typeof this._channel.bufferedAmountLowThreshold=="number"&&(this._channel.bufferedAmountLowThreshold=ro),this.channelName=this._channel.label,this._channel.onmessage=s=>{this._onChannelMessage(s)},this._channel.onbufferedamountlow=()=>{this._onChannelBufferedAmountLow()},this._channel.onopen=()=>{this._onChannelOpen()},this._channel.onclose=()=>{this._onChannelClose()},this._channel.onerror=s=>{const r=s.error instanceof Error?s.error:new Error(`Datachannel error: ${s.message} ${s.filename}:${s.lineno}:${s.colno}`);this.__destroy(Ge(r,"ERR_DATA_CHANNEL"))};let n=!1;this._closingInterval=setInterval(()=>{this._channel&&this._channel.readyState==="closing"?(n&&this._onChannelClose(),n=!0):n=!1},mg)}_write(t,n){if(this.destroyed)return n(Ge(new Error("cannot write after peer is destroyed"),"ERR_DATA_CHANNEL"));if(this._connected){try{this.send(t)}catch(s){return this.__destroy(Ge(s,"ERR_DATA_CHANNEL"))}this._channel.bufferedAmount>ro?(this._debug("start backpressure: bufferedAmount %d",this._channel.bufferedAmount),this._cb=n):n(null)}else this._debug("write before connect"),this._chunk=t,this._cb=n}_onFinish(){if(this.destroyed)return;const t=()=>{setTimeout(()=>this.__destroy(),1e3)};this._connected?t():this.once("connect",t)}_startIceCompleteTimeout(){this.destroyed||this._iceCompleteTimer||(this._debug("started iceComplete timeout"),this._iceCompleteTimer=setTimeout(()=>{this._iceComplete||(this._iceComplete=!0,this._debug("iceComplete timeout completed"),this.emit("iceTimeout"),this.emit("_iceComplete"))},this.iceCompleteTimeout))}_createOffer(){this.destroyed||this._pc.createOffer(this.offerOptions).then(t=>{if(this.destroyed)return;!this.trickle&&!this.allowHalfTrickle&&(t.sdp=Jc(t.sdp)),t.sdp=this.sdpTransform(t.sdp);const n=()=>{if(this.destroyed)return;const a=this._pc.localDescription||t;this._debug("signal"),this.emit("signal",{type:a.type,sdp:a.sdp})},s=()=>{this._debug("createOffer success"),!this.destroyed&&(this.trickle||this._iceComplete?n():this.once("_iceComplete",n))},r=a=>{this.__destroy(Ge(a,"ERR_SET_LOCAL_DESCRIPTION"))};this._pc.setLocalDescription(t).then(s).catch(r)}).catch(t=>{this.__destroy(Ge(t,"ERR_CREATE_OFFER"))})}_createAnswer(){this.destroyed||this._pc.createAnswer(this.answerOptions).then(t=>{if(this.destroyed)return;!this.trickle&&!this.allowHalfTrickle&&(t.sdp=Jc(t.sdp)),t.sdp=this.sdpTransform(t.sdp);const n=()=>{var o;if(this.destroyed)return;const a=this._pc.localDescription||t;this._debug("signal"),this.emit("signal",{type:a.type,sdp:a.sdp}),this.initiator||(o=this._requestMissingTransceivers)==null||o.call(this)},s=()=>{this.destroyed||(this.trickle||this._iceComplete?n():this.once("_iceComplete",n))},r=a=>{this.__destroy(Ge(a,"ERR_SET_LOCAL_DESCRIPTION"))};this._pc.setLocalDescription(t).then(s).catch(r)}).catch(t=>{this.__destroy(Ge(t,"ERR_CREATE_ANSWER"))})}_onConnectionStateChange(){this.destroyed||this._destroying||this._pc.connectionState==="failed"&&this.__destroy(Ge(new Error("Connection failed."),"ERR_CONNECTION_FAILURE"))}_onIceStateChange(){if(this.destroyed)return;const t=this._pc.iceConnectionState,n=this._pc.iceGatheringState;this._debug("iceStateChange (connection: %s) (gathering: %s)",t,n),this.emit("iceStateChange",t,n),(t==="connected"||t==="completed")&&(this._pcReady=!0,this._maybeReady()),t==="failed"&&this.__destroy(Ge(new Error("Ice connection failed."),"ERR_ICE_CONNECTION_FAILURE")),t==="closed"&&this.__destroy(Ge(new Error("Ice connection closed."),"ERR_ICE_CONNECTION_CLOSED"))}getStats(t){const n=s=>(Object.prototype.toString.call(s.values)==="[object Array]"&&s.values.forEach(r=>{Object.assign(s,r)}),s);this._pc.getStats.length===0||this._isReactNativeWebrtc?this._pc.getStats().then(s=>{const r=[];s.forEach(a=>{r.push(n(a))}),t(null,r)},s=>t(s)):this._pc.getStats.length>0?this._pc.getStats(s=>{if(this.destroyed)return;const r=[];s.result().forEach(a=>{const o={};a.names().forEach(l=>{o[l]=a.stat(l)}),o.id=a.id,o.type=a.type,o.timestamp=a.timestamp,r.push(n(o))}),t(null,r)},s=>t(s)):t(null,[])}_maybeReady(){if(this._debug("maybeReady pc %s channel %s",this._pcReady,this._channelReady),this._connected||this._connecting||!this._pcReady||!this._channelReady)return;this._connecting=!0;const t=()=>{this.destroyed||this._destroying||this.getStats((n,s)=>{if(this.destroyed||this._destroying)return;n&&(s=[]);const r={},a={},o={};let l=!1;s.forEach(h=>{(h.type==="remotecandidate"||h.type==="remote-candidate")&&(r[h.id]=h),(h.type==="localcandidate"||h.type==="local-candidate")&&(a[h.id]=h),(h.type==="candidatepair"||h.type==="candidate-pair")&&(o[h.id]=h)});const c=h=>{l=!0;let u=a[h.localCandidateId];u&&(u.ip||u.address)?(this.localAddress=u.ip||u.address,this.localPort=Number(u.port)):u&&u.ipAddress?(this.localAddress=u.ipAddress,this.localPort=Number(u.portNumber)):typeof h.googLocalAddress=="string"&&(u=h.googLocalAddress.split(":"),this.localAddress=u[0],this.localPort=Number(u[1])),this.localAddress&&(this.localFamily=this.localAddress.includes(":")?"IPv6":"IPv4");let d=r[h.remoteCandidateId];d&&(d.ip||d.address)?(this.remoteAddress=d.ip||d.address,this.remotePort=Number(d.port)):d&&d.ipAddress?(this.remoteAddress=d.ipAddress,this.remotePort=Number(d.portNumber)):typeof h.googRemoteAddress=="string"&&(d=h.googRemoteAddress.split(":"),this.remoteAddress=d[0],this.remotePort=Number(d[1])),this.remoteAddress&&(this.remoteFamily=this.remoteAddress.includes(":")?"IPv6":"IPv4"),this._debug("connect local: %s:%s remote: %s:%s",this.localAddress,this.localPort,this.remoteAddress,this.remotePort)};if(s.forEach(h=>{h.type==="transport"&&h.selectedCandidatePairId&&c(o[h.selectedCandidatePairId]),(h.type==="googCandidatePair"&&h.googActiveConnection==="true"||(h.type==="candidatepair"||h.type==="candidate-pair")&&h.selected)&&c(h)}),!l&&(!Object.keys(o).length||Object.keys(a).length)){setTimeout(t,100);return}else this._connecting=!1,this._connected=!0;if(this._chunk){try{this.send(this._chunk)}catch(u){return this.__destroy(Ge(u,"ERR_DATA_CHANNEL"))}this._chunk=null,this._debug('sent chunk from "write before connect"');const h=this._cb;this._cb=null,h(null)}typeof this._channel.bufferedAmountLowThreshold!="number"&&(this._interval=setInterval(()=>this._onInterval(),150),this._interval.unref&&this._interval.unref()),this._debug("connect"),this.emit("connect")})};t()}_onInterval(){!this._cb||!this._channel||this._channel.bufferedAmount>ro||this._onChannelBufferedAmountLow()}_onSignalingStateChange(){this.destroyed||(this._pc.signalingState==="stable"&&(this._isNegotiating=!1,this._debug("flushing sender queue",this._sendersAwaitingStable),this._sendersAwaitingStable.forEach(t=>{this._pc.removeTrack(t),this._queuedNegotiation=!0}),this._sendersAwaitingStable=[],this._queuedNegotiation?(this._debug("flushing negotiation queue"),this._queuedNegotiation=!1,this._needsNegotiation()):(this._debug("negotiated"),this.emit("negotiated"))),this._debug("signalingStateChange %s",this._pc.signalingState),this.emit("signalingStateChange",this._pc.signalingState))}_onIceCandidate(t){this.destroyed||(t.candidate&&this.trickle?this.emit("signal",{type:"candidate",candidate:{candidate:t.candidate.candidate,sdpMLineIndex:t.candidate.sdpMLineIndex,sdpMid:t.candidate.sdpMid}}):!t.candidate&&!this._iceComplete&&(this._iceComplete=!0,this.emit("_iceComplete")),t.candidate&&this._startIceCompleteTimeout())}_onChannelMessage(t){if(this.destroyed)return;let n=t.data;n instanceof ArrayBuffer?n=new Uint8Array(n):this.__objectMode===!1&&(n=dg(n)),this.push(n)}_onChannelBufferedAmountLow(){if(this.destroyed||!this._cb)return;this._debug("ending backpressure: bufferedAmount %d",this._channel.bufferedAmount);const t=this._cb;this._cb=null,t(null)}_onChannelOpen(){this._connected||this.destroyed||(this._debug("on channel open"),this._channelReady=!0,this._maybeReady())}_onChannelClose(){this.destroyed||(this._debug("on channel close"),this.__destroy())}_debug(){const t=[].slice.call(arguments);t[0]="["+this._id+"] "+t[0],fg.apply(null,t)}};Wa.WEBRTC_SUPPORT=!!qo;Wa.config={iceServers:[{urls:["stun:stun.l.google.com:19302","stun:global.stun.twilio.com:3478"]}],sdpSemantics:"unified-plan"};Wa.channelConfig={};/*! simple-peer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */class $c extends Wa{constructor(e={}){super(e),this._pc&&(this.streams=e.streams||(e.stream?[e.stream]:[]),this._senderMap=new Map,this.streams&&this.streams.forEach(t=>{this.addStream(t)}),this._pc.ontrack=t=>{this._onTrack(t)})}addTransceiver(e,t){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot addTransceiver after peer is destroyed"),"ERR_DESTROYED");if(this._debug("addTransceiver()"),this.initiator)try{this._pc.addTransceiver(e,t),this._needsNegotiation()}catch(n){this.__destroy(Ge(n,"ERR_ADD_TRANSCEIVER"))}else this.emit("signal",{type:"transceiverRequest",transceiverRequest:{kind:e,init:t}})}}addStream(e){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot addStream after peer is destroyed"),"ERR_DESTROYED");this._debug("addStream()"),e.getTracks().forEach(t=>{this.addTrack(t,e)})}}addTrack(e,t){if(this._destroying)return;if(this.destroyed)throw Ge(new Error("cannot addTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("addTrack()");const n=this._senderMap.get(e)||new Map;let s=n.get(t);if(!s)s=this._pc.addTrack(e,t),n.set(t,s),this._senderMap.set(e,n),this._needsNegotiation();else throw s.removed?Ge(new Error("Track has been removed. You should enable/disable tracks that you want to re-add."),"ERR_SENDER_REMOVED"):Ge(new Error("Track has already been added to that stream."),"ERR_SENDER_ALREADY_ADDED")}replaceTrack(e,t,n){if(this._destroying)return;if(this.destroyed)throw Ge(new Error("cannot replaceTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("replaceTrack()");const s=this._senderMap.get(e),r=s?s.get(n):null;if(!r)throw Ge(new Error("Cannot replace track that was never added."),"ERR_TRACK_NOT_ADDED");t&&this._senderMap.set(t,s),r.replaceTrack!=null?r.replaceTrack(t):this.__destroy(Ge(new Error("replaceTrack is not supported in this browser"),"ERR_UNSUPPORTED_REPLACETRACK"))}removeTrack(e,t){if(this._destroying)return;if(this.destroyed)throw Ge(new Error("cannot removeTrack after peer is destroyed"),"ERR_DESTROYED");this._debug("removeSender()");const n=this._senderMap.get(e),s=n?n.get(t):null;if(!s)throw Ge(new Error("Cannot remove track that was never added."),"ERR_TRACK_NOT_ADDED");try{s.removed=!0,this._pc.removeTrack(s)}catch(r){r.name==="NS_ERROR_UNEXPECTED"?this._sendersAwaitingStable.push(s):this.__destroy(Ge(r,"ERR_REMOVE_TRACK"))}this._needsNegotiation()}removeStream(e){if(!this._destroying){if(this.destroyed)throw Ge(new Error("cannot removeStream after peer is destroyed"),"ERR_DESTROYED");this._debug("removeSenders()"),e.getTracks().forEach(t=>{this.removeTrack(t,e)})}}_requestMissingTransceivers(){this._pc.getTransceivers&&this._pc.getTransceivers().forEach(e=>{!e.mid&&e.sender.track&&!e.requested&&(e.requested=!0,this.addTransceiver(e.sender.track.kind))})}_onTrack(e){this.destroyed||e.streams.forEach(t=>{this._debug("on track"),this.emit("track",e.track,t),this._remoteTracks.push({track:e.track,stream:t}),!this._remoteStreams.some(n=>n.id===t.id)&&(this._remoteStreams.push(t),queueMicrotask(()=>{this._debug("on stream"),this.emit("stream",t)}))})}}let ao=0;class _g{constructor(){oe(this,"lastMsgRecivedTimestamp");oe(this,"connectionState",Xt(at.init));oe(this,"latestRecivedDataMessage",Xt(null));oe(this,"outgoingSignalingMessages",Xt(null));oe(this,"remoteVideoStreams",Xt(new Map));oe(this,"_p");oe(this,"_spConfig",null);oe(this,"_msgSendQueue",[]);oe(this,"_reconnectAttemptCount");oe(this,"_shouldReconnect");oe(this,"_initiator",!1);oe(this,"_connectionId",-1);oe(this,"_signalMsgSendCounter",0);oe(this,"_signalMsgRecivedCounter",0);oe(this,"_StatsGatherInterval")}start(e,t=!0,n=0){this._shouldReconnect=t,this._spConfig=Object.assign({},e,$c.config),pn("SP starting with opts: ",this._spConfig),this._spConfig.initiator&&(this._connectionId=ao++),this._p=new $c(this._spConfig),this._p._debug=(...s)=>pn("SIMPLEPEER DEBUG: "+s[0],...s.slice(1)),this._reconnectAttemptCount=n,this._initiator=this._spConfig.initiator||!1,this.connectionState.set(at.connecting),this._p.on("signal",s=>{if(this._signalMsgSendCounter++,this._connectionId===-1)return It("SP sending signal message when connectionId is null, this should not happen!");s=Object.assign({},s,{connId:this._connectionId,msgNum:this._signalMsgSendCounter}),pn("SP signal out",s),this.outgoingSignalingMessages.set(JSON.stringify(s))}),this._p.on("connect",()=>{vi("SP Connected"),this._emptyMsgQueue(),this._reconnectAttemptCount=0,this.connectionState.set(at.connected)}),this._p.on("data",s=>{this.lastMsgRecivedTimestamp=Date.now(),this.latestRecivedDataMessage.set(s)}),this._p.on("stream",s=>{vi("SP got video stream: ",s),this.remoteVideoStreams.update(r=>(r.set(s.id,s),r))}),this._p.on("close",()=>{It("SP connection closed"),this.stop()}),this._p.on("error",s=>{this.resetConnectionStats(),Wi("SP error ",s),this.remoteVideoStreams.set(new Map),this._shouldReconnect=!1,clearInterval(this._StatsGatherInterval),this.connectionState.set(at.failed)})}resetConnectionStats(){this._connectionId=-1,this._signalMsgRecivedCounter=0,this._signalMsgSendCounter=0}stop(){var e,t;pn("SP Stop",this._connectionId,ao,(e=this._p)==null?void 0:e.destroyed,(t=this._p)==null?void 0:t.destroying),this.resetConnectionStats(),this.connectionState.set(at.disconnectedOk),this.remoteVideoStreams.set(new Map),this._shouldReconnect=!1,clearInterval(this._StatsGatherInterval),this._p&&this._p.destroy()}restart(e,t){var n,s;pn("SP Restart",this._connectionId,ao,(n=this._p)==null?void 0:n.destroyed,(s=this._p)==null?void 0:s.destroying),this.stop(),this._connectionId=e||-1,this.start(this._spConfig,this._shouldReconnect,this._reconnectAttemptCount),t&&this.ingestSignalingMsg(t)}ingestSignalingMsg(e){try{const t=JSON.parse(e);if(vi("SP signal in",t,t.connId,this._connectionId),this._p.destroyed)return this.restart(t.connId,e);if(this._connectionId===-1)this._connectionId=t.connId;else if(t.connId<this._connectionId){ut("SP Err Older Remote ConnId!",t.connId,"<",this._connectionId);return}else if(t.connId>this._connectionId){this._initiator?ut("SP Err Newer Remote ConnId!",t.connId,">",this._connectionId):this.restart(t.connId,e);return}if(t.msgNum<=this._signalMsgRecivedCounter){ut("SP Invalid MsgNum Order!",t.msgNum,"<=",this._signalMsgRecivedCounter);return}this._signalMsgRecivedCounter=t.msgNum,this._p.signal(t)}catch(t){It("failed to parse & ingest simplepeer signalling message: ",e,t.message)}}sendMessage(e){this._msgSendQueue.push(e),this._emptyMsgQueue()}_emptyMsgQueue(){if(!this._p||!this._p.connected)return!1;for(this._msgSendQueue.length;this._msgSendQueue.length>0;){const e=this._msgSendQueue.shift();try{this._p.send(e)}catch(t){Wi("failed to send message over simplepeer data channel: ",t.message),this._msgSendQueue.unshift(e)}}}}const vg=i=>{if(!i.message)return;if(!i.message.type)return logDebug("@ invalid mavlink message rcvd: ",i);const e=i.message;switch(e.type){case"HEARTBEAT":xg(e);break;case"ATTITUDE":yg(e);break;case"SYS_STATUS":Eg(e);break;case"STATUSTEXT":Sg(e);break;case"SCALED_PRESSURE":Ag(e);break;case"SCALED_PRESSURE2":Mg(e);break;default:Pt.DEBUG_MODE&&logDebug("@ unhandled mavlink message "+String(e.type),e)}},xg=i=>{if(i.autopilot.type=="MAV_AUTOPILOT_INVALID")return;const e=i.custom_mode;rp(e);const t=i.system_status.type||jf.MAV_STATE_UNINIT;ap(t);const n=i.base_mode.bits,s=(n&Ci.MAV_MODE_FLAG_SAFETY_ARMED)>0;op.set(s);const r=(n&Ci.MAV_MODE_FLAG_MANUAL_INPUT_ENABLED)>0,a=(n&Ci.MAV_MODE_FLAG_HIL_ENABLED)>0,o=(n&Ci.MAV_MODE_FLAG_STABILIZE_ENABLED)>0,l=(n&Ci.MAV_MODE_FLAG_GUIDED_ENABLED)>0,c=(n&Ci.MAV_MODE_FLAG_AUTO_ENABLED)>0,h=(n&Ci.MAV_MODE_FLAG_TEST_ENABLED)>0;Pt.DEBUG_MODE&&logDebug("@  autopilot state",t,"flight mode",e,"armed",s,"manual_enabled",r,"hil_enabled",a,"stabilize_enabled",o,"guided_enabled",l,"auto_enabled",c,"test_enabled",h)},yg=i=>{Pt.DEBUG_MODE&&logDebug("@  attitude",i),Hu({MeasurementUpdates:[{MeasurementType:Mn.SensorMeasurmentTypes.yaw_degrees,Value:i.yaw/Math.PI*180},{MeasurementType:Mn.SensorMeasurmentTypes.pitch_degrees,Value:i.pitch/Math.PI*180},{MeasurementType:Mn.SensorMeasurmentTypes.roll_degrees,Value:i.roll/Math.PI*180}]})},Ag=i=>{Pt.DEBUG_MODE&&logDebug("@  scaled pressure",i),lp.set(i.press_abs),cp.set((i.press_abs-Zf)*.009962143853),hp.set(i.temperature/100)},Mg=i=>{Pt.DEBUG_MODE&&logDebug("@  scaled pressure 2",i),up.set(i.temperature/100)},Eg=i=>{Pt.DEBUG_MODE&&logDebug("@  system status",i);const e=i.voltage_battery/1e3,t=i.current_battery/100,n=i.errors_comm+i.errors_count1+i.errors_count2+i.errors_count3+i.errors_count4;dp(i.battery_remaining,e,t),fp(n),pp(i.load),i.errors_comm>0&&st(`${n} autopilot errors detected!`,5e3,!0,rt.warning),(e<14||i.battery_remaining>0&&i.battery_remaining<10)&&st(`Low Battery: ${e.toFixed(2)}volts`,8e3,!0,rt.warning),t>20&&st(`High Current Draw: ${t.toFixed(1)} amps`,5e3,!0,rt.error)},Sg=i=>{const e=i.severity.type,t=i.text.join("");Pt.DEBUG_MODE&&logDebug("@  status text",i);const s={[ni.MAV_SEVERITY_INFO]:rt.info,[ni.MAV_SEVERITY_DEBUG]:rt.info,[ni.MAV_SEVERITY_NOTICE]:rt.info,[ni.MAV_SEVERITY_WARNING]:rt.warning,[ni.MAV_SEVERITY_ALERT]:rt.warning,[ni.MAV_SEVERITY_CRITICAL]:rt.error,[ni.MAV_SEVERITY_EMERGENCY]:rt.error,[ni.MAV_SEVERITY_ERROR]:rt.error}[e]||rt.info;st(t+" - "+e,5e3,!1,s)};let eh=NaN;class bg{constructor(){oe(this,"replyContinuityCallbacks",[])}handleRecivedMessage(e){let t=new Uint8Array(e);if(!t||t.length===0)return;const n=Mn.RovResponse.decode(new Uint8Array(e)),s=n.ExchangeId;if(this.runExchangeCallback(n,s),n.Done)return this.handleDoneMsgRecived(n.Done,s);if(n.Error)return this.handleErrorMsgRecived(n.Error,s);if(n.Pong)return this.handlePongMsgRecived(n.Pong,s);if(n.ContinuedOutput)return this.handleContinuedOutputMsgRecived(n.ContinuedOutput,s);if(n.SensorUpdates)return this.handleSensorUpdatesMsgRecived(n.SensorUpdates,s);if(n.PasswordRequired)return this.handlePasswordRequiredMsgRecived(n.PasswordRequired,s);if(n.PasswordAccepted)return this.handlePasswordAcceptedMsgRecived(n.PasswordAccepted,s);if(n.PasswordInvalid)return this.handlePasswordInvalidMsgRecived(n.PasswordInvalid,s);if(n.DriverChanged)return this.handleDriverChangedMsgRecived(n.DriverChanged,s);if(n.ClientConnected)return this.handleClientConnectedMsgRecived(n.ClientConnected,s);if(n.ClientDisconnected)return this.handleClientDisconnectedMsgRecived(n.ClientDisconnected,s);if(n.SimplepeerSignal&&n.SimplepeerSignal.Message)Vi.ingestSimplePeerSignallingMsg(n.SimplepeerSignal.Message);else{if(n.Mavlink)return this.handleMavlinkMessageRecived(n.Mavlink,s);if(n.SystemMonitor)return this.handleSystemMonitorMsgRecived(n.SystemMonitor,s);if(n.LogMessage)return this.handleLogMsgRecived(n.LogMessage,s);It("Unhandled ROV message recived: ",n)}}handleDoneMsgRecived(e,t){Pt.DEBUG_MODE&&pn("Done: ",e)}handleErrorMsgRecived(e,t){It("ROV Error: ",e),st("ROV Error: "+e.Message,2e3,null)}handlePongMsgRecived(e,t){eh=Date.now();const n=eh-Number.parseFloat(e.Time);mp.set(n)}handleContinuedOutputMsgRecived(e,t){Pt.DEBUG_MODE&&pn("ContinuedOutput: ",t,e)}handleSensorUpdatesMsgRecived(e,t){Pt.DEBUG_MODE&&pn("SensorUpdates: ",e),Hu(e)}handleSystemMonitorMsgRecived(e,t){gp(e.CpuTemp,e.CpuUsage,e.MemoryUsage,e.DiskUsage,e.Warnings)}handlePasswordRequiredMsgRecived(e,t){Pt.DEBUG_MODE&&pn("PasswordRequired for rovId:",e.RovId),yp("Enter ROV Password","").then(n=>{n?this.sendRovMessage({PasswordAttempt:{Password:n},ExchangeId:t},null):delete this.replyContinuityCallbacks[t]})}handlePasswordAcceptedMsgRecived(e,t){st("Password Accepted",1e3,null)}handlePasswordInvalidMsgRecived(e,t){st("Wrong Password",1e3,null),this.handlePasswordRequiredMsgRecived(e,t)}handleDriverChangedMsgRecived(e,t){let n=Vi.currentLivekitIdentity.get();e.DriverPeerId==n?(st("You are now the driver"),Cc.set(!0)):(st("ROV Driver is now "+e.DriverPeerId),Cc.set(!1))}handleMavlinkMessageRecived(e,t){if(!e.Message)return;const n=Qf(e.Message);try{const s=JSON.parse(n);vg(s)}catch{It("@ Mav MSG RECIVED W INVALID JSON: ",n)}}handleClientConnectedMsgRecived(e,t){st(e.ClientPeerId+" Connected to ROV",1500,null)}handleClientDisconnectedMsgRecived(e,t){st(e.ClientPeerId+" Disconnected from ROV",1500,null)}handleLogMsgRecived(e,t){if(Pt.SHOW_REMOTE_LOGS){let n=JSON.parse(e.Message);if(Array.isArray(n)||(n=[n]),n.length===0)return;typeof n[0]=="string"?n[0]="REMOTE LOG: "+n[0]:n.unshift("REMOTE LOG: "),e.Level==Mn.LogLevel.Debug?pn(...n):e.Level==Mn.LogLevel.Info?vi(...n):e.Level==Mn.LogLevel.Warning?It(...n):e.Level==Mn.LogLevel.Error?Wi(...n):e.Level==Mn.LogLevel.Critical&&Wi(...n)}}sendRovMessage(e,t=null){Vi.currentLivekitIdentity.get()!==null&&(e.ExchangeId||(e.ExchangeId=this.replyContinuityCallbacks.length+1),this.replyContinuityCallbacks[e.ExchangeId]||(this.replyContinuityCallbacks[e.ExchangeId]={callback:t,originalMsgData:e}),Vi.sendMessageToRov(e,!1))}resendMessage(e){const t=this.replyContinuityCallbacks[e];t&&t.originalMsgData?(vi("Resending message: ",t.originalMsgData),this.sendRovMessage(t.originalMsgData,t.callback)):It("resendMessage(): No message to resend for ExchangeId: ",e)}runExchangeCallback(e,t){const n=this.replyContinuityCallbacks[t];n&&(n.callback&&n.callback(e),(e.Done||e.Error)&&delete this.replyContinuityCallbacks[t])}}const Tt=new bg;var Tg=(i=>(i.none="none",i.livekit="livekit",i.simplepeer="simplepeer",i))(Tg||{});class wg{constructor(){oe(this,"connectionState",Xt(at.init));oe(this,"livekitConnection",new Fp);oe(this,"videoStreams",Xt(void 0));oe(this,"currentLivekitIdentity",Xt(null));oe(this,"simplepeerConnection");oe(this,"livekitRoomPollingInterval",-1);oe(this,"openLivekitRoomInfo",Xt([]));oe(this,"_cleanupFuncs",{});oe(this,"currentVideoStreamMethod",Xt("none"));this.simplepeerConnection=new _g,$s(this.livekitConnection.latestRecivedDataMessage,e=>{const{senderId:t,msg:n}=e;t==this.livekitConnection.getRoomName()&&Tt.handleRecivedMessage(n)}),$s(this.simplepeerConnection.latestRecivedDataMessage,e=>{Tt.handleRecivedMessage(e)}),$s(this.simplepeerConnection.outgoingSignalingMessages,e=>{this.sendMessageToRov({SimplepeerSignal:{Message:e}},!0)})}async pollForOpenLivekitRooms(e){this.livekitRoomPollingInterval!==-1&&clearInterval(this.livekitRoomPollingInterval);const t=async()=>{if(this.connectionState.get()===at.connected||this.connectionState.get()===at.reconnecting)return;let n;try{n=await Mp(e,$f)}catch(a){return It("LK Error: Could not retrive list of livekit rooms",a),this.openLivekitRoomInfo.set([])}const r=n.map(a=>({name:a.name,token:a.metadata.length===0?"":Ep(a.metadata)})).sort((a,o)=>a.name>o.name?1:o.name>a.name?-1:0);this.openLivekitRoomInfo.set(r)};await t(),this.livekitRoomPollingInterval=window.setInterval(t,5e3)}async onConnectedActions(){await this.startSimplePeerConnection()}async _keepTrackOfConnectionState(){this._cleanupFuncs.livekitConnState&&this._cleanupFuncs.livekitConnState();const e=$s(this.livekitConnection.connectionState,n=>{this.simplepeerConnection&&this.simplepeerConnection.connectionState.get()===at.connected?this.connectionState.set(at.connected):this.connectionState.set(n)}),t=$s(this.simplepeerConnection.connectionState,n=>{this.livekitConnection&&this.livekitConnection.connectionState.get()===at.connected?this.connectionState.set(at.connected):this.connectionState.set(n)});this._cleanupFuncs.livekitConnState=()=>{e(),t()}}async initUsingCloudLivekitConnection(){this.livekitConnection.close(),this.pollForOpenLivekitRooms(Pt.LIVEKIT_CLOUD_ENDPOINT),await this.livekitConnection.init({hostUrl:Pt.LIVEKIT_CLOUD_ENDPOINT,publishVideo:!1,reconnectAttempts:3,roomConnectionConfig:Rc,roomConfig:Lc})}async initUsingLocalLivekitConnection(){this.livekitConnection.close(),this.pollForOpenLivekitRooms(Pt.LIVEKIT_LOCAL_ENDPOINT),await this.livekitConnection.init({hostUrl:Pt.LIVEKIT_LOCAL_ENDPOINT,publishVideo:!1,reconnectAttempts:3,roomConnectionConfig:Rc,roomConfig:Lc})}async connectToLivekitRoom(e,t){if(!this.livekitConnection||!this.livekitConnection.config)throw new Error("connectToLivekitRoom() called before livekitConnection was initilized");this._keepTrackOfConnectionState(),await this.livekitConnection.start(e,t),this.currentLivekitIdentity.set(this.livekitConnection.getLivekitIdentitiy()),Sp(this.livekitConnection.latestRecivedDataMessage,()=>this.onConnectedActions())}async startSimplePeerConnection(){if(!this.livekitConnection||this.livekitConnection.connectionState.get()!=at.connected)throw new Error("startSimplePeerConnection() called when livekitConnection was not fully connected!");if(!this.simplepeerConnection)throw new Error("startSimplePeerConnection() called without initilized simplepeerConnection!");this.simplepeerConnection.start(Object.assign({},Jf,{initiator:!0,offerOptions:{offerToReceiveVideo:!0}}))}async ingestSimplePeerSignallingMsg(e){const t=this.simplepeerConnection;if(t)t.ingestSignalingMsg(e);else throw new Error("ingestSimplePeerSignallingMsg() called when simplepeerConnection was not initilized!")}async toggleSimplePeerConnection(){if(!this.simplepeerConnection)throw new Error("toggleSimplePeerConnection() called without simplepeerConnection in class!");const e=this.simplepeerConnection.connectionState.get();ut("toggleSimplePeerConnection(): state",e),[at.disconnectedOk,at.failed,at.init].includes(e)?this.startSimplePeerConnection():this.simplepeerConnection.stop()}async sendMessageToRov(e,t=!1){if(!this.livekitConnection)throw new Error("sendMessageToRov() called before livekitConnection was initilized");t=!1;const n=Mn.RovAction.encode(e).finish(),s=this.livekitConnection._rovRoomName;Pt.DEBUG_MODE&&pn("Sending Message to ",s,t?"reliably":"unreliably",":",e),t&&this.livekitConnection.connectionState.get()===at.connected?await this.livekitConnection.sendMessage(n,t,[s]):this.simplepeerConnection&&this.simplepeerConnection.connectionState.get()===at.connected?await this.simplepeerConnection.sendMessage(n):await this.livekitConnection.sendMessage(n,!1,[s])}async disconnect(){this.simplepeerConnection&&await this.simplepeerConnection.stop(),this.livekitConnection&&await this.livekitConnection.close();for(const e in this._cleanupFuncs)this._cleanupFuncs[e]()}}const Vi=new wg;var we=(i=>(i.up="up",i.down="down",i.left="left",i.right="right",i))(we||{}),mi=(i=>(i.onOff="onOff",i.variable="variable",i))(mi||{}),vs=(i=>(i.real="real",i.emulated="emulated",i.overlay="overlay",i))(vs||{});function Cg(i,e,t){const n=Math.sqrt(i*i+e*e);return n>t?{x:i/n,y:e/n}:{x:i/t,y:e/t}}function Rg(i){if(i instanceof SVGGraphicsElement){i.getAttribute("transform")&&console.warn("VirtualGamepadLib: Setting Transform origin on an element that already has a transform attribute. This may break the transform!",i);const e=i.getBBox();i.style.transformOrigin=`${e.x+e.width/2}px ${e.y+e.height/2}px`}else if(i instanceof HTMLElement){console.warn("VirtualGamepadLib: Setting Transform origin on an element that is not an SVG element. This may break the transform!",i);const e=i.getBoundingClientRect();i.style.transformOrigin=`${e.width/2}px ${e.height/2}px`}}var Lg=Object.defineProperty,Ig=(i,e,t)=>e in i?Lg(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,ui=(i,e,t)=>Ig(i,typeof e!="symbol"?e+"":e,t);const Dd=18,Nd=4,Ud=class ya{constructor(e){if(ui(this,"getNativeGamepads"),ui(this,"buttonPressThreshold",.1),ui(this,"realGpadToPatchedIndexMap",[]),ui(this,"patchedGpadToRealIndexMap",[]),ui(this,"emulatedGamepads",[]),ui(this,"emulatedGamepadsMetadata",[]),ui(this,"undoEventPatch",()=>{}),this.buttonPressThreshold=e||this.buttonPressThreshold,ya.instanceRunning)throw new Error("Only one GamepadEmulator instance may exist at a time!");ya.instanceRunning=!0,this.undoEventPatch=this.monkeyPatchGamepadEvents(),this.monkeyPatchGetGamepads()}gamepadApiNativelySupported(){return!!this.getNativeGamepads&&!!this.getNativeGamepads.apply(navigator)}AddEmulatedGamepad(e,t,n=Dd,s=Nd){if((e===-1||!e&&e!==0)&&(e=this.nextEmptyEGpadIndex(t)),this.emulatedGamepads[e])return!1;const r={emulation:vs.emulated,connected:!0,timestamp:performance.now(),displayId:"Emulated Gamepad "+e,id:"Emulated Gamepad "+e+" (Xinput STANDARD GAMEPAD)",mapping:"standard",index:e,buttons:new Array(n).fill({pressed:!1,value:0,touched:!1},0,n),axes:new Array(s).fill(0,0,s),hapticActuators:[]};this.emulatedGamepads[e]=r,this.emulatedGamepadsMetadata[e]={overlayMode:t};const a=new Event("gamepadconnected");return a.gamepad=r,window.dispatchEvent(a),r}RemoveEmulatedGamepad(e){this.ClearDisplayButtonEventListeners(e),this.ClearDisplayJoystickEventListeners(e);var t=this.emulatedGamepads[e];if(t){delete this.emulatedGamepads[e],delete this.emulatedGamepadsMetadata[e];const n={...t,connected:!1,timestamp:performance.now()},s=new Event("gamepaddisconnected");s.gamepad=n,window.dispatchEvent(s)}else console.warn("GamepadEmulator Error: Cannot remove emulated gamepad. No emulated gamepad exists at index "+e)}PressButton(e,t,n,s){if(this.emulatedGamepads[e]===void 0)throw new Error("Error: PressButton() - no emulated gamepad at index "+e+", pass a valid index, or call AddEmulatedGamepad() first to create an emulated gamepad at that index");var r=n>this.buttonPressThreshold;this.emulatedGamepads[e].buttons[t]={pressed:r,value:n||0,touched:r||s||!1}}MoveAxis(e,t,n){if(!this.emulatedGamepads[e])throw new Error("Error: MoveAxis() - no emulated gamepad at index "+e+", pass a valid index, or call AddEmulatedGamepad() first to create an emulated gamepad at that index");this.emulatedGamepads[e].axes[t]=n}AddDisplayButtonEventListeners(e,t){if(!this.emulatedGamepads[e])throw new Error("Error: AddDisplayJoystickEventListeners() - no emulated gamepad at index "+e+", pass a valid index, or call AddEmulatedGamepad() first to create an emulated gamepad at that index");let n=[];for(var s=0;s<t.length;s++){const r=t[s],a=r.buttonIndex,o=r.tapTarget;if(!o){console.warn("GamepadEmulator: No tap target in gamepad "+e+" display config for button "+a+", skipping...");continue}const l=d=>{d.changedTouches[0].target==o&&d.preventDefault()};window.addEventListener("touchstart",l,{passive:!1});const c=d=>{const f=d.buttons==1?1:0;(!r.lockTargetWhilePressed||f==0)&&this.PressButton(e,a,f,!0)};o.addEventListener("pointerenter",c);const h=d=>{const f=d.buttons==1?1:0;(!r.lockTargetWhilePressed||f==0)&&this.PressButton(e,a,0,!1)};o.addEventListener("pointerleave",h);const u=d=>{};if(o.addEventListener("pointercancel",u),r.type==mi.onOff){const d=g=>{g.preventDefault(),this.PressButton(e,a,1,!0),r.lockTargetWhilePressed?o.setPointerCapture(g.pointerId):o.releasePointerCapture(g.pointerId)};o.addEventListener("pointerdown",d);const f=()=>{this.PressButton(e,a,0,!0)};o.addEventListener("pointerup",f),n.push(function(){window.removeEventListener("touchstart",l),o.removeEventListener("pointerenter",c),o.removeEventListener("pointerleave",h),o.removeEventListener("pointerdown",d),o.removeEventListener("pointerup",f),o.removeEventListener("pointercancel",u)})}else if(r.type==mi.variable){const d={...r},f=this.AddDragControlListener(d,(g,_,m)=>{let p=g?this.buttonPressThreshold+1e-5:0;p+=r.directions[we.left]||r.directions[we.right]?Math.abs(_):0,p+=r.directions[we.up]||r.directions[we.down]?Math.abs(m):0,this.PressButton(e,r.buttonIndex,Math.min(p,1),g)});n.push(function(){window.removeEventListener("touchstart",l),o.removeEventListener("pointerenter",c),o.removeEventListener("pointerleave",h),o.removeEventListener("pointercancel",u),f()})}}this.emulatedGamepadsMetadata[e].removeButtonListenersFunc=()=>{n.forEach(r=>r())}}AddDisplayJoystickEventListeners(e,t){if(!this.emulatedGamepads[e])throw new Error("Error: AddDisplayJoystickEventListeners() - no emulated gamepad at index "+e+", pass a valid index, or call AddEmulatedGamepad() first to create an emulated gamepad at that index");let n=[];for(let s=0;s<t.length;s++){const r=t[s];if(r.tapTarget==null){console.warn("GamepadEmulator: No tap target in gamepad "+e+" display config for joystick "+s+", skipping...");continue}const a=this.AddDragControlListener(r,(o,l,c)=>{r.xAxisIndex!==void 0&&this.MoveAxis(e,r.xAxisIndex,l),r.yAxisIndex!==void 0&&this.MoveAxis(e,r.yAxisIndex,c)});n.push(a)}this.emulatedGamepadsMetadata[e].removeJoystickListenersFunc=()=>{n.forEach(s=>s())}}ClearDisplayButtonEventListeners(e){var t;this.emulatedGamepadsMetadata[e]&&(t=this.emulatedGamepadsMetadata[e])!=null&&t.removeButtonListenersFunc&&this.emulatedGamepadsMetadata[e].removeButtonListenersFunc()}ClearDisplayJoystickEventListeners(e){var t;this.emulatedGamepadsMetadata[e]&&(t=this.emulatedGamepadsMetadata[e])!=null&&t.removeJoystickListenersFunc&&this.emulatedGamepadsMetadata[e].removeJoystickListenersFunc()}AddDragControlListener(e,t){let n={startX:0,startY:0},s=-1;const r=l=>{var c=l.pointerId;if(s===c){const h=e.directions[we.left]?-1:0,u=e.directions[we.right]?1:0,d=e.directions[we.up]?-1:0,f=e.directions[we.down]?1:0,g=l.clientX-n.startX,_=l.clientY-n.startY;let{x:m,y:p}=Cg(g,_,e.dragDistance);m=Math.max(Math.min(m,u),h),p=Math.max(Math.min(p,f),d),t(!0,m,p)}},a=l=>{s==l.pointerId&&(document.removeEventListener("pointermove",r,!1),document.removeEventListener("pointerup",a,!1),s=-1,t(!1,0,0))};e.tapTarget.addEventListener("pointerdown",l=>{l.preventDefault(),n.startX=l.clientX,n.startY=l.clientY,s=l.pointerId,e.lockTargetWhilePressed?e.tapTarget.setPointerCapture(l.pointerId):e.tapTarget.releasePointerCapture(l.pointerId),t(!0,0,0),document.addEventListener("pointermove",r,!1),document.addEventListener("pointerup",a,!1)});const o=l=>{l.changedTouches[0].target==e.tapTarget&&l.preventDefault()};return window.addEventListener("touchstart",o,{passive:!1}),function(){window.removeEventListener("touchstart",o),e.tapTarget.removeEventListener("pointerdown",r)}}cloneGamepad(e){if(!e)return e;const t=e.axes?e.axes.length:0,n=e.buttons?e.buttons.length:0,s={};for(let r in e)if(r==="axes"){const a=new Array(t);for(let o=0;o<t;o++)a[o]=Number(e.axes[o]);Object.defineProperty(s,"axes",{value:a,enumerable:!0})}else if(r==="buttons"){const a=new Array(n);for(let o=0;o<n;o++){const l=e.buttons[o];if(l==null)a[o]=l;else{const c=l.pressed,h=l.value,u=l.touched||!1;a[o]={pressed:c,value:h,touched:u}}}Object.defineProperty(s,"buttons",{value:a,enumerable:!0})}else Object.defineProperty(s,r,{get:()=>e[r],configurable:!0,enumerable:!0});return s.emulation||(s.emulation=vs.real),s}nextEmptyEGpadIndex(e){let t=0;if(e)do{if(!this.emulatedGamepads[t])break;t++}while(t<this.emulatedGamepads.length);else{const n=Math.max(this.emulatedGamepads.length,this.patchedGpadToRealIndexMap.length);do{if(!this.emulatedGamepads[t]&&this.patchedGpadToRealIndexMap[t]==null)break;t++}while(t<n)}return t}nextEmptyRealGpadIndex(e){let t=e;const n=Math.max(this.emulatedGamepads.length,this.patchedGpadToRealIndexMap.length);do{const s=this.emulatedGamepadsMetadata[t],r=this.realGpadToPatchedIndexMap[t]==null&&this.patchedGpadToRealIndexMap[t]==null;if(s&&s.overlayMode||!s&&r)break;t++}while(t<n);return t}monkeyPatchGamepadEvents(){let e,t,n,s;window.hasOwnProperty("ongamepadconnected")&&(e=Object.getOwnPropertyDescriptor(window,"ongamepadconnected"),n=window.ongamepadconnected,window.ongamepadconnected=null,Object.defineProperty(window,"ongamepadconnected",{get:()=>function(o){},set:o=>{n=o},configurable:!0})),window.hasOwnProperty("ongamepaddisconnected")&&(t=Object.getOwnPropertyDescriptor(window,"ongamepaddisconnected"),s=window.ongamepaddisconnected,window.ongamepaddisconnected=null,Object.defineProperty(window,"ongamepaddisconnected",{get:()=>function(o){},set:o=>{n=o},configurable:!0}));const r=o=>{const l=o.gamepad;if(l&&l.emulation===void 0){o.stopImmediatePropagation();const c=this.cloneGamepad(o.gamepad),h=c.index,u=this.nextEmptyRealGpadIndex(h);this.realGpadToPatchedIndexMap[h]=u,this.patchedGpadToRealIndexMap[u]=h,Object.defineProperty(c,"index",{get:()=>u}),Object.defineProperty(c,"emulation",{get:()=>vs.real});const d=new Event("gamepadconnected");d.gamepad=c,window.dispatchEvent(d)}n&&n.call(window,o)};window.addEventListener("gamepadconnected",r);const a=o=>{const l=o.gamepad;if(l&&l.emulation===void 0){o.stopImmediatePropagation();const c=this.cloneGamepad(o.gamepad),h=this.realGpadToPatchedIndexMap[c.index]||c.index;Object.defineProperty(c,"index",{get:()=>h}),delete this.realGpadToPatchedIndexMap[c.index],delete this.patchedGpadToRealIndexMap[h];const u=new Event("gamepaddisconnected");u.gamepad=c,window.dispatchEvent(o)}s&&s.call(window,o)};return window.addEventListener("gamepaddisconnected",a),function(){window.removeEventListener("gamepadconnected",r),window.hasOwnProperty("ongamepadconnected")&&(Object.defineProperty(window,"ongamepadconnected",e),window.ongamepadconnected=n),window.removeEventListener("gamepaddisconnected",a),window.hasOwnProperty("ongamepaddisconnected")&&(Object.defineProperty(window,"ongamepaddisconnected",t),window.ongamepaddisconnected=s)}}monkeyPatchGetGamepads(){const e=this;let t=navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads||navigator.msGetGamepads;this.getNativeGamepads=t,navigator.getNativeGamepads=t,navigator.getGamepads=function(){let n=[],s=t!=null?t.apply(navigator)||[]:[];for(let a=0;a<s.length;a++){const o=s[a];if(!o)continue;let l=e.cloneGamepad(o),c=e.realGpadToPatchedIndexMap[l.index]||l.index;Object.defineProperty(l,"index",{get:()=>c}),n[c]=l}let r=e.emulatedGamepads;for(let a=0;a<r.length;a++){let o=n[a],l=r[a];if(l&&o){o.emulation=vs.overlay;let c=Math.max(o.buttons.length,l.buttons.length);for(let u=0;u<c;u++){const d=l.buttons[u]||{touched:!1,pressed:!1,value:0},f=o.buttons[u]||{touched:!1,pressed:!1,value:0};n[a].buttons[u]={touched:d.touched||f.touched||!1,pressed:d.pressed||f.pressed||!1,value:Math.max(d.value,f.value)||0}}let h=Math.max(l.axes.length,o.axes.length);for(let u=0;u<h;u++){const d=l.axes[u]||0,f=o.axes[u]||0;n[a].axes[u]=Math.abs(d||0)>Math.abs(f||0)?d||0:f||0}}else l&&(l.emulation=vs.emulated,l.timestamp=performance.now(),n[a]=e.cloneGamepad(l))}return n}}cleanup(){for(let e=0;e<this.emulatedGamepads.length;e++)this.ClearDisplayButtonEventListeners(e),this.ClearDisplayJoystickEventListeners(e);this.emulatedGamepads=[],this.undoEventPatch(),this.getNativeGamepads?navigator.getGamepads=this.getNativeGamepads:Object.defineProperty(navigator,"getGamepads",{value:void 0,configurable:!0}),ya.instanceRunning=!1,delete navigator.getNativeGamepads}};ui(Ud,"instanceRunning",!1);let Pg=Ud;var Dg=Object.defineProperty,Ng=(i,e,t)=>e in i?Dg(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,ii=(i,e,t)=>Ng(i,typeof e!="symbol"?e+"":e,t);class Qo{constructor(e){ii(this,"updateDelay"),ii(this,"axisDeadZone"),ii(this,"buttonConfigs"),ii(this,"currentStateOfGamepads"),ii(this,"gamepadConnectListeners"),ii(this,"gamepadDisconnectListeners"),ii(this,"gamepadButtonChangeListeners"),ii(this,"gamepadAxisChangeListeners"),this.updateDelay=e.updateDelay||0,this.axisDeadZone=e.axisDeadZone||0,this.buttonConfigs=e.buttonConfigs||[],this.currentStateOfGamepads=[],this.gamepadConnectListeners=[],this.gamepadDisconnectListeners=[],this.gamepadButtonChangeListeners=[],this.gamepadAxisChangeListeners=[],navigator.gamepadInputEmulation="gamepad",window.requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame,navigator.getGamepads=navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads||navigator.msGetGamepads,this.gamepadApiSupported()&&this.tickLoop()}setButtonsConfig(e){this.buttonConfigs=e}setUpdateDelay(e){this.updateDelay=e}onGamepadConnect(e){return this.gamepadConnectListeners.push(e),window.addEventListener("gamepadconnected",e,!0),e}offGamepadConnect(e){this.gamepadConnectListeners=this.gamepadConnectListeners.filter(t=>t!==e),window.removeEventListener("gamepadconnected",e,!0)}onGamepadDisconnect(e){return this.gamepadDisconnectListeners.push(e),window.addEventListener("gamepaddisconnected",e,!0),e}offGamepadDisconnect(e){this.gamepadDisconnectListeners=this.gamepadDisconnectListeners.filter(t=>t!==e),window.removeEventListener("gamepaddisconnected",e,!0)}onGamepadAxisChange(e){return this.gamepadAxisChangeListeners.push(e),e}offGamepadAxisChange(e){this.gamepadAxisChangeListeners=this.gamepadAxisChangeListeners.filter(t=>t!==e)}onGamepadButtonChange(e){return this.gamepadButtonChangeListeners.push(e),e}offGamepadButtonChange(e){this.gamepadButtonChangeListeners=this.gamepadButtonChangeListeners.filter(t=>t!==e)}gamepadApiSupported(){const e=navigator.getNativeGamepads||navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads||navigator.msGetGamepads;if(e!=null&&typeof e=="function"){const t=e.apply(navigator);return t!=null&&t.length>0}else return!1}getGamepads(){const e=navigator.getGamepads||navigator.webkitGetGamepads||navigator.mozGetGamepads||navigator.msGetGamepads;return e&&typeof e=="function"?e.apply(navigator)||[]:[]}getCurrentGamepadStates(e=!1){return e&&this.checkForGamepadChanges(),this.currentStateOfGamepads}cleanup(){this.updateDelay=-1,this.gamepadConnectListeners.forEach(e=>window.removeEventListener("gamepadconnected",e,!0)),this.gamepadDisconnectListeners.forEach(e=>window.removeEventListener("gamepaddisconnected",e,!0)),this.gamepadConnectListeners=[],this.gamepadDisconnectListeners=[],this.gamepadButtonChangeListeners=[],this.gamepadAxisChangeListeners=[]}tickLoop(){this.updateDelay<0||(this.checkForGamepadChanges(),this.updateDelay==0?requestAnimationFrame(this.tickLoop.bind(this)):setTimeout(()=>{requestAnimationFrame(this.tickLoop.bind(this))},this.updateDelay))}checkForGamepadChanges(){let e=this.getGamepads();for(var t=0;t<e.length;t++){let n=e[t];n&&(this.currentStateOfGamepads[t]||(this.currentStateOfGamepads[t]=n),this.checkForAxisChanges(t,n),this.checkForButtonChanges(t,n),this.currentStateOfGamepads[t]=n)}}checkForAxisChanges(e,t){let n=t.axes;if(n.length==0)return;let s=this.currentStateOfGamepads[e].axes||[],r=[],a,o=!1;for(a=0;a<n.length;a++){let l=n[a]||0,c=s[a]||0;if(l!=c){if(Math.abs(l)<this.axisDeadZone&&Math.abs(c)<this.axisDeadZone)continue;r[a]=!0,o=!0}else r[a]=!1}o&&this.gamepadAxisChangeListeners.forEach(l=>l(e,t,r))}checkForButtonChanges(e,t){let n=t.buttons;if(n.length==0)return;const s=this.currentStateOfGamepads[e].buttons||n,r=[];let a,o=!1;for(a=0;a<n.length;a++){let l=!1;const c=n[a]||{pressed:!1,value:0,touched:!1},h=s[a]||{pressed:!1,value:0,touched:!1},u=this.buttonConfigs[a]||{},d={};c.touched&&!h.touched?(d.touchDown=!0,l=!0):!c.touched&&h.touched&&(d.touchUp=!0,l=!0),c.pressed&&!h.pressed?(d.pressed=!0,l=!0):!c.pressed&&h.pressed&&(d.released=!0,l=!0),u.fireWhileHolding&&c.pressed&&h.pressed&&(d.heldDown=!0,l=!0),c.value!=h.value&&(d.valueChanged=!0,l=!0),l?(o=!0,r[a]=d):r[a]=!1}o&&this.gamepadButtonChangeListeners.forEach(l=>l(e,t,r))}}var Ug=Object.defineProperty,Fg=(i,e,t)=>e in i?Ug(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t,Ri=(i,e,t)=>Fg(i,typeof e!="symbol"?e+"":e,t);class Og{constructor(e,t){Ri(this,"config"),Ri(this,"apiWrapper"),Ri(this,"btnChangeListener"),Ri(this,"axisChangeListener"),Ri(this,"DefaultJoystickDisplayFunction",(n,s,r)=>{const a=n.movementRange;if(n.joystickElement.style.transform=`translate(${s*a}px,${r*a}px)`,n.highlights&&this.config.moveDirectionHighlightClass){const o=n.highlights[we.up],l=n.highlights[we.down],c=n.highlights[we.left],h=n.highlights[we.right];o&&r<-.1?o.classList.add(this.config.moveDirectionHighlightClass||""):o&&o.classList.remove(this.config.moveDirectionHighlightClass||""),l&&r>.1?l.classList.add(this.config.moveDirectionHighlightClass||""):l&&l.classList.remove(this.config.moveDirectionHighlightClass||""),c&&s<-.1?c.classList.add(this.config.moveDirectionHighlightClass||""):c&&c.classList.remove(this.config.moveDirectionHighlightClass||""),h&&s>.1?h.classList.add(this.config.moveDirectionHighlightClass||""):h&&h.classList.remove(this.config.moveDirectionHighlightClass||"")}}),Ri(this,"DefaultButtonDisplayFunction",(n,s,r,a,o,l)=>{const c=n.highlight;if(this.config.touchedHighlightClass&&c&&(o.touchDown?c.classList.add(this.config.touchedHighlightClass):o.touchUp&&c.classList.remove(this.config.touchedHighlightClass)),this.config.pressedHighlightClass&&c&&(o.pressed?c.classList.add(this.config.pressedHighlightClass):o.released&&c.classList.remove(this.config.pressedHighlightClass)),n.type==mi.variable){const h=n.directionHighlight;if(this.config.moveDirectionHighlightClass&&h&&(o.pressed?h.classList.add(this.config.moveDirectionHighlightClass):o.released&&h.classList.remove(this.config.moveDirectionHighlightClass)),n.buttonElement){const u=n.direction==we.left||n.direction==we.right,d=n.direction==we.right||n.direction==we.down;n.buttonElement.style.transform=`translate${u?"X":"Y"}(${d?"":"-"}${s*n.movementRange}px)`}}}),Ri(this,"displayButtonChanges",(n,s,r)=>{if(n!=this.config.gamepadIndex)return;const a=this.config.buttons;for(let o=0;o<a.length;o++){const l=a[o],c=r[o];if(!l||Object.keys(l).length==0||!c||Object.keys(c).length==0)continue;const h=s.buttons[o].value,u=s.buttons[o].touched,d=s.buttons[o].pressed;this.config.buttonDisplayFunction?this.config.buttonDisplayFunction(l,h,u,d,c,o):this.DefaultButtonDisplayFunction(l,h,u,d,c,o)}}),this.config=e,this.apiWrapper=t||new Qo({buttonConfigs:[],updateDelay:0}),this.btnChangeListener=this.apiWrapper.onGamepadButtonChange(this.displayButtonChanges.bind(this)),this.axisChangeListener=this.apiWrapper.onGamepadAxisChange(this.displayJoystickChanges.bind(this))}displayJoystickChanges(e,t,n){if(e!=this.config.gamepadIndex)return;const s=this.config.sticks;for(let r=0;r<s.length;r++){const a=s[r];if(a!=null&&(a.xAxisIndex!==void 0&&n[a.xAxisIndex]||a.yAxisIndex!==void 0&&n[a.yAxisIndex])){const o=t.axes,l=a.xAxisIndex!==void 0&&o[a.xAxisIndex]||0,c=a.yAxisIndex!==void 0&&o[a.yAxisIndex]||0;this.config.joystickDisplayFunction?this.config.joystickDisplayFunction(a,l,c):this.DefaultJoystickDisplayFunction(a,l,c)}}}Cleanup(){this.apiWrapper.offGamepadButtonChange(this.btnChangeListener),this.apiWrapper.offGamepadAxisChange(this.axisChangeListener)}}class Bg{constructor(){oe(this,"gpadButtonHighlightElements");oe(this,"gamepadContainer");oe(this,"gamepadHelpTooltip");oe(this,"gamepadHelpTooltipText");oe(this,"defaultTooltipTarget");oe(this,"tooManyGamepadsNotice");oe(this,"currentPopperTarget");oe(this,"touchingButtonsCount",0);oe(this,"someAxiesNotCentered",!1);oe(this,"someButtonsPressed",!1);oe(this,"gamepadHelpVisible",!1);oe(this,"cleanupTooltip")}start(){this.gamepadContainer=document.getElementById("gamepad-container"),this.gpadButtonHighlightElements=_a.map(e=>document.getElementById(e+"_highlight")),this.gamepadHelpTooltip=document.querySelector("#gamepad-help-tooltip"),this.gamepadHelpTooltipText=document.querySelector("#gamepad-help-text"),this.defaultTooltipTarget=document.querySelector("#select_button"),this.tooManyGamepadsNotice=document.getElementById("too-many-gamepads-notice"),this.currentPopperTarget=this.defaultTooltipTarget}toggleGamepadHelpScreen(){this.gamepadHelpVisible=!this.gamepadHelpVisible,this.gamepadHelpVisible?(document.body.classList.add("gamepad-help-open"),document.body.classList.remove("driving-now")):document.body.classList.remove("gamepad-help-open")}showNotSupported(){alert("Game controllers are not supported in your browser! Use keyboard or mouse/touch controls or switch to a more modern browser.")}handleGamepadVisualFeedbackAxisEvents(e,t){e.forEach(s=>{let r=s.thumbStickElement,a=s.axisRange,o=s.xValue||0,l=s.yValue||0;r.style.transform=`rotateY(${-o*30}deg) rotateX(${l*30}deg) translate(${o*a}px,${l*a}px)`,this.gamepadHelpVisible&&(s.upIndicatorElement&&s.downIndicatorElement&&(Math.abs(o)<t?l<-t?(s.upIndicatorElement.style.opacity=Math.max(-l,0),s.downIndicatorElement.style.opacity=0):l>t?(s.upIndicatorElement.style.opacity=0,s.downIndicatorElement.style.opacity=Math.max(l,0)):(s.upIndicatorElement.style.opacity=0,s.downIndicatorElement.style.opacity=0):(s.upIndicatorElement.style.opacity=0,s.downIndicatorElement.style.opacity=0)),s.leftIndicatorElement&&s.rightIndicatorElement&&(Math.abs(l)<t?o<-t?(s.leftIndicatorElement.style.opacity=Math.max(-o,0),s.rightIndicatorElement.style.opacity=0):o>t?(s.leftIndicatorElement.style.opacity=0,s.rightIndicatorElement.style.opacity=Math.max(o,0)):(s.leftIndicatorElement.style.opacity=0,s.rightIndicatorElement.style.opacity=0):(s.leftIndicatorElement.style.opacity=0,s.rightIndicatorElement.style.opacity=0)))});let n=e.reduce((s,r)=>s+Math.abs(r.xValue)+Math.abs(r.yValue)>.05?1:0,0);!this.gamepadHelpVisible&&n>0&&this.someAxiesNotCentered==!1?(this.someAxiesNotCentered=!0,this.setGamepadVisability()):this.someAxiesNotCentered==!0&&n==0&&(this.someAxiesNotCentered=!1,this.setGamepadVisability())}setGamepadVisability(){!this.gamepadHelpVisible&&(this.someAxiesNotCentered||this.someButtonsPressed)?document.body.classList.add("driving-now"):document.body.classList.remove("driving-now")}setGamepadButtonClass(e,t){let n=t[e],s=this.gpadButtonHighlightElements[e];!n||!s||(n.touched?s.classList.add(Ic):s.classList.remove(Ic),n.pressed?s.classList.add(Pc):s.classList.remove(Pc))}handleGamepadVisualFeedbackButtonEvents(e){let t=0;for(let n=0;n<e.length;n++)this.setGamepadButtonClass(n,e),t+=e[n].pressed?1:0;!this.gamepadHelpVisible&&t>0&&this.someButtonsPressed==!1?(this.someButtonsPressed=!0,this.setGamepadVisability()):this.someButtonsPressed==!0&&(this.someButtonsPressed=!1,this.setGamepadVisability())}handleGamepadVisualFeedbackVariableTriggerButtonEvents(e,t){for(let n=0;n<t.length;n++){const s=t[n],r=s.buttonIndex;this.setGamepadButtonClass(r,e);let a=e[r]?e[r].value:0;s.buttonElement.style.transform=`rotateX(${a*30}deg) translateY(${a*s.axisRange}px)`}}getButtonHighlightElements(){return ut("getButtonHighlightElements",this.gpadButtonHighlightElements),this.gpadButtonHighlightElements}}function kg(i){let e=Number(i[0].toFixed(3)),t=-1*Number(i[1].toFixed(3)),n=Number(i[2].toFixed(3)),s=-1*Number(i[3].toFixed(3));return{VelocityX:t,VelocityY:n,VelocityZ:s,AngularVelocityYaw:e}}class zg{constructor(){oe(this,"requiredMsgsLoopIntervalId",null);oe(this,"lastMove",{VelocityX:0,VelocityY:0,VelocityZ:0,AngularVelocityYaw:0,ButtonBitmask:0});oe(this,"lastMovementTime",0);oe(this,"lastPingTime",0);oe(this,"triggerNextFlightModeUi",null);oe(this,"shutdownRov",()=>{Or("Shutdown the ROV?","",()=>{st("Sending Shutdown Request...",2e3,!1,rt.info),this.sendActionAndWaitForDone({ShutdownRov:{}},e=>{e.Error?st("ROV Shutdown Error: "+e.Error.Message,5e3,!1,rt.error):e.Done&&(st("Please wait 20 seconds before unplugging. ROV: "+e.Done.Message,8e3,!1,rt.success),Vi.disconnect())})})});oe(this,"rebootRov",()=>{Or("Reboot the ROV?","The ROV will stop responding for about two minutes and then you can re-connect.",()=>{st("Sending Reboot Request...",2e3,!1,rt.info),this.sendActionAndWaitForDone({RebootRov:{}},e=>{e.Error?st("ROV Reboot Error: "+e.Error.Message,5e3,!1,rt.error):e.Done&&(st("Press Connect again in about 30 seconds ROV: "+e.Done.Message,8e3,!1,rt.success),st("ROV: "+e.Done.Message),Vi.disconnect())})})});oe(this,"restartRovServices",()=>{Or("Restart ROV services?","The ROV will stop responding for about a minute and then you can re-connect.",()=>{let e=this.showCommandOutputPopup("Restarting ROV Services",`Sending Service Restart Request (Please Wait)...
`,`

Done.`);Tt.sendRovMessage({RestartRovServices:{}},e)})});oe(this,"getRovStatusReport",()=>{let e=this.showCommandOutputPopup("ROV Status Report",`Sending Status Request (Please Wait)...
`,`

Done.`);Tt.sendRovMessage({RovStatusReport:{}},e)});oe(this,"getRovLogs",()=>{let e=this.showCommandOutputPopup("ROV Logs",`Sending Request (Please Wait)...
`,`

Done.`);Tt.sendRovMessage({RovLogs:{}},e)});oe(this,"enableRovWifi",()=>{st("Sending Enable Wifi Command...",2e3,!1,rt.info),this.sendActionAndWaitForDone({EnableWifi:{}},e=>{e.Error?st("Enable Wifi Error: "+e.Error.Message,8e3,!1,rt.error):e.Done&&st("Wifi Enable: "+e.Done.Message,2e3,!1,rt.success)})});oe(this,"disableRovWifi",()=>{Or("Are you sure you want to disable rov wifi?","If the ROV is connected via wifi, <em>don't do this!</em>",()=>{st("Sending Disable Wifi Command...",2e3,!1,rt.info),this.sendActionAndWaitForDone({DisableWifi:{}},e=>{e.Error?st("Disable Wifi Error: "+e.Error.Message,8e3,!1,rt.error):e.Done&&st("Wifi Disable: "+e.Done.Message,2e3,!1,rt.success)})})})}gamepadButtonTriggers(e,t){const n=cn.A,s=cn.B;cn.X;const r=cn.Y,a=cn.LT,o=cn.RT,l=cn.RB,c=cn.LB,h=cn.LSTICK,u=cn.RSTICK,d=cn.SELECT;if(t[c]&&t[c].released?(Js.update(_=>Math.min(Math.max(10,_-10),100)),st("Throttle "+Js.get()+"%",1e3,!1,rt.info)):t[l]&&t[l].released&&(Js.update(_=>Math.min(Math.max(10,_+10),100)),st("Throttle "+Js.get()+"%",1e3,!1,rt.info)),t[r]&&t[r].released&&this.triggerNextFlightModeUi&&this.triggerNextFlightModeUi(1),t[d]&&t[d].released&&ep(),An.get())return;(t[a]||t[o])&&(t[a]&&e.buttons[a].value,t[o]&&e.buttons[o].value),t[n]&&t[n].released?this.takeControl():t[s]&&t[s].released&&this.disarm();const f=[n,s,a,o,c,l,h,u],g=t.map((_,m)=>_===!1||f.includes(m)?!1:_.pressed||_.heldDown);this.sendButtonsToRov(g)}gamepadAxisTriggers(e){const t=Js.get()/100,{VelocityX:n,VelocityY:s,VelocityZ:r,AngularVelocityYaw:a}=kg(e.axes);n==0&&s==0&&r==0&&a==0&&vi("GAMEPAD MOTION: STOPed"),this.moveRov(n*t,s*t,r*t,a*t)}sendActionAndWaitForDone(e,t){Tt.sendRovMessage(e,n=>{t&&(n.Done||n.Error||n.ContinuedOutput)&&t(n)})}startRequiredMsgLoop(){this.requiredMsgsLoopIntervalId||(this.requiredMsgsLoopIntervalId=Number(setInterval(()=>{if(Vi.connectionState.get()!=at.connected)return;const e=Date.now();e-this.lastPingTime>tp&&(Tt.sendRovMessage({Ping:{Time:Date.now()}},null),this.lastPingTime=e),e-this.lastMovementTime>np&&(Tt.sendRovMessage({Move:this.lastMove},null),this.lastMovementTime=e)},10)))}stopRequiredMsgLoop(){clearInterval(this.requiredMsgsLoopIntervalId),this.requiredMsgsLoopIntervalId=null}showCommandOutputPopup(e,t,n){let s=Ap(e,"",null);return s(t),r=>{r.ContinuedOutput?s(r.ContinuedOutput.Message+`
`):r.Done?s(r.Done.Message+`
`+n):r.Error&&s(r.Error.Message+`
`)}}takeControl(){An.get()||Tt.sendRovMessage({TakeControl:{}},null)}disarm(){An.get()||Tt.sendRovMessage({Disarm:{}},null)}setFlightMode(e){An.get()||Tt.sendRovMessage({SetAutopilotMode:{mode:e}},null)}moveRov(e,t,n,s,r=-1){const a=r===-1?this.lastMove.ButtonBitmask:r;e-this.lastMove.VelocityX+(t-this.lastMove.VelocityY)+(n-this.lastMove.VelocityZ)+(s-this.lastMove.AngularVelocityYaw),va.set({VelocityX:e,VelocityY:t,VelocityZ:n,AngularVelocityYaw:s,ButtonBitmask:a}),!An.get()&&(Tt.sendRovMessage({Move:va.get()},null),this.lastMove=va.get(),this.lastMovementTime=Date.now())}sendButtonsToRov(e){const t=this.lastMove.VelocityX,n=this.lastMove.VelocityY,s=this.lastMove.VelocityZ,r=this.lastMove.AngularVelocityYaw,a=e.reduce((l,c,h)=>(c&&(l|=1<<ip[h]),l),0),o=Date.now()-this.lastMovementTime;this.lastMove.ButtonBitmask===a&&o<700||An.get()||(Tt.sendRovMessage({Move:{VelocityX:t,VelocityY:n,VelocityZ:s,AngularVelocityYaw:r,ButtonBitmask:a}},null),this.lastMove.ButtonBitmask=a,this.lastMovementTime=Date.now())}refreshAllSensorData(){Tt.sendRovMessage({RefreshAllSensors:{}},null)}toggleLights(){An.get()||Tt.sendRovMessage({ToogleLights:{}},null)}takePhoto(){An.get()||Tt.sendRovMessage({TakePhoto:{}},null)}startVideoRecording(){An.get()||Tt.sendRovMessage({StartVideoRec:{}},null)}stopVideoRecording(){An.get()||Tt.sendRovMessage({StopVideoRec:{}},null)}}const Vr=new zg;function th(i,e,t){const n=i.slice();return n[1]=e[t],n}function nh(i){let e,t=i[1].label+"",n,s,r,a,o,l,c;return{c(){e=di("div"),n=kf(t),s=fr(),r=di("div"),a=fr(),this.h()},l(h){e=fi(h,"DIV",{class:!0,"data-popup":!0});var u=Wt(e);n=zf(u,t),s=pr(u),r=fi(u,"DIV",{class:!0}),Wt(r).forEach(ct),a=pr(u),u.forEach(ct),this.h()},h(){Ft(r,"class","arrow variant-filled popper-tooltip-arrow"),Ft(e,"class","card px-4 py-2 opacity-95 font-bold max-w[40px] variant-filled z-40 pointer-events-none select-none"),Ft(e,"data-popup",o=i[1].id)},m(h,u){Rn(h,e,u),fn(e,n),fn(e,s),fn(e,r),fn(e,a),c=!0},p(h,u){(!c||u&1)&&t!==(t=h[1].label+"")&&Vf(n,t),(!c||u&1&&o!==(o=h[1].id))&&Ft(e,"data-popup",o)},i(h){c||(h&&ku(()=>{c&&(l||(l=Ca(e,Ra,{duration:1e3},!0)),l.run(1))}),c=!0)},o(h){h&&(l||(l=Ca(e,Ra,{duration:1e3},!1)),l.run(0)),c=!1},d(h){h&&ct(e),h&&l&&l.end()}}}function Vg(i){let e,t,n=bc(i[0]),s=[];for(let a=0;a<n.length;a+=1)s[a]=nh(th(i,n,a));const r=a=>Tc(s[a],1,1,()=>{s[a]=null});return{c(){for(let a=0;a<s.length;a+=1)s[a].c();e=Sc()},l(a){for(let o=0;o<s.length;o+=1)s[o].l(a);e=Sc()},m(a,o){for(let l=0;l<s.length;l+=1)s[l]&&s[l].m(a,o);Rn(a,e,o),t=!0},p(a,[o]){if(o&1){n=bc(a[0]);let l;for(l=0;l<n.length;l+=1){const c=th(a,n,l);s[l]?(s[l].p(c,o),to(s[l],1)):(s[l]=nh(c),s[l].c(),to(s[l],1),s[l].m(e.parentNode,e))}for(Hf(),l=n.length;l<s.length;l+=1)r(l);Wf()}},i(a){if(!t){for(let o=0;o<n.length;o+=1)to(s[o]);t=!0}},o(a){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)Tc(s[o]);t=!1},d(a){a&&ct(e),Of(s,a)}}}let Jo=Xt([]);const Gg=async(i,e,t)=>{let n,s,r;return Jo.update(a=>(s="TT-"+String(a.length),t=Object.assign({event:"hover",target:s,delay:1500,placement:"left",middleware:{autoPlacement:{autoAlignment:!1,crossAxis:!0,allowedPlacements:["left","right"]}}},t),r=a.length,a.push({id:s,label:e,config:t}),a)),await Ku(1),n=sp(i,t),Jo.get()[r].actions=n,n};function Hg(i,e,t){let n;return Bf(i,Jo,s=>t(0,n=s)),[n]}class XE extends Qn{constructor(e){super(),Jn(this,e,Hg,Vg,Zn,{})}}const ih=0,sh=1,rh=2,ah=3,Wg=0,er=[];class Xg{constructor(){oe(this,"gpadUi");oe(this,"gpadEmulator");oe(this,"gpadApiWrapper");oe(this,"touchedGpadButtonCount",0);oe(this,"onAxisChange");oe(this,"onButtonChange");this.gpadUi=new Bg,this.touchedGpadButtonCount=0,this.gpadEmulator=new Pg(.1)}start(e,t){this.gpadUi.start(),new Qo({}).gamepadApiSupported()||this.gpadUi.showNotSupported(),this.gpadApiWrapper=new Qo({axisDeadZone:.05,updateDelay:28,buttonConfigs:no}),this.onAxisChange=e,this.onButtonChange=t,this.gpadApiWrapper.onGamepadConnect(this.gamepadConnectDisconnectHandler.bind(this)),this.gpadApiWrapper.onGamepadDisconnect(this.gamepadConnectDisconnectHandler.bind(this)),this.gpadApiWrapper.onGamepadAxisChange(this.handleAxisChange.bind(this)),this.gpadApiWrapper.onGamepadButtonChange(this.handleButtonChange.bind(this))}setupOnscreenGamepad(e){this.gpadEmulator.AddEmulatedGamepad(0,!0,Dd,Nd),this.setupGamepadDisplay(0,e),this.setupEmulatedGamepadInput(0,e),this.addEmulatedGamepadKeyboardBindings(0),this.addHelpTooltips()}gamepadConnectDisconnectHandler(){const e=navigator.getGamepads();let t=e.reduce((n,s)=>s?n+1:n,0);t!=0&&e[0].emulated&&(t-=1),t>1&&log("WARNING: More than one gamepad connected!",e)}handleButtonChange(e,t,n){if(!(e!=0||!t||!t.buttons)){this.onButtonChange&&this.onButtonChange(t,n);for(let s=0;s<n.length;s++)n[s]&&n[s].touchDown?er[s]&&er[s].open():n[s]&&n[s].touchUp&&er[s]&&er[s].close()}}handleAxisChange(e,t){if(e!=0||!t||!t.axes)return;this.onAxisChange&&this.onAxisChange(t);const n=[{axisRange:14,xValue:t.axes[0]||0,yValue:t.axes[1]||0,thumbStickElement:document.getElementById("stick_left"),upIndicatorElement:document.getElementById("l_stick_up_direction_highlight"),downIndicatorElement:document.getElementById("l_stick_down_direction_highlight"),leftIndicatorElement:document.getElementById("l_stick_left_direction_highlight"),rightIndicatorElement:document.getElementById("l_stick_right_direction_highlight"),upHelpText:"Forward",downHelpText:"Back",leftHelpText:"Turn Left",rightHelpText:"Turn Right"},{axisRange:14,xValue:t.axes[2]||0,yValue:t.axes[3]||0,thumbStickElement:document.getElementById("stick_right"),upIndicatorElement:document.getElementById("r_stick_up_direction_highlight"),downIndicatorElement:document.getElementById("r_stick_down_direction_highlight"),leftIndicatorElement:document.getElementById("r_stick_left_direction_highlight"),rightIndicatorElement:document.getElementById("r_stick_right_direction_highlight"),upHelpText:"Up",downHelpText:"Down",leftHelpText:"Strafe Left",rightHelpText:"Strafe Right"}];this.gpadUi.handleGamepadVisualFeedbackAxisEvents(n,.4)}setupGamepadDisplay(e,t){t.querySelectorAll("#stick_right, #stick_left").forEach(r=>{Rg(r)});const n=_a.map((r,a)=>r.includes("trigger")?{type:mi.variable,highlight:t.querySelector("#"+r+"_highlight"),buttonElement:t.querySelector("#"+r),direction:we.down,directionHighlight:t.querySelector("#"+r+"_direction_highlight"),movementRange:10}:{type:mi.onOff,highlight:t.querySelector("#"+r+"_highlight")}),s=[{joystickElement:t.querySelector("#stick_left"),xAxisIndex:0,yAxisIndex:1,movementRange:10,highlights:{[we.up]:t.querySelector("#l_stick_up_direction_highlight"),[we.down]:t.querySelector("#l_stick_down_direction_highlight"),[we.left]:t.querySelector("#l_stick_left_direction_highlight"),[we.right]:t.querySelector("#l_stick_right_direction_highlight")}},{joystickElement:t.querySelector("#stick_right"),xAxisIndex:2,yAxisIndex:3,movementRange:10,highlights:{[we.up]:t.querySelector("#r_stick_up_direction_highlight"),[we.down]:t.querySelector("#r_stick_down_direction_highlight"),[we.left]:t.querySelector("#r_stick_left_direction_highlight"),[we.right]:t.querySelector("#r_stick_right_direction_highlight")}}];new Og({gamepadIndex:e,pressedHighlightClass:"pressed",touchedHighlightClass:"touched",moveDirectionHighlightClass:"moved",buttons:n,sticks:s},this.gpadApiWrapper)}setupEmulatedGamepadInput(e,t){const n=_a.map((r,a)=>r.includes("trigger")?{type:mi.variable,buttonIndex:a,tapTarget:t.querySelector("#"+r+"_touch_target"),dragDistance:50,lockTargetWhilePressed:!0,directions:{[we.up]:!1,[we.down]:!0,[we.left]:!1,[we.right]:!1}}:{type:mi.onOff,buttonIndex:a,lockTargetWhilePressed:r.includes("stick"),tapTarget:t.querySelector("#"+r+"_touch_target")});this.gpadEmulator.AddDisplayButtonEventListeners(e,n);const s=[{tapTarget:t.querySelector("#gamepad-joystick-touch-area-left"),dragDistance:30,xAxisIndex:0,yAxisIndex:1,lockTargetWhilePressed:!0,directions:{[we.up]:!0,[we.down]:!0,[we.left]:!0,[we.right]:!0}},{tapTarget:t.querySelector("#gamepad-joystick-touch-area-right"),dragDistance:30,xAxisIndex:2,yAxisIndex:3,lockTargetWhilePressed:!0,directions:{[we.up]:!0,[we.down]:!0,[we.left]:!0,[we.right]:!0}},{tapTarget:t.querySelector("#stick_button_left_touch_target"),dragDistance:30,xAxisIndex:0,yAxisIndex:1,lockTargetWhilePressed:!0,directions:{[we.up]:!0,[we.down]:!0,[we.left]:!0,[we.right]:!0}},{tapTarget:t.querySelector("#stick_button_right_touch_target"),dragDistance:30,xAxisIndex:2,yAxisIndex:3,lockTargetWhilePressed:!0,directions:{[we.up]:!0,[we.down]:!0,[we.left]:!0,[we.right]:!0}}];this.gpadEmulator.AddDisplayJoystickEventListeners(e,s)}addEmulatedGamepadKeyboardBindings(e){const t=(n,s)=>{const r=["INPUT","TEXTAREA","SELECT","OPTION"];if(s.target&&r.includes(s.target.tagName))return;const a=parseInt(s.key),o=s.key.toLowerCase();s.key==="Space"&&n&&this.gpadEmulator.PressButton(e,Wg,1,!0),o==="a"?this.gpadEmulator.MoveAxis(e,ih,n?-1:0):o==="d"?this.gpadEmulator.MoveAxis(e,ih,n?1:0):o==="w"?this.gpadEmulator.MoveAxis(e,sh,n?-1:0):o==="s"?this.gpadEmulator.MoveAxis(e,sh,n?1:0):s.key==="ArrowLeft"?(this.gpadEmulator.MoveAxis(e,rh,n?-1:0),s.preventDefault()):s.key==="ArrowRight"?(this.gpadEmulator.MoveAxis(e,rh,n?1:0),s.preventDefault()):s.key==="ArrowUp"?(this.gpadEmulator.MoveAxis(e,ah,n?-1:0),s.preventDefault()):s.key==="ArrowDown"?(this.gpadEmulator.MoveAxis(e,ah,n?1:0),s.preventDefault()):isNaN(a)?s.keyCode&&this.gpadEmulator.PressButton(e,s.keyCode-66+9,n?1:0,n):this.gpadEmulator.PressButton(e,Math.max(a-1,0),n?1:0,n)};window.onkeydown=n=>t(!0,n),window.onkeyup=n=>t(!1,n)}testGamepadJoysticks(){setInterval(()=>{this.gpadEmulator.MoveAxis(0,0,Math.random()*2-1),this.gpadEmulator.MoveAxis(0,1,Math.random()*2-1),this.gpadEmulator.MoveAxis(0,2,Math.random()*2-1),this.gpadEmulator.MoveAxis(0,3,Math.random()*2-1)},10)}addHelpTooltips(){_a.forEach(async(e,t)=>{const n=document.getElementById(e+"_touch_target");n&&(er[t]=await Gg(n,no[t].helpLabel,{placement:no[t].tooltipPlacement}))})}cleanup(){this.gpadUi.cleanupTooltip&&this.gpadUi.cleanupTooltip()}}const $o=new Xg;function qg(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let Kg='<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>',oh='<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>',Yg='<path d="M9.29 6.71a.996.996 0 0 0 0 1.41L13.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01z"/>',jg='<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>',Zg='<path d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>';function Qg(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=Kg;break;case"outlined":h=oh;break;case"round":h=Yg;break;case"sharp":h=jg;break;case"two-tone":h=Zg;break;default:h=oh}let{ariaLabel:u="chevron right"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class qE extends Qn{constructor(e){super(),Jn(this,e,Qg,qg,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}function Jg(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let $g='<path d="M20.13 5.41 18.72 4l-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66zM5 18h14v2H5z"/>',lh='<path d="M5 18h14v2H5v-2zm4.6-2.7L5 10.7l2-1.9 2.6 2.6L17 4l2 2-9.4 9.3z"/>',e0='<path d="M6 18h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1zm5.01-4.1a2 2 0 0 1-2.82-.01L6 11.7c-.55-.55-.54-1.44.03-1.97.54-.52 1.4-.5 1.92.02L9.6 11.4l6.43-6.43c.54-.54 1.41-.54 1.95 0l.04.04c.54.54.54 1.42-.01 1.96l-7 6.93z"/>',t0='<path d="M5 18h14v2H5v-2zm4.6-2.7L5 10.7l2-1.9 2.6 2.6L17 4l2 2-9.4 9.3z"/>',n0='<path d="M5 18h14v2H5v-2zm4.6-2.7L5 10.7l2-1.9 2.6 2.6L17 4l2 2-9.4 9.3z"/>';function i0(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=$g;break;case"outlined":h=lh;break;case"round":h=e0;break;case"sharp":h=t0;break;case"two-tone":h=n0;break;default:h=lh}let{ariaLabel:u="download done"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class KE extends Qn{constructor(e){super(),Jn(this,e,i0,Jg,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}function s0(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let r0='<path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>',ch='<path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>',a0='<path d="M19 9H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1z"/>',o0='<path d="M20 9H4v2h16V9zM4 15h16v-2H4v2z"/>',l0='<path d="M4 9h16v2H4zm0 4h16v2H4z"/>';function c0(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=r0;break;case"outlined":h=ch;break;case"round":h=a0;break;case"sharp":h=o0;break;case"two-tone":h=l0;break;default:h=ch}let{ariaLabel:u="drag handle"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class YE extends Qn{constructor(e){super(),Jn(this,e,c0,s0,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}function h0(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let u0='<path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/>',hh='<path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/>',d0='<path d="M20.5 19h-17c-.55 0-1 .45-1 1s.45 1 1 1h17c.55 0 1-.45 1-1s-.45-1-1-1zM3.51 11.61l15.83 4.24c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.58-8.45a1.08 1.08 0 0 0-.75-.73c-.68-.18-1.35.33-1.35 1.04v6.88L5.15 8.95 4.4 7.09a.991.991 0 0 0-.67-.59l-.33-.09a.495.495 0 0 0-.63.48v3.75c0 .46.3.85.74.97z"/>',f0='<path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/>',p0='<path d="M2.5 19h19v2h-19v-2zm16.84-3.15c.8.21 1.62-.26 1.84-1.06.21-.8-.26-1.62-1.06-1.84l-5.31-1.42-2.76-9.02L10.12 2v8.28L5.15 8.95l-.93-2.32-1.45-.39v5.17l16.57 4.44z"/>';function m0(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=u0;break;case"outlined":h=hh;break;case"round":h=d0;break;case"sharp":h=f0;break;case"two-tone":h=p0;break;default:h=hh}let{ariaLabel:u="flight land"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class jE extends Qn{constructor(e){super(),Jn(this,e,m0,h0,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}function g0(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let _0='<path d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/>',uh='<path d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/>',v0='<path d="M6.56 7.98C6.1 7.52 5.31 7.6 5 8.17c-.28.51-.5 1.03-.67 1.58-.19.63.31 1.25.96 1.25h.01c.43 0 .82-.28.94-.7.12-.4.28-.79.48-1.17.22-.37.15-.84-.16-1.15zM5.31 13h-.02c-.65 0-1.15.62-.96 1.25.16.54.38 1.07.66 1.58.31.57 1.11.66 1.57.2.3-.31.38-.77.17-1.15-.2-.37-.36-.76-.48-1.16a.97.97 0 0 0-.94-.72zm2.85 6.02c.51.28 1.04.5 1.59.66.62.18 1.24-.32 1.24-.96v-.03c0-.43-.28-.82-.7-.94-.4-.12-.78-.28-1.15-.48a.97.97 0 0 0-1.16.17l-.03.03c-.45.45-.36 1.24.21 1.55zM13 4.07v-.66c0-.89-1.08-1.34-1.71-.71L9.17 4.83c-.4.4-.4 1.04 0 1.43l2.13 2.08c.63.62 1.7.17 1.7-.72V6.09c2.84.48 5 2.94 5 5.91 0 2.73-1.82 5.02-4.32 5.75a.97.97 0 0 0-.68.94v.02c0 .65.61 1.14 1.23.96A7.976 7.976 0 0 0 20 12c0-4.08-3.05-7.44-7-7.93z"/>',x0='<path d="M7.11 8.53 5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM6.09 13H4.07c.17 1.39.72 2.73 1.62 3.89l1.41-1.42c-.52-.75-.87-1.59-1.01-2.47zm1.01 5.32c1.16.9 2.51 1.44 3.9 1.61V17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32zM13 4.07V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93z"/>',y0='<path d="M13 17.91v2.02c3.95-.49 7-3.85 7-7.93s-3.05-7.44-7-7.93V1L8.45 5.55 13 10V6.09c2.84.48 5 2.94 5 5.91s-2.16 5.43-5 5.91zm-7.31-1.02 1.41-1.42c-.52-.75-.87-1.59-1.01-2.47H4.07c.17 1.39.72 2.73 1.62 3.89zm1.42-8.36L5.7 7.11C4.8 8.27 4.24 9.61 4.07 11h2.02c.14-.87.49-1.72 1.02-2.47zM11 17.9c-.87-.15-1.71-.49-2.46-1.03L7.1 18.32c1.16.9 2.51 1.44 3.9 1.61V17.9z"/>';function A0(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=_0;break;case"outlined":h=uh;break;case"round":h=v0;break;case"sharp":h=x0;break;case"two-tone":h=y0;break;default:h=uh}let{ariaLabel:u="rotate left"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class ZE extends Qn{constructor(e){super(),Jn(this,e,A0,g0,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}function M0(i){let e,t,n,s,r=[{xmlns:"http://www.w3.org/2000/svg"},i[5],{role:i[1]},{width:i[0]},{height:i[0]},{fill:i[2]},{"aria-label":i[3]},{viewBox:"0 0 24 24"}],a={};for(let o=0;o<r.length;o+=1)a=Ct(a,r[o]);return{c(){e=zs("svg"),t=new Mi(!0),this.h()},l(o){e=Vs(o,"svg",{xmlns:!0,role:!0,width:!0,height:!0,fill:!0,"aria-label":!0,viewBox:!0});var l=Wt(e);t=Ei(l,!0),l.forEach(ct),this.h()},h(){t.a=null,an(e,a)},m(o,l){Rn(o,e,l),t.m(i[4],e),n||(s=[xe(e,"click",i[7]),xe(e,"keydown",i[8]),xe(e,"keyup",i[9]),xe(e,"focus",i[10]),xe(e,"blur",i[11]),xe(e,"mouseenter",i[12]),xe(e,"mouseleave",i[13]),xe(e,"mouseover",i[14]),xe(e,"mouseout",i[15])],n=!0)},p(o,[l]){l&16&&t.p(o[4]),an(e,a=Ws(r,[{xmlns:"http://www.w3.org/2000/svg"},l&32&&o[5],l&2&&{role:o[1]},l&1&&{width:o[0]},l&1&&{height:o[0]},l&4&&{fill:o[2]},l&8&&{"aria-label":o[3]},{viewBox:"0 0 24 24"}]))},i:Kt,o:Kt,d(o){o&&ct(e),n=!1,Gs(s)}}}let E0='<path d="M5 20h14v-2H5v2zm0-10h4v6h6v-6h4l-7-7-7 7z"/>',dh='<path d="M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z"/>',S0='<path d="M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7a.996.996 0 0 0-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1zm-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1z"/>',b0='<path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>',T0='<path d="M9.83 8H11v6h2V8h1.17L12 5.83z" opacity=".3"/><path d="m12 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2V8H9.83L12 5.83 14.17 8H13zM5 18h14v2H5z"/>';function w0(i,e,t){const n=["size","role","color","variation","ariaLabel"];let s=on(e,n);const r=Si("iconCtx")??{};let{size:a=r.size||"24"}=e,{role:o=r.role||"img"}=e,{color:l=r.color||"currentColor"}=e,{variation:c=r.variation||"outlined"}=e,h;switch(c){case"filled":h=E0;break;case"outlined":h=dh;break;case"round":h=S0;break;case"sharp":h=b0;break;case"two-tone":h=T0;break;default:h=dh}let{ariaLabel:u="upload"}=e;function d(v){ye.call(this,i,v)}function f(v){ye.call(this,i,v)}function g(v){ye.call(this,i,v)}function _(v){ye.call(this,i,v)}function m(v){ye.call(this,i,v)}function p(v){ye.call(this,i,v)}function b(v){ye.call(this,i,v)}function M(v){ye.call(this,i,v)}function S(v){ye.call(this,i,v)}return i.$$set=v=>{e=Ct(Ct({},e),Hs(v)),t(5,s=on(e,n)),"size"in v&&t(0,a=v.size),"role"in v&&t(1,o=v.role),"color"in v&&t(2,l=v.color),"variation"in v&&t(6,c=v.variation),"ariaLabel"in v&&t(3,u=v.ariaLabel)},[a,o,l,u,h,s,c,d,f,g,_,m,p,b,M,S]}class QE extends Qn{constructor(e){super(),Jn(this,e,w0,M0,Zn,{size:0,role:1,color:2,variation:6,ariaLabel:3})}}const C0=""+new URL("../assets/af888358-6071-48e8-95d0-2337b456cd68.b4672c65.jpg",import.meta.url).href,R0=""+new URL("../assets/Tiny_ROV_Color.b617bdda.glb",import.meta.url).href;/**
* @license
* Copyright 2010-2024 Three.js Authors
* SPDX-License-Identifier: MIT
*/const Kl="168",L0=0,fh=1,I0=2,Yl=1,P0=2,Vn=3,Kn=0,qt=1,Sn=2,yi=0,Es=1,ph=2,mh=3,gh=4,D0=5,ki=100,N0=101,U0=102,F0=103,O0=104,B0=200,k0=201,z0=202,V0=203,el=204,tl=205,G0=206,H0=207,W0=208,X0=209,q0=210,K0=211,Y0=212,j0=213,Z0=214,Q0=0,J0=1,$0=2,La=3,e_=4,t_=5,n_=6,i_=7,Fd=0,s_=1,r_=2,Ai=0,a_=1,o_=2,l_=3,c_=4,h_=5,u_=6,d_=7,_h="attached",f_="detached",Od=300,Ls=301,Is=302,Ia=303,nl=304,Xa=306,Ps=1e3,gi=1001,Pa=1002,Gt=1003,Bd=1004,ur=1005,Jt=1006,Aa=1007,Hn=1008,Yn=1009,kd=1010,zd=1011,Sr=1012,jl=1013,ji=1014,gn=1015,Pr=1016,Zl=1017,Ql=1018,Ds=1020,Vd=35902,Gd=1021,Hd=1022,rn=1023,Wd=1024,Xd=1025,Ss=1026,Ns=1027,Jl=1028,$l=1029,qd=1030,ec=1031,tc=1033,Ma=33776,Ea=33777,Sa=33778,ba=33779,il=35840,sl=35841,rl=35842,al=35843,ol=36196,ll=37492,cl=37496,hl=37808,ul=37809,dl=37810,fl=37811,pl=37812,ml=37813,gl=37814,_l=37815,vl=37816,xl=37817,yl=37818,Al=37819,Ml=37820,El=37821,Ta=36492,Sl=36494,bl=36495,Kd=36283,Tl=36284,wl=36285,Cl=36286,br=2300,Tr=2301,oo=2302,vh=2400,xh=2401,yh=2402,p_=2500,m_=0,Yd=1,Rl=2,g_=3200,__=3201,jd=0,v_=1,pi="",zt="srgb",Dt="srgb-linear",nc="display-p3",qa="display-p3-linear",Da="linear",ot="srgb",Na="rec709",Ua="p3",es=7680,Ah=519,x_=512,y_=513,A_=514,Zd=515,M_=516,E_=517,S_=518,b_=519,Ll=35044,Mh="300 es",Wn=2e3,Fa=2001;class qs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Nt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Eh=1234567;const mr=Math.PI/180,Us=180/Math.PI;function _n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Nt[i&255]+Nt[i>>8&255]+Nt[i>>16&255]+Nt[i>>24&255]+"-"+Nt[e&255]+Nt[e>>8&255]+"-"+Nt[e>>16&15|64]+Nt[e>>24&255]+"-"+Nt[t&63|128]+Nt[t>>8&255]+"-"+Nt[t>>16&255]+Nt[t>>24&255]+Nt[n&255]+Nt[n>>8&255]+Nt[n>>16&255]+Nt[n>>24&255]).toLowerCase()}function Ot(i,e,t){return Math.max(e,Math.min(t,i))}function ic(i,e){return(i%e+e)%e}function T_(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function w_(i,e,t){return i!==e?(t-i)/(e-i):0}function gr(i,e,t){return(1-t)*i+t*e}function C_(i,e,t,n){return gr(i,e,1-Math.exp(-t*n))}function R_(i,e=1){return e-Math.abs(ic(i,e*2)-e)}function L_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function I_(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function P_(i,e){return i+Math.floor(Math.random()*(e-i+1))}function D_(i,e){return i+Math.random()*(e-i)}function N_(i){return i*(.5-Math.random())}function U_(i){i!==void 0&&(Eh=i);let e=Eh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function F_(i){return i*mr}function O_(i){return i*Us}function B_(i){return(i&i-1)===0&&i!==0}function k_(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function z_(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function V_(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*f,o*c);break;case"YXY":i.set(l*f,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function mn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Je(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const G_={DEG2RAD:mr,RAD2DEG:Us,generateUUID:_n,clamp:Ot,euclideanModulo:ic,mapLinear:T_,inverseLerp:w_,lerp:gr,damp:C_,pingpong:R_,smoothstep:L_,smootherstep:I_,randInt:P_,randFloat:D_,randFloatSpread:N_,seededRandom:U_,degToRad:F_,radToDeg:O_,isPowerOfTwo:B_,ceilPowerOfTwo:k_,floorPowerOfTwo:z_,setQuaternionFromProperEuler:V_,normalize:Je,denormalize:mn};class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Fe{constructor(e,t,n,s,r,a,o,l,c){Fe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],b=s[1],M=s[4],S=s[7],v=s[2],w=s[5],C=s[8];return r[0]=a*_+o*b+l*v,r[3]=a*m+o*M+l*w,r[6]=a*p+o*S+l*C,r[1]=c*_+h*b+u*v,r[4]=c*m+h*M+u*w,r[7]=c*p+h*S+u*C,r[2]=d*_+f*b+g*v,r[5]=d*m+f*M+g*w,r[8]=d*p+f*S+g*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(lo.makeScale(e,t)),this}rotate(e){return this.premultiply(lo.makeRotation(-e)),this}translate(e,t){return this.premultiply(lo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const lo=new Fe;function Qd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function wr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function H_(){const i=wr("canvas");return i.style.display="block",i}const Sh={};function bs(i){i in Sh||(Sh[i]=!0,console.warn(i))}function W_(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const bh=new Fe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Th=new Fe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),tr={[Dt]:{transfer:Da,primaries:Na,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[zt]:{transfer:ot,primaries:Na,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[qa]:{transfer:Da,primaries:Ua,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Th),fromReference:i=>i.applyMatrix3(bh)},[nc]:{transfer:ot,primaries:Ua,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Th),fromReference:i=>i.applyMatrix3(bh).convertLinearToSRGB()}},X_=new Set([Dt,qa]),qe={enabled:!0,_workingColorSpace:Dt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!X_.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=tr[e].toReference,s=tr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return tr[i].primaries},getTransfer:function(i){return i===pi?Da:tr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(tr[e].luminanceCoefficients)}};function Ts(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function co(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ts;class q_{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ts===void 0&&(ts=wr("canvas")),ts.width=e.width,ts.height=e.height;const n=ts.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ts}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=wr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ts(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ts(t[n]/255)*255):t[n]=Ts(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let K_=0;class Jd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:K_++}),this.uuid=_n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(ho(s[a].image)):r.push(ho(s[a]))}else r=ho(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function ho(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?q_.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Y_=0;class wt extends qs{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=gi,s=gi,r=Jt,a=Hn,o=rn,l=Yn,c=wt.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y_++}),this.uuid=_n(),this.name="",this.source=new Jd(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Od)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ps:e.x=e.x-Math.floor(e.x);break;case gi:e.x=e.x<0?0:1;break;case Pa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ps:e.y=e.y-Math.floor(e.y);break;case gi:e.y=e.y<0?0:1;break;case Pa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=Od;wt.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,n=0,s=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,S=(f+1)/2,v=(p+1)/2,w=(h+d)/4,C=(u+_)/4,U=(g+m)/4;return M>S&&M>v?M<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(M),s=w/n,r=C/n):S>v?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=U/s):v<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(v),n=C/r,s=U/r),this.set(n,s,r,t),this}let b=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class j_ extends qs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Jt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new wt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Jd(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zi extends j_{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $d extends wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Z_ extends wt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Ti=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const v=Math.sqrt(M),w=Math.atan2(v,p*b);m=Math.sin(m*w)/v,o=Math.sin(o*w)/v}const S=o*b;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-o){const v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},D=class ef{constructor(e=0,t=0,n=0){ef.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return uo.copy(this).projectOnVector(e),this.sub(uo)}reflect(e){return this.sub(uo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};const uo=new D,wh=new Ti;class $n{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(hn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(hn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=hn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,hn):hn.fromBufferAttribute(r,a),hn.applyMatrix4(e.matrixWorld),this.expandByPoint(hn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,hn),hn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),Hr.subVectors(this.max,nr),ns.subVectors(e.a,nr),is.subVectors(e.b,nr),ss.subVectors(e.c,nr),si.subVectors(is,ns),ri.subVectors(ss,is),Li.subVectors(ns,ss);let t=[0,-si.z,si.y,0,-ri.z,ri.y,0,-Li.z,Li.y,si.z,0,-si.x,ri.z,0,-ri.x,Li.z,0,-Li.x,-si.y,si.x,0,-ri.y,ri.x,0,-Li.y,Li.x,0];return!fo(t,ns,is,ss,Hr)||(t=[1,0,0,0,1,0,0,0,1],!fo(t,ns,is,ss,Hr))?!1:(Wr.crossVectors(si,ri),t=[Wr.x,Wr.y,Wr.z],fo(t,ns,is,ss,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,hn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(hn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Nn=[new D,new D,new D,new D,new D,new D,new D,new D],hn=new D,Gr=new $n,ns=new D,is=new D,ss=new D,si=new D,ri=new D,Li=new D,nr=new D,Hr=new D,Wr=new D,Ii=new D;function fo(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ii.fromArray(i,r);const o=s.x*Math.abs(Ii.x)+s.y*Math.abs(Ii.y)+s.z*Math.abs(Ii.z),l=e.dot(Ii),c=t.dot(Ii),h=n.dot(Ii);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Q_=new $n,ir=new D,po=new D;class Ln{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Q_.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);const t=ir.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ir,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(po.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add(po)),this.expandByPoint(ir.copy(e.center).sub(po))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Un=new D,mo=new D,Xr=new D,ai=new D,go=new D,qr=new D,_o=new D;class Ka{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Un.copy(this.origin).addScaledVector(this.direction,t),Un.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){mo.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),ai.copy(this.origin).sub(mo);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Xr),o=ai.dot(this.direction),l=-ai.dot(Xr),c=ai.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(mo).addScaledVector(Xr,d),f}intersectSphere(e,t){Un.subVectors(e.center,this.origin);const n=Un.dot(this.direction),s=Un.dot(Un)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Un)!==null}intersectTriangle(e,t,n,s,r){go.subVectors(t,e),qr.subVectors(n,e),_o.crossVectors(go,qr);let a=this.direction.dot(_o),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ai.subVectors(this.origin,e);const l=o*this.direction.dot(qr.crossVectors(ai,qr));if(l<0)return null;const c=o*this.direction.dot(go.cross(ai));if(c<0||l+c>a)return null;const h=-o*ai.dot(_o);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Oe{constructor(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m){Oe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,s,r,a,o,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Oe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/rs.setFromMatrixColumn(e,0).length(),r=1/rs.setFromMatrixColumn(e,1).length(),a=1/rs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(J_,e,$_)}lookAt(e,t,n){const s=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),oi.crossVectors(n,Zt),oi.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),oi.crossVectors(n,Zt)),oi.normalize(),Kr.crossVectors(Zt,oi),s[0]=oi.x,s[4]=Kr.x,s[8]=Zt.x,s[1]=oi.y,s[5]=Kr.y,s[9]=Zt.y,s[2]=oi.z,s[6]=Kr.z,s[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],b=n[3],M=n[7],S=n[11],v=n[15],w=s[0],C=s[4],U=s[8],E=s[12],A=s[1],L=s[5],G=s[9],k=s[13],H=s[2],q=s[6],V=s[10],Q=s[14],z=s[3],re=s[7],le=s[11],ge=s[15];return r[0]=a*w+o*A+l*H+c*z,r[4]=a*C+o*L+l*q+c*re,r[8]=a*U+o*G+l*V+c*le,r[12]=a*E+o*k+l*Q+c*ge,r[1]=h*w+u*A+d*H+f*z,r[5]=h*C+u*L+d*q+f*re,r[9]=h*U+u*G+d*V+f*le,r[13]=h*E+u*k+d*Q+f*ge,r[2]=g*w+_*A+m*H+p*z,r[6]=g*C+_*L+m*q+p*re,r[10]=g*U+_*G+m*V+p*le,r[14]=g*E+_*k+m*Q+p*ge,r[3]=b*w+M*A+S*H+v*z,r[7]=b*C+M*L+S*q+v*re,r[11]=b*U+M*G+S*V+v*le,r[15]=b*E+M*k+S*Q+v*ge,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*f-n*l*f)+_*(+t*l*f-t*c*d+r*a*d-s*a*f+s*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-s*o*h-t*l*u+t*o*d+s*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],b=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,M=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,S=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,v=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,w=t*b+n*M+s*S+r*v;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/w;return e[0]=b*C,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*C,e[2]=(o*m*r-_*l*r+_*s*c-n*m*c-o*s*p+n*l*p)*C,e[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*f-n*l*f)*C,e[4]=M*C,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*C,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*p-t*l*p)*C,e[7]=(a*d*r-h*l*r+h*s*c-t*d*c-a*s*f+t*l*f)*C,e[8]=S*C,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*C,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*C,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*C,e[12]=v*C,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*C,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*m-t*o*m)*C,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*d+t*o*d)*C,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,b=l*c,M=l*h,S=l*u,v=n.x,w=n.y,C=n.z;return s[0]=(1-(_+p))*v,s[1]=(f+S)*v,s[2]=(g-M)*v,s[3]=0,s[4]=(f-S)*w,s[5]=(1-(d+p))*w,s[6]=(m+b)*w,s[7]=0,s[8]=(g+M)*C,s[9]=(m-b)*C,s[10]=(1-(d+_))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=rs.set(s[0],s[1],s[2]).length();const a=rs.set(s[4],s[5],s[6]).length(),o=rs.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],un.copy(this);const c=1/r,h=1/a,u=1/o;return un.elements[0]*=c,un.elements[1]*=c,un.elements[2]*=c,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,t.setFromRotationMatrix(un),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=Wn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===Wn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Fa)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Wn){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(a-r),d=(t+e)*c,f=(n+s)*h;let g,_;if(o===Wn)g=(a+r)*u,_=-2*u;else if(o===Fa)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const rs=new D,un=new Oe,J_=new D(0,0,0),$_=new D(1,1,1),oi=new D,Kr=new D,Zt=new D,Ch=new Oe,Rh=new Ti;class Cn{constructor(e=0,t=0,n=0,s=Cn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ot(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ot(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ot(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ch.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ch,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Rh.setFromEuler(this),this.setFromQuaternion(Rh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Cn.DEFAULT_ORDER="XYZ";class tf{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let e1=0;const Lh=new D,as=new Ti,Fn=new Oe,Yr=new D,sr=new D,t1=new D,n1=new Ti,Ih=new D(1,0,0),Ph=new D(0,1,0),Dh=new D(0,0,1),Nh={type:"added"},i1={type:"removed"},os={type:"childadded",child:null},vo={type:"childremoved",child:null};class dt extends qs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:e1++}),this.uuid=_n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DEFAULT_UP.clone();const e=new D,t=new Cn,n=new Ti,s=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Oe},normalMatrix:{value:new Fe}}),this.matrix=new Oe,this.matrixWorld=new Oe,this.matrixAutoUpdate=dt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new tf,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.multiply(as),this}rotateOnWorldAxis(e,t){return as.setFromAxisAngle(e,t),this.quaternion.premultiply(as),this}rotateX(e){return this.rotateOnAxis(Ih,e)}rotateY(e){return this.rotateOnAxis(Ph,e)}rotateZ(e){return this.rotateOnAxis(Dh,e)}translateOnAxis(e,t){return Lh.copy(e).applyQuaternion(this.quaternion),this.position.add(Lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ih,e)}translateY(e){return this.translateOnAxis(Ph,e)}translateZ(e){return this.translateOnAxis(Dh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Yr.copy(e):Yr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fn.lookAt(sr,Yr,this.up):Fn.lookAt(Yr,sr,this.up),this.quaternion.setFromRotationMatrix(Fn),s&&(Fn.extractRotation(s.matrixWorld),as.setFromRotationMatrix(Fn),this.quaternion.premultiply(as.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nh),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(i1),vo.child=e,this.dispatchEvent(vo),vo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nh),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,t1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,n1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}dt.DEFAULT_UP=new D(0,1,0);dt.DEFAULT_MATRIX_AUTO_UPDATE=!0;dt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new D,On=new D,xo=new D,Bn=new D,ls=new D,cs=new D,Uh=new D,yo=new D,Ao=new D,Mo=new D;class bn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),dn.subVectors(e,t),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){dn.subVectors(s,t),On.subVectors(n,t),xo.subVectors(e,t);const a=dn.dot(dn),o=dn.dot(On),l=dn.dot(xo),c=On.dot(On),h=On.dot(xo),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Bn)===null?!1:Bn.x>=0&&Bn.y>=0&&Bn.x+Bn.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Bn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Bn.x),l.addScaledVector(a,Bn.y),l.addScaledVector(o,Bn.z),l)}static isFrontFacing(e,t,n,s){return dn.subVectors(n,t),On.subVectors(e,t),dn.cross(On).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),On.subVectors(this.a,this.b),dn.cross(On).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return bn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ls.subVectors(s,n),cs.subVectors(r,n),yo.subVectors(e,n);const l=ls.dot(yo),c=cs.dot(yo);if(l<=0&&c<=0)return t.copy(n);Ao.subVectors(e,s);const h=ls.dot(Ao),u=cs.dot(Ao);if(h>=0&&u<=h)return t.copy(s);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(ls,a);Mo.subVectors(e,r);const f=ls.dot(Mo),g=cs.dot(Mo);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(cs,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Uh.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Uh,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(ls,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const nf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},li={h:0,s:0,l:0},jr={h:0,s:0,l:0};function Eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ie{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=zt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=qe.workingColorSpace){if(e=ic(e,1),t=Ot(t,0,1),n=Ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Eo(a,r,e+1/3),this.g=Eo(a,r,e),this.b=Eo(a,r,e-1/3)}return qe.toWorkingColorSpace(this,s),this}setStyle(e,t=zt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=zt){const n=nf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ts(e.r),this.g=Ts(e.g),this.b=Ts(e.b),this}copyLinearToSRGB(e){return this.r=co(e.r),this.g=co(e.g),this.b=co(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=zt){return qe.fromWorkingColorSpace(Ut.copy(this),e),Math.round(Ot(Ut.r*255,0,255))*65536+Math.round(Ot(Ut.g*255,0,255))*256+Math.round(Ot(Ut.b*255,0,255))}getHexString(e=zt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.fromWorkingColorSpace(Ut.copy(this),t);const n=Ut.r,s=Ut.g,r=Ut.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.fromWorkingColorSpace(Ut.copy(this),t),e.r=Ut.r,e.g=Ut.g,e.b=Ut.b,e}getStyle(e=zt){qe.fromWorkingColorSpace(Ut.copy(this),e);const t=Ut.r,n=Ut.g,s=Ut.b;return e!==zt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(li),this.setHSL(li.h+e,li.s+t,li.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(li),e.getHSL(jr);const n=gr(li.h,jr.h,t),s=gr(li.s,jr.s,t),r=gr(li.l,jr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ut=new Ie;Ie.NAMES=nf;let s1=0;class Tn extends qs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:s1++}),this.uuid=_n(),this.name="",this.type="Material",this.blending=Es,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=el,this.blendDst=tl,this.blendEquation=ki,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ie(0,0,0),this.blendAlpha=0,this.depthFunc=La,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=es,this.stencilZFail=es,this.stencilZPass=es,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Es&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==el&&(n.blendSrc=this.blendSrc),this.blendDst!==tl&&(n.blendDst=this.blendDst),this.blendEquation!==ki&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==La&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ah&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==es&&(n.stencilFail=this.stencilFail),this.stencilZFail!==es&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==es&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Gi extends Tn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.combine=Fd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const At=new D,Zr=new ze;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ll,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return bs("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zr.fromBufferAttribute(this,t),Zr.applyMatrix3(e),this.setXY(t,Zr.x,Zr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix3(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyMatrix4(e),this.setXYZ(t,At.x,At.y,At.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.applyNormalMatrix(e),this.setXYZ(t,At.x,At.y,At.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)At.fromBufferAttribute(this,t),At.transformDirection(e),this.setXYZ(t,At.x,At.y,At.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=mn(t,this.array)),t}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=mn(t,this.array)),t}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=mn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=mn(t,this.array)),t}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ll&&(e.usage=this.usage),e}}class sf extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rf extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class wn extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let r1=0;const nn=new Oe,So=new dt,hs=new D,Qt=new $n,rr=new $n,bt=new D;class xn extends qs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=_n(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qd(e)?rf:sf)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Fe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return So.lookAt(e),So.updateMatrix(),this.applyMatrix4(So.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hs).negate(),this.translate(hs.x,hs.y,hs.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new wn(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $n);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Qt.setFromBufferAttribute(r),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(bt.addVectors(Qt.min,rr.min),Qt.expandByPoint(bt),bt.addVectors(Qt.max,rr.max),Qt.expandByPoint(bt)):(Qt.expandByPoint(rr.min),Qt.expandByPoint(rr.max))}Qt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)bt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(bt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)bt.fromBufferAttribute(o,c),l&&(hs.fromBufferAttribute(e,c),bt.add(hs)),s=Math.max(s,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let U=0;U<n.count;U++)o[U]=new D,l[U]=new D;const c=new D,h=new D,u=new D,d=new ze,f=new ze,g=new ze,_=new D,m=new D;function p(U,E,A){c.fromBufferAttribute(n,U),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,A),d.fromBufferAttribute(r,U),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,A),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),o[U].add(_),o[E].add(_),o[A].add(_),l[U].add(m),l[E].add(m),l[A].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let U=0,E=b.length;U<E;++U){const A=b[U],L=A.start,G=A.count;for(let k=L,H=L+G;k<H;k+=3)p(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const M=new D,S=new D,v=new D,w=new D;function C(U){v.fromBufferAttribute(s,U),w.copy(v);const E=o[U];M.copy(E),M.sub(v.multiplyScalar(v.dot(E))).normalize(),S.crossVectors(w,E);const L=S.dot(l[U])<0?-1:1;a.setXYZW(U,M.x,M.y,M.z,L)}for(let U=0,E=b.length;U<E;++U){const A=b[U],L=A.start,G=A.count;for(let k=L,H=L+G;k<H;k+=3)C(e.getX(k+0)),C(e.getX(k+1)),C(e.getX(k+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,u=new D;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Ht(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xn,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fh=new Oe,Pi=new Ka,Qr=new Ln,Oh=new D,us=new D,ds=new D,fs=new D,bo=new D,Jr=new D,$r=new ze,ea=new ze,ta=new ze,Bh=new D,kh=new D,zh=new D,na=new D,ia=new D;class $t extends dt{constructor(e=new xn,t=new Gi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(bo.fromBufferAttribute(u,e),a?Jr.addScaledVector(bo,h):Jr.addScaledVector(bo.sub(t),h))}t.add(Jr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(r),Pi.copy(e.ray).recast(e.near),!(Qr.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(Qr,Oh)===null||Pi.origin.distanceToSquared(Oh)>(e.far-e.near)**2))&&(Fh.copy(r).invert(),Pi.copy(e.ray).applyMatrix4(Fh),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=b,v=M;S<v;S+=3){const w=o.getX(S),C=o.getX(S+1),U=o.getX(S+2);s=sa(this,p,e,n,c,h,u,w,C,U),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);s=sa(this,a,e,n,c,h,u,b,M,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],b=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let S=b,v=M;S<v;S+=3){const w=S,C=S+1,U=S+2;s=sa(this,p,e,n,c,h,u,w,C,U),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const b=m,M=m+1,S=m+2;s=sa(this,a,e,n,c,h,u,b,M,S),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function a1(i,e,t,n,s,r,a,o){let l;if(e.side===qt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Kn,o),l===null)return null;ia.copy(o),ia.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(ia);return c<t.near||c>t.far?null:{distance:c,point:ia.clone(),object:i}}function sa(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,us),i.getVertexPosition(l,ds),i.getVertexPosition(c,fs);const h=a1(i,e,t,n,us,ds,fs,na);if(h){s&&($r.fromBufferAttribute(s,o),ea.fromBufferAttribute(s,l),ta.fromBufferAttribute(s,c),h.uv=bn.getInterpolation(na,us,ds,fs,$r,ea,ta,new ze)),r&&($r.fromBufferAttribute(r,o),ea.fromBufferAttribute(r,l),ta.fromBufferAttribute(r,c),h.uv1=bn.getInterpolation(na,us,ds,fs,$r,ea,ta,new ze)),a&&(Bh.fromBufferAttribute(a,o),kh.fromBufferAttribute(a,l),zh.fromBufferAttribute(a,c),h.normal=bn.getInterpolation(na,us,ds,fs,Bh,kh,zh,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new D,materialIndex:0};bn.getNormal(us,ds,fs,u.normal),h.face=u}return h}class Dr extends xn{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new wn(c,3)),this.setAttribute("normal",new wn(h,3)),this.setAttribute("uv",new wn(u,2));function g(_,m,p,b,M,S,v,w,C,U,E){const A=S/C,L=v/U,G=S/2,k=v/2,H=w/2,q=C+1,V=U+1;let Q=0,z=0;const re=new D;for(let le=0;le<V;le++){const ge=le*L-k;for(let He=0;He<q;He++){const et=He*A-G;re[_]=et*b,re[m]=ge*M,re[p]=H,c.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=w>0?1:-1,h.push(re.x,re.y,re.z),u.push(He/C),u.push(1-le/U),Q+=1}}for(let le=0;le<U;le++)for(let ge=0;ge<C;ge++){const He=d+ge+q*le,et=d+ge+q*(le+1),W=d+(ge+1)+q*(le+1),J=d+(ge+1)+q*le;l.push(He,et,J),l.push(et,W,J),z+=6}o.addGroup(f,z,E),f+=z,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Fs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function kt(i){const e={};for(let t=0;t<i.length;t++){const n=Fs(i[t]);for(const s in n)e[s]=n[s]}return e}function o1(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function af(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const l1={clone:Fs,merge:kt};var c1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,h1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends Tn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=c1,this.fragmentShader=h1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Fs(e.uniforms),this.uniformsGroups=o1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class of extends dt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Oe,this.projectionMatrix=new Oe,this.projectionMatrixInverse=new Oe,this.coordinateSystem=Wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ci=new D,Vh=new ze,Gh=new ze;class Vt extends of{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Us*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Us*2*Math.atan(Math.tan(mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ci.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ci.x,ci.y).multiplyScalar(-e/ci.z),ci.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ci.x,ci.y).multiplyScalar(-e/ci.z)}getViewSize(e,t){return this.getViewBounds(e,Vh,Gh),t.subVectors(Gh,Vh)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ps=-90,ms=1;class u1 extends dt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vt(ps,ms,e,t);s.layers=this.layers,this.add(s);const r=new Vt(ps,ms,e,t);r.layers=this.layers,this.add(r);const a=new Vt(ps,ms,e,t);a.layers=this.layers,this.add(a);const o=new Vt(ps,ms,e,t);o.layers=this.layers,this.add(o);const l=new Vt(ps,ms,e,t);l.layers=this.layers,this.add(l);const c=new Vt(ps,ms,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Wn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Fa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class lf extends wt{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Ls,super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class d1 extends Zi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new lf(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Jt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Dr(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:Fs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qt,blending:yi});r.uniforms.tEquirect.value=t;const a=new $t(s,r),o=t.minFilter;return t.minFilter===Hn&&(t.minFilter=Jt),new u1(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const To=new D,f1=new D,p1=new Fe;class Oi{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=To.subVectors(n,t).cross(f1.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(To),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||p1.getNormalMatrix(e),s=this.coplanarPoint(To).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Di=new Ln,ra=new D;class sc{constructor(e=new Oi,t=new Oi,n=new Oi,s=new Oi,r=new Oi,a=new Oi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Wn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],b=s[13],M=s[14],S=s[15];if(n[0].setComponents(l-r,d-c,m-f,S-p).normalize(),n[1].setComponents(l+r,d+c,m+f,S+p).normalize(),n[2].setComponents(l+a,d+h,m+g,S+b).normalize(),n[3].setComponents(l-a,d-h,m-g,S-b).normalize(),n[4].setComponents(l-o,d-u,m-_,S-M).normalize(),t===Wn)n[5].setComponents(l+o,d+u,m+_,S+M).normalize();else if(t===Fa)n[5].setComponents(o,u,_,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476,Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(ra.x=s.normal.x>0?e.max.x:e.min.x,ra.y=s.normal.y>0?e.max.y:e.min.y,ra.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(ra)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function cf(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function m1(i){const e=new WeakMap;function t(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=i.SHORT;else if(c instanceof Uint32Array)f=i.UNSIGNED_INT;else if(c instanceof Int32Array)f=i.INT;else if(c instanceof Int8Array)f=i.BYTE;else if(c instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const h=l.array,u=l._updateRange,d=l.updateRanges;if(i.bindBuffer(c,o),u.count===-1&&d.length===0&&i.bufferSubData(c,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}u.count!==-1&&(i.bufferSubData(c,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}class Ya extends xn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const b=p*d-a;for(let M=0;M<c;M++){const S=M*u-r;g.push(S,-b,0),_.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const M=b+c*p,S=b+c*(p+1),v=b+1+c*(p+1),w=b+1+c*p;f.push(M,S,w),f.push(S,v,w)}this.setIndex(f),this.setAttribute("position",new wn(g,3)),this.setAttribute("normal",new wn(_,3)),this.setAttribute("uv",new wn(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ya(e.width,e.height,e.widthSegments,e.heightSegments)}}var g1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,_1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,v1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,x1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,y1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,A1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,M1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,E1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,S1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,b1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,T1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,w1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,C1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,R1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,L1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,I1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,P1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,D1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,N1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,U1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,F1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,O1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,B1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,k1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,z1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,V1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,G1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,H1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,W1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,X1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,q1="gl_FragColor = linearToOutputTexel( gl_FragColor );",K1=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Y1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,j1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Z1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Q1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,J1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ev=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,iv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,sv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,av=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ov=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,cv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,pv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,mv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,gv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,_v=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vv=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,xv=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yv=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Av=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ev=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,bv=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,wv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Iv=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Nv=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Uv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ov=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Bv=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,kv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Xv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Yv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,jv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Jv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$v=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ex=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,tx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ix=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,rx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ax=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ox=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,cx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,hx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ux=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,dx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,px=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const mx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_x=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vx=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ax=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Mx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ex=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Sx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Rx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Lx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ix=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Px=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Nx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ux=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ox=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Wx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ue={alphahash_fragment:g1,alphahash_pars_fragment:_1,alphamap_fragment:v1,alphamap_pars_fragment:x1,alphatest_fragment:y1,alphatest_pars_fragment:A1,aomap_fragment:M1,aomap_pars_fragment:E1,batching_pars_vertex:S1,batching_vertex:b1,begin_vertex:T1,beginnormal_vertex:w1,bsdfs:C1,iridescence_fragment:R1,bumpmap_pars_fragment:L1,clipping_planes_fragment:I1,clipping_planes_pars_fragment:P1,clipping_planes_pars_vertex:D1,clipping_planes_vertex:N1,color_fragment:U1,color_pars_fragment:F1,color_pars_vertex:O1,color_vertex:B1,common:k1,cube_uv_reflection_fragment:z1,defaultnormal_vertex:V1,displacementmap_pars_vertex:G1,displacementmap_vertex:H1,emissivemap_fragment:W1,emissivemap_pars_fragment:X1,colorspace_fragment:q1,colorspace_pars_fragment:K1,envmap_fragment:Y1,envmap_common_pars_fragment:j1,envmap_pars_fragment:Z1,envmap_pars_vertex:Q1,envmap_physical_pars_fragment:lv,envmap_vertex:J1,fog_vertex:$1,fog_pars_vertex:ev,fog_fragment:tv,fog_pars_fragment:nv,gradientmap_pars_fragment:iv,lightmap_pars_fragment:sv,lights_lambert_fragment:rv,lights_lambert_pars_fragment:av,lights_pars_begin:ov,lights_toon_fragment:cv,lights_toon_pars_fragment:hv,lights_phong_fragment:uv,lights_phong_pars_fragment:dv,lights_physical_fragment:fv,lights_physical_pars_fragment:pv,lights_fragment_begin:mv,lights_fragment_maps:gv,lights_fragment_end:_v,logdepthbuf_fragment:vv,logdepthbuf_pars_fragment:xv,logdepthbuf_pars_vertex:yv,logdepthbuf_vertex:Av,map_fragment:Mv,map_pars_fragment:Ev,map_particle_fragment:Sv,map_particle_pars_fragment:bv,metalnessmap_fragment:Tv,metalnessmap_pars_fragment:wv,morphinstance_vertex:Cv,morphcolor_vertex:Rv,morphnormal_vertex:Lv,morphtarget_pars_vertex:Iv,morphtarget_vertex:Pv,normal_fragment_begin:Dv,normal_fragment_maps:Nv,normal_pars_fragment:Uv,normal_pars_vertex:Fv,normal_vertex:Ov,normalmap_pars_fragment:Bv,clearcoat_normal_fragment_begin:kv,clearcoat_normal_fragment_maps:zv,clearcoat_pars_fragment:Vv,iridescence_pars_fragment:Gv,opaque_fragment:Hv,packing:Wv,premultiplied_alpha_fragment:Xv,project_vertex:qv,dithering_fragment:Kv,dithering_pars_fragment:Yv,roughnessmap_fragment:jv,roughnessmap_pars_fragment:Zv,shadowmap_pars_fragment:Qv,shadowmap_pars_vertex:Jv,shadowmap_vertex:$v,shadowmask_pars_fragment:ex,skinbase_vertex:tx,skinning_pars_vertex:nx,skinning_vertex:ix,skinnormal_vertex:sx,specularmap_fragment:rx,specularmap_pars_fragment:ax,tonemapping_fragment:ox,tonemapping_pars_fragment:lx,transmission_fragment:cx,transmission_pars_fragment:hx,uv_pars_fragment:ux,uv_pars_vertex:dx,uv_vertex:fx,worldpos_vertex:px,background_vert:mx,background_frag:gx,backgroundCube_vert:_x,backgroundCube_frag:vx,cube_vert:xx,cube_frag:yx,depth_vert:Ax,depth_frag:Mx,distanceRGBA_vert:Ex,distanceRGBA_frag:Sx,equirect_vert:bx,equirect_frag:Tx,linedashed_vert:wx,linedashed_frag:Cx,meshbasic_vert:Rx,meshbasic_frag:Lx,meshlambert_vert:Ix,meshlambert_frag:Px,meshmatcap_vert:Dx,meshmatcap_frag:Nx,meshnormal_vert:Ux,meshnormal_frag:Fx,meshphong_vert:Ox,meshphong_frag:Bx,meshphysical_vert:kx,meshphysical_frag:zx,meshtoon_vert:Vx,meshtoon_frag:Gx,points_vert:Hx,points_frag:Wx,shadow_vert:Xx,shadow_frag:qx,sprite_vert:Kx,sprite_frag:Yx},ie={common:{diffuse:{value:new Ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new Ie(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},En={basic:{uniforms:kt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:kt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:kt([ie.common,ie.specularmap,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)},specular:{value:new Ie(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:kt([ie.common,ie.envmap,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.roughnessmap,ie.metalnessmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:kt([ie.common,ie.aomap,ie.lightmap,ie.emissivemap,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.gradientmap,ie.fog,ie.lights,{emissive:{value:new Ie(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:kt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,ie.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:kt([ie.points,ie.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:kt([ie.common,ie.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:kt([ie.common,ie.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:kt([ie.common,ie.bumpmap,ie.normalmap,ie.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:kt([ie.sprite,ie.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:kt([ie.common,ie.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:kt([ie.lights,ie.fog,{color:{value:new Ie(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};En.physical={uniforms:kt([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new Ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new Ie(0)},specularColor:{value:new Ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const aa={r:0,b:0,g:0},Ni=new Cn,jx=new Oe;function Zx(i,e,t,n,s,r,a){const o=new Ie(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(b){let M=b.isScene===!0?b.background:null;return M&&M.isTexture&&(M=(b.backgroundBlurriness>0?t:e).get(M)),M}function _(b){let M=!1;const S=g(b);S===null?p(o,l):S&&S.isColor&&(p(S,1),M=!0);const v=i.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,a):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(b,M){const S=g(M);S&&(S.isCubeTexture||S.mapping===Xa)?(h===void 0&&(h=new $t(new Dr(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:Fs(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:qt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(v,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ni.copy(M.backgroundRotation),Ni.x*=-1,Ni.y*=-1,Ni.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ni.y*=-1,Ni.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(Ni)),h.material.toneMapped=qe.getTransfer(S.colorSpace)!==ot,(u!==S||d!==S.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new $t(new Ya(2,2),new jn({name:"BackgroundMaterial",uniforms:Fs(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.toneMapped=qe.getTransfer(S.colorSpace)!==ot,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=S,d=S.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function p(b,M){b.getRGB(aa,af(i)),n.buffers.color.setClear(aa.r,aa.g,aa.b,M,a)}return{getClearColor:function(){return o},setClearColor:function(b,M=1){o.set(b),l=M,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,p(o,l)},render:_,addToRenderList:m}}function Qx(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(A,L,G,k,H){let q=!1;const V=u(k,G,L);r!==V&&(r=V,c(r.object)),q=f(A,k,G,H),q&&g(A,k,G,H),H!==null&&e.update(H,i.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,S(A,L,G,k),H!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return i.createVertexArray()}function c(A){return i.bindVertexArray(A)}function h(A){return i.deleteVertexArray(A)}function u(A,L,G){const k=G.wireframe===!0;let H=n[A.id];H===void 0&&(H={},n[A.id]=H);let q=H[L.id];q===void 0&&(q={},H[L.id]=q);let V=q[k];return V===void 0&&(V=d(l()),q[k]=V),V}function d(A){const L=[],G=[],k=[];for(let H=0;H<t;H++)L[H]=0,G[H]=0,k[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:G,attributeDivisors:k,object:A,attributes:{},index:null}}function f(A,L,G,k){const H=r.attributes,q=L.attributes;let V=0;const Q=G.getAttributes();for(const z in Q)if(Q[z].location>=0){const le=H[z];let ge=q[z];if(ge===void 0&&(z==="instanceMatrix"&&A.instanceMatrix&&(ge=A.instanceMatrix),z==="instanceColor"&&A.instanceColor&&(ge=A.instanceColor)),le===void 0||le.attribute!==ge||ge&&le.data!==ge.data)return!0;V++}return r.attributesNum!==V||r.index!==k}function g(A,L,G,k){const H={},q=L.attributes;let V=0;const Q=G.getAttributes();for(const z in Q)if(Q[z].location>=0){let le=q[z];le===void 0&&(z==="instanceMatrix"&&A.instanceMatrix&&(le=A.instanceMatrix),z==="instanceColor"&&A.instanceColor&&(le=A.instanceColor));const ge={};ge.attribute=le,le&&le.data&&(ge.data=le.data),H[z]=ge,V++}r.attributes=H,r.attributesNum=V,r.index=k}function _(){const A=r.newAttributes;for(let L=0,G=A.length;L<G;L++)A[L]=0}function m(A){p(A,0)}function p(A,L){const G=r.newAttributes,k=r.enabledAttributes,H=r.attributeDivisors;G[A]=1,k[A]===0&&(i.enableVertexAttribArray(A),k[A]=1),H[A]!==L&&(i.vertexAttribDivisor(A,L),H[A]=L)}function b(){const A=r.newAttributes,L=r.enabledAttributes;for(let G=0,k=L.length;G<k;G++)L[G]!==A[G]&&(i.disableVertexAttribArray(G),L[G]=0)}function M(A,L,G,k,H,q,V){V===!0?i.vertexAttribIPointer(A,L,G,H,q):i.vertexAttribPointer(A,L,G,k,H,q)}function S(A,L,G,k){_();const H=k.attributes,q=G.getAttributes(),V=L.defaultAttributeValues;for(const Q in q){const z=q[Q];if(z.location>=0){let re=H[Q];if(re===void 0&&(Q==="instanceMatrix"&&A.instanceMatrix&&(re=A.instanceMatrix),Q==="instanceColor"&&A.instanceColor&&(re=A.instanceColor)),re!==void 0){const le=re.normalized,ge=re.itemSize,He=e.get(re);if(He===void 0)continue;const et=He.buffer,W=He.type,J=He.bytesPerElement,me=W===i.INT||W===i.UNSIGNED_INT||re.gpuType===jl;if(re.isInterleavedBufferAttribute){const he=re.data,be=he.stride,Pe=re.offset;if(he.isInstancedInterleavedBuffer){for(let Ve=0;Ve<z.locationSize;Ve++)p(z.location+Ve,he.meshPerAttribute);A.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let Ve=0;Ve<z.locationSize;Ve++)m(z.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,et);for(let Ve=0;Ve<z.locationSize;Ve++)M(z.location+Ve,ge/z.locationSize,W,le,be*J,(Pe+ge/z.locationSize*Ve)*J,me)}else{if(re.isInstancedBufferAttribute){for(let he=0;he<z.locationSize;he++)p(z.location+he,re.meshPerAttribute);A.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let he=0;he<z.locationSize;he++)m(z.location+he);i.bindBuffer(i.ARRAY_BUFFER,et);for(let he=0;he<z.locationSize;he++)M(z.location+he,ge/z.locationSize,W,le,ge*J,ge/z.locationSize*he*J,me)}}else if(V!==void 0){const le=V[Q];if(le!==void 0)switch(le.length){case 2:i.vertexAttrib2fv(z.location,le);break;case 3:i.vertexAttrib3fv(z.location,le);break;case 4:i.vertexAttrib4fv(z.location,le);break;default:i.vertexAttrib1fv(z.location,le)}}}}b()}function v(){U();for(const A in n){const L=n[A];for(const G in L){const k=L[G];for(const H in k)h(k[H].object),delete k[H];delete L[G]}delete n[A]}}function w(A){if(n[A.id]===void 0)return;const L=n[A.id];for(const G in L){const k=L[G];for(const H in k)h(k[H].object),delete k[H];delete L[G]}delete n[A.id]}function C(A){for(const L in n){const G=n[L];if(G[A.id]===void 0)continue;const k=G[A.id];for(const H in k)h(k[H].object),delete k[H];delete G[A.id]}}function U(){E(),a=!0,r!==s&&(r=s,c(r.object))}function E(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:E,dispose:v,releaseStatesOfGeometry:w,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:b}}function Jx(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function $x(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==rn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){const C=w===Pr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Yn&&n.convert(w)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==gn&&!C)}function l(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),m=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),M=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,v=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:b,maxFragmentUniforms:M,vertexTextures:S,maxSamples:v}}function ey(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Oi,o=new Fe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{const b=r?0:n,M=b*4;let S=p.clippingState||null;l.value=S,S=h(g,d,M,f);for(let v=0;v!==M;++v)S[v]=t[v];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,S=f;M!==_;++M,S+=4)a.copy(u[M]).applyMatrix4(b,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function ty(i){let e=new WeakMap;function t(a,o){return o===Ia?a.mapping=Ls:o===nl&&(a.mapping=Is),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ia||o===nl)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new d1(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class rc extends of{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xs=4,Hh=[.125,.215,.35,.446,.526,.582],zi=20,wo=new rc,Wh=new Ie;let Co=null,Ro=0,Lo=0,Io=!1;const Bi=(1+Math.sqrt(5))/2,gs=1/Bi,Xh=[new D(-Bi,gs,0),new D(Bi,gs,0),new D(-gs,0,Bi),new D(gs,0,Bi),new D(0,Bi,-gs),new D(0,Bi,gs),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)];class qh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Co=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Co,Ro,Lo),this._renderer.xr.enabled=Io,e.scissorTest=!1,oa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ls||e.mapping===Is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Co=this._renderer.getRenderTarget(),Ro=this._renderer.getActiveCubeFace(),Lo=this._renderer.getActiveMipmapLevel(),Io=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Jt,minFilter:Jt,generateMipmaps:!1,type:Pr,format:rn,colorSpace:Dt,depthBuffer:!1},s=Kh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ny(r)),this._blurMaterial=iy(r,e,t)}return s}_compileMaterial(e){const t=new $t(this._lodPlanes[0],e);this._renderer.compile(t,wo)}_sceneToCubeUV(e,t,n,s){const o=new Vt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Wh),h.toneMapping=Ai,h.autoClear=!1;const f=new Gi({name:"PMREM.Background",side:qt,depthWrite:!1,depthTest:!1}),g=new $t(new Dr,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Wh),_=!0);for(let p=0;p<6;p++){const b=p%3;b===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):b===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const M=this._cubeSize;oa(s,b*M,p>2?M:0,M,M),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Ls||e.mapping===Is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new $t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;oa(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,wo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Xh[(s-r-1)%Xh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $t(this._lodPlanes[s],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*zi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):zi;m>zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${zi}`);const p=[];let b=0;for(let C=0;C<zi;++C){const U=C/_,E=Math.exp(-U*U/2);p.push(E),C===0?b+=E:C<m&&(b+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/b;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:M}=this;d.dTheta.value=g,d.mipInt.value=M-n;const S=this._sizeLods[s],v=3*S*(s>M-xs?s-M+xs:0),w=4*(this._cubeSize-S);oa(t,v,w,3*S,2*S),l.setRenderTarget(t),l.render(u,wo)}}function ny(i){const e=[],t=[],n=[];let s=i;const r=i-xs+1+Hh.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-xs?l=Hh[a-i+xs-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,b=new Float32Array(_*g*f),M=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let w=0;w<f;w++){const C=w%3*2/3-1,U=w>2?0:-1,E=[C,U,0,C+2/3,U,0,C+2/3,U+1,0,C,U,0,C+2/3,U+1,0,C,U+1,0];b.set(E,_*g*w),M.set(d,m*g*w);const A=[w,w,w,w,w,w];S.set(A,p*g*w)}const v=new xn;v.setAttribute("position",new Ht(b,_)),v.setAttribute("uv",new Ht(M,m)),v.setAttribute("faceIndex",new Ht(S,p)),e.push(v),s>xs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Kh(i,e,t){const n=new Zi(i,e,t);return n.texture.mapping=Xa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function oa(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function iy(i,e,t){const n=new Float32Array(zi),s=new D(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:zi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function Yh(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function jh(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:yi,depthTest:!1,depthWrite:!1})}function ac(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function sy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Ia||l===nl,h=l===Ls||l===Is;if(c||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new qh(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new qh(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function ry(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function ay(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let M=0,S=b.length;M<S;M+=3){const v=b[M+0],w=b[M+1],C=b[M+2];d.push(v,w,w,C,C,v)}}else if(g!==void 0){const b=g.array;_=g.version;for(let M=0,S=b.length/3-1;M<S;M+=3){const v=M+0,w=M+1,C=M+2;d.push(v,w,w,C,C,v)}}else return;const m=new(Qd(d)?rf:sf)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function oy(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function c(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let b=0;b<g;b++)p+=f[b];for(let b=0;b<_.length;b++)t.update(p,n,_[b])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ly(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function cy(i,e,t){const n=new WeakMap,s=new nt;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let E=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",E)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let M=0;f===!0&&(M=1),g===!0&&(M=2),_===!0&&(M=3);let S=o.attributes.position.count*M,v=1;S>e.maxTextureSize&&(v=Math.ceil(S/e.maxTextureSize),S=e.maxTextureSize);const w=new Float32Array(S*v*4*u),C=new $d(w,S,v,u);C.type=gn,C.needsUpdate=!0;const U=M*4;for(let A=0;A<u;A++){const L=m[A],G=p[A],k=b[A],H=S*v*4*A;for(let q=0;q<L.count;q++){const V=q*U;f===!0&&(s.fromBufferAttribute(L,q),w[H+V+0]=s.x,w[H+V+1]=s.y,w[H+V+2]=s.z,w[H+V+3]=0),g===!0&&(s.fromBufferAttribute(G,q),w[H+V+4]=s.x,w[H+V+5]=s.y,w[H+V+6]=s.z,w[H+V+7]=0),_===!0&&(s.fromBufferAttribute(k,q),w[H+V+8]=s.x,w[H+V+9]=s.y,w[H+V+10]=s.z,w[H+V+11]=k.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new ze(S,v)},n.set(o,d),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<c.length;_++)f+=c[_];const g=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function hy(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class hf extends wt{constructor(e,t,n,s,r,a,o,l,c,h=Ss){if(h!==Ss&&h!==Ns)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ss&&(n=ji),n===void 0&&h===Ns&&(n=Ds),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Gt,this.minFilter=l!==void 0?l:Gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const uf=new wt,Zh=new hf(1,1),df=new $d,ff=new Z_,pf=new lf,Qh=[],Jh=[],$h=new Float32Array(16),eu=new Float32Array(9),tu=new Float32Array(4);function Ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Qh[s];if(r===void 0&&(r=new Float32Array(s),Qh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Et(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ja(i,e){let t=Jh[e];t===void 0&&(t=new Int32Array(e),Jh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function uy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function dy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function fy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Et(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function py(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function my(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Et(t,n))return;tu.set(n),i.uniformMatrix2fv(this.addr,!1,tu),St(t,n)}}function gy(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Et(t,n))return;eu.set(n),i.uniformMatrix3fv(this.addr,!1,eu),St(t,n)}}function _y(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Et(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Et(t,n))return;$h.set(n),i.uniformMatrix4fv(this.addr,!1,$h),St(t,n)}}function vy(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function xy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function yy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Ay(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function My(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Ey(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Et(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Sy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Et(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function by(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Et(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function Ty(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Zh.compareFunction=Zd,r=Zh):r=uf,t.setTexture2D(e||r,s)}function wy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ff,s)}function Cy(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||pf,s)}function Ry(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||df,s)}function Ly(i){switch(i){case 5126:return uy;case 35664:return dy;case 35665:return fy;case 35666:return py;case 35674:return my;case 35675:return gy;case 35676:return _y;case 5124:case 35670:return vy;case 35667:case 35671:return xy;case 35668:case 35672:return yy;case 35669:case 35673:return Ay;case 5125:return My;case 36294:return Ey;case 36295:return Sy;case 36296:return by;case 35678:case 36198:case 36298:case 36306:case 35682:return Ty;case 35679:case 36299:case 36307:return wy;case 35680:case 36300:case 36308:case 36293:return Cy;case 36289:case 36303:case 36311:case 36292:return Ry}}function Iy(i,e){i.uniform1fv(this.addr,e)}function Py(i,e){const t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function Dy(i,e){const t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function Ny(i,e){const t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function Uy(i,e){const t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Fy(i,e){const t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Oy(i,e){const t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function By(i,e){i.uniform1iv(this.addr,e)}function ky(i,e){i.uniform2iv(this.addr,e)}function zy(i,e){i.uniform3iv(this.addr,e)}function Vy(i,e){i.uniform4iv(this.addr,e)}function Gy(i,e){i.uniform1uiv(this.addr,e)}function Hy(i,e){i.uniform2uiv(this.addr,e)}function Wy(i,e){i.uniform3uiv(this.addr,e)}function Xy(i,e){i.uniform4uiv(this.addr,e)}function qy(i,e,t){const n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||uf,r[a])}function Ky(i,e,t){const n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ff,r[a])}function Yy(i,e,t){const n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||pf,r[a])}function jy(i,e,t){const n=this.cache,s=e.length,r=ja(t,s);Et(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||df,r[a])}function Zy(i){switch(i){case 5126:return Iy;case 35664:return Py;case 35665:return Dy;case 35666:return Ny;case 35674:return Uy;case 35675:return Fy;case 35676:return Oy;case 5124:case 35670:return By;case 35667:case 35671:return ky;case 35668:case 35672:return zy;case 35669:case 35673:return Vy;case 5125:return Gy;case 36294:return Hy;case 36295:return Wy;case 36296:return Xy;case 35678:case 36198:case 36298:case 36306:case 35682:return qy;case 35679:case 36299:case 36307:return Ky;case 35680:case 36300:case 36308:case 36293:return Yy;case 36289:case 36303:case 36311:case 36292:return jy}}class Qy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ly(t.type)}}class Jy{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Zy(t.type)}}class $y{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const Po=/(\w+)(\])?(\[|\.)?/g;function nu(i,e){i.seq.push(e),i.map[e.id]=e}function eA(i,e,t){const n=i.name,s=n.length;for(Po.lastIndex=0;;){const r=Po.exec(n),a=Po.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){nu(t,c===void 0?new Qy(o,i,e):new Jy(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new $y(o),nu(t,u)),t=u}}}class wa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);eA(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function iu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const tA=37297;let nA=0;function iA(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function sA(i){const e=qe.getPrimaries(qe.workingColorSpace),t=qe.getPrimaries(i);let n;switch(e===t?n="":e===Ua&&t===Na?n="LinearDisplayP3ToLinearSRGB":e===Na&&t===Ua&&(n="LinearSRGBToLinearDisplayP3"),i){case Dt:case qa:return[n,"LinearTransferOETF"];case zt:case nc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function su(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+iA(i.getShaderSource(e),a)}else return s}function rA(i,e){const t=sA(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function aA(i,e){let t;switch(e){case a_:t="Linear";break;case o_:t="Reinhard";break;case l_:t="Cineon";break;case c_:t="ACESFilmic";break;case u_:t="AgX";break;case d_:t="Neutral";break;case h_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const la=new D;function oA(){qe.getLuminanceCoefficients(la);const i=la.x.toFixed(4),e=la.y.toFixed(4),t=la.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lA(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(dr).join(`
`)}function cA(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hA(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function dr(i){return i!==""}function ru(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function au(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uA=/^[ \t]*#include +<([\w\d./]+)>/gm;function Il(i){return i.replace(uA,fA)}const dA=new Map;function fA(i,e){let t=Ue[e];if(t===void 0){const n=dA.get(e);if(n!==void 0)t=Ue[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Il(t)}const pA=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ou(i){return i.replace(pA,mA)}function mA(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lu(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gA(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Yl?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===P0?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Vn&&(e="SHADOWMAP_TYPE_VSM"),e}function _A(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ls:case Is:e="ENVMAP_TYPE_CUBE";break;case Xa:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vA(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Is:e="ENVMAP_MODE_REFRACTION";break}return e}function xA(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Fd:e="ENVMAP_BLENDING_MULTIPLY";break;case s_:e="ENVMAP_BLENDING_MIX";break;case r_:e="ENVMAP_BLENDING_ADD";break}return e}function yA(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function AA(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=gA(t),c=_A(t),h=vA(t),u=xA(t),d=yA(t),f=lA(t),g=cA(r),_=s.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(dr).join(`
`),p.length>0&&(p+=`
`)):(m=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(dr).join(`
`),p=[lu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ai?"#define TONE_MAPPING":"",t.toneMapping!==Ai?Ue.tonemapping_pars_fragment:"",t.toneMapping!==Ai?aA("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,rA("linearToOutputTexel",t.outputColorSpace),oA(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(dr).join(`
`)),a=Il(a),a=ru(a,t),a=au(a,t),o=Il(o),o=ru(o,t),o=au(o,t),a=ou(a),o=ou(o),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Mh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Mh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const M=b+m+a,S=b+p+o,v=iu(s,s.VERTEX_SHADER,M),w=iu(s,s.FRAGMENT_SHADER,S);s.attachShader(_,v),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function C(L){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(v).trim(),H=s.getShaderInfoLog(w).trim();let q=!0,V=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(q=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,v,w);else{const Q=su(s,v,"vertex"),z=su(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+G+`
`+Q+`
`+z)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(k===""||H==="")&&(V=!1);V&&(L.diagnostics={runnable:q,programLog:G,vertexShader:{log:k,prefix:m},fragmentShader:{log:H,prefix:p}})}s.deleteShader(v),s.deleteShader(w),U=new wa(s,_),E=hA(s,_)}let U;this.getUniforms=function(){return U===void 0&&C(this),U};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let A=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(_,tA)),A},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=nA++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=v,this.fragmentShader=w,this}let MA=0;class EA{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new SA(e),t.set(e,n)),n}}class SA{constructor(e){this.id=MA++,this.code=e,this.usedTimes=0}}function bA(i,e,t,n,s,r,a){const o=new tf,l=new EA,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return c.add(E),E===0?"uv":`uv${E}`}function m(E,A,L,G,k){const H=G.fog,q=k.geometry,V=E.isMeshStandardMaterial?G.environment:null,Q=(E.isMeshStandardMaterial?t:e).get(E.envMap||V),z=Q&&Q.mapping===Xa?Q.image.height:null,re=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ge=le!==void 0?le.length:0;let He=0;q.morphAttributes.position!==void 0&&(He=1),q.morphAttributes.normal!==void 0&&(He=2),q.morphAttributes.color!==void 0&&(He=3);let et,W,J,me;if(re){const Ke=En[re];et=Ke.vertexShader,W=Ke.fragmentShader}else et=E.vertexShader,W=E.fragmentShader,l.update(E),J=l.getVertexShaderID(E),me=l.getFragmentShaderID(E);const he=i.getRenderTarget(),be=k.isInstancedMesh===!0,Pe=k.isBatchedMesh===!0,Ve=!!E.map,pt=!!E.matcap,R=!!Q,_t=!!E.aoMap,Qe=!!E.lightMap,tt=!!E.bumpMap,Ae=!!E.normalMap,vt=!!E.displacementMap,Re=!!E.emissiveMap,De=!!E.metalnessMap,T=!!E.roughnessMap,x=E.anisotropy>0,B=E.clearcoat>0,Y=E.dispersion>0,Z=E.iridescence>0,j=E.sheen>0,Me=E.transmission>0,se=x&&!!E.anisotropyMap,ue=B&&!!E.clearcoatMap,Ne=B&&!!E.clearcoatNormalMap,$=B&&!!E.clearcoatRoughnessMap,ce=Z&&!!E.iridescenceMap,We=Z&&!!E.iridescenceThicknessMap,Ce=j&&!!E.sheenColorMap,de=j&&!!E.sheenRoughnessMap,Le=!!E.specularMap,Be=!!E.specularColorMap,ht=!!E.specularIntensityMap,I=Me&&!!E.transmissionMap,ee=Me&&!!E.thicknessMap,X=!!E.gradientMap,K=!!E.alphaMap,ne=E.alphaTest>0,Ee=!!E.alphaHash,Xe=!!E.extensions;let xt=Ai;E.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(xt=i.toneMapping);const Rt={shaderID:re,shaderType:E.type,shaderName:E.name,vertexShader:et,fragmentShader:W,defines:E.defines,customVertexShaderID:J,customFragmentShaderID:me,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Pe,batchingColor:Pe&&k._colorsTexture!==null,instancing:be,instancingColor:be&&k.instanceColor!==null,instancingMorph:be&&k.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Dt,alphaToCoverage:!!E.alphaToCoverage,map:Ve,matcap:pt,envMap:R,envMapMode:R&&Q.mapping,envMapCubeUVHeight:z,aoMap:_t,lightMap:Qe,bumpMap:tt,normalMap:Ae,displacementMap:d&&vt,emissiveMap:Re,normalMapObjectSpace:Ae&&E.normalMapType===v_,normalMapTangentSpace:Ae&&E.normalMapType===jd,metalnessMap:De,roughnessMap:T,anisotropy:x,anisotropyMap:se,clearcoat:B,clearcoatMap:ue,clearcoatNormalMap:Ne,clearcoatRoughnessMap:$,dispersion:Y,iridescence:Z,iridescenceMap:ce,iridescenceThicknessMap:We,sheen:j,sheenColorMap:Ce,sheenRoughnessMap:de,specularMap:Le,specularColorMap:Be,specularIntensityMap:ht,transmission:Me,transmissionMap:I,thicknessMap:ee,gradientMap:X,opaque:E.transparent===!1&&E.blending===Es&&E.alphaToCoverage===!1,alphaMap:K,alphaTest:ne,alphaHash:Ee,combine:E.combine,mapUv:Ve&&_(E.map.channel),aoMapUv:_t&&_(E.aoMap.channel),lightMapUv:Qe&&_(E.lightMap.channel),bumpMapUv:tt&&_(E.bumpMap.channel),normalMapUv:Ae&&_(E.normalMap.channel),displacementMapUv:vt&&_(E.displacementMap.channel),emissiveMapUv:Re&&_(E.emissiveMap.channel),metalnessMapUv:De&&_(E.metalnessMap.channel),roughnessMapUv:T&&_(E.roughnessMap.channel),anisotropyMapUv:se&&_(E.anisotropyMap.channel),clearcoatMapUv:ue&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Ne&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:We&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:Ce&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:de&&_(E.sheenRoughnessMap.channel),specularMapUv:Le&&_(E.specularMap.channel),specularColorMapUv:Be&&_(E.specularColorMap.channel),specularIntensityMapUv:ht&&_(E.specularIntensityMap.channel),transmissionMapUv:I&&_(E.transmissionMap.channel),thicknessMapUv:ee&&_(E.thicknessMap.channel),alphaMapUv:K&&_(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ae||x),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!q.attributes.uv&&(Ve||K),fog:!!H,useFog:E.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:k.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:He,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:xt,decodeVideoTexture:Ve&&E.map.isVideoTexture===!0&&qe.getTransfer(E.map.colorSpace)===ot,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Sn,flipSided:E.side===qt,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xe&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Xe&&E.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Rt.vertexUv1s=c.has(1),Rt.vertexUv2s=c.has(2),Rt.vertexUv3s=c.has(3),c.clear(),Rt}function p(E){const A=[];if(E.shaderID?A.push(E.shaderID):(A.push(E.customVertexShaderID),A.push(E.customFragmentShaderID)),E.defines!==void 0)for(const L in E.defines)A.push(L),A.push(E.defines[L]);return E.isRawShaderMaterial===!1&&(b(A,E),M(A,E),A.push(i.outputColorSpace)),A.push(E.customProgramCacheKey),A.join()}function b(E,A){E.push(A.precision),E.push(A.outputColorSpace),E.push(A.envMapMode),E.push(A.envMapCubeUVHeight),E.push(A.mapUv),E.push(A.alphaMapUv),E.push(A.lightMapUv),E.push(A.aoMapUv),E.push(A.bumpMapUv),E.push(A.normalMapUv),E.push(A.displacementMapUv),E.push(A.emissiveMapUv),E.push(A.metalnessMapUv),E.push(A.roughnessMapUv),E.push(A.anisotropyMapUv),E.push(A.clearcoatMapUv),E.push(A.clearcoatNormalMapUv),E.push(A.clearcoatRoughnessMapUv),E.push(A.iridescenceMapUv),E.push(A.iridescenceThicknessMapUv),E.push(A.sheenColorMapUv),E.push(A.sheenRoughnessMapUv),E.push(A.specularMapUv),E.push(A.specularColorMapUv),E.push(A.specularIntensityMapUv),E.push(A.transmissionMapUv),E.push(A.thicknessMapUv),E.push(A.combine),E.push(A.fogExp2),E.push(A.sizeAttenuation),E.push(A.morphTargetsCount),E.push(A.morphAttributeCount),E.push(A.numDirLights),E.push(A.numPointLights),E.push(A.numSpotLights),E.push(A.numSpotLightMaps),E.push(A.numHemiLights),E.push(A.numRectAreaLights),E.push(A.numDirLightShadows),E.push(A.numPointLightShadows),E.push(A.numSpotLightShadows),E.push(A.numSpotLightShadowsWithMaps),E.push(A.numLightProbes),E.push(A.shadowMapType),E.push(A.toneMapping),E.push(A.numClippingPlanes),E.push(A.numClipIntersection),E.push(A.depthPacking)}function M(E,A){o.disableAll(),A.supportsVertexTextures&&o.enable(0),A.instancing&&o.enable(1),A.instancingColor&&o.enable(2),A.instancingMorph&&o.enable(3),A.matcap&&o.enable(4),A.envMap&&o.enable(5),A.normalMapObjectSpace&&o.enable(6),A.normalMapTangentSpace&&o.enable(7),A.clearcoat&&o.enable(8),A.iridescence&&o.enable(9),A.alphaTest&&o.enable(10),A.vertexColors&&o.enable(11),A.vertexAlphas&&o.enable(12),A.vertexUv1s&&o.enable(13),A.vertexUv2s&&o.enable(14),A.vertexUv3s&&o.enable(15),A.vertexTangents&&o.enable(16),A.anisotropy&&o.enable(17),A.alphaHash&&o.enable(18),A.batching&&o.enable(19),A.dispersion&&o.enable(20),A.batchingColor&&o.enable(21),E.push(o.mask),o.disableAll(),A.fog&&o.enable(0),A.useFog&&o.enable(1),A.flatShading&&o.enable(2),A.logarithmicDepthBuffer&&o.enable(3),A.skinning&&o.enable(4),A.morphTargets&&o.enable(5),A.morphNormals&&o.enable(6),A.morphColors&&o.enable(7),A.premultipliedAlpha&&o.enable(8),A.shadowMapEnabled&&o.enable(9),A.doubleSided&&o.enable(10),A.flipSided&&o.enable(11),A.useDepthPacking&&o.enable(12),A.dithering&&o.enable(13),A.transmission&&o.enable(14),A.sheen&&o.enable(15),A.opaque&&o.enable(16),A.pointsUvs&&o.enable(17),A.decodeVideoTexture&&o.enable(18),A.alphaToCoverage&&o.enable(19),E.push(o.mask)}function S(E){const A=g[E.type];let L;if(A){const G=En[A];L=l1.clone(G.uniforms)}else L=E.uniforms;return L}function v(E,A){let L;for(let G=0,k=h.length;G<k;G++){const H=h[G];if(H.cacheKey===A){L=H,++L.usedTimes;break}}return L===void 0&&(L=new AA(i,A,E,r),h.push(L)),L}function w(E){if(--E.usedTimes===0){const A=h.indexOf(E);h[A]=h[h.length-1],h.pop(),E.destroy()}}function C(E){l.remove(E)}function U(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:v,releaseProgram:w,releaseShaderCache:C,programs:h,dispose:U}}function TA(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function wA(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function cu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||wA),n.length>1&&n.sort(d||cu),s.length>1&&s.sort(d||cu)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function CA(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hu,i.set(n,[a])):s>=r.length?(a=new hu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function RA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new Ie};break;case"SpotLight":t={position:new D,direction:new D,color:new Ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new Ie,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new Ie,groundColor:new Ie};break;case"RectAreaLight":t={color:new Ie,position:new D,halfWidth:new D,halfHeight:new D};break}return i[e.id]=t,t}}}function LA(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let IA=0;function PA(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function DA(i){const e=new RA,t=LA(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new Oe,a=new Oe;function o(c){let h=0,u=0,d=0;for(let E=0;E<9;E++)n.probe[E].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,b=0,M=0,S=0,v=0,w=0,C=0;c.sort(PA);for(let E=0,A=c.length;E<A;E++){const L=c[E],G=L.color,k=L.intensity,H=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=G.r*k,u+=G.g*k,d+=G.b*k;else if(L.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(L.sh.coefficients[V],k);C++}else if(L.isDirectionalLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Q=L.shadow,z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.directionalShadow[f]=z,n.directionalShadowMap[f]=q,n.directionalShadowMatrix[f]=L.shadow.matrix,b++}n.directional[f]=V,f++}else if(L.isSpotLight){const V=e.get(L);V.position.setFromMatrixPosition(L.matrixWorld),V.color.copy(G).multiplyScalar(k),V.distance=H,V.coneCos=Math.cos(L.angle),V.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),V.decay=L.decay,n.spot[_]=V;const Q=L.shadow;if(L.map&&(n.spotLightMap[v]=L.map,v++,Q.updateMatrices(L),L.castShadow&&w++),n.spotLightMatrix[_]=Q.matrix,L.castShadow){const z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=q,S++}_++}else if(L.isRectAreaLight){const V=e.get(L);V.color.copy(G).multiplyScalar(k),V.halfWidth.set(L.width*.5,0,0),V.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=V,m++}else if(L.isPointLight){const V=e.get(L);if(V.color.copy(L.color).multiplyScalar(L.intensity),V.distance=L.distance,V.decay=L.decay,L.castShadow){const Q=L.shadow,z=t.get(L);z.shadowIntensity=Q.intensity,z.shadowBias=Q.bias,z.shadowNormalBias=Q.normalBias,z.shadowRadius=Q.radius,z.shadowMapSize=Q.mapSize,z.shadowCameraNear=Q.camera.near,z.shadowCameraFar=Q.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=q,n.pointShadowMatrix[g]=L.shadow.matrix,M++}n.point[g]=V,g++}else if(L.isHemisphereLight){const V=e.get(L);V.skyColor.copy(L.color).multiplyScalar(k),V.groundColor.copy(L.groundColor).multiplyScalar(k),n.hemi[p]=V,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ie.LTC_FLOAT_1,n.rectAreaLTC2=ie.LTC_FLOAT_2):(n.rectAreaLTC1=ie.LTC_HALF_1,n.rectAreaLTC2=ie.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const U=n.hash;(U.directionalLength!==f||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==m||U.hemiLength!==p||U.numDirectionalShadows!==b||U.numPointShadows!==M||U.numSpotShadows!==S||U.numSpotMaps!==v||U.numLightProbes!==C)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=M,n.pointShadowMap.length=M,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=M,n.spotLightMatrix.length=S+v-w,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=C,U.directionalLength=f,U.pointLength=g,U.spotLength=_,U.rectAreaLength=m,U.hemiLength=p,U.numDirectionalShadows=b,U.numPointShadows=M,U.numSpotShadows=S,U.numSpotMaps=v,U.numLightProbes=C,n.version=IA++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const M=c[p];if(M.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),u++}else if(M.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),s.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(M.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),d++}else if(M.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:o,setupView:l,state:n}}function uu(i){const e=new DA(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function NA(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new uu(i),e.set(s,[o])):r>=a.length?(o=new uu(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class UA extends Tn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=g_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class FA extends Tn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const OA=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,BA=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function kA(i,e,t){let n=new sc;const s=new ze,r=new ze,a=new nt,o=new UA({depthPacking:__}),l=new FA,c={},h=t.maxTextureSize,u={[Kn]:qt,[qt]:Kn,[Sn]:Sn},d=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:OA,fragmentShader:BA}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new xn;g.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new $t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yl;let p=this.type;this.render=function(w,C,U){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),A=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),G=i.state;G.setBlending(yi),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const k=p!==Vn&&this.type===Vn,H=p===Vn&&this.type!==Vn;for(let q=0,V=w.length;q<V;q++){const Q=w[q],z=Q.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;s.copy(z.mapSize);const re=z.getFrameExtents();if(s.multiply(re),r.copy(z.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/re.x),s.x=r.x*re.x,z.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/re.y),s.y=r.y*re.y,z.mapSize.y=r.y)),z.map===null||k===!0||H===!0){const ge=this.type!==Vn?{minFilter:Gt,magFilter:Gt}:{};z.map!==null&&z.map.dispose(),z.map=new Zi(s.x,s.y,ge),z.map.texture.name=Q.name+".shadowMap",z.camera.updateProjectionMatrix()}i.setRenderTarget(z.map),i.clear();const le=z.getViewportCount();for(let ge=0;ge<le;ge++){const He=z.getViewport(ge);a.set(r.x*He.x,r.y*He.y,r.x*He.z,r.y*He.w),G.viewport(a),z.updateMatrices(Q,ge),n=z.getFrustum(),S(C,U,z.camera,Q,this.type)}z.isPointLightShadow!==!0&&this.type===Vn&&b(z,U),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,A,L)};function b(w,C){const U=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Zi(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(C,null,U,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(C,null,U,f,_,null)}function M(w,C,U,E){let A=null;const L=U.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)A=L;else if(A=U.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const G=A.uuid,k=C.uuid;let H=c[G];H===void 0&&(H={},c[G]=H);let q=H[k];q===void 0&&(q=A.clone(),H[k]=q,C.addEventListener("dispose",v)),A=q}if(A.visible=C.visible,A.wireframe=C.wireframe,E===Vn?A.side=C.shadowSide!==null?C.shadowSide:C.side:A.side=C.shadowSide!==null?C.shadowSide:u[C.side],A.alphaMap=C.alphaMap,A.alphaTest=C.alphaTest,A.map=C.map,A.clipShadows=C.clipShadows,A.clippingPlanes=C.clippingPlanes,A.clipIntersection=C.clipIntersection,A.displacementMap=C.displacementMap,A.displacementScale=C.displacementScale,A.displacementBias=C.displacementBias,A.wireframeLinewidth=C.wireframeLinewidth,A.linewidth=C.linewidth,U.isPointLight===!0&&A.isMeshDistanceMaterial===!0){const G=i.properties.get(A);G.light=U}return A}function S(w,C,U,E,A){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&A===Vn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,w.matrixWorld);const k=e.update(w),H=w.material;if(Array.isArray(H)){const q=k.groups;for(let V=0,Q=q.length;V<Q;V++){const z=q[V],re=H[z.materialIndex];if(re&&re.visible){const le=M(w,re,E,A);w.onBeforeShadow(i,w,C,U,k,le,z),i.renderBufferDirect(U,null,k,le,w,z),w.onAfterShadow(i,w,C,U,k,le,z)}}}else if(H.visible){const q=M(w,H,E,A);w.onBeforeShadow(i,w,C,U,k,q,null),i.renderBufferDirect(U,null,k,q,w,null),w.onAfterShadow(i,w,C,U,k,q,null)}}const G=w.children;for(let k=0,H=G.length;k<H;k++)S(G[k],C,U,E,A)}function v(w){w.target.removeEventListener("dispose",v);for(const U in c){const E=c[U],A=w.target.uuid;A in E&&(E[A].dispose(),delete E[A])}}}function zA(i){function e(){let I=!1;const ee=new nt;let X=null;const K=new nt(0,0,0,0);return{setMask:function(ne){X!==ne&&!I&&(i.colorMask(ne,ne,ne,ne),X=ne)},setLocked:function(ne){I=ne},setClear:function(ne,Ee,Xe,xt,Rt){Rt===!0&&(ne*=xt,Ee*=xt,Xe*=xt),ee.set(ne,Ee,Xe,xt),K.equals(ee)===!1&&(i.clearColor(ne,Ee,Xe,xt),K.copy(ee))},reset:function(){I=!1,X=null,K.set(-1,0,0,0)}}}function t(){let I=!1,ee=null,X=null,K=null;return{setTest:function(ne){ne?me(i.DEPTH_TEST):he(i.DEPTH_TEST)},setMask:function(ne){ee!==ne&&!I&&(i.depthMask(ne),ee=ne)},setFunc:function(ne){if(X!==ne){switch(ne){case Q0:i.depthFunc(i.NEVER);break;case J0:i.depthFunc(i.ALWAYS);break;case $0:i.depthFunc(i.LESS);break;case La:i.depthFunc(i.LEQUAL);break;case e_:i.depthFunc(i.EQUAL);break;case t_:i.depthFunc(i.GEQUAL);break;case n_:i.depthFunc(i.GREATER);break;case i_:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}X=ne}},setLocked:function(ne){I=ne},setClear:function(ne){K!==ne&&(i.clearDepth(ne),K=ne)},reset:function(){I=!1,ee=null,X=null,K=null}}}function n(){let I=!1,ee=null,X=null,K=null,ne=null,Ee=null,Xe=null,xt=null,Rt=null;return{setTest:function(Ke){I||(Ke?me(i.STENCIL_TEST):he(i.STENCIL_TEST))},setMask:function(Ke){ee!==Ke&&!I&&(i.stencilMask(Ke),ee=Ke)},setFunc:function(Ke,Dn,yn){(X!==Ke||K!==Dn||ne!==yn)&&(i.stencilFunc(Ke,Dn,yn),X=Ke,K=Dn,ne=yn)},setOp:function(Ke,Dn,yn){(Ee!==Ke||Xe!==Dn||xt!==yn)&&(i.stencilOp(Ke,Dn,yn),Ee=Ke,Xe=Dn,xt=yn)},setLocked:function(Ke){I=Ke},setClear:function(Ke){Rt!==Ke&&(i.clearStencil(Ke),Rt=Ke)},reset:function(){I=!1,ee=null,X=null,K=null,ne=null,Ee=null,Xe=null,xt=null,Rt=null}}}const s=new e,r=new t,a=new n,o=new WeakMap,l=new WeakMap;let c={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,b=null,M=null,S=null,v=null,w=new Ie(0,0,0),C=0,U=!1,E=null,A=null,L=null,G=null,k=null;const H=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,V=0;const Q=i.getParameter(i.VERSION);Q.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(Q)[1]),q=V>=1):Q.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),q=V>=2);let z=null,re={};const le=i.getParameter(i.SCISSOR_BOX),ge=i.getParameter(i.VIEWPORT),He=new nt().fromArray(le),et=new nt().fromArray(ge);function W(I,ee,X,K){const ne=new Uint8Array(4),Ee=i.createTexture();i.bindTexture(I,Ee),i.texParameteri(I,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(I,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Xe=0;Xe<X;Xe++)I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?i.texImage3D(ee,0,i.RGBA,1,1,K,0,i.RGBA,i.UNSIGNED_BYTE,ne):i.texImage2D(ee+Xe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ne);return Ee}const J={};J[i.TEXTURE_2D]=W(i.TEXTURE_2D,i.TEXTURE_2D,1),J[i.TEXTURE_CUBE_MAP]=W(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),J[i.TEXTURE_2D_ARRAY]=W(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),J[i.TEXTURE_3D]=W(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),me(i.DEPTH_TEST),r.setFunc(La),tt(!1),Ae(fh),me(i.CULL_FACE),_t(yi);function me(I){c[I]!==!0&&(i.enable(I),c[I]=!0)}function he(I){c[I]!==!1&&(i.disable(I),c[I]=!1)}function be(I,ee){return h[I]!==ee?(i.bindFramebuffer(I,ee),h[I]=ee,I===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ee),I===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ee),!0):!1}function Pe(I,ee){let X=d,K=!1;if(I){X=u.get(ee),X===void 0&&(X=[],u.set(ee,X));const ne=I.textures;if(X.length!==ne.length||X[0]!==i.COLOR_ATTACHMENT0){for(let Ee=0,Xe=ne.length;Ee<Xe;Ee++)X[Ee]=i.COLOR_ATTACHMENT0+Ee;X.length=ne.length,K=!0}}else X[0]!==i.BACK&&(X[0]=i.BACK,K=!0);K&&i.drawBuffers(X)}function Ve(I){return f!==I?(i.useProgram(I),f=I,!0):!1}const pt={[ki]:i.FUNC_ADD,[N0]:i.FUNC_SUBTRACT,[U0]:i.FUNC_REVERSE_SUBTRACT};pt[F0]=i.MIN,pt[O0]=i.MAX;const R={[B0]:i.ZERO,[k0]:i.ONE,[z0]:i.SRC_COLOR,[el]:i.SRC_ALPHA,[q0]:i.SRC_ALPHA_SATURATE,[W0]:i.DST_COLOR,[G0]:i.DST_ALPHA,[V0]:i.ONE_MINUS_SRC_COLOR,[tl]:i.ONE_MINUS_SRC_ALPHA,[X0]:i.ONE_MINUS_DST_COLOR,[H0]:i.ONE_MINUS_DST_ALPHA,[K0]:i.CONSTANT_COLOR,[Y0]:i.ONE_MINUS_CONSTANT_COLOR,[j0]:i.CONSTANT_ALPHA,[Z0]:i.ONE_MINUS_CONSTANT_ALPHA};function _t(I,ee,X,K,ne,Ee,Xe,xt,Rt,Ke){if(I===yi){g===!0&&(he(i.BLEND),g=!1);return}if(g===!1&&(me(i.BLEND),g=!0),I!==D0){if(I!==_||Ke!==U){if((m!==ki||M!==ki)&&(i.blendEquation(i.FUNC_ADD),m=ki,M=ki),Ke)switch(I){case Es:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ph:i.blendFunc(i.ONE,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case Es:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ph:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case mh:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case gh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}p=null,b=null,S=null,v=null,w.set(0,0,0),C=0,_=I,U=Ke}return}ne=ne||ee,Ee=Ee||X,Xe=Xe||K,(ee!==m||ne!==M)&&(i.blendEquationSeparate(pt[ee],pt[ne]),m=ee,M=ne),(X!==p||K!==b||Ee!==S||Xe!==v)&&(i.blendFuncSeparate(R[X],R[K],R[Ee],R[Xe]),p=X,b=K,S=Ee,v=Xe),(xt.equals(w)===!1||Rt!==C)&&(i.blendColor(xt.r,xt.g,xt.b,Rt),w.copy(xt),C=Rt),_=I,U=!1}function Qe(I,ee){I.side===Sn?he(i.CULL_FACE):me(i.CULL_FACE);let X=I.side===qt;ee&&(X=!X),tt(X),I.blending===Es&&I.transparent===!1?_t(yi):_t(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),s.setMask(I.colorWrite);const K=I.stencilWrite;a.setTest(K),K&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Re(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):he(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(I){E!==I&&(I?i.frontFace(i.CW):i.frontFace(i.CCW),E=I)}function Ae(I){I!==L0?(me(i.CULL_FACE),I!==A&&(I===fh?i.cullFace(i.BACK):I===I0?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):he(i.CULL_FACE),A=I}function vt(I){I!==L&&(q&&i.lineWidth(I),L=I)}function Re(I,ee,X){I?(me(i.POLYGON_OFFSET_FILL),(G!==ee||k!==X)&&(i.polygonOffset(ee,X),G=ee,k=X)):he(i.POLYGON_OFFSET_FILL)}function De(I){I?me(i.SCISSOR_TEST):he(i.SCISSOR_TEST)}function T(I){I===void 0&&(I=i.TEXTURE0+H-1),z!==I&&(i.activeTexture(I),z=I)}function x(I,ee,X){X===void 0&&(z===null?X=i.TEXTURE0+H-1:X=z);let K=re[X];K===void 0&&(K={type:void 0,texture:void 0},re[X]=K),(K.type!==I||K.texture!==ee)&&(z!==X&&(i.activeTexture(X),z=X),i.bindTexture(I,ee||J[I]),K.type=I,K.texture=ee)}function B(){const I=re[z];I!==void 0&&I.type!==void 0&&(i.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Y(){try{i.compressedTexImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Z(){try{i.compressedTexImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Me(){try{i.texSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function se(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ue(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ne(){try{i.texStorage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function $(){try{i.texStorage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ce(){try{i.texImage2D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function We(){try{i.texImage3D.apply(i,arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ce(I){He.equals(I)===!1&&(i.scissor(I.x,I.y,I.z,I.w),He.copy(I))}function de(I){et.equals(I)===!1&&(i.viewport(I.x,I.y,I.z,I.w),et.copy(I))}function Le(I,ee){let X=l.get(ee);X===void 0&&(X=new WeakMap,l.set(ee,X));let K=X.get(I);K===void 0&&(K=i.getUniformBlockIndex(ee,I.name),X.set(I,K))}function Be(I,ee){const K=l.get(ee).get(I);o.get(ee)!==K&&(i.uniformBlockBinding(ee,K,I.__bindingPointIndex),o.set(ee,K))}function ht(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},z=null,re={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,b=null,M=null,S=null,v=null,w=new Ie(0,0,0),C=0,U=!1,E=null,A=null,L=null,G=null,k=null,He.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:me,disable:he,bindFramebuffer:be,drawBuffers:Pe,useProgram:Ve,setBlending:_t,setMaterial:Qe,setFlipSided:tt,setCullFace:Ae,setLineWidth:vt,setPolygonOffset:Re,setScissorTest:De,activeTexture:T,bindTexture:x,unbindTexture:B,compressedTexImage2D:Y,compressedTexImage3D:Z,texImage2D:ce,texImage3D:We,updateUBOMapping:Le,uniformBlockBinding:Be,texStorage2D:Ne,texStorage3D:$,texSubImage2D:j,texSubImage3D:Me,compressedTexSubImage2D:se,compressedTexSubImage3D:ue,scissor:Ce,viewport:de,reset:ht}}function du(i,e,t,n){const s=VA(n);switch(t){case Gd:return i*e;case Wd:return i*e;case Xd:return i*e*2;case Jl:return i*e/s.components*s.byteLength;case $l:return i*e/s.components*s.byteLength;case qd:return i*e*2/s.components*s.byteLength;case ec:return i*e*2/s.components*s.byteLength;case Hd:return i*e*3/s.components*s.byteLength;case rn:return i*e*4/s.components*s.byteLength;case tc:return i*e*4/s.components*s.byteLength;case Ma:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Sa:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case sl:case al:return Math.max(i,16)*Math.max(e,8)/4;case il:case rl:return Math.max(i,8)*Math.max(e,8)/2;case ol:case ll:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case cl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case hl:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ul:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case dl:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case fl:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case pl:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ml:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case gl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case _l:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case vl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case xl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case yl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Al:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ml:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case El:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ta:case Sl:case bl:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Kd:case Tl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case wl:case Cl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function VA(i){switch(i){case Yn:case kd:return{byteLength:1,components:1};case Sr:case zd:case Pr:return{byteLength:2,components:1};case Zl:case Ql:return{byteLength:2,components:4};case ji:case jl:case gn:return{byteLength:4,components:1};case Vd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function GA(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ze,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,x){return f?new OffscreenCanvas(T,x):wr("canvas")}function _(T,x,B){let Y=1;const Z=De(T);if((Z.width>B||Z.height>B)&&(Y=B/Math.max(Z.width,Z.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const j=Math.floor(Y*Z.width),Me=Math.floor(Y*Z.height);u===void 0&&(u=g(j,Me));const se=x?g(j,Me):u;return se.width=j,se.height=Me,se.getContext("2d").drawImage(T,0,0,j,Me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+j+"x"+Me+")."),se}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),T;return T}function m(T){return T.generateMipmaps&&T.minFilter!==Gt&&T.minFilter!==Jt}function p(T){i.generateMipmap(T)}function b(T,x,B,Y,Z=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let j=x;if(x===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8)),x===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),x===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8)),x===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),x===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),x===i.RGBA){const Me=Z?Da:qe.getTransfer(Y);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=Me===ot?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function M(T,x){let B;return T?x===null||x===ji||x===Ds?B=i.DEPTH24_STENCIL8:x===gn?B=i.DEPTH32F_STENCIL8:x===Sr&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ji||x===Ds?B=i.DEPTH_COMPONENT24:x===gn?B=i.DEPTH_COMPONENT32F:x===Sr&&(B=i.DEPTH_COMPONENT16),B}function S(T,x){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Gt&&T.minFilter!==Jt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function v(T){const x=T.target;x.removeEventListener("dispose",v),C(x),x.isVideoTexture&&h.delete(x)}function w(T){const x=T.target;x.removeEventListener("dispose",w),E(x)}function C(T){const x=n.get(T);if(x.__webglInit===void 0)return;const B=T.source,Y=d.get(B);if(Y){const Z=Y[x.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&U(T),Object.keys(Y).length===0&&d.delete(B)}n.remove(T)}function U(T){const x=n.get(T);i.deleteTexture(x.__webglTexture);const B=T.source,Y=d.get(B);delete Y[x.__cacheKey],a.memory.textures--}function E(T){const x=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(x.__webglFramebuffer[Y]))for(let Z=0;Z<x.__webglFramebuffer[Y].length;Z++)i.deleteFramebuffer(x.__webglFramebuffer[Y][Z]);else i.deleteFramebuffer(x.__webglFramebuffer[Y]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[Y])}else{if(Array.isArray(x.__webglFramebuffer))for(let Y=0;Y<x.__webglFramebuffer.length;Y++)i.deleteFramebuffer(x.__webglFramebuffer[Y]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let Y=0;Y<x.__webglColorRenderbuffer.length;Y++)x.__webglColorRenderbuffer[Y]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[Y]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const B=T.textures;for(let Y=0,Z=B.length;Y<Z;Y++){const j=n.get(B[Y]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),a.memory.textures--),n.remove(B[Y])}n.remove(T)}let A=0;function L(){A=0}function G(){const T=A;return T>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+s.maxTextures),A+=1,T}function k(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function H(T,x){const B=n.get(T);if(T.isVideoTexture&&vt(T),T.isRenderTargetTexture===!1&&T.version>0&&B.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{et(B,T,x);return}}t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+x)}function q(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){et(B,T,x);return}t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+x)}function V(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){et(B,T,x);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+x)}function Q(T,x){const B=n.get(T);if(T.version>0&&B.__version!==T.version){W(B,T,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+x)}const z={[Ps]:i.REPEAT,[gi]:i.CLAMP_TO_EDGE,[Pa]:i.MIRRORED_REPEAT},re={[Gt]:i.NEAREST,[Bd]:i.NEAREST_MIPMAP_NEAREST,[ur]:i.NEAREST_MIPMAP_LINEAR,[Jt]:i.LINEAR,[Aa]:i.LINEAR_MIPMAP_NEAREST,[Hn]:i.LINEAR_MIPMAP_LINEAR},le={[x_]:i.NEVER,[b_]:i.ALWAYS,[y_]:i.LESS,[Zd]:i.LEQUAL,[A_]:i.EQUAL,[S_]:i.GEQUAL,[M_]:i.GREATER,[E_]:i.NOTEQUAL};function ge(T,x){if(x.type===gn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Jt||x.magFilter===Aa||x.magFilter===ur||x.magFilter===Hn||x.minFilter===Jt||x.minFilter===Aa||x.minFilter===ur||x.minFilter===Hn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,z[x.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,z[x.wrapT]),(T===i.TEXTURE_3D||T===i.TEXTURE_2D_ARRAY)&&i.texParameteri(T,i.TEXTURE_WRAP_R,z[x.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,re[x.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,re[x.minFilter]),x.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,le[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Gt||x.minFilter!==ur&&x.minFilter!==Hn||x.type===gn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function He(T,x){let B=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",v));const Y=x.source;let Z=d.get(Y);Z===void 0&&(Z={},d.set(Y,Z));const j=k(x);if(j!==T.__cacheKey){Z[j]===void 0&&(Z[j]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,B=!0),Z[j].usedTimes++;const Me=Z[T.__cacheKey];Me!==void 0&&(Z[T.__cacheKey].usedTimes--,Me.usedTimes===0&&U(x)),T.__cacheKey=j,T.__webglTexture=Z[j].texture}return B}function et(T,x,B){let Y=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(Y=i.TEXTURE_3D);const Z=He(T,x),j=x.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+B);const Me=n.get(j);if(j.version!==Me.__version||Z===!0){t.activeTexture(i.TEXTURE0+B);const se=qe.getPrimaries(qe.workingColorSpace),ue=x.colorSpace===pi?null:qe.getPrimaries(x.colorSpace),Ne=x.colorSpace===pi||se===ue?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let $=_(x.image,!1,s.maxTextureSize);$=Re(x,$);const ce=r.convert(x.format,x.colorSpace),We=r.convert(x.type);let Ce=b(x.internalFormat,ce,We,x.colorSpace,x.isVideoTexture);ge(Y,x);let de;const Le=x.mipmaps,Be=x.isVideoTexture!==!0,ht=Me.__version===void 0||Z===!0,I=j.dataReady,ee=S(x,$);if(x.isDepthTexture)Ce=M(x.format===Ns,x.type),ht&&(Be?t.texStorage2D(i.TEXTURE_2D,1,Ce,$.width,$.height):t.texImage2D(i.TEXTURE_2D,0,Ce,$.width,$.height,0,ce,We,null));else if(x.isDataTexture)if(Le.length>0){Be&&ht&&t.texStorage2D(i.TEXTURE_2D,ee,Ce,Le[0].width,Le[0].height);for(let X=0,K=Le.length;X<K;X++)de=Le[X],Be?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,de.width,de.height,ce,We,de.data):t.texImage2D(i.TEXTURE_2D,X,Ce,de.width,de.height,0,ce,We,de.data);x.generateMipmaps=!1}else Be?(ht&&t.texStorage2D(i.TEXTURE_2D,ee,Ce,$.width,$.height),I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,$.width,$.height,ce,We,$.data)):t.texImage2D(i.TEXTURE_2D,0,Ce,$.width,$.height,0,ce,We,$.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){Be&&ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,Ce,Le[0].width,Le[0].height,$.depth);for(let X=0,K=Le.length;X<K;X++)if(de=Le[X],x.format!==rn)if(ce!==null)if(Be){if(I)if(x.layerUpdates.size>0){const ne=du(de.width,de.height,x.format,x.type);for(const Ee of x.layerUpdates){const Xe=de.data.subarray(Ee*ne/de.data.BYTES_PER_ELEMENT,(Ee+1)*ne/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,Ee,de.width,de.height,1,ce,Xe,0,0)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,de.width,de.height,$.depth,ce,de.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,X,Ce,de.width,de.height,$.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Be?I&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,X,0,0,0,de.width,de.height,$.depth,ce,We,de.data):t.texImage3D(i.TEXTURE_2D_ARRAY,X,Ce,de.width,de.height,$.depth,0,ce,We,de.data)}else{Be&&ht&&t.texStorage2D(i.TEXTURE_2D,ee,Ce,Le[0].width,Le[0].height);for(let X=0,K=Le.length;X<K;X++)de=Le[X],x.format!==rn?ce!==null?Be?I&&t.compressedTexSubImage2D(i.TEXTURE_2D,X,0,0,de.width,de.height,ce,de.data):t.compressedTexImage2D(i.TEXTURE_2D,X,Ce,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Be?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,de.width,de.height,ce,We,de.data):t.texImage2D(i.TEXTURE_2D,X,Ce,de.width,de.height,0,ce,We,de.data)}else if(x.isDataArrayTexture)if(Be){if(ht&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ee,Ce,$.width,$.height,$.depth),I)if(x.layerUpdates.size>0){const X=du($.width,$.height,x.format,x.type);for(const K of x.layerUpdates){const ne=$.data.subarray(K*X/$.data.BYTES_PER_ELEMENT,(K+1)*X/$.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,$.width,$.height,1,ce,We,ne)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,$.width,$.height,$.depth,ce,We,$.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ce,$.width,$.height,$.depth,0,ce,We,$.data);else if(x.isData3DTexture)Be?(ht&&t.texStorage3D(i.TEXTURE_3D,ee,Ce,$.width,$.height,$.depth),I&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,$.width,$.height,$.depth,ce,We,$.data)):t.texImage3D(i.TEXTURE_3D,0,Ce,$.width,$.height,$.depth,0,ce,We,$.data);else if(x.isFramebufferTexture){if(ht)if(Be)t.texStorage2D(i.TEXTURE_2D,ee,Ce,$.width,$.height);else{let X=$.width,K=$.height;for(let ne=0;ne<ee;ne++)t.texImage2D(i.TEXTURE_2D,ne,Ce,X,K,0,ce,We,null),X>>=1,K>>=1}}else if(Le.length>0){if(Be&&ht){const X=De(Le[0]);t.texStorage2D(i.TEXTURE_2D,ee,Ce,X.width,X.height)}for(let X=0,K=Le.length;X<K;X++)de=Le[X],Be?I&&t.texSubImage2D(i.TEXTURE_2D,X,0,0,ce,We,de):t.texImage2D(i.TEXTURE_2D,X,Ce,ce,We,de);x.generateMipmaps=!1}else if(Be){if(ht){const X=De($);t.texStorage2D(i.TEXTURE_2D,ee,Ce,X.width,X.height)}I&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,We,$)}else t.texImage2D(i.TEXTURE_2D,0,Ce,ce,We,$);m(x)&&p(Y),Me.__version=j.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function W(T,x,B){if(x.image.length!==6)return;const Y=He(T,x),Z=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,T.__webglTexture,i.TEXTURE0+B);const j=n.get(Z);if(Z.version!==j.__version||Y===!0){t.activeTexture(i.TEXTURE0+B);const Me=qe.getPrimaries(qe.workingColorSpace),se=x.colorSpace===pi?null:qe.getPrimaries(x.colorSpace),ue=x.colorSpace===pi||Me===se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);const Ne=x.isCompressedTexture||x.image[0].isCompressedTexture,$=x.image[0]&&x.image[0].isDataTexture,ce=[];for(let K=0;K<6;K++)!Ne&&!$?ce[K]=_(x.image[K],!0,s.maxCubemapSize):ce[K]=$?x.image[K].image:x.image[K],ce[K]=Re(x,ce[K]);const We=ce[0],Ce=r.convert(x.format,x.colorSpace),de=r.convert(x.type),Le=b(x.internalFormat,Ce,de,x.colorSpace),Be=x.isVideoTexture!==!0,ht=j.__version===void 0||Y===!0,I=Z.dataReady;let ee=S(x,We);ge(i.TEXTURE_CUBE_MAP,x);let X;if(Ne){Be&&ht&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ee,Le,We.width,We.height);for(let K=0;K<6;K++){X=ce[K].mipmaps;for(let ne=0;ne<X.length;ne++){const Ee=X[ne];x.format!==rn?Ce!==null?Be?I&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne,0,0,Ee.width,Ee.height,Ce,Ee.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne,Le,Ee.width,Ee.height,0,Ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne,0,0,Ee.width,Ee.height,Ce,de,Ee.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne,Le,Ee.width,Ee.height,0,Ce,de,Ee.data)}}}else{if(X=x.mipmaps,Be&&ht){X.length>0&&ee++;const K=De(ce[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ee,Le,K.width,K.height)}for(let K=0;K<6;K++)if($){Be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ce[K].width,ce[K].height,Ce,de,ce[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Le,ce[K].width,ce[K].height,0,Ce,de,ce[K].data);for(let ne=0;ne<X.length;ne++){const Xe=X[ne].image[K].image;Be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne+1,0,0,Xe.width,Xe.height,Ce,de,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne+1,Le,Xe.width,Xe.height,0,Ce,de,Xe.data)}}else{Be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Ce,de,ce[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Le,Ce,de,ce[K]);for(let ne=0;ne<X.length;ne++){const Ee=X[ne];Be?I&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne+1,0,0,Ce,de,Ee.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ne+1,Le,Ce,de,Ee.image[K])}}}m(x)&&p(i.TEXTURE_CUBE_MAP),j.__version=Z.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function J(T,x,B,Y,Z,j){const Me=r.convert(B.format,B.colorSpace),se=r.convert(B.type),ue=b(B.internalFormat,Me,se,B.colorSpace);if(!n.get(x).__hasExternalTextures){const $=Math.max(1,x.width>>j),ce=Math.max(1,x.height>>j);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,j,ue,$,ce,x.depth,0,Me,se,null):t.texImage2D(Z,j,ue,$,ce,0,Me,se,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),Ae(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,Z,n.get(B).__webglTexture,0,tt(x)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,Z,n.get(B).__webglTexture,j),t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(T,x,B){if(i.bindRenderbuffer(i.RENDERBUFFER,T),x.depthBuffer){const Y=x.depthTexture,Z=Y&&Y.isDepthTexture?Y.type:null,j=M(x.stencilBuffer,Z),Me=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=tt(x);Ae(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,j,x.width,x.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Me,i.RENDERBUFFER,T)}else{const Y=x.textures;for(let Z=0;Z<Y.length;Z++){const j=Y[Z],Me=r.convert(j.format,j.colorSpace),se=r.convert(j.type),ue=b(j.internalFormat,Me,se,j.colorSpace),Ne=tt(x);B&&Ae(x)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,ue,x.width,x.height):Ae(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ne,ue,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,ue,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function he(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(x.depthTexture).__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),H(x.depthTexture,0);const Y=n.get(x.depthTexture).__webglTexture,Z=tt(x);if(x.depthTexture.format===Ss)Ae(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,Y,0);else if(x.depthTexture.format===Ns)Ae(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function be(T){const x=n.get(T),B=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),Y){const Z=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,Y.removeEventListener("dispose",Z)};Y.addEventListener("dispose",Z),x.__depthDisposeCallback=Z}x.__boundDepthTexture=Y}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");he(x.__webglFramebuffer,T)}else if(B){x.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[Y]),x.__webglDepthbuffer[Y]===void 0)x.__webglDepthbuffer[Y]=i.createRenderbuffer(),me(x.__webglDepthbuffer[Y],T,!1);else{const Z=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=x.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,j)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),me(x.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,Z)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(T,x,B){const Y=n.get(T);x!==void 0&&J(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&be(T)}function Ve(T){const x=T.texture,B=n.get(T),Y=n.get(x);T.addEventListener("dispose",w);const Z=T.textures,j=T.isWebGLCubeRenderTarget===!0,Me=Z.length>1;if(Me||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=x.version,a.memory.textures++),j){B.__webglFramebuffer=[];for(let se=0;se<6;se++)if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer[se]=[];for(let ue=0;ue<x.mipmaps.length;ue++)B.__webglFramebuffer[se][ue]=i.createFramebuffer()}else B.__webglFramebuffer[se]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){B.__webglFramebuffer=[];for(let se=0;se<x.mipmaps.length;se++)B.__webglFramebuffer[se]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Me)for(let se=0,ue=Z.length;se<ue;se++){const Ne=n.get(Z[se]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=i.createTexture(),a.memory.textures++)}if(T.samples>0&&Ae(T)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let se=0;se<Z.length;se++){const ue=Z[se];B.__webglColorRenderbuffer[se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[se]);const Ne=r.convert(ue.format,ue.colorSpace),$=r.convert(ue.type),ce=b(ue.internalFormat,Ne,$,ue.colorSpace,T.isXRRenderTarget===!0),We=tt(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,ce,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+se,i.RENDERBUFFER,B.__webglColorRenderbuffer[se])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),me(B.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),ge(i.TEXTURE_CUBE_MAP,x);for(let se=0;se<6;se++)if(x.mipmaps&&x.mipmaps.length>0)for(let ue=0;ue<x.mipmaps.length;ue++)J(B.__webglFramebuffer[se][ue],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,ue);else J(B.__webglFramebuffer[se],T,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);m(x)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Me){for(let se=0,ue=Z.length;se<ue;se++){const Ne=Z[se],$=n.get(Ne);t.bindTexture(i.TEXTURE_2D,$.__webglTexture),ge(i.TEXTURE_2D,Ne),J(B.__webglFramebuffer,T,Ne,i.COLOR_ATTACHMENT0+se,i.TEXTURE_2D,0),m(Ne)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let se=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(se=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,Y.__webglTexture),ge(se,x),x.mipmaps&&x.mipmaps.length>0)for(let ue=0;ue<x.mipmaps.length;ue++)J(B.__webglFramebuffer[ue],T,x,i.COLOR_ATTACHMENT0,se,ue);else J(B.__webglFramebuffer,T,x,i.COLOR_ATTACHMENT0,se,0);m(x)&&p(se),t.unbindTexture()}T.depthBuffer&&be(T)}function pt(T){const x=T.textures;for(let B=0,Y=x.length;B<Y;B++){const Z=x[B];if(m(Z)){const j=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Me=n.get(Z).__webglTexture;t.bindTexture(j,Me),p(j),t.unbindTexture()}}}const R=[],_t=[];function Qe(T){if(T.samples>0){if(Ae(T)===!1){const x=T.textures,B=T.width,Y=T.height;let Z=i.COLOR_BUFFER_BIT;const j=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Me=n.get(T),se=x.length>1;if(se)for(let ue=0;ue<x.length;ue++)t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglFramebuffer);for(let ue=0;ue<x.length;ue++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),se){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ue]);const Ne=n.get(x[ue]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,B,Y,0,0,B,Y,Z,i.NEAREST),l===!0&&(R.length=0,_t.length=0,R.push(i.COLOR_ATTACHMENT0+ue),T.depthBuffer&&T.resolveDepthBuffer===!1&&(R.push(j),_t.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,_t)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,R))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),se)for(let ue=0;ue<x.length;ue++){t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.RENDERBUFFER,Me.__webglColorRenderbuffer[ue]);const Ne=n.get(x[ue]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ue,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Me.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function tt(T){return Math.min(s.maxSamples,T.samples)}function Ae(T){const x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function vt(T){const x=a.render.frame;h.get(T)!==x&&(h.set(T,x),T.update())}function Re(T,x){const B=T.colorSpace,Y=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||B!==Dt&&B!==pi&&(qe.getTransfer(B)===ot?(Y!==rn||Z!==Yn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),x}function De(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=L,this.setTexture2D=H,this.setTexture2DArray=q,this.setTexture3D=V,this.setTextureCube=Q,this.rebindTextures=Pe,this.setupRenderTarget=Ve,this.updateRenderTargetMipmap=pt,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=be,this.setupFrameBufferTexture=J,this.useMultisampledRTT=Ae}function HA(i,e){function t(n,s=pi){let r;const a=qe.getTransfer(s);if(n===Yn)return i.UNSIGNED_BYTE;if(n===Zl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ql)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Vd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===kd)return i.BYTE;if(n===zd)return i.SHORT;if(n===Sr)return i.UNSIGNED_SHORT;if(n===jl)return i.INT;if(n===ji)return i.UNSIGNED_INT;if(n===gn)return i.FLOAT;if(n===Pr)return i.HALF_FLOAT;if(n===Gd)return i.ALPHA;if(n===Hd)return i.RGB;if(n===rn)return i.RGBA;if(n===Wd)return i.LUMINANCE;if(n===Xd)return i.LUMINANCE_ALPHA;if(n===Ss)return i.DEPTH_COMPONENT;if(n===Ns)return i.DEPTH_STENCIL;if(n===Jl)return i.RED;if(n===$l)return i.RED_INTEGER;if(n===qd)return i.RG;if(n===ec)return i.RG_INTEGER;if(n===tc)return i.RGBA_INTEGER;if(n===Ma||n===Ea||n===Sa||n===ba)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ma)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ma)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ea)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ba)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===il||n===sl||n===rl||n===al)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===il)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===sl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===rl)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===al)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ol||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===ol||n===ll)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===cl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===hl||n===ul||n===dl||n===fl||n===pl||n===ml||n===gl||n===_l||n===vl||n===xl||n===yl||n===Al||n===Ml||n===El)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===hl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ul)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===dl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===pl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ml)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===gl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_l)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===vl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===xl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===yl)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Al)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ml)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===El)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ta||n===Sl||n===bl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ta)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Sl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Kd||n===Tl||n===wl||n===Cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ta)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Tl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ds?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class WA extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Hi extends dt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const XA={type:"move"};class Do{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Hi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Hi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Hi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(XA)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Hi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const qA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class YA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new wt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new jn({vertexShader:qA,fragmentShader:KA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Ya(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jA extends qs{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new YA,m=t.getContextAttributes();let p=null,b=null;const M=[],S=[],v=new ze;let w=null;const C=new Vt;C.layers.enable(1),C.viewport=new nt;const U=new Vt;U.layers.enable(2),U.viewport=new nt;const E=[C,U],A=new WA;A.layers.enable(1),A.layers.enable(2);let L=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let J=M[W];return J===void 0&&(J=new Do,M[W]=J),J.getTargetRaySpace()},this.getControllerGrip=function(W){let J=M[W];return J===void 0&&(J=new Do,M[W]=J),J.getGripSpace()},this.getHand=function(W){let J=M[W];return J===void 0&&(J=new Do,M[W]=J),J.getHandSpace()};function k(W){const J=S.indexOf(W.inputSource);if(J===-1)return;const me=M[J];me!==void 0&&(me.update(W.inputSource,W.frame,c||a),me.dispatchEvent({type:W.type,data:W.inputSource}))}function H(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",q);for(let W=0;W<M.length;W++){const J=S[W];J!==null&&(S[W]=null,M[W].disconnect(J))}L=null,G=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,b=null,et.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(v.width,v.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(W){if(s=W,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",H),s.addEventListener("inputsourceschange",q),m.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(v),s.renderState.layers===void 0){const J={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,J),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),b=new Zi(f.framebufferWidth,f.framebufferHeight,{format:rn,type:Yn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let J=null,me=null,he=null;m.depth&&(he=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=m.stencil?Ns:Ss,me=m.stencil?Ds:ji);const be={colorFormat:t.RGBA8,depthFormat:he,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(be),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new Zi(d.textureWidth,d.textureHeight,{format:rn,type:Yn,depthTexture:new hf(d.textureWidth,d.textureHeight,me,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),et.setContext(s),et.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function q(W){for(let J=0;J<W.removed.length;J++){const me=W.removed[J],he=S.indexOf(me);he>=0&&(S[he]=null,M[he].disconnect(me))}for(let J=0;J<W.added.length;J++){const me=W.added[J];let he=S.indexOf(me);if(he===-1){for(let Pe=0;Pe<M.length;Pe++)if(Pe>=S.length){S.push(me),he=Pe;break}else if(S[Pe]===null){S[Pe]=me,he=Pe;break}if(he===-1)break}const be=M[he];be&&be.connect(me)}}const V=new D,Q=new D;function z(W,J,me){V.setFromMatrixPosition(J.matrixWorld),Q.setFromMatrixPosition(me.matrixWorld);const he=V.distanceTo(Q),be=J.projectionMatrix.elements,Pe=me.projectionMatrix.elements,Ve=be[14]/(be[10]-1),pt=be[14]/(be[10]+1),R=(be[9]+1)/be[5],_t=(be[9]-1)/be[5],Qe=(be[8]-1)/be[0],tt=(Pe[8]+1)/Pe[0],Ae=Ve*Qe,vt=Ve*tt,Re=he/(-Qe+tt),De=Re*-Qe;if(J.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(De),W.translateZ(Re),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),be[10]===-1)W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse);else{const T=Ve+Re,x=pt+Re,B=Ae-De,Y=vt+(he-De),Z=R*pt/x*T,j=_t*pt/x*T;W.projectionMatrix.makePerspective(B,Y,Z,j,T,x),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function re(W,J){J===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(J.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(s===null)return;let J=W.near,me=W.far;_.texture!==null&&(_.depthNear>0&&(J=_.depthNear),_.depthFar>0&&(me=_.depthFar)),A.near=U.near=C.near=J,A.far=U.far=C.far=me,(L!==A.near||G!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),L=A.near,G=A.far);const he=W.parent,be=A.cameras;re(A,he);for(let Pe=0;Pe<be.length;Pe++)re(be[Pe],he);be.length===2?z(A,C,U):A.projectionMatrix.copy(C.projectionMatrix),le(W,A,he)};function le(W,J,me){me===null?W.matrix.copy(J.matrixWorld):(W.matrix.copy(me.matrixWorld),W.matrix.invert(),W.matrix.multiply(J.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(J.projectionMatrix),W.projectionMatrixInverse.copy(J.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Us*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(W){l=W,d!==null&&(d.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)};let ge=null;function He(W,J){if(h=J.getViewerPose(c||a),g=J,h!==null){const me=h.views;f!==null&&(e.setRenderTargetFramebuffer(b,f.framebuffer),e.setRenderTarget(b));let he=!1;me.length!==A.cameras.length&&(A.cameras.length=0,he=!0);for(let Pe=0;Pe<me.length;Pe++){const Ve=me[Pe];let pt=null;if(f!==null)pt=f.getViewport(Ve);else{const _t=u.getViewSubImage(d,Ve);pt=_t.viewport,Pe===0&&(e.setRenderTargetTextures(b,_t.colorTexture,d.ignoreDepthValues?void 0:_t.depthStencilTexture),e.setRenderTarget(b))}let R=E[Pe];R===void 0&&(R=new Vt,R.layers.enable(Pe),R.viewport=new nt,E[Pe]=R),R.matrix.fromArray(Ve.transform.matrix),R.matrix.decompose(R.position,R.quaternion,R.scale),R.projectionMatrix.fromArray(Ve.projectionMatrix),R.projectionMatrixInverse.copy(R.projectionMatrix).invert(),R.viewport.set(pt.x,pt.y,pt.width,pt.height),Pe===0&&(A.matrix.copy(R.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),he===!0&&A.cameras.push(R)}const be=s.enabledFeatures;if(be&&be.includes("depth-sensing")){const Pe=u.getDepthInformation(me[0]);Pe&&Pe.isValid&&Pe.texture&&_.init(e,Pe,s.renderState)}}for(let me=0;me<M.length;me++){const he=S[me],be=M[me];he!==null&&be!==void 0&&be.update(he,J,c||a)}ge&&ge(W,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const et=new cf;et.setAnimationLoop(He),this.setAnimationLoop=function(W){ge=W},this.dispose=function(){}}}const Ui=new Cn,ZA=new Oe;function QA(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,af(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,b,M,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,b,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===qt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===qt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),M=b.envMap,S=b.envMapRotation;M&&(m.envMap.value=M,Ui.copy(S),Ui.x*=-1,Ui.y*=-1,Ui.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Ui.y*=-1,Ui.z*=-1),m.envMapRotation.value.setFromMatrix4(ZA.makeRotationFromEuler(Ui)),m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===qt&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function JA(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,M){const S=M.program;n.uniformBlockBinding(b,S)}function c(b,M){let S=s[b.id];S===void 0&&(g(b),S=h(b),s[b.id]=S,b.addEventListener("dispose",m));const v=M.program;n.updateUBOMapping(b,v);const w=e.render.frame;r[b.id]!==w&&(d(b),r[b.id]=w)}function h(b){const M=u();b.__bindingPointIndex=M;const S=i.createBuffer(),v=b.__size,w=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,v,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,M,S),S}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const M=s[b.id],S=b.uniforms,v=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,M);for(let w=0,C=S.length;w<C;w++){const U=Array.isArray(S[w])?S[w]:[S[w]];for(let E=0,A=U.length;E<A;E++){const L=U[E];if(f(L,w,E,v)===!0){const G=L.__offset,k=Array.isArray(L.value)?L.value:[L.value];let H=0;for(let q=0;q<k.length;q++){const V=k[q],Q=_(V);typeof V=="number"||typeof V=="boolean"?(L.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,G+H,L.__data)):V.isMatrix3?(L.__data[0]=V.elements[0],L.__data[1]=V.elements[1],L.__data[2]=V.elements[2],L.__data[3]=0,L.__data[4]=V.elements[3],L.__data[5]=V.elements[4],L.__data[6]=V.elements[5],L.__data[7]=0,L.__data[8]=V.elements[6],L.__data[9]=V.elements[7],L.__data[10]=V.elements[8],L.__data[11]=0):(V.toArray(L.__data,H),H+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(b,M,S,v){const w=b.value,C=M+"_"+S;if(v[C]===void 0)return typeof w=="number"||typeof w=="boolean"?v[C]=w:v[C]=w.clone(),!0;{const U=v[C];if(typeof w=="number"||typeof w=="boolean"){if(U!==w)return v[C]=w,!0}else if(U.equals(w)===!1)return U.copy(w),!0}return!1}function g(b){const M=b.uniforms;let S=0;const v=16;for(let C=0,U=M.length;C<U;C++){const E=Array.isArray(M[C])?M[C]:[M[C]];for(let A=0,L=E.length;A<L;A++){const G=E[A],k=Array.isArray(G.value)?G.value:[G.value];for(let H=0,q=k.length;H<q;H++){const V=k[H],Q=_(V),z=S%v,re=z%Q.boundary,le=z+re;S+=re,le!==0&&v-le<Q.storage&&(S+=v-le),G.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=S,S+=Q.storage}}}const w=S%v;return w>0&&(S+=v-w),b.__size=S,b.__cache={},this}function _(b){const M={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(M.boundary=4,M.storage=4):b.isVector2?(M.boundary=8,M.storage=8):b.isVector3||b.isColor?(M.boundary=16,M.storage=12):b.isVector4?(M.boundary=16,M.storage=16):b.isMatrix3?(M.boundary=48,M.storage=48):b.isMatrix4?(M.boundary=64,M.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),M}function m(b){const M=b.target;M.removeEventListener("dispose",m);const S=a.indexOf(M.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function p(){for(const b in s)i.deleteBuffer(s[b]);a=[],s={},r={}}return{bind:l,update:c,dispose:p}}class $A{constructor(e={}){const{canvas:t=H_(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],b=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=zt,this.toneMapping=Ai,this.toneMappingExposure=1;const M=this;let S=!1,v=0,w=0,C=null,U=-1,E=null;const A=new nt,L=new nt;let G=null;const k=new Ie(0);let H=0,q=t.width,V=t.height,Q=1,z=null,re=null;const le=new nt(0,0,q,V),ge=new nt(0,0,q,V);let He=!1;const et=new sc;let W=!1,J=!1;const me=new Oe,he=new D,be=new nt,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function pt(){return C===null?Q:1}let R=n;function _t(y,P){return t.getContext(y,P)}try{const y={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Kl}`),t.addEventListener("webglcontextlost",X,!1),t.addEventListener("webglcontextrestored",K,!1),t.addEventListener("webglcontextcreationerror",ne,!1),R===null){const P="webgl2";if(R=_t(P,y),R===null)throw _t(P)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let Qe,tt,Ae,vt,Re,De,T,x,B,Y,Z,j,Me,se,ue,Ne,$,ce,We,Ce,de,Le,Be,ht;function I(){Qe=new ry(R),Qe.init(),Le=new HA(R,Qe),tt=new $x(R,Qe,e,Le),Ae=new zA(R),vt=new ly(R),Re=new TA,De=new GA(R,Qe,Ae,Re,tt,Le,vt),T=new ty(M),x=new sy(M),B=new m1(R),Be=new Qx(R,B),Y=new ay(R,B,vt,Be),Z=new hy(R,Y,B,vt),We=new cy(R,tt,De),Ne=new ey(Re),j=new bA(M,T,x,Qe,tt,Be,Ne),Me=new QA(M,Re),se=new CA,ue=new NA(Qe),ce=new Zx(M,T,x,Ae,Z,d,l),$=new kA(M,Z,tt),ht=new JA(R,vt,tt,Ae),Ce=new Jx(R,Qe,vt),de=new oy(R,Qe,vt),vt.programs=j.programs,M.capabilities=tt,M.extensions=Qe,M.properties=Re,M.renderLists=se,M.shadowMap=$,M.state=Ae,M.info=vt}I();const ee=new jA(M,R);this.xr=ee,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const y=Qe.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=Qe.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(y){y!==void 0&&(Q=y,this.setSize(q,V,!1))},this.getSize=function(y){return y.set(q,V)},this.setSize=function(y,P,F=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=y,V=P,t.width=Math.floor(y*Q),t.height=Math.floor(P*Q),F===!0&&(t.style.width=y+"px",t.style.height=P+"px"),this.setViewport(0,0,y,P)},this.getDrawingBufferSize=function(y){return y.set(q*Q,V*Q).floor()},this.setDrawingBufferSize=function(y,P,F){q=y,V=P,Q=F,t.width=Math.floor(y*F),t.height=Math.floor(P*F),this.setViewport(0,0,y,P)},this.getCurrentViewport=function(y){return y.copy(A)},this.getViewport=function(y){return y.copy(le)},this.setViewport=function(y,P,F,O){y.isVector4?le.set(y.x,y.y,y.z,y.w):le.set(y,P,F,O),Ae.viewport(A.copy(le).multiplyScalar(Q).round())},this.getScissor=function(y){return y.copy(ge)},this.setScissor=function(y,P,F,O){y.isVector4?ge.set(y.x,y.y,y.z,y.w):ge.set(y,P,F,O),Ae.scissor(L.copy(ge).multiplyScalar(Q).round())},this.getScissorTest=function(){return He},this.setScissorTest=function(y){Ae.setScissorTest(He=y)},this.setOpaqueSort=function(y){z=y},this.setTransparentSort=function(y){re=y},this.getClearColor=function(y){return y.copy(ce.getClearColor())},this.setClearColor=function(){ce.setClearColor.apply(ce,arguments)},this.getClearAlpha=function(){return ce.getClearAlpha()},this.setClearAlpha=function(){ce.setClearAlpha.apply(ce,arguments)},this.clear=function(y=!0,P=!0,F=!0){let O=0;if(y){let N=!1;if(C!==null){const te=C.texture.format;N=te===tc||te===ec||te===$l}if(N){const te=C.texture.type,ae=te===Yn||te===ji||te===Sr||te===Ds||te===Zl||te===Ql,fe=ce.getClearColor(),pe=ce.getClearAlpha(),Se=fe.r,Te=fe.g,_e=fe.b;ae?(f[0]=Se,f[1]=Te,f[2]=_e,f[3]=pe,R.clearBufferuiv(R.COLOR,0,f)):(g[0]=Se,g[1]=Te,g[2]=_e,g[3]=pe,R.clearBufferiv(R.COLOR,0,g))}else O|=R.COLOR_BUFFER_BIT}P&&(O|=R.DEPTH_BUFFER_BIT),F&&(O|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),R.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",X,!1),t.removeEventListener("webglcontextrestored",K,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),se.dispose(),ue.dispose(),Re.dispose(),T.dispose(),x.dispose(),Z.dispose(),Be.dispose(),ht.dispose(),j.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",yn),ee.removeEventListener("sessionend",mc),wi.stop()};function X(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function K(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const y=vt.autoReset,P=$.enabled,F=$.autoUpdate,O=$.needsUpdate,N=$.type;I(),vt.autoReset=y,$.enabled=P,$.autoUpdate=F,$.needsUpdate=O,$.type=N}function ne(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function Ee(y){const P=y.target;P.removeEventListener("dispose",Ee),Xe(P)}function Xe(y){xt(y),Re.remove(y)}function xt(y){const P=Re.get(y).programs;P!==void 0&&(P.forEach(function(F){j.releaseProgram(F)}),y.isShaderMaterial&&j.releaseShaderCache(y))}this.renderBufferDirect=function(y,P,F,O,N,te){P===null&&(P=Pe);const ae=N.isMesh&&N.matrixWorld.determinant()<0,fe=Lf(y,P,F,O,N);Ae.setMaterial(O,ae);let pe=F.index,Se=1;if(O.wireframe===!0){if(pe=Y.getWireframeAttribute(F),pe===void 0)return;Se=2}const Te=F.drawRange,_e=F.attributes.position;let Ye=Te.start*Se,mt=(Te.start+Te.count)*Se;te!==null&&(Ye=Math.max(Ye,te.start*Se),mt=Math.min(mt,(te.start+te.count)*Se)),pe!==null?(Ye=Math.max(Ye,0),mt=Math.min(mt,pe.count)):_e!=null&&(Ye=Math.max(Ye,0),mt=Math.min(mt,_e.count));const gt=mt-Ye;if(gt<0||gt===1/0)return;Be.setup(N,O,fe,F,pe);let Yt,je=Ce;if(pe!==null&&(Yt=B.get(pe),je=de,je.setIndex(Yt)),N.isMesh)O.wireframe===!0?(Ae.setLineWidth(O.wireframeLinewidth*pt()),je.setMode(R.LINES)):je.setMode(R.TRIANGLES);else if(N.isLine){let ve=O.linewidth;ve===void 0&&(ve=1),Ae.setLineWidth(ve*pt()),N.isLineSegments?je.setMode(R.LINES):N.isLineLoop?je.setMode(R.LINE_LOOP):je.setMode(R.LINE_STRIP)}else N.isPoints?je.setMode(R.POINTS):N.isSprite&&je.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)je.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Qe.get("WEBGL_multi_draw"))je.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const ve=N._multiDrawStarts,Lt=N._multiDrawCounts,Ze=N._multiDrawCount,ln=pe?B.get(pe).bytesPerElement:1,$i=Re.get(O).currentProgram.getUniforms();for(let jt=0;jt<Ze;jt++)$i.setValue(R,"_gl_DrawID",jt),je.render(ve[jt]/ln,Lt[jt])}else if(N.isInstancedMesh)je.renderInstances(Ye,gt,N.count);else if(F.isInstancedBufferGeometry){const ve=F._maxInstanceCount!==void 0?F._maxInstanceCount:1/0,Lt=Math.min(F.instanceCount,ve);je.renderInstances(Ye,gt,Lt)}else je.render(Ye,gt)};function Rt(y,P,F){y.transparent===!0&&y.side===Sn&&y.forceSinglePass===!1?(y.side=qt,y.needsUpdate=!0,Fr(y,P,F),y.side=Kn,y.needsUpdate=!0,Fr(y,P,F),y.side=Sn):Fr(y,P,F)}this.compile=function(y,P,F=null){F===null&&(F=y),m=ue.get(F),m.init(P),b.push(m),F.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),y!==F&&y.traverseVisible(function(N){N.isLight&&N.layers.test(P.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();const O=new Set;return y.traverse(function(N){const te=N.material;if(te)if(Array.isArray(te))for(let ae=0;ae<te.length;ae++){const fe=te[ae];Rt(fe,F,N),O.add(fe)}else Rt(te,F,N),O.add(te)}),b.pop(),m=null,O},this.compileAsync=function(y,P,F=null){const O=this.compile(y,P,F);return new Promise(N=>{function te(){if(O.forEach(function(ae){Re.get(ae).currentProgram.isReady()&&O.delete(ae)}),O.size===0){N(y);return}setTimeout(te,10)}Qe.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let Ke=null;function Dn(y){Ke&&Ke(y)}function yn(){wi.stop()}function mc(){wi.start()}const wi=new cf;wi.setAnimationLoop(Dn),typeof self<"u"&&wi.setContext(self),this.setAnimationLoop=function(y){Ke=y,ee.setAnimationLoop(y),y===null?wi.stop():wi.start()},ee.addEventListener("sessionstart",yn),ee.addEventListener("sessionend",mc),this.render=function(y,P){if(P!==void 0&&P.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(P),P=ee.getCamera()),y.isScene===!0&&y.onBeforeRender(M,y,P,C),m=ue.get(y,b.length),m.init(P),b.push(m),me.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),et.setFromProjectionMatrix(me),J=this.localClippingEnabled,W=Ne.init(this.clippingPlanes,J),_=se.get(y,p.length),_.init(),p.push(_),ee.enabled===!0&&ee.isPresenting===!0){const te=M.xr.getDepthSensingMesh();te!==null&&Qa(te,P,-1/0,M.sortObjects)}Qa(y,P,0,M.sortObjects),_.finish(),M.sortObjects===!0&&_.sort(z,re),Ve=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,Ve&&ce.addToRenderList(_,y),this.info.render.frame++,W===!0&&Ne.beginShadows();const F=m.state.shadowsArray;$.render(F,y,P),W===!0&&Ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const O=_.opaque,N=_.transmissive;if(m.setupLights(),P.isArrayCamera){const te=P.cameras;if(N.length>0)for(let ae=0,fe=te.length;ae<fe;ae++){const pe=te[ae];_c(O,N,y,pe)}Ve&&ce.render(y);for(let ae=0,fe=te.length;ae<fe;ae++){const pe=te[ae];gc(_,y,pe,pe.viewport)}}else N.length>0&&_c(O,N,y,P),Ve&&ce.render(y),gc(_,y,P);C!==null&&(De.updateMultisampleRenderTarget(C),De.updateRenderTargetMipmap(C)),y.isScene===!0&&y.onAfterRender(M,y,P),Be.resetDefaultState(),U=-1,E=null,b.pop(),b.length>0?(m=b[b.length-1],W===!0&&Ne.setGlobalState(M.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Qa(y,P,F,O){if(y.visible===!1)return;if(y.layers.test(P.layers)){if(y.isGroup)F=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(P);else if(y.isLight)m.pushLight(y),y.castShadow&&m.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||et.intersectsSprite(y)){O&&be.setFromMatrixPosition(y.matrixWorld).applyMatrix4(me);const ae=Z.update(y),fe=y.material;fe.visible&&_.push(y,ae,fe,F,be.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||et.intersectsObject(y))){const ae=Z.update(y),fe=y.material;if(O&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),be.copy(y.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),be.copy(ae.boundingSphere.center)),be.applyMatrix4(y.matrixWorld).applyMatrix4(me)),Array.isArray(fe)){const pe=ae.groups;for(let Se=0,Te=pe.length;Se<Te;Se++){const _e=pe[Se],Ye=fe[_e.materialIndex];Ye&&Ye.visible&&_.push(y,ae,Ye,F,be.z,_e)}}else fe.visible&&_.push(y,ae,fe,F,be.z,null)}}const te=y.children;for(let ae=0,fe=te.length;ae<fe;ae++)Qa(te[ae],P,F,O)}function gc(y,P,F,O){const N=y.opaque,te=y.transmissive,ae=y.transparent;m.setupLightsView(F),W===!0&&Ne.setGlobalState(M.clippingPlanes,F),O&&Ae.viewport(A.copy(O)),N.length>0&&Ur(N,P,F),te.length>0&&Ur(te,P,F),ae.length>0&&Ur(ae,P,F),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function _c(y,P,F,O){if((F.isScene===!0?F.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[O.id]===void 0&&(m.state.transmissionRenderTarget[O.id]=new Zi(1,1,{generateMipmaps:!0,type:Qe.has("EXT_color_buffer_half_float")||Qe.has("EXT_color_buffer_float")?Pr:Yn,minFilter:Hn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:qe.workingColorSpace}));const te=m.state.transmissionRenderTarget[O.id],ae=O.viewport||A;te.setSize(ae.z,ae.w);const fe=M.getRenderTarget();M.setRenderTarget(te),M.getClearColor(k),H=M.getClearAlpha(),H<1&&M.setClearColor(16777215,.5),M.clear(),Ve&&ce.render(F);const pe=M.toneMapping;M.toneMapping=Ai;const Se=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),m.setupLightsView(O),W===!0&&Ne.setGlobalState(M.clippingPlanes,O),Ur(y,F,O),De.updateMultisampleRenderTarget(te),De.updateRenderTargetMipmap(te),Qe.has("WEBGL_multisampled_render_to_texture")===!1){let Te=!1;for(let _e=0,Ye=P.length;_e<Ye;_e++){const mt=P[_e],gt=mt.object,Yt=mt.geometry,je=mt.material,ve=mt.group;if(je.side===Sn&&gt.layers.test(O.layers)){const Lt=je.side;je.side=qt,je.needsUpdate=!0,vc(gt,F,O,Yt,je,ve),je.side=Lt,je.needsUpdate=!0,Te=!0}}Te===!0&&(De.updateMultisampleRenderTarget(te),De.updateRenderTargetMipmap(te))}M.setRenderTarget(fe),M.setClearColor(k,H),Se!==void 0&&(O.viewport=Se),M.toneMapping=pe}function Ur(y,P,F){const O=P.isScene===!0?P.overrideMaterial:null;for(let N=0,te=y.length;N<te;N++){const ae=y[N],fe=ae.object,pe=ae.geometry,Se=O===null?ae.material:O,Te=ae.group;fe.layers.test(F.layers)&&vc(fe,P,F,pe,Se,Te)}}function vc(y,P,F,O,N,te){y.onBeforeRender(M,P,F,O,N,te),y.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(M,P,F,O,y,te),N.transparent===!0&&N.side===Sn&&N.forceSinglePass===!1?(N.side=qt,N.needsUpdate=!0,M.renderBufferDirect(F,P,O,N,y,te),N.side=Kn,N.needsUpdate=!0,M.renderBufferDirect(F,P,O,N,y,te),N.side=Sn):M.renderBufferDirect(F,P,O,N,y,te),y.onAfterRender(M,P,F,O,N,te)}function Fr(y,P,F){P.isScene!==!0&&(P=Pe);const O=Re.get(y),N=m.state.lights,te=m.state.shadowsArray,ae=N.state.version,fe=j.getParameters(y,N.state,te,P,F),pe=j.getProgramCacheKey(fe);let Se=O.programs;O.environment=y.isMeshStandardMaterial?P.environment:null,O.fog=P.fog,O.envMap=(y.isMeshStandardMaterial?x:T).get(y.envMap||O.environment),O.envMapRotation=O.environment!==null&&y.envMap===null?P.environmentRotation:y.envMapRotation,Se===void 0&&(y.addEventListener("dispose",Ee),Se=new Map,O.programs=Se);let Te=Se.get(pe);if(Te!==void 0){if(O.currentProgram===Te&&O.lightsStateVersion===ae)return yc(y,fe),Te}else fe.uniforms=j.getUniforms(y),y.onBeforeCompile(fe,M),Te=j.acquireProgram(fe,pe),Se.set(pe,Te),O.uniforms=fe.uniforms;const _e=O.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(_e.clippingPlanes=Ne.uniform),yc(y,fe),O.needsLights=Pf(y),O.lightsStateVersion=ae,O.needsLights&&(_e.ambientLightColor.value=N.state.ambient,_e.lightProbe.value=N.state.probe,_e.directionalLights.value=N.state.directional,_e.directionalLightShadows.value=N.state.directionalShadow,_e.spotLights.value=N.state.spot,_e.spotLightShadows.value=N.state.spotShadow,_e.rectAreaLights.value=N.state.rectArea,_e.ltc_1.value=N.state.rectAreaLTC1,_e.ltc_2.value=N.state.rectAreaLTC2,_e.pointLights.value=N.state.point,_e.pointLightShadows.value=N.state.pointShadow,_e.hemisphereLights.value=N.state.hemi,_e.directionalShadowMap.value=N.state.directionalShadowMap,_e.directionalShadowMatrix.value=N.state.directionalShadowMatrix,_e.spotShadowMap.value=N.state.spotShadowMap,_e.spotLightMatrix.value=N.state.spotLightMatrix,_e.spotLightMap.value=N.state.spotLightMap,_e.pointShadowMap.value=N.state.pointShadowMap,_e.pointShadowMatrix.value=N.state.pointShadowMatrix),O.currentProgram=Te,O.uniformsList=null,Te}function xc(y){if(y.uniformsList===null){const P=y.currentProgram.getUniforms();y.uniformsList=wa.seqWithValue(P.seq,y.uniforms)}return y.uniformsList}function yc(y,P){const F=Re.get(y);F.outputColorSpace=P.outputColorSpace,F.batching=P.batching,F.batchingColor=P.batchingColor,F.instancing=P.instancing,F.instancingColor=P.instancingColor,F.instancingMorph=P.instancingMorph,F.skinning=P.skinning,F.morphTargets=P.morphTargets,F.morphNormals=P.morphNormals,F.morphColors=P.morphColors,F.morphTargetsCount=P.morphTargetsCount,F.numClippingPlanes=P.numClippingPlanes,F.numIntersection=P.numClipIntersection,F.vertexAlphas=P.vertexAlphas,F.vertexTangents=P.vertexTangents,F.toneMapping=P.toneMapping}function Lf(y,P,F,O,N){P.isScene!==!0&&(P=Pe),De.resetTextureUnits();const te=P.fog,ae=O.isMeshStandardMaterial?P.environment:null,fe=C===null?M.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Dt,pe=(O.isMeshStandardMaterial?x:T).get(O.envMap||ae),Se=O.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,Te=!!F.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),_e=!!F.morphAttributes.position,Ye=!!F.morphAttributes.normal,mt=!!F.morphAttributes.color;let gt=Ai;O.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(gt=M.toneMapping);const Yt=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,je=Yt!==void 0?Yt.length:0,ve=Re.get(O),Lt=m.state.lights;if(W===!0&&(J===!0||y!==E)){const tn=y===E&&O.id===U;Ne.setState(O,y,tn)}let Ze=!1;O.version===ve.__version?(ve.needsLights&&ve.lightsStateVersion!==Lt.state.version||ve.outputColorSpace!==fe||N.isBatchedMesh&&ve.batching===!1||!N.isBatchedMesh&&ve.batching===!0||N.isBatchedMesh&&ve.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&ve.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&ve.instancing===!1||!N.isInstancedMesh&&ve.instancing===!0||N.isSkinnedMesh&&ve.skinning===!1||!N.isSkinnedMesh&&ve.skinning===!0||N.isInstancedMesh&&ve.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&ve.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&ve.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&ve.instancingMorph===!1&&N.morphTexture!==null||ve.envMap!==pe||O.fog===!0&&ve.fog!==te||ve.numClippingPlanes!==void 0&&(ve.numClippingPlanes!==Ne.numPlanes||ve.numIntersection!==Ne.numIntersection)||ve.vertexAlphas!==Se||ve.vertexTangents!==Te||ve.morphTargets!==_e||ve.morphNormals!==Ye||ve.morphColors!==mt||ve.toneMapping!==gt||ve.morphTargetsCount!==je)&&(Ze=!0):(Ze=!0,ve.__version=O.version);let ln=ve.currentProgram;Ze===!0&&(ln=Fr(O,P,N));let $i=!1,jt=!1,Ja=!1;const yt=ln.getUniforms(),ei=ve.uniforms;if(Ae.useProgram(ln.program)&&($i=!0,jt=!0,Ja=!0),O.id!==U&&(U=O.id,jt=!0),$i||E!==y){yt.setValue(R,"projectionMatrix",y.projectionMatrix),yt.setValue(R,"viewMatrix",y.matrixWorldInverse);const tn=yt.map.cameraPosition;tn!==void 0&&tn.setValue(R,he.setFromMatrixPosition(y.matrixWorld)),tt.logarithmicDepthBuffer&&yt.setValue(R,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&yt.setValue(R,"isOrthographic",y.isOrthographicCamera===!0),E!==y&&(E=y,jt=!0,Ja=!0)}if(N.isSkinnedMesh){yt.setOptional(R,N,"bindMatrix"),yt.setOptional(R,N,"bindMatrixInverse");const tn=N.skeleton;tn&&(tn.boneTexture===null&&tn.computeBoneTexture(),yt.setValue(R,"boneTexture",tn.boneTexture,De))}N.isBatchedMesh&&(yt.setOptional(R,N,"batchingTexture"),yt.setValue(R,"batchingTexture",N._matricesTexture,De),yt.setOptional(R,N,"batchingIdTexture"),yt.setValue(R,"batchingIdTexture",N._indirectTexture,De),yt.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&yt.setValue(R,"batchingColorTexture",N._colorsTexture,De));const $a=F.morphAttributes;if(($a.position!==void 0||$a.normal!==void 0||$a.color!==void 0)&&We.update(N,F,ln),(jt||ve.receiveShadow!==N.receiveShadow)&&(ve.receiveShadow=N.receiveShadow,yt.setValue(R,"receiveShadow",N.receiveShadow)),O.isMeshGouraudMaterial&&O.envMap!==null&&(ei.envMap.value=pe,ei.flipEnvMap.value=pe.isCubeTexture&&pe.isRenderTargetTexture===!1?-1:1),O.isMeshStandardMaterial&&O.envMap===null&&P.environment!==null&&(ei.envMapIntensity.value=P.environmentIntensity),jt&&(yt.setValue(R,"toneMappingExposure",M.toneMappingExposure),ve.needsLights&&If(ei,Ja),te&&O.fog===!0&&Me.refreshFogUniforms(ei,te),Me.refreshMaterialUniforms(ei,O,Q,V,m.state.transmissionRenderTarget[y.id]),wa.upload(R,xc(ve),ei,De)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(wa.upload(R,xc(ve),ei,De),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&yt.setValue(R,"center",N.center),yt.setValue(R,"modelViewMatrix",N.modelViewMatrix),yt.setValue(R,"normalMatrix",N.normalMatrix),yt.setValue(R,"modelMatrix",N.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const tn=O.uniformsGroups;for(let eo=0,Df=tn.length;eo<Df;eo++){const Ac=tn[eo];ht.update(Ac,ln),ht.bind(Ac,ln)}}return ln}function If(y,P){y.ambientLightColor.needsUpdate=P,y.lightProbe.needsUpdate=P,y.directionalLights.needsUpdate=P,y.directionalLightShadows.needsUpdate=P,y.pointLights.needsUpdate=P,y.pointLightShadows.needsUpdate=P,y.spotLights.needsUpdate=P,y.spotLightShadows.needsUpdate=P,y.rectAreaLights.needsUpdate=P,y.hemisphereLights.needsUpdate=P}function Pf(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return v},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(y,P,F){Re.get(y.texture).__webglTexture=P,Re.get(y.depthTexture).__webglTexture=F;const O=Re.get(y);O.__hasExternalTextures=!0,O.__autoAllocateDepthBuffer=F===void 0,O.__autoAllocateDepthBuffer||Qe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),O.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(y,P){const F=Re.get(y);F.__webglFramebuffer=P,F.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(y,P=0,F=0){C=y,v=P,w=F;let O=!0,N=null,te=!1,ae=!1;if(y){const pe=Re.get(y);if(pe.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(R.FRAMEBUFFER,null),O=!1;else if(pe.__webglFramebuffer===void 0)De.setupRenderTarget(y);else if(pe.__hasExternalTextures)De.rebindTextures(y,Re.get(y.texture).__webglTexture,Re.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const _e=y.depthTexture;if(pe.__boundDepthTexture!==_e){if(_e!==null&&Re.has(_e)&&(y.width!==_e.image.width||y.height!==_e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");De.setupDepthRenderbuffer(y)}}const Se=y.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(ae=!0);const Te=Re.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(Te[P])?N=Te[P][F]:N=Te[P],te=!0):y.samples>0&&De.useMultisampledRTT(y)===!1?N=Re.get(y).__webglMultisampledFramebuffer:Array.isArray(Te)?N=Te[F]:N=Te,A.copy(y.viewport),L.copy(y.scissor),G=y.scissorTest}else A.copy(le).multiplyScalar(Q).floor(),L.copy(ge).multiplyScalar(Q).floor(),G=He;if(Ae.bindFramebuffer(R.FRAMEBUFFER,N)&&O&&Ae.drawBuffers(y,N),Ae.viewport(A),Ae.scissor(L),Ae.setScissorTest(G),te){const pe=Re.get(y.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+P,pe.__webglTexture,F)}else if(ae){const pe=Re.get(y.texture),Se=P||0;R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,pe.__webglTexture,F||0,Se)}U=-1},this.readRenderTargetPixels=function(y,P,F,O,N,te,ae){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let fe=Re.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ae!==void 0&&(fe=fe[ae]),fe){Ae.bindFramebuffer(R.FRAMEBUFFER,fe);try{const pe=y.texture,Se=pe.format,Te=pe.type;if(!tt.textureFormatReadable(Se)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!tt.textureTypeReadable(Te)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=y.width-O&&F>=0&&F<=y.height-N&&R.readPixels(P,F,O,N,Le.convert(Se),Le.convert(Te),te)}finally{const pe=C!==null?Re.get(C).__webglFramebuffer:null;Ae.bindFramebuffer(R.FRAMEBUFFER,pe)}}},this.readRenderTargetPixelsAsync=async function(y,P,F,O,N,te,ae){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let fe=Re.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&ae!==void 0&&(fe=fe[ae]),fe){Ae.bindFramebuffer(R.FRAMEBUFFER,fe);try{const pe=y.texture,Se=pe.format,Te=pe.type;if(!tt.textureFormatReadable(Se))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!tt.textureTypeReadable(Te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(P>=0&&P<=y.width-O&&F>=0&&F<=y.height-N){const _e=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,_e),R.bufferData(R.PIXEL_PACK_BUFFER,te.byteLength,R.STREAM_READ),R.readPixels(P,F,O,N,Le.convert(Se),Le.convert(Te),0),R.flush();const Ye=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);await W_(R,Ye,4);try{R.bindBuffer(R.PIXEL_PACK_BUFFER,_e),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,te)}finally{R.deleteBuffer(_e),R.deleteSync(Ye)}return te}}finally{const pe=C!==null?Re.get(C).__webglFramebuffer:null;Ae.bindFramebuffer(R.FRAMEBUFFER,pe)}}},this.copyFramebufferToTexture=function(y,P=null,F=0){y.isTexture!==!0&&(bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),P=arguments[0]||null,y=arguments[1]);const O=Math.pow(2,-F),N=Math.floor(y.image.width*O),te=Math.floor(y.image.height*O),ae=P!==null?P.x:0,fe=P!==null?P.y:0;De.setTexture2D(y,0),R.copyTexSubImage2D(R.TEXTURE_2D,F,0,0,ae,fe,N,te),Ae.unbindTexture()},this.copyTextureToTexture=function(y,P,F=null,O=null,N=0){y.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture function signature has changed."),O=arguments[0]||null,y=arguments[1],P=arguments[2],N=arguments[3]||0,F=null);let te,ae,fe,pe,Se,Te;F!==null?(te=F.max.x-F.min.x,ae=F.max.y-F.min.y,fe=F.min.x,pe=F.min.y):(te=y.image.width,ae=y.image.height,fe=0,pe=0),O!==null?(Se=O.x,Te=O.y):(Se=0,Te=0);const _e=Le.convert(P.format),Ye=Le.convert(P.type);De.setTexture2D(P,0),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,P.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,P.unpackAlignment);const mt=R.getParameter(R.UNPACK_ROW_LENGTH),gt=R.getParameter(R.UNPACK_IMAGE_HEIGHT),Yt=R.getParameter(R.UNPACK_SKIP_PIXELS),je=R.getParameter(R.UNPACK_SKIP_ROWS),ve=R.getParameter(R.UNPACK_SKIP_IMAGES),Lt=y.isCompressedTexture?y.mipmaps[N]:y.image;R.pixelStorei(R.UNPACK_ROW_LENGTH,Lt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Lt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,fe),R.pixelStorei(R.UNPACK_SKIP_ROWS,pe),y.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,N,Se,Te,te,ae,_e,Ye,Lt.data):y.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,N,Se,Te,Lt.width,Lt.height,_e,Lt.data):R.texSubImage2D(R.TEXTURE_2D,N,Se,Te,te,ae,_e,Ye,Lt),R.pixelStorei(R.UNPACK_ROW_LENGTH,mt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,gt),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Yt),R.pixelStorei(R.UNPACK_SKIP_ROWS,je),R.pixelStorei(R.UNPACK_SKIP_IMAGES,ve),N===0&&P.generateMipmaps&&R.generateMipmap(R.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(y,P,F=null,O=null,N=0){y.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),F=arguments[0]||null,O=arguments[1]||null,y=arguments[2],P=arguments[3],N=arguments[4]||0);let te,ae,fe,pe,Se,Te,_e,Ye,mt;const gt=y.isCompressedTexture?y.mipmaps[N]:y.image;F!==null?(te=F.max.x-F.min.x,ae=F.max.y-F.min.y,fe=F.max.z-F.min.z,pe=F.min.x,Se=F.min.y,Te=F.min.z):(te=gt.width,ae=gt.height,fe=gt.depth,pe=0,Se=0,Te=0),O!==null?(_e=O.x,Ye=O.y,mt=O.z):(_e=0,Ye=0,mt=0);const Yt=Le.convert(P.format),je=Le.convert(P.type);let ve;if(P.isData3DTexture)De.setTexture3D(P,0),ve=R.TEXTURE_3D;else if(P.isDataArrayTexture||P.isCompressedArrayTexture)De.setTexture2DArray(P,0),ve=R.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,P.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,P.unpackAlignment);const Lt=R.getParameter(R.UNPACK_ROW_LENGTH),Ze=R.getParameter(R.UNPACK_IMAGE_HEIGHT),ln=R.getParameter(R.UNPACK_SKIP_PIXELS),$i=R.getParameter(R.UNPACK_SKIP_ROWS),jt=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,gt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,gt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,pe),R.pixelStorei(R.UNPACK_SKIP_ROWS,Se),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Te),y.isDataTexture||y.isData3DTexture?R.texSubImage3D(ve,N,_e,Ye,mt,te,ae,fe,Yt,je,gt.data):P.isCompressedArrayTexture?R.compressedTexSubImage3D(ve,N,_e,Ye,mt,te,ae,fe,Yt,gt.data):R.texSubImage3D(ve,N,_e,Ye,mt,te,ae,fe,Yt,je,gt),R.pixelStorei(R.UNPACK_ROW_LENGTH,Lt),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Ze),R.pixelStorei(R.UNPACK_SKIP_PIXELS,ln),R.pixelStorei(R.UNPACK_SKIP_ROWS,$i),R.pixelStorei(R.UNPACK_SKIP_IMAGES,jt),N===0&&P.generateMipmaps&&R.generateMipmap(ve),Ae.unbindTexture()},this.initRenderTarget=function(y){Re.get(y).__webglFramebuffer===void 0&&De.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?De.setTextureCube(y,0):y.isData3DTexture?De.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?De.setTexture2DArray(y,0):De.setTexture2D(y,0),Ae.unbindTexture()},this.resetState=function(){v=0,w=0,C=null,Ae.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===nc?"display-p3":"srgb",t.unpackColorSpace=qe.workingColorSpace===qa?"display-p3":"srgb"}}class eM extends dt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Cn,this.environmentIntensity=1,this.environmentRotation=new Cn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class tM{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ll,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=_n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return bs("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=_n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Bt=new D;class oc{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=mn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Je(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Je(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=mn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=mn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=mn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=mn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Je(t,this.array),n=Je(n,this.array),s=Je(s,this.array),r=Je(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new oc(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const fu=new D,pu=new nt,mu=new nt,nM=new D,gu=new Oe,ca=new D,No=new Ln,_u=new Oe,Uo=new Ka;class iM extends $t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=_h,this.bindMatrix=new Oe,this.bindMatrixInverse=new Oe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new $n),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ca),this.boundingBox.expandByPoint(ca)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ln),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,ca),this.boundingSphere.expandByPoint(ca)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),No.copy(this.boundingSphere),No.applyMatrix4(s),e.ray.intersectsSphere(No)!==!1&&(_u.copy(s).invert(),Uo.copy(e.ray).applyMatrix4(_u),!(this.boundingBox!==null&&Uo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Uo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===_h?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===f_?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;pu.fromBufferAttribute(s.attributes.skinIndex,e),mu.fromBufferAttribute(s.attributes.skinWeight,e),fu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=mu.getComponent(r);if(a!==0){const o=pu.getComponent(r);gu.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(nM.copy(fu).applyMatrix4(gu),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class mf extends dt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class gf extends wt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=Gt,h=Gt,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vu=new Oe,sM=new Oe;class lc{constructor(e=[],t=[]){this.uuid=_n(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Oe)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Oe;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:sM;vu.multiplyMatrices(o,t[r]),vu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new lc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new gf(t,e,e,rn,gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new mf),this.bones.push(a),this.boneInverses.push(new Oe().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class Pl extends Ht{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const _s=new Oe,xu=new Oe,ha=[],yu=new $n,rM=new Oe,ar=new $t,or=new Ln;class aM extends $t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Pl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,rM)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new $n),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),yu.copy(e.boundingBox).applyMatrix4(_s),this.boundingBox.union(yu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ln),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,_s),or.copy(e.boundingSphere).applyMatrix4(_s),this.boundingSphere.union(or)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(ar.geometry=this.geometry,ar.material=this.material,ar.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),or.copy(this.boundingSphere),or.applyMatrix4(n),e.ray.intersectsSphere(or)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_s),xu.multiplyMatrices(n,_s),ar.matrixWorld=xu,ar.raycast(e,ha);for(let a=0,o=ha.length;a<o;a++){const l=ha[a];l.instanceId=r,l.object=this,t.push(l)}ha.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Pl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new gf(new Float32Array(s*this.count),s,this.count,Jl,gn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class _f extends Tn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Oa=new D,Ba=new D,Au=new Oe,lr=new Ka,ua=new Ln,Fo=new D,Mu=new D;class cc extends dt{constructor(e=new xn,t=new _f){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Oa.fromBufferAttribute(t,s-1),Ba.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Oa.distanceTo(Ba);e.setAttribute("lineDistance",new wn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(s),ua.radius+=r,e.ray.intersectsSphere(ua)===!1)return;Au.copy(s).invert(),lr.copy(e.ray).applyMatrix4(Au);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=h.getX(_),b=h.getX(_+1),M=da(this,e,lr,l,p,b);M&&t.push(M)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=da(this,e,lr,l,_,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=c){const p=da(this,e,lr,l,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=da(this,e,lr,l,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function da(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(Oa.fromBufferAttribute(a,s),Ba.fromBufferAttribute(a,r),t.distanceSqToSegment(Oa,Ba,Fo,Mu)>n)return;Fo.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Fo);if(!(l<e.near||l>e.far))return{distance:l,point:Mu.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,object:i}}const Eu=new D,Su=new D;class oM extends cc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)Eu.fromBufferAttribute(t,s),Su.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Eu.distanceTo(Su);e.setAttribute("lineDistance",new wn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lM extends cc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class vf extends Tn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bu=new Oe,Dl=new Ka,fa=new Ln,pa=new D;class xf extends dt{constructor(e=new xn,t=new vf){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fa.copy(n.boundingSphere),fa.applyMatrix4(s),fa.radius+=r,e.ray.intersectsSphere(fa)===!1)return;bu.copy(s).invert(),Dl.copy(e.ray).applyMatrix4(bu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);pa.fromBufferAttribute(u,m),Tu(pa,m,l,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)pa.fromBufferAttribute(u,g),Tu(pa,g,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Tu(i,e,t,n,s,r,a){const o=Dl.distanceSqToPoint(i);if(o<t){const l=new D;Dl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class hc extends Tn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ie(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ie(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=jd,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Cn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class In extends hc{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ze(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ot(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ie(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ie(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ie(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function ma(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function cM(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function hM(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function wu(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function yf(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class Nr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class uM extends Nr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vh,endingEnd:vh}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case xh:r=e,o=2*t-n;break;case yh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case xh:a=e,l=2*n-t;break;case yh:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,b=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,M=(-1-f)*m+(1.5+f)*_+.5*g,S=f*m-f*_;for(let v=0;v!==o;++v)r[v]=p*a[h+v]+b*a[c+v]+M*a[l+v]+S*a[u+v];return r}}class dM extends Nr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class fM extends Nr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Pn{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ma(t,this.TimeBufferType),this.values=ma(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ma(e.times,Array),values:ma(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dM(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uM(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case br:t=this.InterpolantFactoryMethodDiscrete;break;case Tr:t=this.InterpolantFactoryMethodLinear;break;case oo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return br;case this.InterpolantFactoryMethodLinear:return Tr;case this.InterpolantFactoryMethodSmooth:return oo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&cM(s))for(let o=0,l=s.length;o!==l;++o){const c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===oo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Pn.prototype.TimeBufferType=Float32Array;Pn.prototype.ValueBufferType=Float32Array;Pn.prototype.DefaultInterpolation=Tr;class Ys extends Pn{constructor(e,t,n){super(e,t,n)}}Ys.prototype.ValueTypeName="bool";Ys.prototype.ValueBufferType=Array;Ys.prototype.DefaultInterpolation=br;Ys.prototype.InterpolantFactoryMethodLinear=void 0;Ys.prototype.InterpolantFactoryMethodSmooth=void 0;class Af extends Pn{}Af.prototype.ValueTypeName="color";class Os extends Pn{}Os.prototype.ValueTypeName="number";class pM extends Nr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Ti.slerpFlat(r,0,a,c-o,a,c,l);return r}}class Bs extends Pn{InterpolantFactoryMethodLinear(e){return new pM(this.times,this.values,this.getValueSize(),e)}}Bs.prototype.ValueTypeName="quaternion";Bs.prototype.InterpolantFactoryMethodSmooth=void 0;class js extends Pn{constructor(e,t,n){super(e,t,n)}}js.prototype.ValueTypeName="string";js.prototype.ValueBufferType=Array;js.prototype.DefaultInterpolation=br;js.prototype.InterpolantFactoryMethodLinear=void 0;js.prototype.InterpolantFactoryMethodSmooth=void 0;class ks extends Pn{}ks.prototype.ValueTypeName="vector";class mM{constructor(e="",t=-1,n=[],s=p_){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=_n(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(_M(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Pn.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=hM(l);l=wu(l,1,h),c=wu(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Os(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(c)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];yf(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let b=0;b!==d[g].morphTargets.length;++b){const M=d[g];m.push(M.time),p.push(M.morphTarget===_?1:0)}s.push(new Os(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(ks,f+".position",d,"pos",s),n(Bs,f+".quaternion",d,"rot",s),n(ks,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function gM(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Os;case"vector":case"vector2":case"vector3":case"vector4":return ks;case"color":return Af;case"quaternion":return Bs;case"bool":case"boolean":return Ys;case"string":return js}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function _M(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=gM(i.type);if(i.times===void 0){const t=[],n=[];yf(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const _i={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class vM{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const xM=new vM;class Zs{constructor(e){this.manager=e!==void 0?e:xM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Zs.DEFAULT_MATERIAL_NAME="__DEFAULT";const kn={};class yM extends Error{constructor(e,t){super(e),this.response=t}}class Mf extends Zs{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=_i.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(kn[e]!==void 0){kn[e].push({onLoad:t,onProgress:n,onError:s});return}kn[e]=[],kn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=kn[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){b();function b(){u.read().then(({done:M,value:S})=>{if(M)p.close();else{_+=S.byteLength;const v=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,C=h.length;w<C;w++){const U=h[w];U.onProgress&&U.onProgress(v)}p.enqueue(S),b()}},M=>{p.error(M)})}}});return new Response(m)}else throw new yM(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{_i.add(e,c);const h=kn[e];delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=kn[e];if(h===void 0)throw this.manager.itemError(e),c;delete kn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class AM extends Zs{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=_i.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=wr("img");function l(){h(),_i.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class Ef extends Zs{constructor(e){super(e)}load(e,t,n,s){const r=new wt,a=new AM(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class Za extends dt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ie(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Oo=new Oe,Cu=new D,Ru=new D;class uc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new Oe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new sc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Cu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cu),Ru.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ru),t.updateMatrixWorld(),Oo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Oo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class MM extends uc{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Us*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class EM extends Za{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new MM}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Lu=new Oe,cr=new D,Bo=new D;class SM extends uc{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),cr.setFromMatrixPosition(e.matrixWorld),n.position.copy(cr),Bo.copy(n.position),Bo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Bo),n.updateMatrixWorld(),s.makeTranslation(-cr.x,-cr.y,-cr.z),Lu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lu)}}class Sf extends Za{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new SM}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class bM extends uc{constructor(){super(new rc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class bf extends Za{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dt.DEFAULT_UP),this.updateMatrix(),this.target=new dt,this.shadow=new bM}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class TM extends Za{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class _r{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class wM extends Zs{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=_i.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return _i.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),_i.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});_i.add(e,l),r.manager.itemStart(e)}}const dc="\\[\\]\\.:\\/",CM=new RegExp("["+dc+"]","g"),fc="[^"+dc+"]",RM="[^"+dc.replace("\\.","")+"]",LM=/((?:WC+[\/:])*)/.source.replace("WC",fc),IM=/(WCOD+)?/.source.replace("WCOD",RM),PM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fc),DM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fc),NM=new RegExp("^"+LM+IM+PM+DM+"$"),UM=["material","materials","bones","map"];class FM{constructor(e,t,n){const s=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(CM,"")}static parseTrackName(e){const t=NM.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);UM.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[s];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=FM;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Kl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Kl);function Iu(i,e){if(e===m_)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Rl||e===Yd){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Rl)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class OM extends Zs{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new GM(t)}),this.register(function(t){return new HM(t)}),this.register(function(t){return new JM(t)}),this.register(function(t){return new $M(t)}),this.register(function(t){return new eE(t)}),this.register(function(t){return new XM(t)}),this.register(function(t){return new qM(t)}),this.register(function(t){return new KM(t)}),this.register(function(t){return new YM(t)}),this.register(function(t){return new VM(t)}),this.register(function(t){return new jM(t)}),this.register(function(t){return new WM(t)}),this.register(function(t){return new QM(t)}),this.register(function(t){return new ZM(t)}),this.register(function(t){return new kM(t)}),this.register(function(t){return new tE(t)}),this.register(function(t){return new nE(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=_r.extractUrlBase(e);a=_r.resolveURL(c,this.path)}else a=_r.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Mf(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Tf){try{a[ke.KHR_BINARY_GLTF]=new iE(e)}catch(u){s&&s(u);return}r=JSON.parse(a[ke.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new gE(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case ke.KHR_MATERIALS_UNLIT:a[u]=new zM;break;case ke.KHR_DRACO_MESH_COMPRESSION:a[u]=new sE(r,this.dracoLoader);break;case ke.KHR_TEXTURE_TRANSFORM:a[u]=new rE;break;case ke.KHR_MESH_QUANTIZATION:a[u]=new aE;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function BM(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kM{constructor(e){this.parser=e,this.name=ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new Ie(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Dt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new bf(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Sf(h),c.distance=u;break;case"spot":c=new EM(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Gn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class zM{constructor(){this.name=ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Gi}extendParams(e,t,n){const s=[];e.color=new Ie(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Dt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,zt))}return Promise.all(s)}}class VM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class GM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ze(o,o)}return Promise.all(r)}}class HM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class WM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class XM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ie(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Dt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,zt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class qM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class KM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ie().setRGB(o[0],o[1],o[2],Dt),Promise.all(r)}}class YM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class jM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ie().setRGB(o[0],o[1],o[2],Dt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,zt)),Promise.all(r)}}class ZM{constructor(e){this.parser=e,this.name=ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class QM{constructor(e){this.parser=e,this.name=ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class JM{constructor(e){this.parser=e,this.name=ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class $M{constructor(e){this.parser=e,this.name=ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class eE{constructor(e){this.parser=e,this.name=ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class tE{constructor(e){this.name=ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class nE{constructor(e){this.name=ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const c of s.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Oe,m=new D,p=new Ti,b=new D(1,1,1),M=new aM(g.geometry,g.material,d);for(let S=0;S<d;S++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,S),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,S),l.SCALE&&b.fromBufferAttribute(l.SCALE,S),M.setMatrixAt(S,_.compose(m,p,b));for(const S in l)if(S==="_COLOR_0"){const v=l[S];M.instanceColor=new Pl(v.array,v.itemSize,v.normalized)}else S!=="TRANSLATION"&&S!=="ROTATION"&&S!=="SCALE"&&g.geometry.setAttribute(S,l[S]);dt.prototype.copy.call(M,g),this.parser.assignFinalMaterial(M),f.push(M)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Tf="glTF",hr=12,Pu={JSON:1313821514,BIN:5130562};class iE{constructor(e){this.name=ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,hr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Tf)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-hr,r=new DataView(e,hr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Pu.JSON){const c=new Uint8Array(e,hr+a,o);this.content=n.decode(c)}else if(l===Pu.BIN){const c=hr+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class sE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Nl[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Nl[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=ws[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,Dt,d)})})}}class rE{constructor(){this.name=ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class aE{constructor(){this.name=ke.KHR_MESH_QUANTIZATION}}class wf extends Nr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,b=1-m,M=p-d+u;for(let S=0;S!==o;S++){const v=a[_+S+o],w=a[_+S+l]*h,C=a[g+S+o],U=a[g+S]*h;r[S]=b*v+M*w+m*C+p*U}return r}}const oE=new Ti;class lE extends wf{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return oE.fromArray(r).normalize().toArray(r),r}}const sn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},ws={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Du={9728:Gt,9729:Jt,9984:Bd,9985:Aa,9986:ur,9987:Hn},Nu={33071:gi,33648:Pa,10497:Ps},ko={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Nl={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},hi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cE={CUBICSPLINE:void 0,LINEAR:Tr,STEP:br},zo={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function hE(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new hc({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Kn})),i.DefaultMaterial}function Fi(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Gn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function uE(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function dE(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function fE(i){let e;const t=i.extensions&&i.extensions[ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Vo(t.attributes):e=i.indices+":"+Vo(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Vo(i.targets[n]);return e}function Vo(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ul(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function pE(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const mE=new Oe;class gE{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new BM,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new Ef(this.options.manager):this.textureLoader=new wM(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Mf(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Fi(r,o,s),Gn(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(const l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[ke.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(_r.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=ko[s.type],o=ws[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Ht(c,a,l))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=ko[s.type],c=ws[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),b="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let M=t.cache.get(b);M||(_=new c(o,p*f,s.count*f/h),M=new tM(_,f/h),t.cache.add(b,M)),m=new oc(M,l,d%f/h,g)}else o===null?_=new c(s.count*l):_=new c(o,d,s.count*l),m=new Ht(_,l,g);if(s.sparse!==void 0){const p=ko.SCALAR,b=ws[s.sparse.indices.componentType],M=s.sparse.indices.byteOffset||0,S=s.sparse.values.byteOffset||0,v=new b(a[1],M,s.sparse.count*p),w=new c(a[2],S,s.sparse.count*l);o!==null&&(m=new Ht(m.array.slice(),m.itemSize,m.normalized));for(let C=0,U=v.length;C<U;C++){const E=v[C];if(m.setX(E,w[C*l]),l>=2&&m.setY(E,w[C*l+1]),l>=3&&m.setZ(E,w[C*l+2]),l>=4&&m.setW(E,w[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Du[d.magFilter]||Jt,h.minFilter=Du[d.minFilter]||Hn,h.wrapS=Nu[d.wrapS]||Ps,h.wrapT=Nu[d.wrapT]||Ps,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new wt(_);m.needsUpdate=!0,d(m)}),t.load(_r.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Gn(u,a),u.userData.mimeType=a.mimeType||pE(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[ke.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[ke.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[ke.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new vf,Tn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new _f,Tn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return hc}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[ke.KHR_MATERIALS_UNLIT]){const u=s[ke.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ie(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Dt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,zt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Sn);const h=r.alphaMode||zo.OPAQUE;if(h===zo.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===zo.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Gi&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new ze(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Gi&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Gi){const u=r.emissiveFactor;o.emissive=new Ie().setRGB(u[0],u[1],u[2],Dt)}return r.emissiveTexture!==void 0&&a!==Gi&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,zt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Gn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Fi(s,u,r),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Uu(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=fE(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[ke.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Uu(new xn,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?hE(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const b=c[f];if(m.mode===sn.TRIANGLES||m.mode===sn.TRIANGLE_STRIP||m.mode===sn.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new iM(_,b):new $t(_,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===sn.TRIANGLE_STRIP?p.geometry=Iu(p.geometry,Yd):m.mode===sn.TRIANGLE_FAN&&(p.geometry=Iu(p.geometry,Rl));else if(m.mode===sn.LINES)p=new oM(_,b);else if(m.mode===sn.LINE_STRIP)p=new cc(_,b);else if(m.mode===sn.LINE_LOOP)p=new lM(_,b);else if(m.mode===sn.POINTS)p=new xf(_,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&dE(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Gn(p,r),m.extensions&&Fi(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Fi(s,u[0],r),u[0];const d=new Hi;r.extensions&&Fi(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(G_.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new rc(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Gn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Oe;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new lc(o,l)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,b=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let b=0,M=d.length;b<M;b++){const S=d[b],v=f[b],w=g[b],C=_[b],U=m[b];if(S===void 0)continue;S.updateMatrix&&S.updateMatrix();const E=n._createAnimationTracks(S,v,w,C,U);if(E)for(let A=0;A<E.length;A++)p.push(E[A])}return new mM(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,mE)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new mf:c.length>1?h=new Hi:c.length===1?h=c[0]:h=new dt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Gn(h,r),r.extensions&&Fi(n,h,r),r.matrix!==void 0){const u=new Oe;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Hi;n.name&&(r.name=s.createUniqueName(n.name)),Gn(r,n),n.extensions&&Fi(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof Tn||d instanceof wt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,l=[];hi[r.path]===hi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(hi[r.path]){case hi.weights:c=Os;break;case hi.rotation:c=Bs;break;case hi.position:case hi.scale:c=ks;break;default:switch(n.itemSize){case 1:c=Os;break;case 2:case 3:default:c=ks;break}break}const h=s.interpolation!==void 0?cE[s.interpolation]:Tr,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+hi[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ul(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Bs?lE:wf;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function _E(i,e,t){const n=e.attributes,s=new $n;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),o.normalized){const h=Ul(ws[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new D,l=new D;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Ul(ws[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Ln;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function Uu(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(const a in n){const o=Nl[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return qe.workingColorSpace!==Dt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),Gn(i,e),_E(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?uE(i,e.targets,t):i})}for(let i=0;i<256;i++)(i<16?"0":"")+i.toString(16);function Cf(i,e,t){return Math.max(e,Math.min(t,i))}class Rf{constructor(e=0,t=0,n=0,s=1){this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,b=p>=0?1:-1,M=1-p*p;if(M>Number.EPSILON){const v=Math.sqrt(M),w=Math.atan2(v,p*b);m=Math.sin(m*w)/v,o=Math.sin(o*w)/v}const S=o*b;if(l=l*m+d*S,c=c*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-o){const v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){if(!(e&&e.isEuler))throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),f=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:logWarn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Cf(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e,t){return t!==void 0?(logWarn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(e,t)):this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}Rf.prototype.isQuaternion=!0;class pc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e,t){return t!==void 0?(logWarn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(e,t)):(this.x+=e.x,this.y+=e.y,this.z+=e.z,this)}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e,t){return t!==void 0?(logWarn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(e,t)):(this.x-=e.x,this.y-=e.y,this.z-=e.z,this)}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e,t){return t!==void 0?(logWarn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(e,t)):(this.x*=e.x,this.y*=e.y,this.z*=e.z,this)}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return e&&e.isEuler||logError("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(Fu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fu.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=l*t+a*s-o*n,h=l*n+o*t-r*s,u=l*s+r*n-a*t,d=-r*t-a*n-o*s;return this.x=c*l+d*-r+h*-o-u*-a,this.y=h*l+d*-a+u*-r-c*-o,this.z=u*l+d*-o+c*-a-h*-r,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e,t){return t!==void 0?(logWarn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(e,t)):this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Go.copy(this).projectOnVector(e),this.sub(Go)}reflect(e){return this.sub(Go.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Cf(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t,n){return n!==void 0&&logWarn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}pc.prototype.isVector3=!0;const Go=new pc,Fu=new Rf;function vE(i){let e;return{c(){e=di("canvas"),this.h()},l(t){e=fi(t,"CANVAS",{class:!0,width:!0,height:!0}),Wt(e).forEach(ct),this.h()},h(){Ft(e,"class",i[0]),Ft(e,"width",ka),Ft(e,"height",ka)},m(t,n){Rn(t,e,n),i[3](e)},p(t,[n]){n&1&&Ft(e,"class",t[0])},i:Kt,o:Kt,d(t){t&&ct(e),i[3](null)}}}const ka=200,Ho=.6,xE=40,zn=50,ga=4;function yE(i,e,t){const n=new OM;let{canvasClass:s="block absolute top-2 left-2 rounded-full"}=e,{showEnvironment:r=!1}=e;const a=1.2*Math.PI/180;let o,l,c,h,u=p(),d=[],f=[],g=[],_;const m=v=>{l.add(v),g.push(v)};function p(){const v=[],w=zn,C=w/2;for(let E=0;E<xE;E++){const A=Math.random()*w-C,L=Math.random()*w-C,G=Math.random()*w-C;v.push(A,L,G)}const U=new xn;return U.setAttribute("position",new wn(v,3)),U.computeBoundingSphere(),U}function b(v){const w=new jn({uniforms:{},transparent:!0,vertexShader:`
        varying float vOpacity;
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
          gl_PointSize = 0.3 * ( 300.0 / -mvPosition.z );
          gl_Position = projectionMatrix * mvPosition;
          // vOpacity = 1.0 - (-mvPosition.z / 80.0);
          vOpacity = 1.0 - (-mvPosition.z / 80.0) - max(1.0 - ((mvPosition.z * mvPosition.z - 20.) / 40.0), 0.0);
        }
      `,fragmentShader:`
        varying float vOpacity;
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
        }
      `}),C=zn*ga*.5;for(let U=0;U<ga;U++)for(let E=0;E<ga;E++)for(let A=0;A<ga;A++){const L=new xf(u,w),G={x:U*zn-C,y:E*zn-C,z:A*zn-C};L.position.set(G.x,G.y,G.z),f.push(G),d.push(L),v.add(L),g.push(L.geometry)}}const M=()=>{const v=new D(h.position.x/zn,h.position.y/zn,h.position.z/zn).round().multiplyScalar(zn);for(let w=0;w<d.length;w++){const C=d[w],U=f[w];C.position.set(v.x+U.x,v.y+U.y,v.z+U.z)}};zu(()=>{o=new $A({canvas:_,antialias:!0}),o.setSize(ka,ka),o.shadowMap.enabled=!0,o.shadowMap.type=Yl,g.push(o),l=new eM,b(l),c=new Vt(75,1/1,.1,1e3),c.position.z=5;const v=new TM(16777215,.8);m(v);const w=new bf(16777215,2);if(w.position.set(0,1,0),w.rotation.set(Math.PI*2,Math.PI*2,0),m(w),r){const U=new Ef().load(C0,()=>{U.mapping=Ia,l.background=U});g.push(U)}return n.load(R0,C=>{if(o===null)return;h=C.scene,l.add(h),console.log("ROV Model",h);const U=new Sf(16777215,0,100);U.position.set(0,8.5,18),h.add(U);const E=h.children.find(q=>q.name==="Prop_R"),A=E.clone();A.position.x=-E.position.x,h.add(A);const L=h.children.find(q=>q.name==="Claw_R"),G=L.clone();G.rotation.z=Math.PI,h.add(G);let k=new D(0,25,-50);function H(){if(o===null)return;requestAnimationFrame(H);const q=va.get(),V=q.VelocityX*Ho,Q=-1*q.VelocityY*Ho,z=q.VelocityZ*Ho,re=-q.AngularVelocityYaw*a;h.translateX(Q),h.translateY(z),h.translateZ(V),h.rotation.y+=re,A.rotation.z+=V*.25-re*2,E.rotation.z+=V*.25+re*2,G.rotation.y=z,L.rotation.y=-z,U.intensity=500*Math.max(-z,0),q.ButtonBitmask!==0?k=new D(0,20,50):V>0&&(k=new D(0,25,-50));const le=new pc().copy(k).applyMatrix4(h.matrixWorld);c.position.lerp(le,.1),c.lookAt(h.position),M(),o.render(l,c)}H()},C=>{},C=>{st("Error loading ROV model",1e3,!1,rt.error),console.error("Error loading ROV model",C)}),()=>{for(const C of g)C.dispose?C.dispose():C.destroy?C.destroy():console.error("Unknown object to dispose",C);o=null,g=[],d=[],f=[]}});function S(v){Vu[v?"unshift":"push"](()=>{_=v,t(1,_)})}return i.$$set=v=>{"canvasClass"in v&&t(0,s=v.canvasClass),"showEnvironment"in v&&t(2,r=v.showEnvironment)},[s,_,r,S]}class $E extends Qn{constructor(e){super(),Jn(this,e,yE,vE,Zn,{canvasClass:0,showEnvironment:2})}}const AE=`<svg width="100%" height="100%" viewBox="0 0 123 232" version="1.1" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd">
  <g id="left_side_of_controller">
    <path
      d="M112.977 140.769c-6 29.375-13.537 33.424-35.28 43.583-35.355 16.519-33.138 57.105-56.59 45.51-14.36-7.1-21.13-19.23-21.13-38.4 0-24.92 11.42-65.99 32.4-119.1 10.625-22.199 25.844-16.641 42.794-16.641 7.93 0 15.744-1.226 22.454 2.224 14.564 7.511 21.031 55.022 15.352 82.824Z" />
    <g id="stick_button_left">
      <g id="stick_bg_left">
        <circle id="shadow10" cx="81.987" cy="176.33" r="26.46" style="fill-opacity:.5" />
        <circle id="Oval5" cx="80.737" cy="175.09" r="25.21" style="fill:#6180b0;stroke:#000;stroke-width:2.49px" />
      </g>
      <path d="M80.737 179.329v-8.477h25.442v-7.872l12.11 12.11-12.11 12.11v-7.871H80.737Z" style="fill:#ff00bf"
        class="direction_highlight" id="l_stick_right_direction_highlight" />
      <path d="M76.499 175.09h8.477v25.442h7.872l-12.11 12.11-12.11-12.11h7.871V175.09Z" style="fill:#ff00bf"
        class="direction_highlight" id="l_stick_down_direction_highlight" />
      <path d="M80.737 170.852v8.477H55.295v7.871l-12.11-12.11 12.11-12.11v7.872h25.442Z" style="fill:#ff00bf"
        class="direction_highlight" id="l_stick_left_direction_highlight" />
      <path d="M84.976 175.09h-8.477v-25.442h-7.872l12.11-12.11 12.11 12.11h-7.871v25.442Z" style="fill:#ff00bf"
        class="direction_highlight" id="l_stick_up_direction_highlight" />
      <g id="stick_left">
        <circle id="shadow11" cx="82.597" cy="176.96" r="17.12" style="fill-opacity:.5" />
        <use xlink:href="#2a" x="48" y="143" width="65" height="65" class="gpad-highlight"
          id="stick_button_left_highlight" />
        <g id="Group-6">
          <circle id="Oval-Copy" cx="80.737" cy="175.09" r="15.88" style="fill:#fff;stroke:#000;stroke-width:2.49px" />
          <circle id="Oval-Copy-2" cx="80.737" cy="175.09" r="12.14"
            style="fill:#fff;stroke:#000;stroke-width:1.25px" />
          <path
            d="M79.737 170.127a.402.402 0 0 0-.4-.4h-.725a.4.4 0 0 1-.32-.64l2.125-2.833a.4.4 0 0 1 .64 0l2.125 2.833a.4.4 0 0 1-.32.64h-.725a.402.402 0 0 0-.4.4v2.088a.402.402 0 0 0 .354.397c1.712.21 3.36.845 4.718 1.903a.4.4 0 0 0 .481.011l.619-.445a.399.399 0 0 1 .634.332l-.058 3.054a.4.4 0 0 1-.519.374l-2.916-.91a.402.402 0 0 1-.114-.707l.125-.091a.398.398 0 0 0-.018-.662 7.939 7.939 0 0 0-2.845-1.046.4.4 0 0 0-.459.394c-.002 1.15-.002 4.148-.002 5.234a.4.4 0 0 0 .4.4h.725a.4.4 0 0 1 .32.64l-2.125 2.833a.398.398 0 0 1-.64 0l-2.125-2.833a.4.4 0 0 1 .32-.64h.725a.4.4 0 0 0 .4-.4v-5.21a.4.4 0 0 0-.467-.395 8.156 8.156 0 0 0-2.818 1.075.398.398 0 0 0-.024.654c.045.036.093.072.141.108a.4.4 0 0 1-.127.704l-2.93.861a.399.399 0 0 1-.513-.383l-.006-3.054a.4.4 0 0 1 .639-.322l.604.451a.4.4 0 0 0 .486-.005c1.357-1.045 2.985-1.681 4.666-1.909a.4.4 0 0 0 .348-.396l.001-2.105Z" />
        </g>
      </g>
    </g>
    <g id="select_button">
      <use xlink:href="#2b" x="78" y="118" width="43" height="39" class="gpad-highlight" id="select_button_highlight" />
      <path id="select"
        d="M105.267 133.325a7.506 7.506 0 0 1 2.496 5.595 7.507 7.507 0 0 1-2.496 5.596H95.213a7.507 7.507 0 0 1-2.496-5.596c0-2.22.964-4.217 2.496-5.595h10.054Z"
        style="fill:#9a9a9a;fill-opacity:.5" />
      <path id="select1"
        d="M104.162 132.138a7.506 7.506 0 0 1 2.496 5.595 7.507 7.507 0 0 1-2.496 5.596H94.108a7.507 7.507 0 0 1-2.496-5.596c0-2.22.964-4.217 2.496-5.595h10.054Z"
        style="fill:#fff;stroke:#000;stroke-width:1.35px" />
      <text x="96.295" y="141.267"
        style="font-family:'ArialRoundedMTBold','Arial Rounded MT Bold',sans-serif;font-size:9.858px">?</text>
    </g>
    <g id="d_pad">
      <path
        d="M86.434 71.626c.913 0 1.659.746 1.659 1.659v18.212h18.212c.913 0 1.66.747 1.66 1.659v14.893c0 .913-.747 1.66-1.66 1.66H88.093v18.211c0 .913-.746 1.66-1.659 1.66H71.541c-.911 0-1.66-.749-1.66-1.66v-18.211H51.67c-.911 0-1.66-.749-1.66-1.66V93.156c0-.902.747-1.659 1.66-1.659h18.211V73.285c0-.902.747-1.659 1.66-1.659h14.893Z"
        style="fill:#9a9a9a;fill-opacity:.5" id="shadow14" />
      <use xlink:href="#2c" x="53" y="54" width="48" height="53" class="gpad-highlight" id="d_pad_up_highlight" />
      <use xlink:href="#2d" x="53" y="91" width="48" height="52" class="gpad-highlight" id="d_pad_down_highlight" />
      <use xlink:href="#2e" x="70" y="75" width="52" height="48" class="gpad-highlight" id="d_pad_right_highlight" />
      <use xlink:href="#2f" x="33" y="75" width="52" height="48" class="gpad-highlight" id="d_pad_left_highlight" />
      <path
        d="M84.774 69.966c.913 0 1.66.747 1.66 1.66v18.211h18.222c.902 0 1.659.747 1.659 1.66V106.4c0 .903-.757 1.66-1.659 1.66H86.434v18.211c0 .903-.747 1.66-1.66 1.66H69.892c-.911 0-1.66-.749-1.66-1.66v-18.222H50.01c-.91 0-1.659-.749-1.659-1.659V91.497c0-.913.747-1.66 1.659-1.66h18.212V71.626c0-.913.747-1.66 1.659-1.66h14.893Z"
        style="fill:#fff;stroke:#000;stroke-width:1.66px;stroke-linejoin:round" />
      <path d="m91.827 94.401 9.095 4.542-9.105 4.564V94.39l.01.011Z"
        style="fill:none;stroke:#000;stroke-width:1.66px;stroke-linejoin:round" id="d_pad_right" />
      <path d="m62.839 103.496-9.106-4.553 9.106-4.553v9.106Z"
        style="fill:none;stroke:#000;stroke-width:1.66px;stroke-linejoin:round" id="d_pad_left" />
      <path d="m81.881 113.432-4.553 9.106-4.553-9.106h9.106Z"
        style="fill:none;stroke:#000;stroke-width:1.66px;stroke-linejoin:round" id="d_pad_down" />
      <path d="m72.775 84.455 4.563-9.106 4.543 9.106h-9.106Z"
        style="fill:none;stroke:#000;stroke-width:1.66px;stroke-linejoin:round" id="d_pad_up" />
      <!-- <path id="center_icon" d="M71.374 99.114c0-.817.672-1.49 1.49-1.49h8.939c.817 0 1.49.673 1.49 1.49v3.642c0 .817-.673 1.49-1.49 1.49h-8.939c-.818 0-1.49-.673-1.49-1.49v-3.642Zm1.071 1.382v2.389c0 .268.219.485.49.485h8.83a.49.49 0 0 0 .491-.485v-1.742l-1.452-1.437a.497.497 0 0 0-.694 0l-1.249 1.236.308.305c.099.091.156.22.156.355a.491.491 0 0 1-.85.331l-3.394-3.36a.497.497 0 0 0-.694 0l-1.942 1.923Zm5.55-2.209a.662.662 0 1 1 .001 1.323.662.662 0 0 1-.001-1.323Zm-5.131-1.656-.082.001c.21-.594.775-.995 1.406-.994h6.29c.649 0 1.202.415 1.406.994l-.081-.001h-8.939Zm1.242-1.985.082-.002h6.29c.028 0 .055 0 .082.002a1.493 1.493 0 0 0-1.406-.995h-3.642c-.63 0-1.196.4-1.406.995Z"/> -->
    </g>
    <g id="shoulder_trigger_back_left">
      <g class="direction_highlight" id="shoulder_trigger_back_left_direction_highlight">
        <path d="M110.415 51.254 98.146 34.763h24.538l-12.269 16.491Z" style="fill:#ff00bf" />
        <path d="M97.161 17.167c2.534 0 13.254.512 13.218 21"
          style="fill:none;stroke:#ff00bf;stroke-width:8.5px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5" />
      </g>
      <path id="shadow4"
        d="M54.417 40.591h37.84c1.52 0 2.77-.618 2.77-1.36a.695.695 0 0 0-.07-.309l-10.9-23.604c-.7-1.545-3.53-2.648-6.75-2.648h-11.8c-7.66 0-13.86 3.05-13.86 6.811v19.761c0 .741 1.25 1.36 2.77 1.36v-.011Z"
        style="fill-opacity:.5" />
      <use xlink:href="#2g" x="32" y="3" width="76" height="56" transform="translate(0 -4.346)" class="gpad-highlight"
        id="shoulder_trigger_back_left_highlight" />
      <path id="bg"
        d="M51.957 38.16c-.38 0-.73-.072-.98-.196-.25-.124-.4-.288-.4-.484V17.719c0-1.69 1.4-3.225 3.65-4.327a20.546 20.546 0 0 1 8.83-1.803h11.79c1.26 0 2.48.206 3.46.597.98.392 1.67.928 1.95 1.525l10.9 23.625c.03.34-.13.515-.38.628-.26.134-.6.206-.98.206h-37.84v-.01Z"
        style="fill:#fff;stroke:#000;stroke-width:2.2px" />
      <path
        d="m74.228 32.999-.217-.942a.766.766 0 0 0-1.493.343l.9 3.914 3.914-.9a.766.766 0 0 0-.343-1.493l-1.606.369c.66-1.61.965-3.317.85-5.04a.766.766 0 0 0-1.529.101 9.59 9.59 0 0 1-.476 3.648Zm-9.227-13.535a2.177 2.177 0 1 1 4.168-.327.93.93 0 0 1 .191.118l2.594 2.023a.986.986 0 0 1-1.213 1.555l-2.594-2.023a1.04 1.04 0 0 1-.16-.158 2.16 2.16 0 0 1-1.678.093l-3.292 3.361.048.141.046.179c.021.101.036.205.043.312v.269c-.006.101-.019.2-.038.297l-.055.216a1.959 1.959 0 0 1-.044.129l3.292 3.361a2.16 2.16 0 0 1 1.678.093.957.957 0 0 1 .16-.158l2.594-2.023a.986.986 0 0 1 1.213 1.555L69.36 30.5a.97.97 0 0 1-.191.117 2.179 2.179 0 1 1-4.308.516 2.184 2.184 0 0 1 .14-.842l-3.291-3.362-.006.002a2.14 2.14 0 0 1-.356.093l-.131.018-.236.013-.171-.007-.188-.023a2.142 2.142 0 0 1-.447-.125l-.232-.108-.19-.117-.204-.158-.153-.147-.147-.173-.081-.113-.129-.221-.084-.186a2.661 2.661 0 0 1-.035-.095h-2.107v1.616a.704.704 0 1 1-1.408 0v-4.641a.704.704 0 1 1 1.408 0v1.616h2.107l.084-.209.08-.155.124-.195.144-.181.089-.095.125-.115.144-.113.065-.045.274-.156a2.182 2.182 0 0 1 .737-.2l.313-.006.24.027c.128.021.251.053.371.095l3.291-3.361Zm1.228 10.811.04-.038a1.127 1.127 0 1 1-.04.038Zm-4.929-6.48a1.13 1.13 0 0 0-1.401.76l-.032.141-.014.181.016.195.03.128a1.13 1.13 0 0 0 1.396.761l.113-.04c.411-.168.7-.572.7-1.044l-.002-.072a1.13 1.13 0 0 0-.698-.972l-.108-.038Zm12.928-7.039a9.59 9.59 0 0 1 .476 3.648.766.766 0 0 0 1.529.101c.115-1.723-.19-3.43-.85-5.04l1.606.369a.766.766 0 0 0 .343-1.493l-3.914-.901-.9 3.915a.765.765 0 1 0 1.493.343l.217-.942Zm-7.959 2.762a1.128 1.128 0 1 0-.04-.039l.04.039Z" />
    </g>
    <g id="shoulder_button_front_left">
      <path id="shadow5"
        d="M94.279 44.584H54.287c-2.643 0-4.818 2.591-4.818 5.74v6.9c.004 1.258.875 2.29 1.931 2.29h45.767c1.059 0 1.93-1.038 1.93-2.3v-6.88c0-3.149-2.175-5.74-4.818-5.74v-.01Z"
        style="fill-opacity:.5" />
      <use xlink:href="#2h" x="30" y="31" width="86" height="41" class="gpad-highlight"
        id="shoulder_button_front_left_highlight" />
      <path id="bg1"
        d="M92.769 44.934h.017c2.109 0 3.844 2.067 3.844 4.58v6.92c0 .625-.433 1.14-.957 1.14H49.897c-.529 0-.965-.519-.965-1.15v-6.9c0-2.513 1.735-4.58 3.844-4.58h39.993v-.01Z"
        style="fill:#fff;stroke:#000;stroke-width:2.12px" />
      <text x="70.61" y="54.634"
        style="font-family:'ArialRoundedMTBold','Arial Rounded MT Bold',sans-serif;font-size:15px">-</text>
    </g>
    <g id="l_touch_targets" opacity="0">
      <path id="stick_button_left_touch_target"
        d="M103.497 149.101c7.227 6.337 11.792 15.634 11.792 25.989 0 19.069-15.482 34.551-34.552 34.551-19.069 0-34.551-15.482-34.551-34.551 0-19.07 15.482-34.552 34.551-34.552 2.258 0 4.466.217 6.601.631 1.548 5.051 6.247 8.728 11.797 8.728 1.535 0 3.005-.281 4.362-.796Z"
        style="fill:#419bf3" />
      <path id="select_button_touch_target"
        d="M93.558 126.53a12.266 12.266 0 0 1 5.577-1.333c6.809 0 12.336 5.534 12.336 12.35s-5.527 12.35-12.336 12.35-12.337-5.534-12.337-12.35c0-1.681.336-3.284.945-4.744a18.743 18.743 0 0 0 5.815-6.273Z"
        style="fill:#419bf3" />
      <path id="d_pad_left_touch_target"
        d="M57.9 116.925c-10.093-.218-18.219-8.48-18.219-18.625 0-10.281 8.346-18.628 18.628-18.628.14 0 .279.002.419.005l18.205 18.204v.01L57.9 116.925Z"
        style="fill:#419bf3" />
      <path id="d_pad_down_touch_target"
        d="m57.9 116.925 19.042-19.043 19.033 19.042c.004.14.006.279.006.419 0 10.282-8.348 18.629-18.629 18.629-10.282 0-19.452-8.765-19.452-19.047Z"
        style="fill:#419bf3" />
      <path id="d_pad_up_touch_target"
        d="M67.141 63.678h20.421c4.962 3.261 8.277 8.827 8.413 15.17L76.942 97.882l-.009-.001-18.205-18.204c-.004-.14-.005-.279-.005-.419 0-6.512 3.349-12.249 8.418-15.58Z"
        style="fill:#419bf3" />
      <path id="d_pad_right_touch_target"
        d="m76.942 97.882 19.033-19.034c10.281 0 19.048 9.171 19.048 19.452 0 10.282-8.348 18.629-18.629 18.629-.14 0-.279-.002-.419-.005L76.942 97.882Z"
        style="fill:#419bf3" />
      <path id="shoulder_button_front_left_touch_target"
        d="M99.096 41.101H47.503c-2.766 0-5.009 2.197-5.009 4.908v15.706c0 1.077.905 1.963 2.004 1.963h57.603c1.099 0 2.004-.886 2.004-1.963V46.009c0-2.711-2.243-4.908-5.009-4.908Z"
        style="fill:#419bf3" />
      <path id="shoulder_trigger_back_left_touch_target"
        d="M47.697 41.101h52.635c1.521 0 2.816-1.579 2.065-2.955-2.77-5.082-14.508-29.61-14.508-29.61-.743-1.517-3.545-2.595-6.742-2.595H58.788c-7.657 0-13.864 3.027-13.864 6.761v27.047c0 .741 1.252 1.352 2.773 1.352Z"
        style="fill:#419bf3" />
    </g>
  </g>
  <defs>
    <image id="2a" width="65" height="65"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAYAAACO98lFAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAHVUlEQVR4nO1b2XLjOAyEnawzmUxm9mF+Ll84P5eXzX1rX9R2q9UAacXeo2pQhaJsyyLRBEAQoCJ+U6yO3cHVcF31wb8N1XN+rX6Wv3+GDg6CEXqVXLvPQ8f1wQE5GAgi/Iralfmu6nugdjDfcXsQQD4NAgmfCb6m79w9TApAxXz/p8BYDIKZeeU1teuoAcmE/2i0/J/FQCwCQWY/E/wkdgDoZwUCpIJ+RMR7cs33TjRjXzD2AiFRfSf4CfEpXfM9CgTPPgRWfpPfGJCJqewDRDcIjdlXoStWDQE5AN4a/B5TDVkERBcICQCs5izkHyNvpMVvuJ+1gUFgAF6JX+RawXCa0QVEE4QEAFZtFXwTEWcjb6hlMAACgGBTUABeRn4e+YVaAMNAvIc4zxYQJQgFAGAV/ovhM2LcD7NQTWAteCF+MsygODC6gTitQCgAwGzyrH+JiPOI+Dq2zApECwTWAAj9SLwZ28zJxvic7bOvhutVBkQKgokD1AfwzEP4rxFxMTI+n9N9bBIsAIMAO4faMwD3MQdyLc9R+qDnW7J/FDNQ4aH+EP58FPrbyBfUAoweEODUMhDuie9G5u8eY2cmMA82jSEiBqcNlTm4ZRAgQP0x85ej4N/HFp9bILR8AoPAPkafEfQMx1vf4MxiBkLDDDIAvgs7ELBKYJlsgfAaO+f3GFOfwv93ALggivuZUKYJLhaAZz+LnQ/ArH+PiB8jA4hvsfML0IJNzE0hixPgHJ9juszy/0P+68LrWRCl2tBjDuuYrwbsBy5H4f8kEKAJcIwQgqNGFzazENAGaE/lUF2kmQZQIdowAWE0hSwiZFNgENgMGISL2K0MmUME8+BUG3oAYNBcJAkwuC8PApFziKwF8AfQBJgErlULsiUt20WC3X6DVxNeUl2IrXuMLRBsEg6EbEUACOwUsSxexnSJhC9QZ1htpVUbPuh+5z8yJ1pFkuvYOcm5TyBTyIBgTWBtUGYNYC1o5RIYiHUCAoPk4gkXVmeOeEtLNUEjRF4FeL9Q+QFHmCHdrkN4sGoAYomHmC/HzpdMNIGXGR4IO0V1jNAGjhg1NNaVwM2oCuoY/9Gdqu5XdBwZCJP+EROpJlQD0G2y2yXqdtl2boDXMTBhojAZ78k4dOfauyKVq4NLmigQbneone4DgI6BgRhkLFn+QnMXThMn4ziNmMUHVe7glDrQIIYB4I6dUPuQbubURJndmHg81h9lPsFtnnQWeBDaoVtplpBqg45HweCxuQnRcW0fnHXOJqEdaxY5iwGWCu/G4sbVGlO2Kk3GpSC4DhWMjDPhDwGEjqd3TOqXus1BB5517B5+aC1okY7N9d8cRwbC/5UWgZ+BoGXxfQqkQ5id2pFor6JtRgqCCuCyNRW7zg8FiEuZVXXLtESnVGmCE94lLcoszgFIn9Ma01vUEzQbmwMhE5737e46A8MJsi9l2tiqV2ZF28mY1hHb6oyzbdeRqw06MPa2zUL4bFJeC66AmFCPJrjSWFUT1PzeUiBckoXzCK5OWY1HD3ZsyW2gVAu0LMZJDG6fY7qF5nUbYHO+oEf4TCN1LDoOl1VKtUFBcB5YkXe1Qc0ouw0Lg9EiTaCw+nONksfwFL4K5Uw0InbVqGwrrabANQDuHJkczihzzM5CnYwt5/laAGAM7IdU+AdigPBkQHBARPBAxTmqCjotuDeMgWAwmLXsMIXz9u6QhuYRIXTWP7Sh0oQttXwCA4GBcElMK0PsC0Ke00q5u5WAfYCCfyfMILBfqFasFAQFwiU1HyKvDPEzGEg1lSyR6lYBgP8wCnwbETfEt+Gr06lTTMtwv1Y/h6vhWoVgTeAMkzuMxQKxWmsZTvOOFfCqBbcCAj7fxdQc1Cfg2TOqapGo1mBASGI8xTTL5CpDqsqupL5PQRbaB9W/iYi/Rr6h7wFCtjyiny4QcKMCAdWsKkPOo6OyzOajOcjM/GAKUHc1BTaHh5g7xdIULAijSTihNHHhhMhmkeOIpYc02CECCDUFtypMTqqovBYEEUqBeI25QwOp/2BbZhCqMwZVXIIl0a0KrAXOF2yF7z6uQ9rAzgpm8TrexiDoHkM9egWC9pNFhi420CAJS2PXxglUpqI6zitofZKLtb2lscqhsk+Ac3yMeVDmAjPd1qdnGXvOMbKTzH6vljWtUbp4gUFwTtUd5tQNE+8auwGIaGhChD3VmhVruQSmJTp3rLfn4BYD8WyuOafhEjsR4Y/t7QVCAwitVbqS2Ea+1/AZ5OIE1iz2E5o44VcAOChqAtANQgJEVglypTqefY4RqjDbpfSyM0k2rXfQo/6gxjsPzkyyFz9aYbPbUb4bThO8R3npA1S8+8RVKYDBbVa2Y9JUGgPCbZZB3hsACLGIirfgtETXKtsxue20u7bCRyx7GexT9cLGu5A97MgJyMLrPRHxL70SyFSAgTa7VhpMm11HxH/k5VClBJDq2tFMWLk+6KvCRy2fFy+L94IwoWO9NP5PnCGYUfUm/THfjv9NBf0N6UGHaHzqzbQAAAAASUVORK5CYII=" />
    <image id="2b" width="43" height="39"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAnCAYAAACWn7G7AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADoklEQVRYhdWZ3XbaMBCExxQSCm2v8nJ5wrxc7hrCT0joBRo8HkayKTetztkjY2T0abzeXQvgP2rdPRc/n15vuv6lezrdM9/kySpgty72CvaWBYxOZpCd9a3jBHeq9ADGwauwDUg1hOMxODXYcRM4wgpogpxVjn1xNcCvyufLomrAV7AG6pDJHFqbQyVLC4jA87SCBuQ3s5n0Duygn8X0mIZy/rLI59Nr58AD2KCqQs5LvyjHcznnwAqrcMdgXQ04KZhAOSlBCLgA8GD9QhbjsAr6IXawzx8YKn/xY1XX3cBvPyEI9wDg0YzQhJ0JrIPui81LX/NxXfClJZ8lrKq6KGBLAN+LLYspMN1BYY84K7kHsCtG9/G7cBXa1HdryrqvPhSwVbF16QlOYMJ26F2Aiu4AvNuiUqTQ8wN156SXVSosXUBV/SFG6GWBpWIoEx8L7A7AVsbMZIxHB57TWN3DBmXpBuqvVHYN4KfYWtRdmLJ8mLblewflYmjHApxi9k1u8FigVjir+kuAV+hdwWH3shCqRfc4iGk00bsco0GKsUldAqvCa/SuoG5AWILwlh/QP2yMJBqvo7IzP9FQV4Edeo3eh92naXwgGUGoNkFTFgSAjjkguYEDc8WatTTuauylssxKFOOIs8KaSGrZr1bBVWsDH5ySRaoVaLz2qzI2FUC1krSawbTV6koP3MmmjPM5Rt8YWrA6ocdCFiEaduboowBKzyedY3ldqgPSIppxNtWfDsfUyaxEPz2VMeqzmhD49O9lERpbFXoAnNKtDkqgmt81G2lMZSrt5Fqm2TcAm3K8FWgHdujJynohQkiFIugSOYPxug2A3w1gugbnVgGbsKosb70GcIYkfs906rBc6LYAbnBW+A29a4y5Q4RlHcmB6gJ7DMMOTDktZLRE1EKG7rARo7qEHXeDl+7pVLJETVl9DyMoVeND5qqrG/GB3Iq9o3/gkrLAiBtwACdK+wRepzKLadrk7xBWo8gO15HBX2viW27y2Rqwnqeq/h6Wqn8HTqZuEF0AsPwrRbgXMlobaG6vVUyE1fcwTySeKLiwC3DzVVwmAa5fi9WXGfy9YvIqTtXldQrvbwieyQZtyo6MFh1exPjOTGuTQ+0znBvE17QjM2WvK+1z1Xr9TS9ofKuounUE5O2jCBuAE3iKFGkfQIHHKrQqaBPWgB261aeWqqmrWPrX+7Pawq732OfUqrXr1N3vSbDabv0fodbu/X/hn29/AAo2VaYa5XYBAAAAAElFTkSuQmCC" />
    <image id="2c" width="48" height="53"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA1CAYAAAAHz2g0AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEw0lEQVRoge1ay3LbMAxc2c6zSU/5uX5hfq7HJo7t2OqhXGu1Akgp8UybmXIGI1mWCCxeBCEBX3x0l5zsR/9z9nzP3VN/CZ6zGTaE+4wiUiBzQFYZB0J3M86XDBewz/7LwISMTfAuOEbXqnPOELSvnAOIQawajCjsqtBaaFPoSug6+H2dXL+S5znXWnithH8HxG48uSA36cMrjIH4uVNtuJZ7ACc5nux3bzSyxIhZRXhqPzq6xhAcM8Ep5LFxTEFsAg258O426j68Hpm9BYCaPhZ6lyPPO/lf5ziPCAAZq+YjfydFQDIAmfCHIvSh0L781mdPMt/UhYr7uNtQcAbdTaFrOXoQasyQBxmqb1PbFJi0kyMB0SLqUnjunvqaC6n2KfwtgLtyvDVAbgkH4D5PzVPYt0Jre0YDW90zjQFg6j4EcAfgXohgbjB2J89OketQuxScSlglwiuIswttgGb2oQsRwLdCD+VIEHQnWiED4K6zBfBa+FAOve8d09g6j6UuRAs8APhuIOhKfCYCoBlnXzRP63FR7TEOaMbAezDnBIBaIosBAngUusdgBQY05+Bw36ffq/CnIuiuEC0apWg4ABde44DLf2SFR4ytQADKUC1A7e/wx31UeALTmPK5VN5qFuowXsAiEIyFBwyxQMYRALoCAWwEGAPa03O2SALIs5ACURAszDSlalYiALpFBmBX5gTGWteU7MWdr/DNGMhKCq0oyVTXBwVAxsxAmlW6co3C+6JY1TxH5kIKwuNBXcpLZi2dIwDUKMrvPaZliS6IUYU7y4VaVakXeFrb1yygeV6fy4pCz/2z1gG9ObJGVGJHwByAW2Jtz9VcZpELZUBq8VEjXfqz/1s80jEHQAZmCS19dvZo7Yn/+fEfwN8eXx7A0iDm8C5BjT5y/0UBLGGuOyeOLvhvCdgPA/AJsibUEeMNN6/xfgVwrDwTAYzkmAXABc+E9l7OAUMez4o53WFpD8gBZZZpAshMqUyU+R7D/la3hVp6qAVYPvO5rHUSWQN23rRApHFtPnHr9ybC877WfoDdCAejVoksMRoOQG/yJpRvB7UdssZgJVajmQV0Q78t5GAia7g7hQCAMeJoI07ht0V4ap7WWbInfgXwUohA2KE7CO80MymAKHDVb1Xzrxh3E44YNunaScgAaE/oVyGC2GJoK6ornVuKKm/kQpp1nCGFp4ZVeG8xZgBcIS8BCI0LtYIruupC3kVjn0aF57Zwi6EVottB7wtFc7IzF7kSreAL5DgGnrunvrQXI/+nz2r3mf97K6TVG82sQBAkBrRaIEqp1TQaaUv3tEcM2ve+aK297n1PTwzMSG6BZhC78J0wUoGYz9WtXPiwEYtxbEXvB3ZCTKe+JgDuQia8g2BTlde1Nc7umm7mo62kr+6e4XyB1BU6WwvOk59H8pbGXzMp8frSd2RuCa+rDnZtEsS1l3zqr35d/Td7SxkJXwORValRTaRzxEwaLzuixpNnnEz4CERU6Wal9dl99D1xaz/AoUy0xsnaIXMBKBAFk9Hkc4OQUeVbicg6Ps+cvo6XBBEY+DH6VqLKLAGi5/783KaUCxLV+6N7Fn2t4qPyrdCiLlpjhAK2vhn6lABLvtBqjUt9wfXlxm/KDCtMj03mWAAAAABJRU5ErkJggg==" />
    <image id="2d" width="48" height="52"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAA0CAYAAADMk7uRAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEkklEQVRoge1ay3LbMAxcp3bzcnvqz+UL+3O5tY3t2I57CDdergBISjLT8Uw5g6EsiyQWDxKABFx4W7x34MPp8d1js/Zz8eM0d8wkJhJmPx0AgAGAMVAlE8b4wvrqemo7BdfRvRRIuGjBuBKC62yNaHFn+CSE4DoEMVg0YF7pqvjt80WAXLoRvRT/DUAsg0V0cWXyqqBIM1lzCb8kpP+9jX04PS4URLeQSF8lTPpipPci7VQAnPmj9E4KaKCJSAPOPJlcJqSAFIjOF9m5Mn8IiHwc29hOEzo5gIH0lXkyugLw1fqVAXGT8qY2TgkfAOyFnu33Hr02Oi24BtxBKd0VgGujr9JnIDhnJXkyvWvEOYDEkaVPTcg1QKnfALi1niBWGJqTamGM+Y3MsQjGqPbezHKKDyxxlvYtgDsA962/MxDqExkAmgOZ3zZS5v3ZI3rr6DVg9s+eGqCtE8A9gHUjAiGISAsKwO2ekn9CL/nIuY9tztFzINqBqIGbxvAawLdG6wbMtaBmRPuNpH/dxizkmUP7n+QCSU0ocmL6gAK4b8x/b71qgQ6dAXDpr0SyCi4TRre7KYAohJgK4h5nLXBr1TNBbZoAto1JMk+pq0/4zubCHmyjzny0ExGEOvS6XRMApaoaUADPOPvLS7tHjegcszQADLUwBQSB0IwyAJTyHmcTO+FsTrodZwfjqA8o81VIQSYJhoBucLZdXZwaOMh/aL/1QIxO9jJQzEwoA6LB3Ao9EPYVADJFh3WmXfJVWJICUMZ57SG1AllKr3FTBEC3yiwgrCQ/AJIByIAoiAyQMqMAXBORpCczPhWAA4kmnkJznw93nI8AGAP0WQBmNz8cLq79B/Cv28UDmOvEWb2moo+M+xQAY8xkdR22xchzUSErWnc2gGgyLzhl9Rw/8DQWiuo+Xv/pqg8VkAzAWB1H0709+iiTDGcAtIyi6aKCc804XyWAqvRX1XI0RGb+mgHYoU8Znw3MmGmlACo7V+lx0R1esyeV/AF1PnCQcVsD41rRYlbYKhPyLMrrOFvEOe2UlJKp41OjjYEhkMycysKWS96LUGScqd9Ve46ZlQNg87l2jfnfAP60a2qFIMZ8ogOQ2b5LbYM+adG0UMuMEQCaIoWxacw7iB36umjq0JUPZNL3ChptmmkhkxuNMr0uFJnRrwaC5kTHTkvsEQAgNh/aPbMnzawoSa+PRgAioWzQa8K1QBDhwbYEXsvUrbyYmQ/rOOqUR7mv9aCpxd29jKdpqkNHzjz5HIg04DUelaAXdmn7DkDn1SocS+tb9Nur+sCoE3MRj130bQmfoenorqPmVQGITMnPFj8X3JHfQHRpXDMjjWO8qLWy65X87wl6BSA6Y/x090Ot00L1joyLvST3OCnDh6yCFuW4WRSrsVAWG+VOHCzC5i/WdCusXrVWCXoWjntkmtp++poVCF+1qllFdaG51YUs0o3Cdb33NrYEEICIwIyVRTIQUWjsGokoZL5aaOx7Cb9XzlU0D86igC00HWcsbMFnNnN/Zy0KjyPtAKg/uZkstZkfOI058Wh7z8dPF9n+Akw5M9cvVTL/AAAAAElFTkSuQmCC" />
    <image id="2e" width="52" height="48"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAYAAABe6Vn9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEqUlEQVRogd2a3VLjMAyFT0qh/C1XvBxPyMtxudAW0nYv8GmOFclWYHd2Bs9o8m/7i2RbUgL8sDIsufnp9LLo/r9VnofHU/bebgcdiN7xd4vtfHXcgws7Y0CG5DbTRqtDp+Q2BJt1pAESCcx+rw2vI9phu2/lfL8HtQ464UGsgq0HGMF4QB7AMdhWUE+nl8FCVQ2KdiyIyoVzboWctrIgh7JP0eOZxhTK05CFIcC67FPWmMNFmuoB2c5bGWSrYLNyBnLGDmHY+TWAS7OlEExNMQOkmlGAEcBHkRHTSzrIs4Psz4EExJoaAS4BXAHYlC2PLZRqqgekJqYg70a0vuZYikxOYdYCsgFwXYTHERTrimDU1AhDgH2RHWqNe+NtELiuhi5Qa+YGwG3ZUiyUN0lYGKAeNwqzK7KVeuw4O5ZrqqmpsTJ+KBwzBLkuELcA7ozcYtIWoXQ8tTSk2qGZEeQNwKsjO3xq7r08o7MfnofH01c0dAfgF4D7IoTiuOJE0gLSscNxsy8wfDGD3KMTxEfrhbWmbR1Dl6XTBLoH8FDA7sr5a0yznzU7D8iOnR0+XxqfP2E+tqwFzIqnIUiHaH5XmMxPtfSASUs3mGZD1ZA3hjxz25ZnCUOQPWLtq8xmObvSe1A6MaimCKQNR2bhAe1Qa8ZqTde9pvZ7JqdAOpaoKU4W95hmvCVAHBM6Zgi4kfq0zqZHEpmcB8UJwgMjHE1zCRAXTh7vUS/e6nJ5MFX9GW/bQlnPgbKRfZpGC+ggnaSZ7aVugnhLQRiHRSbXg7L+nQXMaEg9ilHqinxE6yemx5CCWCjrgVvPW497QDzv1WE9eDsJhH5iy+QUJhMnRTFS5Pqcks96bYelBxTBWclcz9aVrcMtq/4t3ZJOMSXq+XZdWQ1FCYue/Ou6FgNFWRjrynsC9NchK/Za1P5ioAyIjftHTDMUkFuHxiJah02Q2KwP0IDygDIg7MiHEcJwnekBqXPK8MBCehmfEKqlIW1cQTQu0ZD5Qu4fE0Dq+uxFCMd2ohSWC2WB9IaWVjTmp2cAuSfjKaiGGKky/FYw1pmCUqDI1Gw2hiCMLglzwDx8QACkmR6+IIbdb6Vu1ZiaoQflAtkG7VvUN6lhAmHekQ/wbOqK4fcrgN8CRm2p+SnUrEQm540b1Yx2+lCuaQieySl4ITi1RCjVFKHClLAHBMw1pKa2xeR4ApNmliRJ7MxpkyRvqLW0RZ3lsWZXFU9D3szGN6hjQ+1f46BeGssbozaNRfOLzC5cYM8NltxcKzmiYTejVM3JeWFy1UYAZLVE06Z2KJwB3UkiSgV7Da0whcm8R7VmTe07qWA7k+qWIHZdqkp2DOm1I2oT0YlgyScVbzZV70OT9TznwYTrEMxN6mDqubFAaOIv+vLQ0lALSsVziapJwf3g9Tw8nuQbkQKNpmH1BqIPXi0YDyjyF72PX19aWFmO5rw25n3kysC0oDwwL8QIve1Zw8F3Vi9R0gJZAuRBachwdM6dn29+NA6gIjh7rVlno9jB7XkArlfgfdYPG1/440WzrmTxZi0PFsCCHy9sSfwak6onWWwnZ53+8q8xXvkfPy8t+XHpR5Y/ZaguuvoNjWEAAAAASUVORK5CYII=" />
    <image id="2f" width="52" height="48"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAwCAYAAABe6Vn9AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEqElEQVRogd2ay3LbMAxFIT/qxE26ys/lC/Nz2bV1/IisLsprXV0BJNRkughnMPRDgngEkAQgmX2x1i05+Hl4XXT8Z7WX7mnIHtscoAPR+v7RpoOffG/BhYMRkC7ZZ/VHgxqSfQjmXpBguI/E5HPrGt5AvIFHcjvOg5oNQmBYVkHvAYb6HSgP4hr0MziFmlwwgFmJrJ3fGK4G4oGpXIv0wecq1Ma5iMKsqd+UHp8VMLJUBIMeA8XAezN7L31fdPc2BVM9UyBnEcBgMXjItgj/5kGxrgjEs8p7kYv0nehwFwW1kOdqDPHNkQyU1xgGdx8AFzM7F1mXXm+ClXOH5+G1g9tFLsfzBUA7M7srsqOeLcZQ0FWDgZsxzNnMTmZ2JH16DgQ3LpxD3vzZ2F9L3JnZfZF96QG1s9FSGSupdRjmWAQ3qLO5a+o8mgBg/kB4zsASgPhuZg+l3xPYzkb3w13NAME6bJk3MzuY2W8z+1X6Q5G3Anu2ca7d4F66p6FmIV4QYCGGeiSw+3LMls5rAfHcYTfDjenkOMyt6g2rLdvqcrDWvsA8mtmPAuVZKQvE1jnY6Lb6v87TFBAOiBYFdr1Hkn2BZStFexLPB7gNXG1brjvYOK9ONl8kvAhltspFUQIv2zynGApWAtDG8kCXMljcCMAAYmdT6zDUrLVcji3lQQHswUa3w8Ait2AgzAu42UCAvC3oXhdGJJHL6Txi18MGy/sS4DCPMkB90XW20WVgGejJwEz0exZiOLWWBwYBIAaRAbrYaJm+wOhGnbJMDUjjMAXS+G4rkrUQz4N30uXFiOkcLLKQdyLnQRyBaxTOkXgNCG7m6dC0JJ2e1FyOYTJ5UitHUqAhea537bC1gCK4mgtE/y/Rl9Uxa6v2Ic2WLjEl9HxYV9ZCtaJFq6DxWbpSsC0grbREYbwnZu2NtSUK0gSLgDIgvQjiMrhxZh/COapLiyIKl07BcbBe3APhdBnhy7qcd10AhGgatQMPsGaxJhBftFbA4Lz/ZKNlEHRmgXA+BDoBGJWw3KZASu/B8AA4IeNBZmM5jraRjR4JTK3mWWoCx0DqnzUYDABhTkeD42jbKkCcPiAfQrrtgcH9qitfNIc0RdZqzIFgrBx7so8leEeb1hFgsZNN3Q+WSi0K3iKgd5HTbLOxJsApOIcv3g3DTVDLHwrQT4Fi9wtLwh4QX5Tdja2DAWNQKD1p0TEKJBmI5xFbCZaC+8H1eC6lXE4txCsacnoMEP/DBZE+aIpcA/IKJVzGgpXU7XhvmrTbxUptrlUxvRfRQqOX87eA+MZxofGN4PBdV7+btaJSsLfCIatE49+RYWKByGaW0UrKloIL4vMMwlOcWeW4TKQbIldrPqtYD92wRGajDYF4L9LasQfkZZmZzFKvA70aVnEfwrgPvF66p4GeEUVA7O/6wItT5RoM62sFvhrX4b/FGyuaPimDwpWNc0v3nGyG6UXzHlgrpZi02YUrD421UKK/qb6MhfizB6apw1WOrz80DqAiOP09C6JNg0wvAvC+5x7roy188aKqK9m8PCfql714wS3xakxKT7LpIGeD/udXY6L2v19gWvLi0pdsfwDrTzKXc+jmowAAAABJRU5ErkJggg==" />
    <image id="2g" width="76" height="56"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA4CAYAAABXJB78AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGn0lEQVR4nO2c21LjSBBE0zYwHhhmX/bn+ML9OV6XGTCL5wGllU5ltSSDL0RsRXRIsmypdZRVXX2BBQ6wh+3jwj5ajGx9Px23bFsc63YbzuOfxd/+2w/ZnEo7KIXi++kzv98hwBxQOvbPPxXapEoHUA5jiX1QfpygHQpMy1uxTfA+BdxopQVWAkA4Xha2z2O9zqT7YwhL4Wj5z44dIICPQ7uqThSqqgCtuuL7DjEpDsjgPCZVkFheZZ/ngH1wH7b4hk1VwFA1KytXXVnJVov+vnLRylxZDollY8cKT1X3IZWVChPjQ/LBFcy1bK/lWIsqz6EhbIFaXQSgkDYAXqRsunts7Bq8/vZh+7g4FNoAmKnL3Y4QrgHcyPabHSu8ltKAoWsmWAqMyiKoZym/u62rltd8s+PZtnfhEODV/RQUIa1ty0JoqjKNa61YVgFTV1RYvwH8ksJjQqQK1UUPds3kkim4ExaBrAF8t7KWQqhJZZXCKlUkddH9COeb3Gtp10jphl5/llUxTKFRJVTVdwC3XbmTrYKjym7QBtZqKStgqq5fAJ7sPgv7nacZy+46OCSW7YCNuCNdkcq6A/DDikKjEt0tk0vS5gKjutbdfRSW52baWu41AFMgqbnCUsBXd1zjXVE/ANwD+NkVQrtFrzIN/p6XTUktHBhbRwWm6lrK9z030zRjKd+ZrbJWDGMqkYDd4R3UX9iHRpW5wsYC/lRgrjDeY2nf9bSDOZoq7SCVJYW5S2rryPhFl7xHD+0e+8CosKkpRWXeSjLoV8ry/EyBEdoS0lrOUdlYK+nAGPTvunIv5Sd6lySwsdg1BxgV9ophkFdlpfzM0wsG/9kt5hUQx7c8YVVgDPzaUtId79C3ktrMt3IvhGN/CI9jvK7D0txMy3N37hq9yhby+8k2xSWTyqi0VBjw2ToqMGAfzhyFEYymJ8AwtikwTWYJ7Qq9e+/ysoft46REVoGltz4GbW0l5V9V33GOKTRVlsYtz/yf0L9EBcZ4tkIf/CerbBk+S+Nd2o/0znYq3vn2/mQaGkolfcf7s/riCOhWiifTnubsXmYITQNr5WGpi6TDNz4qkTraKaP3e7VM377ur9C7qCbVz6i7bApMYxmD/ySlJYVpZVvgWspJY1+toN8yd2etCxukqlFyaBouYsgYU1nLJb2CDi1l7mMjqx+xKV235J4JWiuhbtqYwvx4rACfC6mql6usFdNSHKsapVGVtYBp5Vpx6BhqatVH7+sNkrvlVJWt7NqljQFLFT4VnCn1GFOZw9JeiELT8AKgVtlcYJdgVQMwBiy1mD4aPCqGrwhMjQ9XJdeem6UWM+VlALLKviqwlO60eiNJaaqyyS3mVwWmlhoATWbHgLW6cQP76sAODf4p+48qc7f86sDUpuZlSWUpxfg0l0yrY85R1LTldGg+slL1L8s4piqbslQgVXTsYXTM/BT5mgKs4lk18awd8pfudzrAuNcpbwHzN+mTotUqGr0ZcDxg1Qy5jm5U4HTrs/Qb+e0bzCpgaXjYZ2/SCppX9G+E4+anUpgOKOrypgpcGsOr5h+aCqvcLkHSaSzKWYeSTwHM66v1TODSgKivbxukF5xZcmB+c1eUT2FxRobZMrrvpbH8Y1uaXdKZIp73vM231UjMFpgWw1rLjDh+zhu9dee9f3Zsq1TGenIsfzD5gZmDnJVLJlgbDCcZqCxW8kU+a+YzR7KkMs6ScyLEZ8G9cVsU+wD2gSV3rFTFNQ3qhi/o5yMndTOOZD6HyRfNl8xpN50NT8uhorViWLWe4Ql9oFRl6XzkuYHpC2cco2f8i/25ypbiBvAql1RY+pZ80RorpAtD0mz3KSylQmnFD5X21B3rXKUuiYpKuwLely526X+KXwqMyoFU5hm9i5ZjSye2VlhRaFzaOdk9W4kr3Y2BU4dwWRG6Ykr+zjmMnV68p0O6lKByTcCgtVpJfTv68FqBm+6GVaYMnAcaH9LX9qvSfIXPC4ZryAbQdsA6t9QbsgP9ahXRuDBnSeYprZWAew9F15Gl4D+qMN5o0PHEEJguHUiB/pwzS1N6Lakkhe1W9rT6ktz3v9nhzVLf69yu6OZpUjWAUC0ebivMWktguBaUAKulApeiLprHoGp4qvoruIHFh5r4J39V38uvec6g758lcNvieHcdXWhXPkz4izaHkiBdgqoq81CThrH83GBVYvMBiz9Z1v1LUNMcc2i+vwcnLeGc9ICN1SyXDmjMBkDG1rke/MBTljdeun32fxz434L9AZ7ptX/DaxeNAAAAAElFTkSuQmCC" />
    <image id="2h" width="86" height="41"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFYAAAApCAYAAACvIt7jAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEmklEQVRoge2bzVLbQBCEW8YGgiG58HI8IS/HMeBfrBy0Y/W2ZlaKqyivEqZqSrKx1t6Pdmt2JAPf8SXRXHLQS/t20XFzjNfmub3kuMmAHJhjj+caCjJ7PBX0KAwB2jhb7++Tx79yRBDHtqOAw4k7QBliE6SOOSewLXKAUWbHRYDdiRNU3i7QA1wEW++4mqME8hRsFbILd6lPCFTORcob2rfHCnfMIq4dnlIV4mfanuSx/V3HySKbcACVAXIuaZ+Bl6yhplC1KsBj2rc8Ygj8rFxV7UCxKRgqw1ylY2xr+/waDy6Pe83wTlYK1SAeARxou0j7HGflvrRvDcM9g3XUyko1gCsAt04aZA8uR01g1QIM6oFyn/Imbb3P79qCKlY9kqHeArgDcJ/yjvIWvYrHVFtLqFpZpTvKLfrzSCPHtum58ZMXhjawRAfOgD4A+EFpkFm5pvbawbIFGNQ9OqCblCaWRo4bwGU7iBTL3mpg79BBXVM+pDTlqmoXzvjXDLUCBstQt+jnY1C9E5xlA1HuEjj7q+exbAP36BS6BvAE4DHlOj3PluCBvTZUC64G2AbMArbolOpB5ZOb7S8wwQo8xTJYU+wTgJ/oAT+gtwS1Ax67hlCwbANmAe/o5wDndau0b3YHeIqV4IogUuwjOqi/0naNHizbQa21LPsjn7TYAkyJahO36CuFwYrzpX3Da/PcMlhvpcUe66nWlPuI3g4MLCu2JrCRYvfwobLvWkbVT6jYUg3L5ZZVBKZeO5HNWbF7dJ+7Qe+7O3Tz/IBfUnL1k0Vp5aVLWV4gcD1roLXs8qqCmkIVy35qfmvzUaiuDfDgpTrWg7uUXAVpYGutY1mx9jkNsjcXXVmO9kM8K9B9D3Qpoz5trTF1bl4HDwjmtyz90Qlt9p6C/PzLca8RuqTlDBvbEuH8Io8d+wBWIHOpwsU0e1CtYfOyQt8aLtyEsXkqdB1jEEt6AZcLpXaavak1KTbIyxNeec0BLK+8uKTaIYfNq62sF+uFp1gPKjcobMmnNd8BeSOmdn/VliEvad/RlVgb9JBLcCd1t7x2mgfV4BlUr4atHSyQfxttjh8AfqMHzAo+0DGhDzNYbfx6PcoNelWCXrNF3oCZE1hdfe3RwXxHDneDoXJDS1DFMlzuqO+Q13S8OuGloNZ6tYc3V1atwWXVRmBHr3mVbICLaf7q6OWZ2k9cFp7PavtQFbuH77UA0EaN7ugaEC9PuePD3SBdQ88NLFufNl7sasIWuc9OUqxXah0x7N5wg4IvJmpjAqgbrjdfrs3Nb3eSXn3re+xr89zSVVp7kyYdzHD4K8NrafZVbf7WGgrWvol60uZFg9a0JxnnHJ4V2PYkz9sbHzFsTER9gtpjbEHECuYcrWOzydO1L68xoXfC6O1Gk5oTFUYEVwGfZL94N0xUFVjof8UGv6jjU2noV9nmWWoy8WsGUAEHQHCnoQKMvvZzAqrhea6KynsewASwQHhvLO/r43CsmYWnXg84v8a9jTOEUbg13muGF8eaWWhbMHqueFf3JBjBjzn+FZBjMYA35XcIF8P5X345c+mvZr7ji+IPPk7IumiDX5AAAAAASUVORK5CYII=" />
  </defs>
</svg>
`,ME=`<svg width="100%" height="100%" viewBox="0 0 123 232" version="1.1" xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd">
  <g id="right_side_of_controller">
    <path
      d="M10.5 140.855c6 29.375 13.537 33.424 35.28 43.583 35.355 16.519 33.138 57.105 56.59 45.51 14.36-7.1 21.13-19.23 21.13-38.4 0-24.92-11.42-65.99-32.4-119.1-10.625-22.2-25.844-16.642-42.794-16.642-7.93 0-15.744-1.225-22.454 2.225-14.564 7.511-21.031 55.022-15.352 82.824Z" />
    <g id="stick_button_right">
      <g id="stick_bg_right">
        <circle id="shadow12" cx="42.54" cy="176.272" r="26.46" style="fill-opacity:.5" />
        <circle id="Oval6" cx="41.3" cy="175.022" r="25.21" style="fill:#6180b0;stroke:#000;stroke-width:2.49px" />
      </g>
      <path d="M41.215 179.291v-8.477h25.442v-7.872l12.11 12.11-12.11 12.11v-7.871H41.215Z" style="fill:#ff00bf"
        class="direction_highlight" id="r_stick_right_direction_highlight" />
      <path d="M36.977 175.052h8.477v25.442h7.871l-12.11 12.11-12.11-12.11h7.872v-25.442Z" style="fill:#ff00bf"
        class="direction_highlight" id="r_stick_down_direction_highlight" />
      <path d="M41.216 170.814v8.477H15.774v7.871l-12.11-12.11 12.11-12.11v7.872h25.442Z" style="fill:#ff00bf"
        class="direction_highlight" id="r_stick_left_direction_highlight" />
      <path d="M45.454 175.052h-8.477V149.61h-7.872l12.11-12.11 12.11 12.11h-7.871v25.442Z" style="fill:#ff00bf"
        class="direction_highlight" id="r_stick_up_direction_highlight" />
      <g id="stick_right">
        <circle id="shadow13" cx="43.16" cy="176.892" r="17.12" style="fill-opacity:.5" />
        <use xlink:href="#4a" x="161" y="142" width="65" height="66" transform="translate(-152)" class="gpad-highlight"
          id="stick_button_right_highlight" />
        <g id="Group-61">
          <circle id="Oval-Copy1" cx="41.3" cy="175.022" r="15.88" style="fill:#fff;stroke:#000;stroke-width:2.49px" />
          <circle id="Oval-Copy-21" cx="41.3" cy="175.022" r="12.14"
            style="fill:#fff;stroke:#000;stroke-width:1.25px" />
          <path
            d="M39.689 175a.318.318 0 0 0 .317-.353l-.282-2.586a.318.318 0 0 0-.317-.284h-2.102a.32.32 0 0 1-.239-.53l3.995-4.543a.317.317 0 0 1 .478 0l3.995 4.543a.32.32 0 0 1-.239.53h-2.102c-.163 0-.3.122-.317.284l-.282 2.586a.318.318 0 0 0 .317.353h3.433a.32.32 0 0 0 .319-.319v-.968a.318.318 0 0 1 .51-.255l3.05 2.287a.32.32 0 0 1 0 .51l-3.05 2.287a.318.318 0 0 1-.51-.255v-.968a.32.32 0 0 0-.319-.319h-3.721a.32.32 0 0 0-.317.284l-.386 3.542a.318.318 0 0 0 .317.353h.029a.318.318 0 0 1 .233.537l-.966 1.034a.318.318 0 0 1-.466 0 972.66 972.66 0 0 1-.966-1.034.318.318 0 0 1 .233-.537h.029a.318.318 0 0 0 .317-.353l-.386-3.542a.32.32 0 0 0-.317-.284h-3.721a.32.32 0 0 0-.319.319v.968a.318.318 0 0 1-.51.255l-3.05-2.287a.32.32 0 0 1 0-.51l3.05-2.287a.318.318 0 0 1 .51.255v.968a.32.32 0 0 0 .319.319h3.433Z" />
        </g>
      </g>
    </g>
    <g id="start_button">
      <path id="start"
        d="M30.051 132.744a8.497 8.497 0 0 1 2.825 6.334 8.495 8.495 0 0 1-2.825 6.333H18.67a8.495 8.495 0 0 1-2.825-6.333 8.497 8.497 0 0 1 2.825-6.334h11.381Z"
        style="fill:#9a9a9a;fill-opacity:.5" />
      <use xlink:href="#4b" x="152" y="117" width="46" height="41" transform="translate(-152)" class="gpad-highlight"
        id="start_button_highlight" />
      <path id="start1"
        d="M28.85 131.196a8.494 8.494 0 0 1 2.826 6.333 8.496 8.496 0 0 1-2.826 6.333H17.47a8.495 8.495 0 0 1-2.825-6.333 8.493 8.493 0 0 1 2.825-6.333h11.38Z"
        style="fill:#fff;stroke:#000;stroke-width:1.35px" />
      <path id="Playstation_Btn_Icon" d="m20.832 134.571 5.982 2.961-5.975 2.955v-5.916h-.007Z"
        style="stroke:#000;stroke-width:1.1px;stroke-linejoin:round" />
    </g>
    <g id="button_1">
      <g id="Group">
        <circle id="shadow" cx="45.85" cy="121.855" r="11.806" style="fill:#00ff04;fill-opacity:.5" />
        <use xlink:href="#4c" x="171" y="95" width="52" height="52" transform="translate(-152)" class="gpad-highlight"
          id="button_1_highlight" />
        <circle id="Oval" cx="44.99" cy="121.007" r="10.945" style="fill:#00ff04;stroke:#000;stroke-width:1.72px" />
      </g>
      <!-- <g id="Playstation_Btn_Icon1">
        <path id="Line" d="m41.345 117.35 7.72 7.731" style="fill:none;stroke:#000;stroke-width:1.72px;stroke-linecap:round;stroke-linejoin:round"/>
        <path id="Line-Copy" d="m41.345 125.081 7.72-7.731" style="fill:none;stroke:#000;stroke-width:1.72px;stroke-linecap:round;stroke-linejoin:round"/>
      </g> -->
    </g>
    <g id="button_2">
      <g id="Group1">
        <circle id="shadow1" cx="66.7" cy="101.005" r="11.806" style="fill:#ff0009;fill-opacity:.5" />
        <use xlink:href="#4d" x="192" y="74" width="52" height="52" transform="translate(-152)" class="gpad-highlight"
          id="button_2_highlight" />
        <circle id="Oval1" cx="65.851" cy="100.145" r="10.945" style="fill:#ff0009;stroke:#000;stroke-width:1.72px" />
      </g>
      <!-- <path d="M60.941 95.78c-.898 0-1.637.739-1.637 1.637v5.456c0 .898.739 1.637 1.637 1.637h5.456c.898 0 1.637-.739 1.637-1.637v-5.456c0-.898-.739-1.637-1.637-1.637h-5.456Zm11.457.546a.548.548 0 0 0-.931-.386l-2.182 2.183a.542.542 0 0 0-.16.385v3.274c0 .145.057.284.16.386l2.182 2.182c.103.102.241.16.386.16a.548.548 0 0 0 .545-.546v-7.638Zm-8.746.911a2.905 2.905 0 0 1 2.898 2.908 2.906 2.906 0 0 1-2.898 2.909 2.905 2.905 0 0 1-2.897-2.909 2.904 2.904 0 0 1 2.897-2.908Zm0 1.212c.933 0 1.69.76 1.69 1.696 0 .936-.757 1.696-1.69 1.696-.932 0-1.689-.76-1.689-1.696 0-.936.757-1.696 1.689-1.696Z"/> -->
    </g>
    <g id="button_3">
      <g id="Group2">
        <circle id="shadow2" cx="25" cy="101.005" r="11.806" style="fill:#48c0fb;fill-opacity:.5" />
        <use xlink:href="#4e" x="151" y="74" width="51" height="52" transform="translate(-152)" class="gpad-highlight"
          id="button_3_highlight" />
        <circle id="Oval3" cx="24.14" cy="100.145" r="10.945" style="fill:#48c0fb;stroke:#000;stroke-width:1.72px" />
      </g>
      <!-- <path d="M17.592 98.69c0-.798.657-1.455 1.455-1.455h.677c.486 0 .941-.243 1.21-.647l.591-.888c.27-.404.725-.647 1.211-.647h2.808c.486 0 .941.243 1.21.647l.591.888c.27.404.725.647 1.211.647h.676c.798 0 1.455.657 1.455 1.455v5.093c0 .798-.657 1.455-1.455 1.455H19.047a1.462 1.462 0 0 1-1.455-1.455V98.69Zm9.821 2.183a3.288 3.288 0 0 1-3.273 3.273 3.289 3.289 0 0 1-3.274-3.273 3.29 3.29 0 0 1 3.274-3.274 3.289 3.289 0 0 1 3.273 3.274Zm-3.273 2.182a2.192 2.192 0 0 0 2.182-2.182 2.193 2.193 0 0 0-2.182-2.183 2.193 2.193 0 0 0-2.183 2.183c0 1.197.985 2.182 2.183 2.182Z"/> -->
    </g>
    <g id="button_4">
      <g id="Group3">
        <circle id="shadow3" cx="45.85" cy="80.155" r="11.806" style="fill:#fff000;fill-opacity:.5" />
        <use xlink:href="#4f" x="173" y="56" width="48" height="47" transform="translate(-152)" class="gpad-highlight"
          id="button_4_highlight" />
        <circle id="Oval4" cx="44.99" cy="79.295" r="10.945" style="fill:#fff000;stroke:#000;stroke-width:1.72px" />
      </g>
      <!-- <path id="Light_Icon" d="M44.99 72.753c.336 0 .613.277.613.613v1.227a.616.616 0 0 1-.613.613.616.616 0 0 1-.614-.613v-1.227c0-.336.277-.613.614-.613Zm0 10.631c.336 0 .613.277.613.613v1.227a.616.616 0 0 1-.613.613.617.617 0 0 1-.614-.613v-1.227c0-.336.277-.613.614-.613Zm0-6.542a2.465 2.465 0 0 0-2.454 2.453 2.465 2.465 0 0 0 2.454 2.453 2.464 2.464 0 0 0 2.453-2.453 2.464 2.464 0 0 0-2.453-2.453Zm4.626-1.305a.616.616 0 0 0 .195-.449.616.616 0 0 0-.613-.613.616.616 0 0 0-.449.195l-.868.867a.615.615 0 0 0-.164.418c0 .336.277.613.613.613a.615.615 0 0 0 .418-.164l.867-.867h.001Zm-7.518 7.517a.612.612 0 0 0-.418-1.062c-.17 0-.333.07-.449.195l-.866.867a.612.612 0 0 0 .866.866l.867-.866Zm9.434-3.759a.617.617 0 0 1-.614.614h-1.226a.616.616 0 0 1-.613-.614c0-.336.276-.613.613-.613h1.226c.337 0 .614.277.614.613Zm-10.631 0a.617.617 0 0 1-.613.614h-1.227a.617.617 0 0 1-.613-.614c0-.336.277-.613.613-.613h1.227c.336 0 .613.277.613.613Zm7.847 4.626a.614.614 0 0 0 .867-.867l-.867-.867a.616.616 0 1 0-.867.867l.867.866v.001Zm-7.517-7.517a.617.617 0 0 0 1.032-.449.612.612 0 0 0-.165-.418l-.867-.867a.611.611 0 0 0-.441-.187.613.613 0 0 0-.426 1.054l.867.867Z" style="fill-rule:nonzero"/> -->
    </g>
    <g id="shoulder_trigger_back_right">
      <g class="direction_highlight" id="shoulder_trigger_back_right_direction_highlight">
        <path d="m12.269 51.254 12.27-16.491H0l12.269 16.491Z" style="fill:#ff00bf" />
        <path d="M25.523 17.167c-2.534 0-13.254.512-13.218 21"
          style="fill:none;stroke:#ff00bf;stroke-width:8.5px;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5" />
      </g>
      <path id="shadow6"
        d="M70.5 39.658H32.67c-1.52 0-2.78-.6-2.78-1.32 0-.1.03-.2.07-.3l10.9-22.92c.71-1.5 3.53-2.57 6.76-2.57h11.8c7.65 0 13.86 2.96 13.86 6.61v19.18c0 .72-1.25 1.32-2.78 1.32Z"
        style="fill-opacity:.5" />
      <use xlink:href="#4g" x="165" y="3" width="76" height="55" transform="translate(-152 -4.306)"
        class="gpad-highlight" id="shoulder_trigger_back_right_highlight" />
      <path id="bg"
        d="M31.21 37.298c-.37 0-.72-.06-.98-.19-.25-.12-.4-.28-.4-.47l10.92-23.07c.28-.58.97-1.1 1.95-1.48.99-.37 2.2-.58 3.46-.58h11.8c3.44 0 6.56.67 8.82 1.75 2.34 1.11 3.66 2.63 3.65 4.2v19.18c0 .19-.15.35-.4.47-.26.13-.62.2-.98.2H31.2l.01-.01Z"
        style="fill:#fff;stroke:#000;stroke-width:2.17px" />
      <path
        d="M60.102 31.312a10.054 10.054 0 0 1-1.374 2.86.681.681 0 0 0 1.122.769c.892-1.302 1.505-2.722 1.785-4.195l1.075 1.05a.68.68 0 1 0 .95-.974l-2.551-2.49-2.489 2.551a.68.68 0 1 0 .973.95l.509-.521Zm-8.281-11.708a1.932 1.932 0 1 1 3.698-.289.862.862 0 0 1 .17.104l2.302 1.795a.876.876 0 0 1-1.077 1.38l-2.301-1.796a.82.82 0 0 1-.143-.139 1.924 1.924 0 0 1-1.489.082l-2.921 2.983a1.183 1.183 0 0 1 .043.125c.011.038.022.076.031.115l.01.043c.019.09.031.183.037.277l.002.022.001.037a.508.508 0 0 1 .001.039v.026l-.001.071v.006l-.002.038a1.91 1.91 0 0 1-.034.263l-.014.066-.025.096-.004.012a1.515 1.515 0 0 1-.045.132l2.921 2.983a1.939 1.939 0 0 1 1.489.082.898.898 0 0 1 .143-.139l2.301-1.796a.875.875 0 0 1 1.077 1.38l-2.302 1.795a.862.862 0 0 1-.17.104 1.933 1.933 0 0 1-1.828 2.326 1.932 1.932 0 0 1-1.87-2.615L48.9 26.229l-.005.002a1.954 1.954 0 0 1-.339.085c-.026.005-.053.008-.079.011l-.014.002c-.035.004-.07.006-.105.008l-.018.001-.012.001-.048.001h-.027l-.074-.001-.013-.001-.015-.001a13.143 13.143 0 0 1-.119-.01l-.013-.001-.063-.009-.021-.003a1.881 1.881 0 0 1-.54-.175l-.011-.005-.02-.011-.011-.005-.01-.006-.01-.005-.046-.026-.018-.01-.007-.005c-.03-.018-.06-.036-.089-.056l-.009-.007a1.622 1.622 0 0 1-.141-.106l-.013-.01-.027-.024a1.461 1.461 0 0 1-.128-.122l-.008-.009-.039-.042-.005-.006-.028-.033-.027-.032-.007-.009-.012-.015-.012-.016-.029-.038-.005-.008-.032-.045-.006-.01a1.934 1.934 0 0 1-.076-.123l-.024-.044a.773.773 0 0 1-.015-.029l-.038-.079-.005-.011-.004-.011-.004-.008-.015-.035-.004-.011-.004-.009c-.011-.028-.022-.056-.031-.085h-1.87v1.434a.625.625 0 0 1-1.25 0v-4.118a.625.625 0 0 1 1.25 0v1.434h1.87a1.351 1.351 0 0 1 .05-.132l.005-.011.019-.043.034-.069.005-.01.006-.01.003-.007.023-.041a1.82 1.82 0 0 1 .095-.151l.006-.01.009-.012.023-.032.009-.012.007-.009a.106.106 0 0 0 .009-.011l.006-.008.009-.012.028-.034.036-.042.001-.001.063-.067.008-.009.008-.008.076-.072.026-.023.009-.007c.041-.035.083-.068.126-.099l.002-.002.047-.033.01-.006a2.03 2.03 0 0 1 .201-.118l.011-.005.021-.01.011-.005a1.924 1.924 0 0 1 .654-.178l.012-.001.058-.004.015-.001.015-.001h.022l.038-.001h.05l.012.001h.025l.012.001.018.001.032.002.012.001.024.002c.045.004.09.009.133.016l.012.002c.113.019.223.048.329.085l2.921-2.983Zm1.089 9.594.036-.034a1.002 1.002 0 1 1-.036.034Zm-4.373-5.75a1.002 1.002 0 0 0-1.269.783l-.003.016c-.006.04-.01.081-.012.122v.013l-.001.026c0 .054.005.107.013.158l.001.007.001.008c.007.037.015.073.026.109l.001.004a1.002 1.002 0 0 0 1.238.675l.007-.001.012-.004.011-.004a.142.142 0 0 0 .022-.007l.013-.005.009-.003a1.001 1.001 0 0 0 .648-.937l-.002-.064a1.002 1.002 0 0 0-.619-.862l-.027-.011-.009-.003-.013-.005-.01-.003-.012-.004-.009-.003-.016-.005Zm11.565-5.943-.509-.522a.681.681 0 0 0-.962-.012.681.681 0 0 0-.011.962l2.489 2.551 2.551-2.49a.68.68 0 0 0-.95-.974l-1.075 1.05c-.28-1.472-.893-2.893-1.785-4.195a.68.68 0 0 0-1.122.769 10.047 10.047 0 0 1 1.374 2.861Zm-7.156 2.147a1.002 1.002 0 1 0-.036-.034l.036.034Z" />
    </g>
    <g id="shoulder_button_front_right">
      <path id="shadow7"
        d="M32.192 43.878h39.986c2.643 0 4.817 2.645 4.817 5.859v7.033c0 1.288-.871 2.347-1.93 2.347h-45.76c-1.059 0-1.93-1.059-1.93-2.347v-7.033c0-3.214 2.175-5.859 4.817-5.859Z"
        style="fill-opacity:.5" />
      <use xlink:href="#4h" x="159" y="30" width="87" height="41" transform="translate(-152)" class="gpad-highlight"
        id="shoulder_button_front_right_highlight" />
      <path id="bg1"
        d="M30.673 44.236h40.011c2.109 0 3.844 2.109 3.844 4.674v7.053c0 .638-.432 1.164-.957 1.164H27.795c-.53 0-.965-.53-.965-1.174V48.91c0-2.565 1.735-4.674 3.843-4.674Z"
        style="fill:#fff;stroke:#000;stroke-width:2.15px" />
      <text x="48.396" y="55.277"
        style="font-family:'ArialRoundedMTBold','Arial Rounded MT Bold',sans-serif;font-size:13px">+</text>
    </g>
    <g id="r_touch_targets" opacity="0">
      <path id="stick_button_right_touch_target"
        d="M34.841 141.791a34.686 34.686 0 0 1 6.374-.588c19.07 0 34.552 15.482 34.552 34.552s-15.482 34.552-34.552 34.552c-19.069 0-34.551-15.482-34.551-34.552 0-10.648 4.827-20.178 12.411-26.518 1.298.465 2.697.718 4.155.718 5.345 0 9.9-3.406 11.611-8.164Z"
        style="fill:#419bf3" />
      <path id="start_button_touch_target"
        d="M35.167 134.497c.26.997.399 2.043.399 3.122 0 6.809-5.528 12.336-12.336 12.336-6.808 0-12.336-5.527-12.336-12.336s5.528-12.337 12.336-12.337c2.48 0 4.789.734 6.723 1.995a16.16 16.16 0 0 0 5.214 7.22Z"
        style="fill:#419bf3" />
      <path id="button_1_touch_target"
        d="M39.627 106.677a16.066 16.066 0 0 1 5.496-.963c1.93 0 3.781.34 5.496.963l9.655 9.656c.623 1.715.963 3.566.963 5.496 0 8.894-7.22 16.114-16.114 16.114-8.894 0-16.115-7.22-16.115-16.114 0-1.93.34-3.781.963-5.496l9.656-9.656Z"
        style="fill:#419bf3" />
      <path id="button_2_touch_target"
        d="M60.481 85.823a16.066 16.066 0 0 1 5.496-.963c8.894 0 16.114 7.221 16.114 16.115 0 8.894-7.22 16.114-16.114 16.114-2.186 0-4.271-.436-6.173-1.226l-8.715-8.715a16.056 16.056 0 0 1-1.227-6.173c0-1.93.34-3.781.963-5.496l9.656-9.656Z"
        style="fill:#419bf3" />
      <path id="button_3_touch_target"
        d="M30.442 115.863a16.056 16.056 0 0 1-6.173 1.226c-8.894 0-16.115-7.22-16.115-16.114 0-8.894 7.221-16.115 16.115-16.115 1.93 0 3.781.34 5.495.963l9.656 9.656c.623 1.715.963 3.566.963 5.496 0 2.186-.436 4.271-1.226 6.173l-8.715 8.715Z"
        style="fill:#419bf3" />
      <path id="button_4_touch_target"
        d="M30.235 86.294a16.056 16.056 0 0 1-1.227-6.173c0-8.894 7.221-16.115 16.115-16.115 8.894 0 16.114 7.221 16.114 16.115 0 2.186-.436 4.271-1.226 6.173l-8.715 8.715a16.056 16.056 0 0 1-6.173 1.226c-2.186 0-4.271-.436-6.173-1.226l-8.715-8.715Z"
        style="fill:#419bf3" />
      <path id="shoulder_trigger_back_right_touch_target"
        d="M76.155 41.187H23.519c-1.52 0-2.586-2.458-1.769-4.167.046-.096 14.212-28.399 14.212-28.399.743-1.517 3.546-2.595 6.744-2.595h22.358c7.656 0 13.863 3.027 13.863 6.762v27.046c0 .742-1.252 1.353-2.772 1.353Z"
        style="fill:#419bf3" />
      <path id="shoulder_button_front_right_touch_target"
        d="M25.477 41.187h48.72c2.613 0 4.73 2.007 4.73 4.483v14.346c0 .983-.854 1.793-1.892 1.793H22.639c-1.038 0-1.892-.81-1.892-1.793V45.67c0-2.476 2.117-4.483 4.73-4.483Z"
        style="fill:#419bf3" />
    </g>
  </g>
  <defs>
    <image id="4a" width="65" height="66"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABCCAYAAAAIY7vrAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAHcElEQVR4nO1c23YbNwyEZEduLm7ykJ/LF+bn8lK7kZVa1vahHO3s7IDk6hK3J+U5OEtJ3iUwBEAQ4Dri/xar1xr4y/BtMvbX1efhtXi5KggqaMe4KRDXBOmiIBihVx19bkNH/+KAXAQEEX5lru67rA10zfrHdglAzgKhInwP6fgqcIv4nrPAOAkEIzw+r+nzmq5r+Y7vQYMQhxgFPdBnvc7AOBWIxSAQADrz64RuzHcOCBZ8iIiXGEHgPpPTjsVgLAJBANAZh7A3QrfUx+98X4ggLPRLROzLVckBgmctAqIbBAOACg9hb4neyGcGg0EA8xCchX8u/T31+fdMM7qB6AJBAGD75tmG0KCNXAEIA8Hjs+qz0M8R8ZdcQaolJwHRBCEBgNVdBb8j2tBVgYA2BDENYVh40A8ifMdg7MNrRROIKggNADDzGxL2t4TwO5sHO0g1BQbgR0TsEsLvAEP9RRcQt50AgHT2N0XIu4h4W+gd9UHQDNaGDASYgQLwFBHbGLXqtnzH/uWZREgjzm4QBAC2fwiCmWfh3xdCH78BKAiAZ9VAgOrvivBb8wznYFnwA/pfhm+rTBusORQtUA2AGrPqvyOBPxC9J2qBgJaBAA3YRsT3iPhTCL89FcBgHrp6pGYx0wQTDXLQwyaA2f8QEfeGMhB4haiBAHN4kme0nKsjjkdmLTMHDYZ4CYQWYPZ/NwSNgKawT+hdHQCCA5F9igKQRZNDxD+TrNowASHRAvYF0AKYwH0R+iORgsArBAdNDLRGi/sYV4ddTE1J74+YCp9Fk3YXOgOBhFczUC14G1NN+BgRn8qVzQGziGXUaYGCcCgg3BUQWHi+n4XngCkLoDi0boKgQDhfAAAgsDMHaIFTY14e0RgEAMFLKmuA/r1GmfuYB1DrGE1i4iCPICR7Aw2KEA+oOYDuYzQF1gKdxWwrzRrR2ms4R+oiSWgEm96kqSb0moJbFnl5ZC3g4Eh9gYIA4QbhgUFgJ6oriQut+f6DA2IdvmWaoCAoIVrUuEB3kS7HoFtx3pNgddHYRMfG+M6RTvIYvAhkmuBAACMcITJBeHWENT/gwNckSbaCaEAFcoEZg40o8tgYBN0sZT6BgdCw2M2+A6C1e4XQDMCbmJoBtHKX8OFWFF2WRxAqGaNsv6DEAOjAtbxiCwB8vinfuQnJ+ADPuk+Z8aA+weULNWGyScghvxQA5gNXTeIwP7yN56vzB6k5OsfoNMFljXiwLGu0VHjlA1d1oK1MVpbO4wDt6BwZBBcnuBSaI/b6TvhzgUC/pqGtnGbqj5w54FozjWzJY/U9VxOUL8ePTpJbgpu81MyhNrAjB8AlmptBHq+XtxSMLFhiBmpUVbMrNF1me6jJWwuEX6K1QDipOHrFpsnTi/DmQHAPcnVATWBkDJzbVBDODdR4q/FV3UDxQG4Q3rfzNrWrUHpmY35cMqVWq6zywiAoACy4Cu8If+cGPBWIGk86vuYQdJJS06iZgwNAa4NaBktrgie0TCuVH02kKBiqpcdnI7ukW2lnBln2xtUFwZwGT2i9y6jaf2tCwA/zxxNTTbiuGZFOAFxNEAyoVpziMJ0GMACuROd4USDS8VkTsH11qqcpLNQGOZFRK4+57HILBD6xUivSMh9cqOUibdVBZuaQaQIXRjmRwQlVBWCIMR/Qyi6pxrhSPQu+jWkZjktxrJkMxKxlKXenCaoB25gmMlxNgQUDENneQjUAaXcUYjiNhrokE9cjoQ0100xBaGkCGPke8wSG7ibVrLKUO5tHNjZXp7ko+0h9BoI1oXle4QjC19XnoSQZFAg1B06quNMnTpieVFfLF0HtHws9UJ9BYHNwWjBrNXOATa6JGZfI0KSFizFq6S4ez/kBqDe04MEQl+mz8vxxjGpBlhiKGAsVXCDVBIbu2bOZdGcTHAjZGQVoAUzgISL+KARtYJ/Q7RRnIJBJgDEwBW2oJSxqqpwVZdkc2PzYGaovAAggNgf2B7VAKQeBmjoq1PIcACyEW1K1JKexBMYZzP18UgWrwGNM/QIDAFNwq0JEdJ5UMdoA5laFOXVqzpZ1SatVp/UZz+YZteM6uipokNSMVGsHt9g3RHlohPfoDAKH1xpPuIMaaO6AhsYGrBEcKGmkuOgYX7qhaZTqtT7Jp9j0GJ/WJ3tPr7FP4NBYo8NWhGhXBG6pJkjcEDHOdsTcZ2THbJ5iWhrrPbjFjpH3K3jmjr7v3TWmrbm17TjVqiUxPdp7F9MKkYscNTjTnSsLzH13GKPbDLpBqADhqlPZ4W72BVmAxfsFPt2uh7tZ7fko7ws9oxuAbhAMELpc6vsNXBJzhzSyiDFLn+k5JKf6s5Xgokf9K0DUymKuNFarEDMImkR1L36o8DZ11tMWV42S13+ystiN6bvKleYRXEq/O6t91dd/0JIXwbL6pfZdiUxTagdz1e8Gue/nvQjGrfJWXFaz1N+5KRAt4nt+/iuB2ha+HOr+NmIumBP2osI7Js5uF3hNOGIa3MyEjviXviactRNeGI9IIrz/zAvjS5oD6DX/fcAv3/4G1s+EbdFAgYoAAAAASUVORK5CYII=" />
    <image id="4b" width="46" height="41"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAApCAYAAABKvBuPAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAD00lEQVRYhdWZzXKjQAyEm8R2kv075eX8hHk533Ydm9gJe8g0NI0EYzuXTJVqKBjgk9BImgH4pq255eZtt7vp/pfmubv23otenIDWnMsAJ+drlakCN+BmoV9q3UIPYFmB2ZcFwI0dN8H56LkRpAqC41n4FFygHfYuONZz2XMd9sP6SFL4ENygVe4WhGP02W7RjwpZhJ+AJ9AEuy/9qhzfyzn27j6Edrj3Imc5zhSYwK8cPIFWyFWRtRyrIu42EAiFdTnJdb2Pik8A+2bWVisTeF1kU2QtfQTPlzr0qcib9ZR3EX6tkdUji0cuQuiHRAi/FnD6Ol+s0G9FjgBauUebzokGZvU5V3HoTYF8EnksPeE3GFtdwRW6LdCqbDQnCN8A6LbdrqHVe/BkUqqLPBTQHwB+lp6i8Gp1YJhoZ4M+YHAxdSudvGrxkdXd4lEUuRfwpwL6S4RKPJYxDk7/JvgRwGsZuwrGqXyU65ykfatxFX5OB/8N4I/BE5xAjVjvhE9rH2RcpBxd6oxpeF20uIdB+q+6CsEJT6tvAksSpsWntTkXgKn/U05ivN6Nt90OL81zNxdVCM44zQgyZ3W6C0Mjwd4xuMlarumX4NfQ0Fplca811M89HDKq0PoE5yTNwNU9VJkDhq+q0FEyG8CTKtBDIhXgCxhlGBIpDk5XYcija7SY5oG5DDyCr035DI1RFvVsqlYDhsjACcjxXjZEwGm1mYHPKXJJxcjWJdfnnhsVaxeDZ/Wy19cqnlR8TM0z04VEBp4V/FpzeLFEF2lkPDDOmicTrQ416WQro77dAWGh7laMqjqGsCOGyKDyGpw7yHiKKhTV5uGaVC2efXqv6hSUEYRWPmOcyjWKnDCk+70ppgoQfrISysAjBTRdK/Qe46qO0C3qMucewF8A/0QBlrhV8A4eQetLaTGGL1qU1xmTGdqAuFZ5LdAO3xYDRT4PAN2krA0UUPA3jOMu3aCT61o80X2a4DnqLrT83sC5Cqq2uEJHFteCX6GPyOtxL2u1HqevE5y+rq4yKWlH4C/Nc7ftdg7PF3pSIQx932uNaOkWrYA84lzt4w7eCKAnFPXba9acLcYhVd0kAl9cLGvc5Av1WrSiUehLV/nRSt/jePWGULagWJloRRfV0AoeZV5d7UQZtAev3RDSQbopE312tXJUQ2dJLZNwJ8vbLXuHDpttv2XwX7t3mMCzX9qpjWpoL5ayAi6sDC/arQ3gOTb7ErNF/4ICfq4fe9X+eAKv92R99NwuOI6qvv74pj8S3maUqHlmBDI596X/gLJ261834LY/b9+y/QdJLrfuY2EtwQAAAABJRU5ErkJggg==" />
    <image id="4c" width="52" height="52"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE3ElEQVRogd2a3XbaMBCEF0ISaJr2Ji+XJ8zL5aZJgAQK7kU0ZjyelQ1JTlt0zh7xI2R9Hmm1WhNxZmXymZ3dN48n9fcwuWs+awwfAkoA9DN9r4PvwXwE8CQgAZkM1FlpBuqTwI4CqoA40zY8WK6dcZujwEYDEYyCTM1r/ox/oyB7qfV1+5uxUINARhU3eNgFveY2XBRkHxE7eu0gR0NVgRJVptGHcMZtuPDAd4ntow+Im1EFS4EMDO42BnsREbOKqVoYEMP8rtiO2uF3g1CzDEiKKoJBXxa7ktpBRQKziYgt1dvSHt/jd1ynxSok6jAMg1yRXZPhs8s4TD9WSGE2EfFGhveAQ9veFHQq9YAEBkCsCkPMiy3o9ZyAAKVAGCwgXiNiXWoY4DbRn4apo8imnMIASEG+kS1KPY+DUgDiKQcgKLEuhhs1i9w7ouzNZ+3A22KmGmAwxa7LwBcRcUP2vdQAA1QGhDsPZZZiLxGxKsZqbaPrCXsqOYVYHZ5urA4gbqVmKNzxDAhTbRUHRVUd3mx5/diIIgNSKHYCmGYA+kEGqGOBoCa8Yg2GbaIwHaAy3TJ1LuOgDoBuC8jPYj8EqDbl4BCwdrQdQNze1HMM981jO+2GphxPt6s4LHxMMwd0E/01xHcdg3uL7r7FMHDtW6rZhQOqp5ICqUpOITgEhoJBIXbdbmPdJjBQBV6Q9yk4BSjJYx10CjV3DTcNKDV4OQzW7UPuO4XBGmPT6KMXOUwjeusnUwhOASrxHsTejTfZ68Tm1Fb70b54TwMQbkRr2HJqCjkgVmoRfYDapopyEe8qsTK82a6ju5c5IA162+LW0FgoNQ53eG0oEB/82AFoXwrCMO7waIH4gm4tcYTtjKcEfpslTbRfvWncpyqjUBbI5Qj0VJod5rLDnb1oHBa0zoIxh0XXZ+vpdDq44pyFmiZHsj7cZ3pkz8wlYHrXGwP0X5UxJ1ZNMbm4SgNG10fWryZGMnPXyGO56EavLs1US2qo8T7hQI7tdzSYU0iB0CkHidvE4JV4n6klSXamT4Q7WfymYJ2iQKySJjQ4JHHGmym7Zr0ob6QM4PIKAEuP4Np/ppDeRb0wTprrqEfW7sDGfXJOgfMKqBkQYKxUT6FpRHuEdYtf1eELr8iWpQakJjvUXD/LpK8MqDPe2nlIFdLodxXdOCs7xA0dHzbU30ux5+jmFlgpBurkFLi4NQTjRYvpwUkNl6bim5BNQz2xAuipAD2X9wqEdJZTKAViKJ5ymzK4dfgwXgd7zBEcWZ7niPhFYDz1VKFhL/cwuWvum0e8xfFWFdKYS4/NrOQxQMsC8WSAXqPuFJqhNBYGyIkKflTCIbwOks8zY4HgCKASphxyc7qGUnUyIDRUlTZxCCC5rbrhMYlGtyaxljjR6BxCdWPNctvuPMTZU5cK1qwp59rGpIJ1K8DaqWVNm7G5bY0YFJ5dO68xbLScp86ePnB0oBurS9bbnJyWv/U4xUUfX/M4RaBq2dQxD7xqoQ8Hpe6hVy0oPfkJngaAteB1Fu93lnMAeoxwm/axjySrJVUo4sweGhsotM8SKPpYP0toZAc8BeiFNx9+rJ+AaZJial7XEifZiVg/G63KSUACxb91aWQH3w5Oamfc5mv+GsPlbP68pOVs/l6WlX/hD4BnV/4AcperLpSp2XYAAAAASUVORK5CYII=" />
    <image id="4d" width="52" height="52"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA0CAYAAADFeBvrAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFUElEQVRogd2a0XbaSBBEC+LY2E68L/k5f2F+zi+7iQO2A+yDp6BUqh4JzO5D5pw+EiCGuaqenp5GwB/WFpfu8HH/dFKf3xff9pf8/Q8DBYBT+hzBfBTwLKAORHXUtg/nfgRwHtxJQAaig15MvNamg1dDOD8ZajaQwKSBL4tzBTsMUga+K84ddDbYJFBQxUEqUzgFUoBkFdwsqC5QAeMD/2S2lKOqxcE4wDaYA86GKoGCiyWQKzm68Rp1O1VmC+B3YT2wLtRVjxbZvRTgc8dUMQfSwb81e5Vz/Zxtxz4e90+LCioqZOq4aynINYCbZtdyVCh+n3dYlXlt9tKM5wRMinWVGgEVMEscVbmWwa+CKRRdkn2qqxFm0yDW7ZyvCaiKTbpf5XLualTGQW4B3DW7bcbPVCUHepNBbwD8Km5CFfL9vQwUopqqQxdTkHsAX9rx3qBuZHBLAeK8IcwaR1VdUQ7ajSqNWlLIg4C6GmEI8gXAVzm/b6AESgop0Brv6lRADqDutgCAx/3TwO0OQBOBwNW5byAPzb42I9CtATEoJKCVwPB3HWZrxx2Ga9uhuUIOlebOHY7KPAD4qxmVIhDnhANtcYxmq3DdAsMFV6OcAlGlQRifcjmq87kB6dxxoAcBSgNVICpEFakOMF503zBcnxTMs5CoUFpEk0KqEk3nEIF0YdXBOrB//mqmUBwfF9tDuwIO88ez6ASkYToFBgJxknMO8i7qwprWKCqii+2m9feCYdTUpWWWQp4VMCNQt6PdYbgeeUDQQXPgHs3oilxsGTBW7VzXKAUatKW9rnI3T3N0YVXTTEFTIE2V1FYn9KVJr2fyC0bpKihUiahD3WCYyymEh2HgXQlPVqnMTWEK4wnvSCEFqnaivQzbVah+WIE0hdlZn1V/qk7aCUegHpRv4vyHFGDkDtY/oaoN4ty+dZyH5nPI4c7dcleFE++711/v5pQK9YD0x/+vNue3utf0gKpyU8p6q3JUKk8hXHNKFSj1NQlUVWY0v6pyrAqy6jcVSXr5WxfOg0J11zy38hyLlhbTuUWS1J/uVuM23JsCpSJgShKZlngtgJ9rblZVfbahT+9Pc7gKaHL74C6hLuDbZq0BpM0c+/GFNeVsGzGvLejNqqD2ve1DUkjv3lpMawEpCdXFEBjmcszZfhVGMC+W+JwaNHe5pBDvjiqj22bfz/D7ugtV1ejCWiB5BvCz2XMzh3KgVDR5B/q++LZvyZ1CqbtRoTWO+dxUVceV88/ZH2H+AfCj2c+ZQJNziM0jkQJpnqUBQBNN3Y1OFUkU6G8BokobHAOE1uYiVC9s6938hOMGyxNFYHznvepT1RQU6EeDolJUaVKhWPUJbscfXwqUJonAsKDBqLVGLpIQ3BXXOaQu94yjy1GdbkAYAElzlX4jJ568lnON6nBz1gNSl6NKhPKg4OpsbYyDVtW2aZrW6zbcy8BeDtYImOaQRrkUugmawvZg/sytbfMiraq4MmmR5OC0PNUr1qdFdS3vazBIOd2oxVTcVPKiif4DoVvytBWvgofOuZdgnvak6Bb/Tun94aUX7+z9lJNRIa8BpBpClcvpH1+alM6CATqbJat1u1Is4mupS498PxVJNP2hUp7JE9i3L0CYN9pKhSyMsx06xVClbYN4Ra4BoPO9yvxfcX6/2ya3vMXzCVpD0GLHVC2gyhf1XD8bheez/wUvoPidFDTSMRUzfIud/vtxT7jcgxcFWJpfwDCDKCszGN75tJ0+SRVtZ1V0Jp758fe8edpfHf/7h5e8TTxa1uvbBzp4/ZFHzC5Wczv1wT9tl34I8I9q/wJ8hc/eTcdQhAAAAABJRU5ErkJggg==" />
    <image id="4e" width="51" height="52"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAA0CAYAAAAnpACSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFSElEQVRogd2a3VIbOxCE28TYQIDc5OV4wrwcNyfhP8CeC9S41duzP4FTpyqqmtLaXmv1aUajmbGBv6htPnOwq+F61Xg/Nt+Hz3z+h2CKya8Zs4P5KNxqmACwKfpq/GGmB/BnYKtgBER7v/b3tOnEh5nXANZBLYKZgKAcFdf+jMHktbjuoJYCzcIYSAI4KsS1xMm9Sl+JQ2MJ1CRMAaIT/hKE7/Nefl818ArgRXqVCmwWqIQJIAliW8gX9BqCTEon/hxEoV5kAThGCbRdCeIAx012cn0s9zmMauJ3kCcDg4NIP2ojzRQgrglOft9kJ/0OvYY4jpqXTv6xyZP0/JxQbnZROx3MhEZUE5z4HsAJgNPWnwQgmhtwMLFnA3kQuTc41dQsUDIz3+zUiGriVOSsiUJRcwnGQe6b8H7VJuS77Df23iQMgVwr1AgBvgI4b/1XA9q3yXHfAAcTew4gt+g1SRh30Z27vhquN6qdd5hmYnNaOZXJXzQY9gqUYAYcTIYwdw2E9yoMFyAdqNEZVGbm3su1cgHgssmFARFmZ5PTzf+IN42oFtW81PNpP4oYVDtb0QrQa8a1ws1+3uQSwLcmBFJT42qrN1MY3kdn4Rrxw9QPVM53bGaYNrEd+r3CyRPmMmhGHYDDPOHNzBQEsuL0eCp6oKoG31sys8rETtBvfALR3AiTTIcTpQN4Qu3t+LnLb/SRxasDLdWMmpkDnYucoTcd3wdcWXUO+pkfpDx/+Nq9HQBsroZr/Nh8H1wzafPrQelA7Hl9hrEncxN6KTSiIHQOqmU9h9x9v2kmuGQ/YxyGQCr64D0OZ1OKzdz0uEe4jzSqoFesQLqWNFPFYx7KEE7js2O5N53k6okUZB9Eg1eP9SLQ2nBmSqoUII09tPtebAzGdT6ujpcy2cM5EyCmkrCUu6gJaAaa8qWp3Cj1R6jNqxvfV64CS4C+UmnVgPEqrkm9Uwoe98sUzP/VNtavalXUDExHrFVFpcvXZZylY84VNapnABhrZu4BPKFTzOSxkz90auwUh6V4LI353rbhg1QG0gzR4ya+3rX7qlKTAmgxI9UCPG1WsDINcDPzVfM0lxGv5+16sKn7raozzzbuUxhXYzICVRoCABy1XCCpX0E00tWY6R7j+EknkTToabPXAXQ8h5kESppx02KooanuHfpwI4XxanL6PqF0LGact+2a6bQukGonOoKpPaPhuINoyOEg/F5KATwOuwNwI3IrokDUqGtG513uGX6Bq6gwt+jjsKqUNFedUZifAH41IdQdenNTU+s006XNBYhv/gfkeClNtCpoaNr8gIMWfgL4R6DU3HzvaLDatS3JWirgDkAfrvGY7wVf8SUFDYX51UAIc4NeM+7RZvcMm5uZBoR+hvg+eETtGBIMN/4NDmammnnAQSvRk8W6mYCwZ+FAgVKy5ftqrgioGuQepKgToNt391yGNKnWnBK0lDpr+sxrVmY829QF8vRY3TOFIHTN0cyW1Jp5g24yr/u6+3atLCmcc6KcuB7A1Mii8yVNEsCoIKjm5emzp9ApfU6OQrXjYYxqQn8BGMGknzRGmik8G9qgujI+sUeMXXc6ND1MUrCq6DerFWAiCSoK6SmF1vzffzXz1Fm9ZIrE9f3kvUYeTNtUcgb03o19ynGqH2qr6kzKYRxgFQgwk57avzGW1ALSWeQpQJUvOcAo/vrQT+cBSienE/aKTFWoc6DUu2AJyGIYA3KoqpJTjZ0m7GbM68//u4m2ALWk11btQ33vv/8jkLaJfzctGXsorj/0N60/hvG29o9z2j77T3R/RfsXSO/jtpPsGBMAAAAASUVORK5CYII=" />
    <image id="4f" width="48" height="47"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAvCAYAAAClgknJAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAE80lEQVRogd1a21bbMBCchJAGSri0/BxfyM/RQkm4E9wHdvBovLKdwEurc/bY2Eaa2V2tdqUA/3ibfEUnF83VTv1cTs6bz469MwEDPalcvTWV685ktiYgwCcjRFuTyJu925rIaAIV4FO57tnfSkIB87qxv5XYaCKjCBj4qcieyEzu+V4JvAnwDYBXud/Ie5IZRWKQQIBXjRP4LGQ/ZC7PZhUCryEvJnyuRBoAzRCJXgIJeAIn4G8mcyFCSwCt5l8BPIc8AXiMK5+RjLpXL4kqAQOvbkKwCwAHIYdxXcS7fbRWIAFqnsAfANzH9UHIPKG1yCCJlID4PF2GWifwQwDfARzZlSRoBSfwHEDvQ9YhdyH3QoTWoEulc2KWEegBfxBAlwCORZZBgpaYx/8ogZcgQM2vAdwmhFWpul6Ms4C4joM/DJBLAKchZwBOQpZBjm6UWYDucwdgBeAPgBuTW7TW4Pz4mBNuhZoFdNLuo3Ubgv8B4GdcSUIJDLnQHVqXc7LUdiciIbFCQSCZuLMAs4gBjwPweQhJnKB1IUajLAox+ih4utpEgNfWiclFc1XMhcwCrn26zzKAngVoEqAFCErDqK4DGkZppf34Tr/J1ogirCrYDwKVmK/uc2QEKKdBLtO+L2S0AsMsSfIdw6wK14cpEivULODuQwscBwlO4pN4ptrnmpHlQhuUKzXfcY3QEEuZBwlaomhOQNMFEqALefj00Kn+7OGQQGlZdy2d3Gu8RyiuKfdCmFaozoEshHLFJQmKrr7qzxl47TvLjzixuSDqJHeXLPpWAppx0g005zkwUeCa+2S1gLZpgNecStMS9q3h2INC0Zk2zeU1ccuSNmah2vkQeA8SrqRaYlirMzoE9HktbXbg2umY+qKWJPoYWX2RAh0qE7MCRifqNuBrRLw48nE6SiLmmgV0AL/3wT/bvI9ss6DanIBnf16A630RzlDJFgfa0DgunXGmQCfPdpCal2h+0qlhR5JwJWV1so/TSeaIOXMh7Vhr2GeUpV+WpwyR0G9UOcyRXpD3v3ECbErAzVirYSlZDav7PDXwrnHNf7R/zYOqlvCVWF1HNc8qisI6doF2BZ5If9nkc+Wwb62PWchojUwCbumUAAdS7XMAzVO0cNG8H8gXNdWcal2Br1HWyKzItDYerInd/zVDVPBMnVX7/L8soVPLUvPa5y3ey8vbkDVaKzAT7a8HLifnzUVzpYNpBcXB/qDcOvF8ni7Vt7FFpdwF2BsA1yhrYlrhEeU862yx1Fwos8BcRCsp/VbT6ixtVtehQq4B/Aq5jmcrlC5UjUJ9BHxA5irMURz8I9q5we+UgGufuxIZAbqQEhieA4kbcdAHdHeg1c0e0e5KaF2c7UowICiBawC/47pC6z4d/x+7reJW0KSO7zOX2JYAJ+8N2km8Qqv9bKEsWt/Wohf3Wh+zvFRheTm0L6Shc2Xi24sFgW23FmmF2vNso8orqdrGli9cCtwjT1X7wPDuNL/JttYXJlrD9u1OkwRFV93aFnv1sGPM+YCTcCIuXmYC5equiaGC1oOO0Sc1Y09olERWCnqI7dvYUiKvIln6PHjMtMsZWXbctJfcZ7mQkvD7nQ76tioJR5xU+s5Blsz5yeTOJ5RbE6gQcUL+jq1Wrn682+Ww+1NFeeW0vq/ftIb+zE8OvmJX4aON/c3EV/xG4r9pfwEs4yD3oK/mAAAAAABJRU5ErkJggg==" />
    <image id="4g" width="76" height="55"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAA3CAYAAACmcqwpAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGiUlEQVR4nO2b3XbaSBCES9ixN7G9e5OXyxPm5XK3scHGMnuByiqVumckgQHnbJ8zRwKEfj6qe3p6hgZHth+7X4289P3G3tfPo9cl2xVe7ypbAMDP5rufo2pzbrBqAku3UfPPltxPBsj3S68BzAN3FGCBqrStgv1VcNzc+4nUE7W3wmcKcBK4g4ElqlIwKwBXsu9tCbQM1luw9VaCCKAM7nrCzU0xPqSCuqo0HuOK83OquRtGatLWyra19xzg+3l/7H41GbSDFGbqUtUQynXXvtg+P6tBy6wES8G8BlvuO8CR2iJoixUWwFJlEcwXADeyvZH3CVDdtaSyTF2qklYa4Wxlu5XXbA2Gqouu926HuqTGH6pKQd0mjeAITdXJ8+o26xE9VikoQnqR7XO35XurbqvGcyJyzUUuKeqiKhQWlfRX175K43sO7QrlDiACFgV2AlM1PUvb2Fbhqbuqiw5c8xCFKbQVhjGKoL517U72Ce4Wscqy3jJySXdHPjAV9YIezlqa/kh+Tv1B/LrzgSWBXhV2iz2QbwDurREclXYjN68qA5YDU1ekmjYAntCr2q+l52RrEMSxpQrzxFTd8Ra9uu4BPAD4u9sSGlWmD7AEmMcvdUl1wycMw4BeJ0pHVhBoGstmATN1Rb0i1fW1A3MP4B/sgSk0qowKm+KSfDhuHZoDozuuMQwBTGN4njZo2mMOlLZEYZG6CIzBXtX1gD00glO3dBc5BJgHfbrkGmNYmRtvu2NaecZlMaygLnVHDfZ36N1RGxXmLnIl565ZNCRiIwAC086FAFo5hsfxGKYbKozFCvOAn7kjgTHYP0ijwgjM49cSYO6aVIt2Ko19TpfddPeysWNXkESWcWwSMKtGRD0jgz3d8U6a95IM+uom7o5A2SX1tbe2O+8r+thIWKo8j21RTjiyOQqrxa5IYWyag2kPWUpaS1bK/N+683LYw89aDDuCaNQRDdMG91MFFtS6VGERLE1YtXmWr+44B5ZbFM90mEVYW8TDsxIsfe5ZaYUqa4q6tPmQKJP/lMprqcCnGTrP9ybXiwoAURGgWJtb4pI+DNJkVVukKt6kFxSnwPLPHB5VoMMdLzN50w4nKmqO7qcIrHPHSF2RO7rC+FpdIBoGzam0qtXAaqytVX2ze1mssFIJx2OXqoywSvWv2sPPMc8VFZz+6BGoST/gKnoTKKqLD671rgiaDrCzLvtYoCKL4mKpZd8bWAosOIHGg6xn9LqXBtnJgfXIVgOVgQstBJYMgzyViIqEWaBfmm9dnJUU5rC8Tu+B3iurHuirPdBnsBGwyiDb3dFL0A7rj1IXkCtsbqIauWMtQf2U0AbAJhQIS+qKhj61Icens0hhcwbZJXf842ABkrhWBtlTgHmSGtXpgcIEw5GstvAkXE8x1TzTj9QVAdOEVV/rWNFr56wkfCQsXsvXTpRgzQIYDY1qAd+hZfUkvRmdUPBrHduiyV2f3MhW8QAVcCVgUQzztRJRT+g33WKoro82vbavo4gWo7gS9TwjuwbC3tFdMiqTRDHKZ2PQ7Z9q/Kj3QGC6HMABOrhIbQNThWUDVS/r+MIRYDzFxQmEVzv21ApjDZ+THZzcdYAltRWn2bIBaZSl88Z0WovnY109KhCewhTYFv3s9xN6eL4QZbQIJbKsHpaN4N3ldLqK0+uv2P+KOmNzSmDa0eiygTWAx65xUYqqLYI2a21FNufnN8EJUk40cH7vXAmrA+MPuMEe1r8AfqNX2zMqy51kmwLzqatIUTr13qIH6DV74HzAdIab02u/u/aIMTTvAIBKDMsu7LCoIKD/BT0fO2dlgg/MXpDxao09pEeMVfaCcQcwySWjX0hnjHVBB2+GytJ041xVidLSAV0rRnCMZcU4li13ihZ38IIEweN0JnnKZOiprBZOdJGdB38CS3tKBcZBcXQxTQ34/gvyucYI1qng6cNmy6AITtuk9CJTmALz3EsDqWf9mrPRzuGS3PoQTZeh6+pqTWJHWf9oUfDP5vtOhkc6WG7lRtxFFdSlwKK5W/KHZgem8LI/PFRdEnaQgvPhhs8mR4nuOYuFWelGqxdRJaMNvjOwwUMlJWodT/qM8SXCopWgedshcEVg/PeZWh6mBT8uIypNgF4CKLcMXFQPK8ICggdM/lEbgfGe8BJh0TxrLxUNU1hA8pAGTY/LAF0yLGAci6Jhz/t+6f+S1QcN4E363oVbCOTD/pGbQPw0tuTP8f/bQvsPPoCzn/bfs3UAAAAASUVORK5CYII=" />
    <image id="4h" width="87" height="41"
      xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFcAAAApCAYAAABA4LXdAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEk0lEQVRoge2bzVLbQBCE24kxhJ+ceDmekJfjCBhwsHKw2ttqzeyakFStUkzV1Aphy9qP9uzMrAC+7J/Z6rMXuBsePn2Nnu1+dTv86Xs/BCYBeeq53i2CODv3EdgnQTCoKxuzcydfvwNzYENjPAlydfIVqOp+rnbdXmDXVKqjO+y4CjmdrICNAH5Ljk+F3JNlUPfJ8Qx4BjicvIF1qDVfImBVIiHq+D6O++D3VcDryodmUL8nnkEG+gTsilVwhJo5X3+81t3wsHLAM7hBnHWo69HP5HiNOWQHDPQDebDjCOqvxFdIAPuHZMp11RLq2egbG+mq5ChE9GSq3AjsbvQ3GVU0NCoert4JXIu1qliC3QA4F7+Qcw44U29Ppqp1sG8AXsU5J3/vgDK/elhArlpC/CF+MY6EraHCw0NvpnAIV8G+iHM+sPfMMgdVbw2uxlmqljCvAFzK6IAj9fZmCkVVq2C3AJ5Qwpy+j6Hkm5yDjAVusJApYIVLqDcArjEHvEFZ4HqGCxT1uWq3o29Q5hGFD03TVmiEhdpCxhh7iQPUGwA/x+NrlDDBRS6C2wtkX8wUripWw4G/bocCOBRQLVtgzGQM9bBwjQNcAqZ6CZc3thTlaqy9QBEIMA0Z6pp6EnKcLYym6vWYywWN6iXgGxyAMzRo3O0VbrSYveIAd4OiWAf/giKe8Nt5NzzgfnU7tMJCFhoI+ApFxQwNmjUsRbksEHjvjLHvKFC3mK4phOv5/FS5QZ+2BpgKvsAUNMelwNVsgXDXKIAYBhRqlGqmc/xIhaalr4Kmn9vPS8oWtEBgGPDqU8FmRdJkngq31WJsNW68iaM30Kvp13iP+Ty8Z6Jzagqn1hXTG+AY/YWyi0+ayp1a1Ah3q805YnO0U+BGN6L9Te8iaV6oyu1NwV6haedL24tpDxcN8bTgttpx2uDQxeAdywgLXv5qs4bdMLrCznYmJhbB9TcoWE2ktf5mSrJHWXV7znFpOkev0OgvKHOmqBxwaArXW2cOVVXKG2BWgPF1ryh5oKYpvZrDZSHB8vcJwPP4s6pZ+wqpejPlcnTFEuwzpnU3b0qrs6XB9SrtGQe4jyiAqWIHvPcLA3O4mpaocrX80wIBKLGKSs6aNj2ahz4V0RYHqI8ogB1uFH+PtgYOO5dSpbUayNqCI/gXzCuzpcAFpnA1/D2jKPgJ0/AQhYaJtRY0hcutDsLay/lom6fHVqObw/X5qoI1NFC5rl4AGLKdCC5qvqDtUJSoC4B2kWo7EEuAG+1I6DpDz5Sr1wNQVy7BKiRVNP+63iWKFrLe4UYblZrjEihhZzF3Yke4jbjrKZp+dTKwvQKNzEOhhwjdfdCQEKVjR6ulYp5e+Kq6w7xZ0/uzCjVrlfY6eml8hJo+tyDq9VxXj9kzYB9B1cr0rPdY6xaFB193oufGUtUC7d4CdzX9gxWutt8QjEuwwY6j8t+hzyozf1YsBJBss9ccwbhUcxXX/Pj66CnHFETjafKsj7l0sMBcxRw93QrjrFoTRrK/1nr/EiFn3a0INoD2o/sfgvC//+fOKfaZ/+75sr9ovwE6VuMXJQtz3QAAAABJRU5ErkJggg==" />
  </defs>
</svg>
`;function EE(i){let e,t,n,s,r,a,o,l,c,h,u,d;return{c(){e=di("div"),t=di("div"),n=fr(),s=di("div"),r=fr(),a=di("div"),o=new Mi(!1),l=fr(),c=di("div"),h=new Mi(!1),this.h()},l(f){e=fi(f,"DIV",{id:!0,class:!0});var g=Wt(e);t=fi(g,"DIV",{id:!0,class:!0}),Wt(t).forEach(ct),n=pr(g),s=fi(g,"DIV",{id:!0,class:!0}),Wt(s).forEach(ct),r=pr(g),a=fi(g,"DIV",{class:!0});var _=Wt(a);o=Ei(_,!1),_.forEach(ct),l=pr(g),c=fi(g,"DIV",{class:!0});var m=Wt(c);h=Ei(m,!1),m.forEach(ct),g.forEach(ct),this.h()},h(){Ft(t,"id","gamepad-joystick-touch-area-left"),Ft(t,"class","gamepad-joystick-touch-area svelte-vynov5"),Ft(s,"id","gamepad-joystick-touch-area-right"),Ft(s,"class","gamepad-joystick-touch-area svelte-vynov5"),o.a=null,Ft(a,"class","gpad-display gpad-display-left"),Qs(a,"hidden",!i[0]),h.a=null,Ft(c,"class","gpad-display gpad-display-right"),Qs(c,"hidden",!i[0]),Ft(e,"id","gamepad-container"),Ft(e,"class","inset-0 opacity-30 absolute pointer-events-none"),Qs(e,"hidden",SE)},m(f,g){Rn(f,e,g),fn(e,t),fn(e,n),fn(e,s),fn(e,r),fn(e,a),o.m(AE,a),fn(e,l),fn(e,c),h.m(ME,c),i[2](e),d=!0},p(f,[g]){(!d||g&1)&&Qs(a,"hidden",!f[0]),(!d||g&1)&&Qs(c,"hidden",!f[0])},i(f){d||(f&&ku(()=>{d&&(u||(u=Ca(e,Ra,{duration:100},!0)),u.run(1))}),d=!0)},o(f){f&&(u||(u=Ca(e,Ra,{duration:100},!1)),u.run(0)),d=!1},d(f){f&&ct(e),i[2](null),f&&u&&u.end()}}}$o.start(Vr.gamepadAxisTriggers.bind(Vr),Vr.gamepadButtonTriggers.bind(Vr));let SE=!1;function bE(i,e,t){let n,{visible:s=!1}=e;zu(()=>{$o.setupOnscreenGamepad(n)}),Gf(()=>{$o.cleanup()});function r(a){Vu[a?"unshift":"push"](()=>{n=a,t(1,n)})}return i.$$set=a=>{"visible"in a&&t(0,s=a.visible)},[s,n,r]}class eS extends Qn{constructor(e){super(),Jn(this,e,bE,EE,Zn,{visible:0})}}export{qE as C,YE as D,jE as F,XE as H,eS as O,Vr as R,QE as U,Tg as V,NE as a,OE as b,qu as c,kE as d,Vi as e,Ra as f,vp as g,yp as h,UE as i,$E as j,KE as k,ZE as l,Or as m,DE as n,FE as o,BE as p,zE as s,Ku as w};
//# sourceMappingURL=OnscreenGamepads.2959d3cb.js.map
