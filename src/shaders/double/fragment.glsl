varying vec2 vUv;

uniform sampler2D tDiffuse;

vec2 offset = 0.1 * vec2(
  0.13, 
  0.0
);

void main() {
  vec2 uv = vUv;

  vec2 rUv = vUv;
  vec4 cr = texture2D(tDiffuse, vUv - offset);

  vec4 c = texture2D(tDiffuse, vUv);

  vec2 lUv = vUv;
  vec4 cl = texture2D(tDiffuse, vUv + offset);

  vec4 colorFinal = mix(cr, cl, 0.2);
  colorFinal = mix(colorFinal, c, 0.5);

  gl_FragColor = colorFinal;
}