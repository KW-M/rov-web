// Star map shader...procedural space background

// Uncomment to see the lat-long grid for context
#define SHOW_LARGE_GRID
#define SHOW_SPHERE
#define SHOW_SPHERE_GRID

const float pi = 3.1415927;
const float deg = pi / 180.0;

// See derivation of noise functions by Morgan McGuire at https://www.shadertoy.com/view/4dS3Wd
// const int NUM_OCTAVES = 4;
// float hash(float n) { return fract(sin(n) * 1e4); }
// float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }
// // 1 octave value noise
// float noise(float x) { float i = floor(x); float f = fract(x); float u = f * f * (3.0 - 2.0 * f); return mix(hash(i), hash(i + 1.0), u); }
// float noise(vec2 x) { vec2 i = floor(x); vec2 f = fract(x);	float a = hash(i); float b = hash(i + vec2(1.0, 0.0)); float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0)); vec2 u = f * f * (3.0 - 2.0 * f); return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y; }
// float noise(vec3 x) { const vec3 step = vec3(110, 241, 171); vec3 i = floor(x); vec3 f = fract(x); float n = dot(i, step); vec3 u = f * f * (3.0 - 2.0 * f); return mix(mix(mix( hash(n + dot(step, vec3(0, 0, 0))), hash(n + dot(step, vec3(1, 0, 0))), u.x), mix( hash(n + dot(step, vec3(0, 1, 0))), hash(n + dot(step, vec3(1, 1, 0))), u.x), u.y), mix(mix( hash(n + dot(step, vec3(0, 0, 1))), hash(n + dot(step, vec3(1, 0, 1))), u.x), mix( hash(n + dot(step, vec3(0, 1, 1))), hash(n + dot(step, vec3(1, 1, 1))), u.x), u.y), u.z); }
// // Multi-octave value noise
// float NOISE(float x) { float v = 0.0; float a = 0.5; float shift = float(100); for (int i = 0; i < NUM_OCTAVES; ++i) { v += a * noise(x); x = x * 2.0 + shift; a *= 0.5; } return v; }
// float NOISE(vec2 x) { float v = 0.0; float a = 0.5; vec2 shift = vec2(100); mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50)); for (int i = 0; i < NUM_OCTAVES; ++i) { v += a * noise(x); x = rot * x * 2.0 + shift; a *= 0.5; } return v; }
// // Fast hash2 from https://www.shadertoy.com/view/lsfGWH
// float hash2(vec2 co) { return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453); }
// float maxComponent(vec2 v) { return max(v.x, v.y); }
// float maxComponent(vec3 v) { return max(max(v.x, v.y), v.z); }
// float minComponent(vec2 v) { return min(v.x, v.y); }
// mat3 rotation(float yaw, float pitch) { return mat3(cos(yaw), 0, -sin(yaw), 0, 1, 0, sin(yaw), 0, cos(yaw)) * mat3(1, 0, 0, 0, cos(pitch), sin(pitch), 0, -sin(pitch), cos(pitch)); }



///////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// Spheremap visualization code from https://www.shadertoy.com/view/4sSXzG

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    float scale = 1.0 / min(iResolution.x, iResolution.y);
	// Of the background
	const float verticalFieldOfView = 50.0 * deg;
	const float insetSphereRadius = 0.5;

    float yaw   = 1.0; // -((iMouse.x / iResolution.y) * 2.0 - 1.0) * 3.0;
    float pitch = ((iMouse.y / iResolution.y) * 2.0 - 1.0) * 3.0;
    float roll = -((iMouse.x / iResolution.y) * 2.0 - 1.0) * 3.0;

	vec3 dir = rotationAll(yaw, pitch,roll) * normalize(vec3(fragCoord.xy - iResolution.xy / 2.0, iResolution.y / ( -2.0 * tan(verticalFieldOfView / 2.0))));

    fragColor.rgb = vec3(0,0,0);
#	ifdef SHOW_LARGE_GRID
	    float latLongLine = (1.0 - pow(smoothstep(0.0, 0.04, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));
        fragColor.rgb += latLongLine * vec3(0.0, 0.7, 1.5);
#	endif

    fragColor.a = 0.0;
    #ifdef SHOW_SPHERE
    // Inset sphere
    vec2 spherePoint = (fragCoord.xy * scale - insetSphereRadius) / insetSphereRadius;
    if (length(spherePoint) <= 1.0) {

        // Antialias using many samples
        vec3 c = vec3(0);
        //int x = 0;
       // int y =0;
        for (int x = -3; x <= 3; ++x) {
	        for (int y = -3; y <= 3; ++y) {
			    vec2 s = clamp(((fragCoord.xy + vec2(x, y) / 7.0) * scale - insetSphereRadius) / insetSphereRadius, vec2(-1.0), vec2(1.0));
		        dir = rotationAll(yaw, pitch,roll) * vec3(s.xy, sqrt(max(0.0, 1.0 - dot(s.xy, s.xy))));
                // vec3 dir = rotationAll(yaw, pitch,roll) * normalize(vec3(fragCoord.xy - iResolution.xy / 2.0, iResolution.y / ( -2.0 * tan(verticalFieldOfView / 2.0))));

#				ifdef SHOW_SPHERE_GRID
	    			float latLongLine = (1.0 - pow(smoothstep(0.0, 0.09, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));
        			c += latLongLine * vec3(dir.x + 1.0, dir.y + 1.0, 1);
#				endif
            }
        }
        c /= 36.0;

        c = vec3(0);
        vec2 s = clamp(((fragCoord.xy) * scale - insetSphereRadius) / insetSphereRadius, vec2(-1.0), vec2(1.0));
		dir = rotationAll(yaw, pitch,roll) * vec3(s.xy, sqrt(max(0.0, 1.0 - dot(s.xy, s.xy))));
	    			float latLongLine = (1.0 - pow(smoothstep(0.0, 0.09, min(abs(fract(atan(dir.y, length(dir.xz)) / (15.0 * deg)) - 0.5), abs(fract(atan(dir.x, dir.z) / (15.0 * deg)) - 0.5)) * 2.0), 10.0));
        			c += latLongLine * vec3(-dir.y, dir.y, 1);

        // Fade the inset sphere to antialias its border transition
        fragColor.rgb = mix(vec3(0), c, clamp((1.0 - length(spherePoint)) * 2.0, 0.0, 1.0));
        fragColor.a = 0.1;
    }
    #endif

    fragColor.rgb = sqrt(fragColor.rgb);
}
