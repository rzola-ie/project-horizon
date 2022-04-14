vec3 adjustSaturation(vec3 color, float value) {
  // https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
  const vec3 luminosityFactor = vec3(0.2126, 0.7152, 0.0722);
  vec3 grayscale = vec3(dot(color, luminosityFactor));

  return mix(grayscale, color, 1.0 + value);
}

uniform sampler2D tDiffuse;
uniform float uDesaturate;
uniform vec4 uResolution;

varying vec2 vUv;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {  
  vec2 newUv = (vUv - vec2(0.5)) * uResolution.zw + vec2(0.5);
  vec4 color = vec4(0.0);

  color = texture2D(tDiffuse, newUv);

  color.rgb = adjustSaturation(color.rgb, -0.7);
  // color += vUv;

  fragColor = color;
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}