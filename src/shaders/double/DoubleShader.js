import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

/**
 * Double Vision Shader
 * Author: ryanzola
 * http://github.com/rzola-ie
 */

const DoubleVisionShader = {

  uniforms: {
    tDiffuse: { value: null },
    uOffset: { value: 0.35 },
    uMix: { value: 0.4 },
    uTime: { value: 0 },
  },

  vertexShader: vertex,
  fragmentShader: fragment
}

export { DoubleVisionShader }