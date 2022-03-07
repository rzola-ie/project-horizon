// this does not work

import * as THREE from 'three'
import MainThreeScene from './MainThreeScene'

import '../lib/jeeliz/helpers/JeelizThreeHelper.js'
import JeelizResizer from '../lib/jeeliz/helpers/JeelizResizer.js'


import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

// shaders
import defaultVertex from '../shaders/default/vertex.glsl'
import defaultFragment from '../shaders/default/fragment.glsl'



export default class Blur {
  constructor(_options) {
    this.mode = 'blur'

    this.bind();

    this.experience = new MainThreeScene();
    this.container = this.experience.targetElement
    this.camera = this.experience.camera
    this.scene = this.experience.scene
    this.renderer = this.experience.renderer
    this.time = this.experience.time
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.height = this.config.height
    this.width = this.config.width
    this.sizes = this.experience.sizes
    this.spec = null

    this.renderer.instance.domElement.id = 'three-canvas'
    this._isVideoTextureReady = false;

    this.camera.instance.position.set(0, 0, 600)
    this.camera.instance.aspect = this.config.width / this.config.height;
    this.camera.instance.fov = 2 * Math.atan((this.config.height / 2) / 600) * 180 / Math.PI
    this.camera.instance.updateProjectionMatrix();

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: this.mode
      })
    }

    this.hasPostProcessing = true

    this.init()
    // this.addBlurPass()
    this.resize()
  }

  init() {
    JeelizResizer.size_canvas({
      canvasId: 'three-canvas',
      callback: (isError, bestVideoSettings) => {
        if (isError) {
          console.log('failed to init canvas')
          return
        }
        JEELIZFACEFILTER.init({
          canvasId: 'three-canvas',
          NNCPath: '/neuralNets/', // path to JSON neural network model (NN_DEFAULT.json by default)
          videoSettings: bestVideoSettings,
          callbackReady: (errCode, spec) => {
            if (errCode) {
              console.log('AN ERROR HAPPENS. ERROR CODE =', errCode);
              return;
            }
            // [init scene with spec...]
            console.log('INFO: JEELIZFACEFILTER IS READY');
            this.setSpec(spec)
          }, //end callbackReady()
        });
      }
    })
  }

  setSpec(spec) {
    console.log('this.shit', spec)
    this.spec = spec
    this._glVideoTexture = spec.videoTexture
    this.videoTransformMat2 = spec.videoTransformMat2
    this._gl = spec.GL


    this.createVideoScreen()
  }

  resize() {
    if (this.mesh) {
      if (this.width > this.height) {
        //landscape
        this.mesh.scale.set(Math.ceil(this.height * 1.777777), this.height, 1)
      } else {
        //portrait
        this.mesh.scale.set(this.width, (this.width * 1.777777), 1)
      }

      // this.setVideoFeed()
    }
  }

  createVideoScreen() {
    const videoScreenVertexShaderSource = "attribute vec2 position;\n\
        uniform mat2 videoTransformMat2;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position = vec4(position, 0., 1.);\n\
          vUV = 0.5 + videoTransformMat2 * position;\n\
        }";
    const videoScreenFragmentShaderSource = "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor = texture2D(samplerVideo, vUV);\n\
        }";


    // init video texture with red:
    this._videoTexture = new THREE.DataTexture(new Uint8Array([255, 0, 0]), 1, 1, THREE.RGBFormat)
    this._videoTexture.needsUpdate = true

    // create the video background
    this.videoMaterial = new THREE.RawShaderMaterial({
      depthWrite: false,
      depthTest: false,
      vertexShader: videoScreenVertexShaderSource,
      fragmentShader: videoScreenFragmentShaderSource,
      uniforms: {
        samplerVideo: { value: this.videoTexture },
        videoTransformMat2: {
          value: this.videoTransformMat2
        }
      }
    })

    const videoGeometry = new THREE.BufferGeometry()
    const videoScreenCorners = new Float32Array([-1, -1, 1, -1, 1, 1, -1, 1])

    // handle both new and old THREE.js versions:
    const setVideoGeomAttribute = (videoGeometry.setAttribute || videoGeometry.addAttribute).bind(videoGeometry);
    setVideoGeomAttribute('position', new THREE.BufferAttribute(videoScreenCorners, 2))
    videoGeometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 1, 2, 0, 2, 3]), 1))
    const videoMesh = new THREE.Mesh(videoGeometry, this.videoMaterial)
    this.applyVideoTexture(videoMesh)
    videoMesh.renderOrder = -1000 // render first
    videoMesh.frustumCulled = false
    this.scene.add(videoMesh)
  }

  compileShader(source, type, typeString) {
    const glShader = this._gl.createShader(type)
    this._gl.shaderSource(glShader, source)
    this._gl.compileShader(glShader)

    if (!this._gl.getShaderParameter(glShader, _gl.COMPILE_STATUS)) {
      alert(`ERROR IN ${typeString} SHADER ${this._gl.getShaderInfoLog(glShader)}`)
      return null
    }

    return glShader
  }

  applyVideoTexture(threeMesh) {
    if (this._isVideoTextureReady) return

    threeMesh.onAfterRender = () => {
      // replace temp video texture with the real video texture
      try {
        this.renderer.instance.properties.update(this._videoTexture, '__webglTexture', this._glVideoTexture)
        this._videoTexture.magFilter = THREE.LinearFilter
        this._videoTexture.minFilter = THREE.LinearFilter
        this._isVideoTextureReady = true
      } catch (e) {
        console.log('WARNING in JeelizThreeHelper: the glVideoTexture is not fully initialized', e);
      }
      delete (threeMesh.onAfterRender);
    }
  }

  addBlurPass() {
    this.bokehPass = new BokehPass(this.scene, this.camera.instance, {
      focus: 2000.0,
      aperture: 0.01, // any non-zero number
      maxblur: 0.05,
      width: this.config.width,
      height: this.config.height
    });
    this.bokehBlurOffset = 0;

    this.renderer.postProcess.composer.addPass(this.bokehPass)
  }


  update() { }


  destroy() { }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
  }
}