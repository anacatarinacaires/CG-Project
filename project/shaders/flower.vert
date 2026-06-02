#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

uniform sampler2D heightMapTexture;
uniform float uHeight;
uniform float uRadius;
uniform vec2 uBasePos;

varying vec2 vTextureCoord;

void main() {
    vec3 pos = aVertexPosition;

    vec2 uv = vec2(uBasePos.x / (uRadius * 2.0) + 0.5, uBasePos.y / (uRadius * 2.0) + 0.5);
    
    float height = texture2D(heightMapTexture, uv).r;

    float altitudeMask = 1.0 - smoothstep(0.40, 0.75, height);
    pos *= altitudeMask;

    float distX = abs(uv.x - 0.5) * 2.5; 
    float valeShape = smoothstep(0.35, 0.9, distX); 

    pos.z += cos(timeFactor * 1.5) * 0.1;

    vec4 mvPos = uMVMatrix * vec4(pos, 1.0);
    mvPos.y += height * valeShape * uHeight;

    gl_Position = uPMatrix * mvPos;
    vTextureCoord = aTextureCoord;
}