uniform mat2 videoTransformMat2;
varying vec2 vUVvideo;

// deformation 0 parameters:
// left eye position
const vec2 TEARPOINT0 = vec2(-0.2, 0.1);

// deformation 0 parameters:
// right eye position
const vec2 TEARPOINT1 = vec2(0.2, 0.1);

//deformation values
const vec2 DISPLACEMENT = vec2(0.0, 0.2);
const float RADIUS = 0.2;

void main() {
  vec3 positionDeformed = position;

  // apply deformation 0: left eye
  float deformFactor0 = 1.0-smoothstep(0.0, RADIUS, distance(TEARPOINT0, position.xy));
  positionDeformed.xz += deformFactor0*DISPLACEMENT;

  // apply deformation 1: right eye
  float deformFactor1 = 1.0-smoothstep(0.0, RADIUS, distance(TEARPOINT1, position.xy));
  positionDeformed.xz += deformFactor1*DISPLACEMENT;

  // project deformed point:
  vec4 mvPosition = modelViewMatrix * vec4( positionDeformed, 1.0 );
  vec4 projectedPosition=projectionMatrix * mvPosition;
  gl_Position=projectedPosition;

  // compute UV coordinates on the video texture:
  vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );
  vec4 projectedPosition0 = projectionMatrix * mvPosition0;

  vUVvideo = vec2(0.5,0.5) + videoTransformMat2 * projectedPosition0.xy / projectedPosition0.w;
}