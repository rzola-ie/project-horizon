import * as THREE from 'three'
import { DeviceOrientationControls } from 'three/examples/jsm/controls/DeviceOrientationControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import MainThreeScene from './MainThreeScene'

import { Pane } from 'tweakpane';

// import room from '../static/assets/room.jpg';

export default class Room {
  constructor(_options) {
    this.experience = new MainThreeScene()
    this.scene = this.experience.scene
    this.camera = this.experience.camera
    this.camera.instance.position.z = 5
    this.camera.instance.rotation.y += 4.9
    this.camera.instance.fov = 1600
    this.renderer = this.experience.renderer
    this.renderer.instance.xr.enabled = true
    this.renderer.instance.physicallyCorrectLights = true
    this.renderer.instance.gammaOutPut = true
    this.renderer.instance.outputEncoding = THREE.sRGBEncoding
    this.renderer.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.instance.shadowMap.enabled = true
    this.renderer.instance.toneMapping = THREE.ACESFilmicToneMapping

    this.debug = this.experience.debug

    this.settings = {
      strength: 5.0,
      radius: 1.0,
      threshold: 0.6
    }

    console.log(this.debug)
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'light sensitivity'
      })
    }

    this.time = this.experience.time

    this.modelLoader = new GLTFLoader()
    this.textureLoader = new THREE.TextureLoader();

    this.gyroPresent = false
    this.started = false
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    console.log('hello room')
    this.addOffice()
    this.addLights()
    this.addLightPass()
    this.addXR()
  }

  addXR() {
    document.body.appendChild(VRButton.createButton(this.renderer.instance));
  }

  addOffice() {
    this.modelLoader.load('/models/office2.glb', gltf => {
      // console.log(gltf)
      // gltf.material = new THREE.MeshStandardMaterial({ color: 0xffffff })
      // Traverse
      this.model = gltf.scene

      this.model.traverse((_child) => {
        // buildings
        if (_child.name === 'buildings') {
          if (_child instanceof THREE.Mesh) {
            _child.material.transparent = true
            _child.material.opacity = 0.5
            console.log(_child.material)
          }
        }

        if (_child instanceof THREE.Mesh) {
          // apply the brick texture
          if (_child.name === 'wallsbrick') {
            const color = this.textureLoader.load('/textures/bricks/color.jpg')
            const aoMap = this.textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
            const normal = this.textureLoader.load('/textures/bricks/normal.jpg')
            const roughness = this.textureLoader.load('/textures/bricks/roughness.jpg')
            const height = this.textureLoader.load('/textures/bricks/height.png')

            color.repeat.set(20, 20)
            aoMap.repeat.set(20, 20)
            normal.repeat.set(20, 20)
            roughness.repeat.set(20, 20)
            height.repeat.set(20, 20)

            color.wrapS = color.wrapT = THREE.RepeatWrapping
            aoMap.wrapS = aoMap.wrapT = THREE.RepeatWrapping
            normal.wrapS = normal.wrapT = THREE.RepeatWrapping
            roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping
            // height.wrapS = height.wrapT = THREE.RepeatWrapping

            _child.material = new THREE.MeshStandardMaterial({
              map: color,
              aoMap: aoMap,
              normalMap: normal,
              roughnessMap: roughness,
            })
          }

          // Add shadow
          // _child.castShadow = true
          // _child.receiveShadow = true
        }
      })

      this.scene.add(this.model)
      this.model.position.set(1, -2, 12)
      this.model.rotation.y = - Math.PI * 0.5
    })
  }

  addLights() {
    const xPos = [-9.3, -4.3, 0.7, 5.7, 10.7, 15.7]
    const zPos = [2.5, 10.6]

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 6; j++) {
        const light = new THREE.PointLight(0xffffdd, 0.8);
        // const helper = new THREE.PointLightHelper(light)
        light.position.set(xPos[j], 1.2, zPos[i])
        this.scene.add(light);
      }
    }

    const light2 = new THREE.AmbientLight(0xffffff, 0.1)
    this.scene.add(light2)
  }

  addControls() {
    // set the controls
    if (this.isMobile && !this.debugMode) {
      // orientation controls

      this.controls = new DeviceOrientationControls(this.camera);
      this.started = true
      this.crosshairCanvas.style.display = ''
    }
    else {

      this.controls = new PointerLockControls(this.camera, this.renderer.domElement)
      this.controls.lock()

      instructions.addEventListener('click', () => {
        this.controls.lock();
      });

      this.controls.addEventListener('lock', () => {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
        this.crosshairCanvas.style.display = ''
        this.started = true
      });

      this.controls.addEventListener('unlock', () => {
        blocker.style.display = 'block';
        instructions.style.display = '';
        this.crosshairCanvas.style.display = 'none'
        this.started = false
      });
    }
  }

  addLightPass() {
    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.width, this.height),
      1.3, // strength
      1.0, // radius
      0.26 // threshold
    )

    this.renderer.postProcess.composer.addPass(this.bloomPass)

    if (this.debug) {
      this.debugFolder.addInput(
        this.bloomPass,
        'strength',
        { label: 'strength', min: 0.0, max: 10.0, step: 0.01 }
      )
      this.debugFolder.addInput(
        this.bloomPass,
        'radius',
        { label: 'radius', min: 0.0, max: 2.0, step: 0.01 }
      )
      this.debugFolder.addInput(
        this.bloomPass,
        'threshold',
        { label: 'threshold', min: 0.0, max: 2.0, step: 0.01 }
      )
    }

  }

  update() {

    // this.camera.instance.rotation.y -= 0.005
    // this.camera.instance.rotation.x += Math.sin(this.time.elapsed * 0.001) * 0.0002
  }

  destroy() { }
}