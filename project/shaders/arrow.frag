#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

void main() {
    float x = vTextureCoord.x;
    float y = vTextureCoord.y;

    float left  = 0.5 - y * 0.5;
    float right = 0.5 + y * 0.5;

    if (x < left || x > right) discard;

    gl_FragColor = vec4(1.0, 0.75, 0.0, 1.0);
}