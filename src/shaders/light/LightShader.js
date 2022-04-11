import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

/**
 * Light Sensitivity Shader
 * Author: ryanzola
 * http://github.com/rzola-ie
 */

const LightShader = {

  uniforms: {
    uSensetivity: { value: 0.4 }
  },
  vertexShader: vertex,
  fragmentShader: fragment
}

export { LightShader }