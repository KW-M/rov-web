precision mediump float;

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
