import{s as K,p as Y,f as v,a as y,l as Q,g as b,h as I,S as G,c as C,m as X,d as A,j as o,i as Z,D as s,x as P,U as ee,y as te}from"../chunks/scheduler.a4cb253e.js";import{S as ae,i as ne,p as se,b as R,d as q,m as U,a as z,t as B,e as W}from"../chunks/index.7ad2f2d7.js";import{L as le,F as oe,N as ie,V as re,D as ce}from"../chunks/Video_camera_front.919712d1.js";import{R as de,m as ue,q as fe}from"../chunks/RadioSelectGrid.b643cc0d.js";function pe(i){let e,r,x='<h1 class="h1">Welcome to ROV-Web!</h1>',_,l,d,E="Pick your role",L,t,T,$,c,k,u,D,f,F='<p>Funding From:</p> <p><code class="code m-1">AGENCY A</code><code class="code m-1">AGENCY B</code></p>',N,p,m,V,h,w,M,H;function J(a){i[3](a)}let O={variant:"-surface",options:[{value:"pilot",label:"Pilot",icon:oe},{value:"navigator",label:"Navigator",icon:ie},{value:"video-capture",label:"Video Capture",icon:re},{value:"data-monitor",label:"Data Monitor",icon:ce}]};return i[0]!==void 0&&(O.value=i[0]),t=new de({props:O}),Y.push(()=>se(t,"value",J)),m=new le({props:{class:"text-2xl pointer-events-none"}}),{c(){e=v("div"),r=v("div"),r.innerHTML=x,_=y(),l=v("div"),d=v("h4"),d.textContent=E,L=y(),R(t.$$.fragment),$=y(),c=v("a"),k=Q("GO"),D=y(),f=v("div"),f.innerHTML=F,N=y(),p=v("button"),R(m.$$.fragment),V=y(),h=v("input"),this.h()},l(a){e=b(a,"DIV",{class:!0});var n=I(e);r=b(n,"DIV",{class:!0,"data-svelte-h":!0}),G(r)!=="svelte-u2hscd"&&(r.innerHTML=x),_=C(n),l=b(n,"DIV",{class:!0});var g=I(l);d=b(g,"H4",{class:!0,"data-svelte-h":!0}),G(d)!=="svelte-1wae4zq"&&(d.textContent=E),L=C(g),q(t.$$.fragment,g),$=C(g),c=b(g,"A",{class:!0,href:!0});var S=I(c);k=X(S,"GO"),S.forEach(A),g.forEach(A),D=C(n),f=b(n,"DIV",{class:!0,"data-svelte-h":!0}),G(f)!=="svelte-wzxy6i"&&(f.innerHTML=F),N=C(n),p=b(n,"BUTTON",{class:!0});var j=I(p);q(m.$$.fragment,j),j.forEach(A),V=C(n),h=b(n,"INPUT",{type:!0,class:!0,accept:!0}),n.forEach(A),this.h()},h(){o(r,"class","flex-1 my-8 flex flex-col justify-center items-center"),o(d,"class","h4 mb-3"),o(c,"class","btn variant-filled mt-12 btn-lg"),o(c,"href",u="./"+i[0]),o(l,"class","flex-1 flex-grow-[2] flex flex-col items-center"),o(f,"class","py-10 space-y-3"),o(p,"class","btn btn-icon absolute bottom-2 left-2 opacity-50"),o(h,"type","file"),o(h,"class","hidden"),o(h,"accept",".json"),o(e,"class","container h-full mx-auto max-w-full text-center px-10 flex flex-col justify-around items-center")},m(a,n){Z(a,e,n),s(e,r),s(e,_),s(e,l),s(l,d),s(l,L),U(t,l,null),s(l,$),s(l,c),s(c,k),s(e,D),s(e,f),s(e,N),s(e,p),U(m,p,null),s(e,V),s(e,h),i[5](h),w=!0,M||(H=[P(p,"click",i[4]),P(h,"change",i[2])],M=!0)},p(a,[n]){const g={};!T&&n&1&&(T=!0,g.value=a[0],ee(()=>T=!1)),t.$set(g),(!w||n&1&&u!==(u="./"+a[0]))&&o(c,"href",u)},i(a){w||(z(t.$$.fragment,a),z(m.$$.fragment,a),w=!0)},o(a){B(t.$$.fragment,a),B(m.$$.fragment,a),w=!1},d(a){a&&A(e),W(t),W(m),i[5](null),M=!1,te(H)}}}function me(i,e,r){let x="pilot",_;const l=t=>{console.log(t.target.files);const T=t.target.files[0],$=new FileReader;$.onload=c=>{const k=c.target.result,u=JSON.parse(k);if(u&&u instanceof Array&&u.length>0){for(const D of u){const{level:f,args:F,timestamp:N,origin:p,kind:m,trace:V}=D;ue.addLog(f,F,V,m,p,N)}fe()}},$.readAsText(T)};function d(t){x=t,r(0,x)}const E=()=>_.click();function L(t){Y[t?"unshift":"push"](()=>{_=t,r(1,_)})}return[x,_,l,d,E,L]}class be extends ae{constructor(e){super(),ne(this,e,me,pe,K,{})}}export{be as component};
//# sourceMappingURL=2.f26c7970.js.map