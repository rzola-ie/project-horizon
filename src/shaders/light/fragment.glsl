varying vec2 vUv;

uniform sampler2D feed;
uniform float uTime;
uniform float uSensetivity;

void main() {
  vec3 color = vec3(0.0);

  // if (vUv.x>=0.0 && vUv.y>=0.0 && vUv.x<1.0 && vUv.y<1.0) color = texture2D(feed, vUv).rgb;

  color = texture2D(feed, vUv).rgb;

  gl_FragColor = vec4(color, 1.0);
}