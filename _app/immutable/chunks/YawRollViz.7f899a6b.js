import{s as L,f as m,a as D,g as u,h as g,d as h,c as H,j as d,k as v,M as S,i as R,D as y,r as w,z as b,B as _,C as x,o as V,p as j}from"./scheduler.b49bd52b.js";import{S as I,i as z}from"./index.eaa2bd3e.js";import{A,B,C as F}from"./vehicleStats.c70bc62b.js";import{g as W,c as q,a as G,s as O,b as U,d as Y}from"./twgl-full.module.6a7470e1.js";import{a as k}from"./popup.51566690.js";function M(a){let n,e,o,t,s;return{c(){n=m("div"),e=m("div"),o=D(),t=m("div"),this.h()},l(l){n=u(l,"DIV",{class:!0,style:!0});var r=g(n);e=u(r,"DIV",{class:!0}),g(e).forEach(h),o=H(r),t=u(r,"DIV",{class:!0,id:!0}),g(t).forEach(h),r.forEach(h),this.h()},h(){d(e,"class","line svelte-1l5shjg"),d(t,"class","bg svelte-1l5shjg"),d(t,"id","compassDiscImg"),v(t,"transform",`translateX(${a[0]}px)`),d(n,"class",s=S("compass left-1/2 -translate-x-1/2 overflow-hidden bg-surface-900 rounded-full box-content border-slate-700 border-2 "+a[1].class||"")+" svelte-1l5shjg"),v(n,"height","34px"),v(n,"min-width","200px")},m(l,r){R(l,n,r),y(n,e),y(n,o),y(n,t)},p(l,[r]){r&1&&v(t,"transform",`translateX(${l[0]}px)`),r&2&&s!==(s=S("compass left-1/2 -translate-x-1/2 overflow-hidden bg-surface-900 rounded-full box-content border-slate-700 border-2 "+l[1].class||"")+" svelte-1l5shjg")&&d(n,"class",s)},i:w,o:w,d(l){l&&h(n)}}}function X(a,n,e){let o;return b(a,A,t=>e(0,o=t)),a.$$set=t=>{e(1,n=_(_({},n),x(t)))},n=x(n),[o,n]}class en extends I{constructor(n){super(),z(this,n,X,M,L,{})}}const N=`precision mediump float;

uniform vec2 resolution;
uniform float yaw;
uniform float roll;
uniform float pitch;

const float pi = 3.1415927;
const float deg = pi / 180.0;

// Uncomment to see the lat-long grid for context
#define SHOW_LARGE_GRID
#define SHOW_SPHERE
#define SHOW_SPHERE_GRID

mat3 rotationAll(float yaw, float pitch, float roll) {
        /// yaw
    return mat3(

    cos(yaw), 0, -sin(yaw),
       0,     1,    0,
    sin(yaw), 0, cos(yaw))
/// pitch
     * mat3(
    1,     0,          0,
    0, cos(pitch), sin(pitch),
    0, -sin(pitch), cos(pitch))

 /// roll
     * mat3(
    cos(roll), sin(roll),  0,
    -sin(roll), cos(roll), 0,
    0,            0,       1);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float scale = 1.0 / resolution.x; // min(resolution.x, resolution.y);
    vec4 color = vec4(0.0, 0.0, 0.0, 0.0);

	const float verticalFieldOfView = 50.0 * deg;
	const float insetSphereRadius = 0.5;


    // Inset sphere
    vec2 spherePoint = (uv - insetSphereRadius) / insetSphereRadius; //(uv - insetSphereRadius) / insetSphereRadius;
    if (length(spherePoint) <= 1.0) {
        vec3 c = vec3(0);
        vec2 s = clamp(spherePoint, vec2(-1.0), vec2(1.0));

        // Show convex sphere grid lines
        // vec3 dir = rotationAll(yaw, pitch,roll) * vec3(s.xy, sqrt(max(0.0, 1.0 - dot(s.xy, s.xy))));
        //             float latLongLine = (1.0 - pow(smoothstep(0.0, 0.09, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));
        //             c += latLongLine * vec3(-dir.y, dir.y, 1);

        // show concave sphere grid lines:
        vec3 dir = rotationAll(yaw, pitch,roll) * normalize(vec3(s.xy, 1.0));
        // vec3 dir = rotationAll(yaw, pitch,roll) * vec3(s.xy, sqrt(max(0.0, 1.0 - dot(s.xy, s.xy))));
        // float latLongLine = (1.0 - pow(smoothstep(0.0, 0.09, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));
        // float latLongLine = (1.0 - pow(smoothstep(0.0, 0.04, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));


        float latLine = (1.0 - pow(smoothstep(0.0, 0.4,abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5) * 2.0), 1.0));

        float longLine = (1.0 - pow(smoothstep(0.0, 0.4, abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5) * 2.0), 10.0));


        c += (max(latLine,longLine) * 0.8) * vec3(dir.y / 2.0,  dir.y / 2.0 + 0.5, dir.y / 2.0 + 1.0) *(dir.y / 2.0 + 0.7);
                // c += latLine * vec3(1.0 - abs(dir.y),  dir.y - 0.5, -dir.y + 0.5) *(dir.y / 2.0 + 0.5);
                // c += longLine *  vec3(dir.y / 2.0 + 0.5,  dir.y / 2.0 + 0.5, dir.y / 2.0 + 0.5) / 2.0;

        // Fade the inset sphere to antialias its border transition
        float fade = clamp((1.0 - length(spherePoint)) * 2.0, 0.0, 1.0);
        color.rgb = mix(vec3(0), c, fade);
        float fade2 = clamp((1.0 - length(spherePoint)) * 5.0, 0.0, 0.4);
        color.a = fade2;
    }

  gl_FragColor = color;
}
`;function J(a){let n,e,o;return{c(){n=m("div"),e=m("canvas"),this.h()},l(t){n=u(t,"DIV",{class:!0});var s=g(n);e=u(s,"CANVAS",{id:!0,width:!0,height:!0,class:!0}),g(e).forEach(h),s.forEach(h),this.h()},h(){d(e,"id","AHRS-display"),d(e,"width","100"),d(e,"height","100"),d(e,"class","w-full aspect-square"),d(n,"class",o="border-2 shadow-md rounded-md p-2 "+a[2].bg+" "+a[2].border+" "+a[1])},m(t,s){R(t,n,s),y(n,e),a[9](e)},p(t,[s]){s&2&&o!==(o="border-2 shadow-md rounded-md p-2 "+t[2].bg+" "+t[2].border+" "+t[1])&&d(n,"class",o)},i:w,o:w,d(t){t&&h(n),a[9](null)}}}function K(a,n,e){let o,t,s,l;b(a,B,c=>e(6,t=c)),b(a,F,c=>e(7,s=c)),b(a,A,c=>e(8,l=c));let r;const P=W(),C=`
attribute vec4 position;
void main() {
  gl_Position = position;
}
`;let i,f,p;V(()=>{if(e(3,i=r.getContext("webgl")),!i){k("Unable to initialize WebGL. Your browser or machine may not support it.");return}e(4,f=q(i,[C,N])),e(5,p=G(i,{position:[-1,-1,0,1,-1,0,-1,1,0,-1,1,0,1,-1,0,1,1,0]}))});function E(c){j[c?"unshift":"push"](()=>{r=c,e(0,r)})}return a.$$set=c=>{e(11,n=_(_({},n),x(c)))},a.$$.update=()=>{if(e(1,o=`${n.class??""}`),a.$$.dirty&504&&f&&i){i.viewport(0,0,i.canvas.width,i.canvas.height);const c={yaw:l*(3.14/180)*-1,pitch:s*(3.14/180)*-1,roll:t*(3.14/180),resolution:[i.canvas.width,i.canvas.height]};i.useProgram(f.program),O(i,f,p),U(f,c),Y(i,p)}},n=x(n),[r,o,P,i,f,p,t,s,l,E]}class tn extends I{constructor(n){super(),z(this,n,K,J,L,{})}}export{en as C,tn as Y};
//# sourceMappingURL=YawRollViz.7f899a6b.js.map
