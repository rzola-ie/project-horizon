import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
  constructor(_options) {
      this.bind()

      this.experience = window.experience
      this.config = this.experience.config
      this.debug = this.experience.debug
      this.time = this.experience.time
      this.sizes = this.experience.sizes
      this.targetElement = this.experience.targetElement
      this.scene = this.experience.scene

      // Set up
      this.mode = 'debug' // defaultCamera | debugCamera

      this.setInstance()
      this.setModes()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(75, this.config.width / this.config.height, 0.1, 1000)
    this.instance.rotation.reorder('YXZ')
    this.instance.position.set(0, 0, 5)

    this.scene.add(this.instance)
  }

  setModes() {
    this.modes = {}

    // default
    this.modes.default = {}
    this.modes.default.instance = this.instance.clone()
    this.modes.default.instance.rotation.reorder('YXZ')

    // debug
    this.modes.debug = {}
    this.modes.debug.instance = this.instance.clone()
    this.modes.debug.instance.rotation.reorder('YXZ')
    this.modes.debug.instance.position.set(0, 0, 5)
    
    this.modes.debug.orbitControls = new OrbitControls(this.modes.debug.instance, this.targetElement)
    this.modes.debug.orbitControls.enabled = this.modes.debug.active
    this.modes.debug.orbitControls.screenSpacePanning = true
    this.modes.debug.orbitControls.enableKeys = false
    this.modes.debug.orbitControls.zoomSpeed = 0.25
    this.modes.debug.orbitControls.enableDamping = true
    this.modes.debug.orbitControls.update()
  }

  resize() {
    this.instance.aspect = this.config.width / this.config.height
    this.instance.updateProjectionMatrix()

    this.modes.default.instance.aspect = this.config.width / this.config.height
    this.modes.default.instance.updateProjectionMatrix()

    this.modes.debug.instance.aspect = this.config.width / this.config.height
    this.modes.debug.instance.updateProjectionMatrix()
  }

  update() {
    // Update debug orbit controls
    this.modes.debug.orbitControls.update()

    // Apply coordinates
    this.instance.position.copy(this.modes[this.mode].instance.position)
    this.instance.quaternion.copy(this.modes[this.mode].instance.quaternion)
    this.instance.updateMatrixWorld() // To be used in projection
  }

  destroy() {
    this.modes.debug.orbitControls.destroy()
  }

  bind() {
    this.update.bind(this)
    this.resize.bind(this)
    this.destroy.bind(this)
  }
}