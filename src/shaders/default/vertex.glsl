varying vec2 vUv;

void main() {
  // gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = vec4(position, 1.);
  vUv = 0.5+0.5*position.xy;
}