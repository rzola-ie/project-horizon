precision mediump float;

uniform sampler2D samplerVideo;

varying vec2 vUVvideo;

void main() {
  vec4 color = texture2D(samplerVideo, vUVvideo);

  gl_FragColor = color;
}