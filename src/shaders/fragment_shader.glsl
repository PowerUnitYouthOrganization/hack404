uniform vec2 uMouse; // Used as input to the noise
varying vec2 vUv;

// === Simplex 4D Noise implementation ===
// Source: https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83

vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}
float permute(float x) {
    return floor(mod(((x * 34.0) + 1.0) * x, 289.0));
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
float taylorInvSqrt(float r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec4 grad4(float j, vec4 ip) {
    const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);
    vec4 p, s;

    p.xyz = floor(fract(vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;
    p.w = 1.5 - dot(abs(p.xyz), ones.xyz);
    s = vec4(lessThan(p, vec4(0.0)));
    p.xyz = p.xyz + (s.xyz * 2.0 - 1.0) * s.www;

    return p;
}

// --- Cheap hash-based noise ---
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float snoise(vec4 v) {
    const vec2 C = vec2(0.138196601125010504, 0.309016994374947451);
    vec4 i = floor(v + dot(v, C.yyyy));
    vec4 x0 = v - i + dot(i, C.xxxx);

    vec4 i0;
    vec3 isX = step(x0.yzw, x0.xxx);
    vec3 isYZ = step(x0.zww, x0.yyz);
    i0.x = isX.x + isX.y + isX.z;
    i0.yzw = 1.0 - isX;
    i0.y += isYZ.x + isYZ.y;
    i0.zw += 1.0 - isYZ.xy;
    i0.z += isYZ.z;
    i0.w += 1.0 - isYZ.z;

    vec4 i3 = clamp(i0, 0.0, 1.0);
    vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);
    vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);

    vec4 x1 = x0 - i1 + 1.0 * C.xxxx;
    vec4 x2 = x0 - i2 + 2.0 * C.xxxx;
    vec4 x3 = x0 - i3 + 3.0 * C.xxxx;
    vec4 x4 = x0 - 1.0 + 4.0 * C.xxxx;

    i = mod(i, 289.0);
    float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);
    vec4 j1 = permute(permute(permute(permute(
                        i.w + vec4(i1.w, i2.w, i3.w, 1.0)) +
                        i.z + vec4(i1.z, i2.z, i3.z, 1.0)) +
                    i.y + vec4(i1.y, i2.y, i3.y, 1.0)) +
                i.x + vec4(i1.x, i2.x, i3.x, 1.0));

    vec4 ip = vec4(1.0 / 294.0, 1.0 / 49.0, 1.0 / 7.0, 0.0);
    vec4 p0 = grad4(j0, ip);
    vec4 p1 = grad4(j1.x, ip);
    vec4 p2 = grad4(j1.y, ip);
    vec4 p3 = grad4(j1.z, ip);
    vec4 p4 = grad4(j1.w, ip);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    p4 *= taylorInvSqrt(dot(p4, p4));

    vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);
    vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);
    m0 = m0 * m0;
    m1 = m1 * m1;
    return 49.0 * (dot(m0 * m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2))) +
            dot(m1 * m1, vec2(dot(p3, x3), dot(p4, x4))));
}

// === Main Shader Code ===

void main() {
    float scale = 0.5;
    vec2 uMouseOffset = vec2(6.9, 6.25);
    vec2 bgOffset = vec2(0.5, 1);

    // Feed scaled UV and mouse data into 4D noise
    float noise = snoise(vec4(vUv * scale + bgOffset, uMouse * 0.25 + uMouseOffset));

    // Normalize noise to range [0,1]
    float t = (noise + 1.0) * 0.5;

    vec3 color1 = vec3(0.369, 0.290, 0.890); // #5e4ae3 blue
    vec3 color2 = vec3(0.188, 0.949, 0.949); // var(--color-wcyan) cyan
    vec3 color3 = vec3(0.765, 0.969, 0.227); // #c3f73a lime

    // color blending
    vec3 blended1 = mix(color1, color2, smoothstep(0.33, 0.5, t));
    vec3 blended2 = mix(color2, color3, smoothstep(0.5, 0.66, t));

    // Combine blends
    vec3 finalColor = mix(blended1, blended2, smoothstep(0.0, 1.0, t));

    finalColor *= 0.7; // for darkening
    vec2 randomOffset = fract(sin(vUv * 3000.0) * 43758.5453123); // Randomize grain using a hash function

    // Add grain via gl_FragCoord
    float grain = hash(gl_FragCoord.xy) * 0.04;
    finalColor += vec3(grain) * 1.25;
    finalColor *= 0.9;
    // float grain = snoise(vec4(vUv * 2500.0 + randomOffset, vec2(0, 0))); // scale the noise frequency
    // finalColor += vec3(grain * 0.05); // Adjust the intensity of the grain

    gl_FragColor = vec4(finalColor, 1.0);
}
