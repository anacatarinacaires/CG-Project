#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform float timeFactor;

varying vec2 vTextureCoord;

void main() {
    vec3 pos = aVertexPosition;
    pos.y += sin(timeFactor) * 2.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(pos, 1.0);
    
    // Usa a posição do vértice como texCoord para debug
    vTextureCoord = vec2(aVertexPosition.x, aVertexPosition.y);
}