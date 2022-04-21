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
  },

  vertexShader: vertex,
  fragmentShader: fragment
}

export { DoubleVisionShader }