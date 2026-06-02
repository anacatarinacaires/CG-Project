#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float uStrength;
uniform float uSeed;

uniform sampler2D heightMapTexture;
uniform float uHeight;
uniform float uRadius;
uniform vec2 uBasePos;

varying vec2 vTextureCoord;

float random(vec2 st) { 
    return fract(sin(dot(st, vec2(12.9898,78.233))) * 43758.5453); }

float noise(vec2 st) {
    vec2 i = floor(st); vec2 f = fract(st);
    float a = random(i), b = random(i+vec2(1,0)), c = random(i+vec2(0,1)), d = random(i+vec2(1,1));
    vec2 u = f*f*(3.0-2.0*f);
    return mix(a,b,u.x)+(c-a)*u.y*(1.0-u.x)+(d-b)*u.x*u.y;
}
float fbm(vec2 st) {
    return noise(st)*0.5 + noise(st*2.0)*0.25 + noise(st*4.0)*0.125;
}

void main() {
    vec3 pos = aVertexPosition;

    //forma das rochas
    vec2 st = normalize(pos).xz * 3.0 + uSeed;
    pos += aVertexNormal * fbm(st) * uStrength;

    vec2 uv = vec2(uBasePos.x / (uRadius * 2.0) + 0.5, uBasePos.y / (uRadius * 2.0) + 0.5);
    float height    = texture2D(heightMapTexture, uv).r;
    float valeShape = smoothstep(0.3, 0.7, abs(uv.x - 0.5) * 2.0);

    vec4 mvPos = uMVMatrix * vec4(pos, 1.0);
    mvPos.y += height * valeShape * uHeight;

    gl_Position = uPMatrix * mvPos;
    vTextureCoord = aTextureCoord;
}