import vertex from './vertex.glsl'
import fragment from './fragment.glsl'
import { Vector4 } from 'three'

/**
 * Light Sensitivity Shader
 * Author: ryanzola
 * http://github.com/rzola-ie
 */

const LightShader = {
  uniforms: {
    uSensetivity: { value: 0.65 },
    uResolution: { value: new Vector4() }
  },
  vertexShader: vertex,
  fragmentShader: fragment
}

export { LightShader }