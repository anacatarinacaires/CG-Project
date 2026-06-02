attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float uHeight;
uniform sampler2D heightMapTexture;

varying vec2 vTextureCoord;

void main() {
    float height = texture2D(heightMapTexture, aTextureCoord).r;

    float distX= abs(aTextureCoord.x - 0.5) * 2.5;
    float valeShape = smoothstep(0.35, 0.9, distX);
    float finalHeight = height * valeShape;

    vec3 position = aVertexPosition + aVertexNormal * finalHeight * uHeight;

    gl_Position   = uPMatrix * uMVMatrix * vec4(position, 1.0);
    vTextureCoord = aTextureCoord;
}