import{s as J,z as j,f as I,g as S,S as B,j as A,i as u,r as G,d as i,a as D,c as M,h as F,D as H}from"../chunks/scheduler.5beaf4c1.js";import{S as K,i as Q,b as _,d as w,m as x,a as b,t as C,e as y}from"../chunks/index.e181668e.js";import"../chunks/singletons.343ce0f9.js";import{C as q}from"../chunks/twgl-full.module.8bf6e9cb.js";import{C as U,Y as W}from"../chunks/YawRollViz.39099c01.js";import{x as X,z as Z,A as tt,B as et}from"../chunks/popup.a2f4f6e5.js";import{A as at,T as rt}from"../chunks/Topbar.3e434270.js";import"../chunks/RadioSelectGrid.ca3d5dc0.js";function nt(l){let t,r=`<source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
    Your browser does not support the video tag.`;return{c(){t=I("video"),t.innerHTML=r,this.h()},l(e){t=S(e,"VIDEO",{class:!0,"data-svelte-h":!0}),B(t)!=="svelte-qy86p1"&&(t.innerHTML=r),this.h()},h(){A(t,"class","w-full"),t.muted=!0,t.loop=!0,t.controls=!0,t.playsInline=!0},m(e,n){u(e,t,n)},p:G,d(e){e&&i(t)}}}function st(l){let t,r;return t=new rt({}),{c(){_(t.$$.fragment)},l(e){w(t.$$.fragment,e)},m(e,n){x(t,e,n),r=!0},i(e){r||(b(t.$$.fragment,e),r=!0)},o(e){C(t.$$.fragment,e),r=!1},d(e){y(t,e)}}}function lt(l){let t,r="Navigation",e,n,o,f,m,V,R,$,z,h,N="Rov",E,c,d,Y,g,k,v,T;return f=new U({props:{class:"mx-auto relative"}}),V=new W({props:{class:"m-2 mb-0 w-40 mx-auto relative"}}),$=new q({props:{value:l[0],min:0,max:50,unit:"M",name:"Depth"}}),d=new q({props:{value:l[1],min:11,max:17.6,unit:"Volts",name:"Batt Volts"}}),g=new q({props:{value:l[2],min:0,max:60,unit:"Amps",name:"Batt Amps"}}),v=new q({props:{value:l[3],min:20,max:600,unit:"ms",name:"Net Latency"}}),{c(){t=I("h3"),t.textContent=r,e=D(),n=I("div"),o=I("div"),_(f.$$.fragment),m=D(),_(V.$$.fragment),R=D(),_($.$$.fragment),z=D(),h=I("h3"),h.textContent=N,E=D(),c=I("div"),_(d.$$.fragment),Y=D(),_(g.$$.fragment),k=D(),_(v.$$.fragment),this.h()},l(a){t=S(a,"H3",{class:!0,"data-svelte-h":!0}),B(t)!=="svelte-1juqvh0"&&(t.textContent=r),e=M(a),n=S(a,"DIV",{class:!0});var s=F(n);o=S(s,"DIV",{});var L=F(o);w(f.$$.fragment,L),m=M(L),w(V.$$.fragment,L),L.forEach(i),R=M(s),w($.$$.fragment,s),s.forEach(i),z=M(a),h=S(a,"H3",{class:!0,"data-svelte-h":!0}),B(h)!=="svelte-1ujpgtn"&&(h.textContent=N),E=M(a),c=S(a,"DIV",{class:!0});var p=F(c);w(d.$$.fragment,p),Y=M(p),w(g.$$.fragment,p),k=M(p),w(v.$$.fragment,p),p.forEach(i),this.h()},h(){A(t,"class","h3"),A(n,"class","flex flex-row flex-wrap gap-2 w-full"),A(h,"class","h3 mt-8 mb-2"),A(c,"class","flex flex-row lex-wrap gap-2 w-full")},m(a,s){u(a,t,s),u(a,e,s),u(a,n,s),H(n,o),x(f,o,null),H(o,m),x(V,o,null),H(n,R),x($,n,null),u(a,z,s),u(a,h,s),u(a,E,s),u(a,c,s),x(d,c,null),H(c,Y),x(g,c,null),H(c,k),x(v,c,null),T=!0},p(a,s){const L={};s&1&&(L.value=a[0]),$.$set(L);const p={};s&2&&(p.value=a[1]),d.$set(p);const O={};s&4&&(O.value=a[2]),g.$set(O);const P={};s&8&&(P.value=a[3]),v.$set(P)},i(a){T||(b(f.$$.fragment,a),b(V.$$.fragment,a),b($.$$.fragment,a),b(d.$$.fragment,a),b(g.$$.fragment,a),b(v.$$.fragment,a),T=!0)},o(a){C(f.$$.fragment,a),C(V.$$.fragment,a),C($.$$.fragment,a),C(d.$$.fragment,a),C(g.$$.fragment,a),C(v.$$.fragment,a),T=!1},d(a){a&&(i(t),i(e),i(n),i(z),i(h),i(E),i(c)),y(f),y(V),y($),y(d),y(g),y(v)}}}function ot(l){let t,r="Pretend this is video from ROV...";return{c(){t=I("h4"),t.textContent=r,this.h()},l(e){t=S(e,"H4",{class:!0,"data-svelte-h":!0}),B(t)!=="svelte-1n0o17w"&&(t.textContent=r),this.h()},h(){A(t,"class","h4 p-6")},m(e,n){u(e,t,n)},p:G,d(e){e&&i(t)}}}function it(l){let t,r;return t=new at({props:{slotSidebarLeft:"p-10",$$slots:{pageFooter:[ot],sidebarLeft:[lt],header:[st],default:[nt]},$$scope:{ctx:l}}}),{c(){_(t.$$.fragment)},l(e){w(t.$$.fragment,e)},m(e,n){x(t,e,n),r=!0},p(e,[n]){const o={};n&31&&(o.$$scope={dirty:n,ctx:e}),t.$set(o)},i(e){r||(b(t.$$.fragment,e),r=!0)},o(e){C(t.$$.fragment,e),r=!1},d(e){y(t,e)}}}function mt(l,t,r){let e,n,o,f;return j(l,X,m=>r(0,e=m)),j(l,Z,m=>r(1,n=m)),j(l,tt,m=>r(2,o=m)),j(l,et,m=>r(3,f=m)),[e,n,o,f]}class vt extends K{constructor(t){super(),Q(this,t,mt,it,J,{})}}export{vt as component};
//# sourceMappingURL=4.fe0f7b9a.js.map
