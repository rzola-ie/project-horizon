uniform sampler2D feed;

varying vec2 vUv;

void main() {

  vec3 color = vec3(0.0);
  
  color = texture2D(feed, vUv).rgb;

  gl_FragColor = vec4(color, 1.0);
}