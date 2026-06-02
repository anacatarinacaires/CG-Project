#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D rockTexture;

void main() {
	gl_FragColor = texture2D(rockTexture, vTextureCoord);
}


