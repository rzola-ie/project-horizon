import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

/**
 * Color Loss Shader
 * Author: ryanzola
 * http://github.com/rzola-ie
 */

const ColorLossShader = {

  uniforms: {
    tDiffuse: { value: null },
    uDesaturate: { value: -0.7 }
  },

  vertexShader: vertex,
  fragmentShader: fragment
}

export { ColorLossShader }