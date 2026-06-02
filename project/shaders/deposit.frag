#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform float timeFactor;
uniform float uActive;

void main() {
    vec2 uv = vTextureCoord - vec2(0.5, 0.5);
    float dist = length(uv);

    // múltiplos anéis animados
    float ring1 = abs(dist - 0.3 - sin(timeFactor * 1.5) * 0.08);
    float ring2 = abs(dist - 0.5 - sin(timeFactor * 1.5 + 1.0) * 0.06);
    float ring3 = abs(dist - 0.15 - sin(timeFactor * 2.0) * 0.05);

    float alpha = smoothstep(0.025, 0.0, ring1)
                + smoothstep(0.02,  0.0, ring2) * 0.6
                + smoothstep(0.02,  0.0, ring3) * 0.4;

    // rotação de cor
    float hue = sin(timeFactor * 0.8) * 0.5 + 0.5;
    vec3 color = mix(vec3(1.0, 0.75, 0.0), vec3(0.2, 1.0, 0.4), uActive);
    color = mix(color, vec3(1.0, 0.3, 0.0), hue * 0.3);

    if (alpha < 0.01) discard;
    gl_FragColor = vec4(color, min(alpha, 1.0) * 0.9);
}