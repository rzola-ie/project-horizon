varying vec2 vUv;

uniform sampler2D tDiffuse;
uniform float uOffset;
uniform float uMix;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  vec2 offset = 0.1 * vec2(
    cos(0.1 * uTime * 2.0), 
    0.0
  );

  vec2 rUv = vUv;
  // if(rUv.x > 1.0 || rUv.x < 0.0) discard;
  vec4 cr = texture2D(tDiffuse, vUv - offset);

  vec4 c = texture2D(tDiffuse, vUv);

  vec2 lUv = vUv;
  // if(lUv.x > 1.0 || lUv.x < 0.0) discard;
  vec4 cl = texture2D(tDiffuse, vUv + offset);

  vec4 colorFinal = mix(cr, cl, 0.5);
  colorFinal = mix(colorFinal, c, 0.5);

  gl_FragColor = colorFinal;
}