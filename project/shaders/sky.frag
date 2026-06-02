precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D skyTexture;
uniform sampler2D cloudTexture;

uniform float timeFactor;

void main() {
    vec4 sky = texture2D(skyTexture, vTexCoord);

    //movimento das nuvens
    vec2 cloudUV = vTexCoord + vec2(timeFactor * 0.0001, 0.0);
    cloudUV = fract(cloudUV);
    
    vec4 clouds = texture2D(cloudTexture, cloudUV);

    float alpha = clouds.a;

    vec4 finalColor = mix(sky, clouds, alpha);

    gl_FragColor = finalColor;
}