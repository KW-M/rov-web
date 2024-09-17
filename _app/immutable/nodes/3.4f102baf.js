import{s as ut,z as U,f as N,a as f,g as z,S as tt,c as p,h as et,d as $,j as G,i as T,D as E}from"../chunks/scheduler.a4cb253e.js";import{S as ft,i as pt,b as g,d as _,m as h,a as d,t as v,e as w}from"../chunks/index.7ad2f2d7.js";import"../chunks/singletons.35813938.js";import{C as L}from"../chunks/twgl-full.module.e1e470b1.js";import{A as gt,B as _t,E as ht,G as dt,I as vt,J as wt,K as Ct,L as bt,M as xt,N as Pt,O as Ut}from"../chunks/frontendConnManager.db537e76.js";import"../chunks/RadioSelectGrid.cb65adbb.js";import{A as Tt,T as Lt}from"../chunks/Topbar.21d62b7c.js";function Mt(r){let a,m="Science",e,i,o,q,C,H,b,J="Rov",j,l,x,s,M,W,S,F,V,K,A,at="System",O,c,D,Q,k,X,I,Y,y,Z,B,R;return o=new L({props:{value:r[0],min:6,max:27,unit:"*C",name:"Water Temp"}}),C=new L({props:{value:r[1],min:0,max:50,unit:"M",name:"Depth"}}),x=new L({props:{value:r[2],min:0,max:100,unit:"%",name:"Battery"}}),M=new L({props:{value:r[3],min:11,max:17.6,unit:"Volts",name:"Batt Volts"}}),S=new L({props:{value:r[4],min:0,max:60,unit:"Amps",name:"Batt Amps"}}),V=new L({props:{value:r[5],min:20,max:600,unit:"ms",name:"Net Latency"}}),D=new L({props:{value:r[6],min:0,max:100,unit:"%",name:"Memory Usage"}}),k=new L({props:{value:r[7],min:0,max:100,unit:"%",name:"Disk Usage"}}),I=new L({props:{value:r[8],min:20,max:120,unit:"*C",name:"CPU Temp"}}),y=new L({props:{value:r[9],min:0,max:100,unit:"%",name:"CPU Usage"}}),B=new L({props:{value:r[10],min:0,max:120,unit:"%",name:"Autopilot Load"}}),{c(){a=N("h3"),a.textContent=m,e=f(),i=N("div"),g(o.$$.fragment),q=f(),g(C.$$.fragment),H=f(),b=N("h3"),b.textContent=J,j=f(),l=N("div"),g(x.$$.fragment),s=f(),g(M.$$.fragment),W=f(),g(S.$$.fragment),F=f(),g(V.$$.fragment),K=f(),A=N("h3"),A.textContent=at,O=f(),c=N("div"),g(D.$$.fragment),Q=f(),g(k.$$.fragment),X=f(),g(I.$$.fragment),Y=f(),g(y.$$.fragment),Z=f(),g(B.$$.fragment),this.h()},l(t){a=z(t,"H3",{class:!0,"data-svelte-h":!0}),tt(a)!=="svelte-9q3ddm"&&(a.textContent=m),e=p(t),i=z(t,"DIV",{class:!0});var n=et(i);_(o.$$.fragment,n),q=p(n),_(C.$$.fragment,n),n.forEach($),H=p(t),b=z(t,"H3",{class:!0,"data-svelte-h":!0}),tt(b)!=="svelte-1ujpgtn"&&(b.textContent=J),j=p(t),l=z(t,"DIV",{class:!0});var P=et(l);_(x.$$.fragment,P),s=p(P),_(M.$$.fragment,P),W=p(P),_(S.$$.fragment,P),F=p(P),_(V.$$.fragment,P),P.forEach($),K=p(t),A=z(t,"H3",{class:!0,"data-svelte-h":!0}),tt(A)!=="svelte-143fs0d"&&(A.textContent=at),O=p(t),c=z(t,"DIV",{class:!0});var u=et(c);_(D.$$.fragment,u),Q=p(u),_(k.$$.fragment,u),X=p(u),_(I.$$.fragment,u),Y=p(u),_(y.$$.fragment,u),Z=p(u),_(B.$$.fragment,u),u.forEach($),this.h()},h(){G(a,"class","h3"),G(i,"class","flex flex-row flex-wrap gap-2 w-full"),G(b,"class","h3 mt-8 mb-2"),G(l,"class","flex flex-row lex-wrap gap-2 w-full"),G(A,"class","h3 mt-8 mb-2"),G(c,"class","flex flex-row flex-wrap gap-2 w-full")},m(t,n){T(t,a,n),T(t,e,n),T(t,i,n),h(o,i,null),E(i,q),h(C,i,null),T(t,H,n),T(t,b,n),T(t,j,n),T(t,l,n),h(x,l,null),E(l,s),h(M,l,null),E(l,W),h(S,l,null),E(l,F),h(V,l,null),T(t,K,n),T(t,A,n),T(t,O,n),T(t,c,n),h(D,c,null),E(c,Q),h(k,c,null),E(c,X),h(I,c,null),E(c,Y),h(y,c,null),E(c,Z),h(B,c,null),R=!0},p(t,n){const P={};n&1&&(P.value=t[0]),o.$set(P);const u={};n&2&&(u.value=t[1]),C.$set(u);const nt={};n&4&&(nt.value=t[2]),x.$set(nt);const rt={};n&8&&(rt.value=t[3]),M.$set(rt);const st={};n&16&&(st.value=t[4]),S.$set(st);const mt={};n&32&&(mt.value=t[5]),V.$set(mt);const it={};n&64&&(it.value=t[6]),D.$set(it);const lt={};n&128&&(lt.value=t[7]),k.$set(lt);const ct={};n&256&&(ct.value=t[8]),I.$set(ct);const ot={};n&512&&(ot.value=t[9]),y.$set(ot);const $t={};n&1024&&($t.value=t[10]),B.$set($t)},i(t){R||(d(o.$$.fragment,t),d(C.$$.fragment,t),d(x.$$.fragment,t),d(M.$$.fragment,t),d(S.$$.fragment,t),d(V.$$.fragment,t),d(D.$$.fragment,t),d(k.$$.fragment,t),d(I.$$.fragment,t),d(y.$$.fragment,t),d(B.$$.fragment,t),R=!0)},o(t){v(o.$$.fragment,t),v(C.$$.fragment,t),v(x.$$.fragment,t),v(M.$$.fragment,t),v(S.$$.fragment,t),v(V.$$.fragment,t),v(D.$$.fragment,t),v(k.$$.fragment,t),v(I.$$.fragment,t),v(y.$$.fragment,t),v(B.$$.fragment,t),R=!1},d(t){t&&($(a),$(e),$(i),$(H),$(b),$(j),$(l),$(K),$(A),$(O),$(c)),w(o),w(C),w(x),w(M),w(S),w(V),w(D),w(k),w(I),w(y),w(B)}}}function St(r){let a,m;return a=new Lt({}),{c(){g(a.$$.fragment)},l(e){_(a.$$.fragment,e)},m(e,i){h(a,e,i),m=!0},i(e){m||(d(a.$$.fragment,e),m=!0)},o(e){v(a.$$.fragment,e),m=!1},d(e){w(a,e)}}}function Vt(r){let a,m;return a=new Tt({props:{slotPageContent:"mx-20",$$slots:{header:[St],default:[Mt]},$$scope:{ctx:r}}}),{c(){g(a.$$.fragment)},l(e){_(a.$$.fragment,e)},m(e,i){h(a,e,i),m=!0},p(e,[i]){const o={};i&4095&&(o.$$scope={dirty:i,ctx:e}),a.$set(o)},i(e){m||(d(a.$$.fragment,e),m=!0)},o(e){v(a.$$.fragment,e),m=!1},d(e){w(a,e)}}}function At(r,a,m){let e,i,o,q,C,H,b,J,j,l,x;return U(r,gt,s=>m(0,e=s)),U(r,_t,s=>m(1,i=s)),U(r,ht,s=>m(2,o=s)),U(r,dt,s=>m(3,q=s)),U(r,vt,s=>m(4,C=s)),U(r,wt,s=>m(5,H=s)),U(r,Ct,s=>m(6,b=s)),U(r,bt,s=>m(7,J=s)),U(r,xt,s=>m(8,j=s)),U(r,Pt,s=>m(9,l=s)),U(r,Ut,s=>m(10,x=s)),[e,i,o,q,C,H,b,J,j,l,x]}class jt extends ft{constructor(a){super(),pt(this,a,At,Vt,ut,{})}}export{jt as component};
//# sourceMappingURL=3.4f102baf.js.map
