import * as THREE from 'three'

import MainThreeScene from './MainThreeScene'

import fragment from '../shaders/simple.frag'
import vertex from '../shaders/simple.vert'

export default class Cube {
  constructor() {
    this.bind()

    this.experience = new MainThreeScene()
    this.scene = this.experience.scene
    this.time = this.experience.time

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(4, 4, 4)
  }

  setMaterial() {
    this.matcapMaterial = new THREE.TextureLoader().load('/assets/bgMatcap.png')
    this.material = new THREE.MeshMatcapMaterial({
      matcap: this.matcapMaterial
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.scene.add(this.mesh)
  }

  update() {
    this.mesh.rotation.x = this.time.elapsed * 0.0001
    this.mesh.rotation.z = this.time.elapsed * 0.0001
  }

  bind() {
    this.update = this.update.bind(this)
  }
}