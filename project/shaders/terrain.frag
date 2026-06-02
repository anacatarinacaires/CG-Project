#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainTexture;
uniform sampler2D dirtTexture;
uniform sampler2D heightMapTexture;

uniform float roadWidth;
uniform float roadFreq1;
uniform float roadAmp1;
uniform float roadFreq2;
uniform float roadAmp2;

void main() {
    vec2 uv = vTextureCoord;

    float height = texture2D(heightMapTexture, uv).r;
    vec4 grass = texture2D(terrainTexture, uv * 6.0);
    vec4 dirt  = texture2D(dirtTexture,    uv * 6.0);

    float roadCenter = 0.5+ sin(uv.y * 3.14159 * roadFreq1) * roadAmp1+ sin(uv.y * 3.14159 * roadFreq2) * roadAmp2;
    float roadMask = smoothstep(roadWidth, roadWidth - 0.04, abs(uv.x - roadCenter));
    float peakDirt = smoothstep(0.60, 0.75, height);
    float dirtMask = clamp(roadMask + peakDirt, 0.0, 1.0);

    gl_FragColor = mix(grass, dirt, dirtMask);
}