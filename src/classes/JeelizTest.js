import * as THREE from 'three'
import JeelizResizer from '../lib/jeeliz/helpers/JeelizResizer.js'

import vertex from '../shaders/jeelizTest/vertex.glsl'
import fragment from '../shaders/jeelizTest/fragment.glsl'

export default class JeelizTest {
    constructor(_options) {
      this.bind()

      this.targetElement = _options.targetElement
      this.canvasId = 'three-canvas'
      this.width = this.targetElement.clientWidth
      this.height = this.targetElement.clientHeight

      this.setScene()
      this.setCamera()
      this.setRenderer()

      JeelizResizer.size_canvas({
        canvasId: this.canvasId,
        callback: (isError, bestVideoSettings) => {
          if (isError) {
            console.log('failed to init canvas')
            return
          }
          this.setIdealDimensions(bestVideoSettings.idealWidth, bestVideoSettings.idealHeight)
          this.setGeometry()
          this.setMaterial()
          this.setMesh()
          this.resize()
          this.setResize()
          this.setVideoTexture()
          this.setVideoFeed()
          this.render()
        }
      })
    }

    resize() {
      JeelizResizer.size_canvas({
        canvasId: this.canvasId,
        callback: (isError, bestVideoSettings) => {
          if (isError) {
            console.log('failed to init canvas')
            return
          }
          this.setIdealDimensions(bestVideoSettings.idealWidth, bestVideoSettings.idealHeight)
          this.video.style.height = this.idealWidth //* window.devicePixelRatio
          this.video.style.width = this.idealHeight //* window.devicePixelRatio
          this.width = this.targetElement.clientWidth
          this.height = this.targetElement.clientHeight
    
          this.camera.aspect = this.width / this.height
          this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * 180 / Math.PI
          this.camera.updateProjectionMatrix()
    
          this.renderer.domElement.style.width = `100%`
          this.renderer.domElement.style.height = `100%`
          this.renderer.setSize(this.width, this.height)
          this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
          this.renderer.needsUpdate = true
          console.log('lesgooooo', this.width, this.height)

          this.mesh.scale.set(this.width, this.height, 1)
        }
      })
    }

    setResize() {
      window.addEventListener('resize', this.resize)
    }
    
    setScene() {
      this.scene = new THREE.Scene()
    }

    setCamera() {
      this.camera = new THREE.PerspectiveCamera(60, this.width / this.height, 0.1, 2000)
      this.camera.position.set(0, 0, 600)
      this.camera.fov = 2 * Math.atan((this.height / 2) / 600) * 180 / Math.PI
    }

    setRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      })
      this.renderer.domElement.setAttribute('id', this.canvasId)
      this.renderer.domElement.style.position = 'absolute'
      this.renderer.domElement.style.top = 0
      this.renderer.domElement.style.left = 0
      this.renderer.domElement.style.width = `100%`
      this.renderer.domElement.style.height = `100%`

      this.renderer.setClearColor(0x220000, 0)
      this.renderer.setSize(this.width, this.height)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.renderer.outputEncoding = THREE.sRGBEncoding

      this.targetElement.appendChild(this.renderer.domElement)
    }

    setIdealDimensions(width, height) {
      this.idealWidth = width
      this.idealHeight = height
    }

    setGeometry() {
      this.geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1)
    }

    setMaterial() {
      // this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      this.material = new THREE.MeshBasicMaterial()
    }

    setMesh() {
      this.mesh = new THREE.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)
      this.mesh.scale.set(this.width, this.height, 1)
    }

    setVideoTexture() {
      this.video = document.createElement('video')

      this.video.style.height = this.idealWidth //* window.devicePixelRatio
      this.video.style.width = this.idealHeight //* window.devicePixelRatio
      this.video.style.transform = `scale(0.0001, 0.0001)`
      this.video.style.position = `fixed`
      this.video.style.top = `-1000em`
      this.video.style.left = `0`
      this.video.style.bottom = `0`
      this.video.style.right = `0`
      this.video.style.objectFit = `cover`
      this.video.style.zIndex = 10
  
      this.video.setAttribute('id', 'video')
      this.video.setAttribute('muted', 'true')
      this.video.setAttribute('autoplay', 'true')
      this.video.setAttribute('playsinline', 'true')

      this.targetElement.appendChild(this.video);
      this.videoTexture = new THREE.VideoTexture(this.video)
    }

    setVideoFeed() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const constraints = {
          audio: false,
          video: {
            facingMode: 'environment',
            aspectRatio: this.idealWidth / this.idealHeight,
            height: this.idealHeight, //* window.devicePixelRatio,
            width: this.idealWidth //* window.devicePixelRatio
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

    destroy() {
        console.log('bye bestie')
    }

    render() {
      this.renderer.render(this.scene, this.camera)
      this.material.map = this.videoTexture
      this.material.needsUpdate = true
      requestAnimationFrame(this.render)
    }

    bind() {
      this.resize = this.resize.bind(this)
      this.render = this.render.bind(this)
    }
}