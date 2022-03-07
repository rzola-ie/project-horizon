import * as THREE from 'three'
import MainThreeScene from './MainThreeScene'

// post processing effects
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { DoubleVisionShader } from '../shaders/double/DoubleShader';
import { ColorLossShader } from '../shaders/color/ColorLossShader'

// shaders
import defaultVertex from '../shaders/default/vertex.glsl'
import defaultFragment from '../shaders/default/fragment.glsl'

import blurVertex from '../shaders/blur/vertex.glsl'
import blurFragment from '../shaders/blur/fragment.glsl'

import colorVertex from '../shaders/color/vertex.glsl'
import colorFragment from '../shaders/color/fragment.glsl'

import doubleVertex from '../shaders/double/vertex.glsl'
import doubleFragment from '../shaders/double/fragment.glsl'

import lightVertex from '../shaders/light/vertex.glsl'
import lightFragment from '../shaders/light/fragment.glsl'
import Blur from './Blur'




export default class Screen {
  constructor(_options) {
    this.mode = _options.mode

    sessionStorage.setItem('mode', this.mode)

    this.shaders = {
      blur: {
        fragment: defaultFragment,
        vertex: defaultVertex,
        settings: {
          focus: 2000.0,
          aperture: 0.01,
          maxBlur: 0.05
        }
      },
      color: {
        fragment: defaultFragment,
        vertex: defaultVertex,
        settings: {
          desaturate: -0.7
        }
      },
      double: {
        fragment: defaultFragment,
        vertex: defaultVertex,
        settings: {
          offset: 0.35,
          mix: 0.4,
        }
      },
      light: {
        fragment: defaultFragment,
        vertex: defaultVertex,
        settings: {
          strength: 0.3,
          radius: 1.5,
          threshold: 0.6
        }
      },
      bulge: {}
    }

    this.bind();

    this.experience = new MainThreeScene();
    this.container = this.experience.targetElement
    this.camera = this.experience.camera
    this.scene = this.experience.scene
    this.renderer = this.experience.renderer
    this.renderer.usePostprocess = true
    this.time = this.experience.time
    this.config = this.experience.config
    this.debug = this.experience.debug
    this.height = this.config.height
    this.width = this.config.width
    this.sizes = this.experience.sizes

    this.camera.instance.position.set(0, 0, 600)
    this.camera.instance.aspect = this.config.width / this.config.height;
    this.camera.instance.fov = 2 * Math.atan((this.config.height / 2) / 600) * 180 / Math.PI
    this.camera.instance.updateProjectionMatrix();

    this.selectedShader = this.shaders[this.mode]

    this.settings = { ...this.selectedShader.settings }

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: this.mode
      })
    }

    this.hasPostProcessing = true

    this.setShaders()
    this.setUniforms()
    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setVideoFeed()
    this.setPostProcessing()
    this.resize()


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

  setShaders() {
    this.selectedShader = this.shaders[this.mode]
  }

  setUniforms() {
    this.uniforms = {}

    this.uniforms.uTime = {}
    this.uniforms.uTime.value = 0

    this.uniforms.feed = {}
    this.uniforms.feed.value = 0

    switch (this.mode) {
      case 'blur':
        if (this.bokehPass) {
          this.bokehPass.focus = this.settings.focus
          this.bokehPass.aperture = this.settings.aperture
          this.bokehPass.maxblur = this.settings.maxBlur
          this.bokehPass.width = this.width
          this.bokehPass.height = this.height
        }
        break
      case 'color':
        // this.uniforms.uDesaturate = {}
        // this.uniforms.uDesaturate.value = this.settings.desaturate
        break
      case 'double':
        // this.uniforms.uDoubleOffset = {}
        // this.uniforms.uDoubleOffset.value = this.settings.offset

        // this.uniforms.uDoubleMix = {}
        // this.uniforms.uDoubleMix.value = this.settings.mix
        break
      case 'light':
        // this.uniforms.uSensetivity = {}
        // this.uniforms.uSensetivity.value = this.settings.sensetivity
        if (this.bloomPass) {
          this.bloomPass.strength = this.settings.strength
          this.bloomPass.radius = this.settings.strength
          this.bloomPass.threshold = this.settings.strength
          this.bloomPass.scene = this.scene
          this.bloomPass.camera = this.camera.instance
        }
        break
    }
  }

  setDebug() {
    if (!this.debug) return

    switch (this.mode) {
      case 'blur':
        this.debugFolder.addInput(
          this.settings,
          'focus',
          { label: 'focus', min: 0, max: 5000, step: 0.1 }
        )
        this.debugFolder.addInput(
          this.settings,
          'aperture',
          { label: 'aperture', min: 0, max: 10, step: 0.01 }
        )
        this.debugFolder.addInput(
          this.settings,
          'maxBlur',
          { label: 'max blur', min: 0, max: 0.1, step: 0.01 }
        )
        break
      case 'color':
        this.debugFolder.addInput(
          this.settings,
          'desaturate',
          { label: 'desaturate', min: -1, max: 0.5, step: 0.01 }
        )
        break;
      case 'double':
        this.debugFolder.addInput(
          this.settings,
          'doubleOffset',
          { label: 'offset', min: 0, max: 1, step: 0.01 }
        )
        this.debugFolder.addInput(
          this.settings,
          'doubleMix',
          { label: 'mix', min: 0, max: 1, step: 0.01 }
        )
        break
      case 'light':
        this.debugFolder.addInput(
          this.settings,
          'strength',
          { label: 'strength', min: 0.0, max: 1.0, step: 0.01 }
        )
        this.debugFolder.addInput(
          this.settings,
          'radius',
          { label: 'radius', min: 0.0, max: 2.0, step: 0.01 }
        )
        this.debugFolder.addInput(
          this.settings,
          'threshold',
          { label: 'threshold', min: 0.0, max: 2.0, step: 0.01 }
        )
        break
    }
  }

  setGeometry() {
    this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial()

    this.setDebug()
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.name = 'screen'
    this.scene.add(this.mesh)
    this.mesh.scale.set(this.width, this.height, 1)
  }

  setVideoFeed() {
    if (!this.video) {
      this.video = document.createElement('video');
    }

    this.video.style.height = this.height //* window.devicePixelRatio
    this.video.style.width = this.width //* window.devicePixelRatio
    this.video.style.transform = `scale(0.0001, 0.0001)`
    this.video.style.position = `fixed`
    this.video.style.top = `6em`
    this.video.style.left = `0px`
    this.video.style.bottom = `0px`
    this.video.style.right = `0px`
    this.video.style.objectFit = `cover`
    this.video.style.zIndex = 10

    this.video.setAttribute('id', 'video')
    this.video.setAttribute('muted', 'true')
    this.video.setAttribute('autoplay', 'true')
    this.video.setAttribute('playsinline', 'true')


    this.container.appendChild(this.video);

    this.videoTexture = new THREE.VideoTexture(this.video)

    let aspect = 0.5625

    if (this.width > this.height) {
      aspect = 1.7777777778
    }

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        audio: false,
        video: {
          facingMode: 'environment',
          aspectRatio: aspect,
          height: this.height, //* window.devicePixelRatio,
          width: this.width //* window.devicePixelRatio
        }
      };


      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        // apply the stream to the video element used in the texture
        // this.localStream = stream
        this.video.srcObject = stream
        window.localStream = stream

      }).catch((error) => {
        console.error('Unable to access the camera/webcam', error)
      })
    } else {
      console.error('MediaDevices interface not available')
    }
  }

  setPostProcessing() {
    switch (this.mode) {
      case 'blur':
        this.addBlurPass()
        break
      case 'light':
        this.addLightPass()
        break
      case 'double':
        this.addDoublePass()
        break
      case 'color':
        this.addColorPass()
    }

    this.renderer.instance.needsUpdate = true
  }

  addColorPass() {
    this.colorEffect = new ShaderPass(ColorLossShader)

    this.renderer.postProcess.composer.addPass(this.colorEffect)
  }

  addDoublePass() {
    this.doubleEffect = new ShaderPass(DoubleVisionShader)
    this.doubleEffect.uniforms.uOffset.value = this.settings.offset
    this.doubleEffect.uniforms.uMix.value = this.settings.mix

    this.renderer.postProcess.composer.addPass(this.doubleEffect)
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

  addLightPass() {
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      0.3, // strength
      1.5, // radius
      0.6 // threshold
    )
    this.renderer.postProcess.composer.addPass(this.bloomPass)
  }

  updateUniforms() {
    if (this.material) {
      this.material.map = this.videoTexture

      switch (this.mode) {
        case 'blur':
          if (this.bokehPass) {
            this.bokehPass.uniforms.focus.value = this.settings.focus
            this.bokehPass.uniforms.aperture.value = this.settings.aperture
            this.bokehPass.uniforms.maxblur.value = this.settings.maxBlur
          }
          break;
        case 'color':
          if (this.colorEffect) {
            this.colorEffect.uniforms.uDesaturate.value = this.settings.desaturate
          }
          break
        case 'double':
          if (this.doubleEffect) {
            this.doubleEffect.uniforms.uOffset.value = this.settings.doubleOffset
            this.doubleEffect.uniforms.uMix.value = this.settings.doubleMix
            this.doubleEffect.uniforms.uTime.value = this.time.elapsed * 0.001
          }
          break
        case 'light':
          this.bloomPass.strength = this.settings.strength
          this.bloomPass.radius = this.settings.radius
          this.bloomPass.threshold = this.settings.threshold
          break
      }

      this.material.needsUpdate = true
      this.renderer.instance.needsUpdate = true
    }
  }

  update() {
    this.updateUniforms()

    if (this.cube)
      this.cube.update()
  }

  selectMode(mode) {
    this.mode = mode;
    sessionStorage.setItem('mode', mode);

    // double
    if (this.doubleEffect)
      this.renderer.postProcess.composer.removePass(this.doubleEffect)

    // blur
    if (this.bokehPass)
      this.renderer.postProcess.composer.removePass(this.bokehPass)

    // light
    if (this.bloomPass)
      this.renderer.postProcess.composer.removePass(this.bloomPass)

    // color
    if (this.colorEffect)
      this.renderer.postProcess.composer.removePass(this.colorEffect)

    this.renderer.instance.needsUpdate = true;

    // this.setShaders()
    this.setUniforms()
    this.setPostProcessing()
  }

  destroy() {

    // remove the video texture
    if (this.VideoTexture) {
      this.videoTexture.dispose()
    }

    let stream, tracks

    // get the video tracks
    if (window.localStream) {
      stream = window.localStream
      tracks = stream.getTracks();
    }

    // remove video tracks
    if (tracks && tracks.length > 0) {
      tracks.forEach(function (track) {
        track.stop();
        track.enabled = false
      });
    }

    if (this.video) {
      // remove video source
      this.video.srcObject = null;

      // remove video element
      this.video.remove()
    }

    // remove screen mesh
    if (this.mesh) {
      const object = this.scene.getObjectByProperty('name', 'screen');
      object.geometry.dispose();
      object.material.dispose();
      this.scene.remove(object);
    }

    if (this.debug) {
      this.debugFolder = null
      this.debug = null
    }

    console.log('scene destroyed')
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.setShaders = this.setShaders.bind(this)
    this.setGeometry = this.setGeometry.bind(this)
    this.setUniforms = this.setUniforms.bind(this)
    this.setMaterial = this.setMaterial.bind(this)
    this.setMesh = this.setMesh.bind(this)
    this.updateUniforms = this.updateUniforms.bind(this)
    this.setVideoFeed = this.setVideoFeed.bind(this)
    this.update = this.update.bind(this)
  }
}