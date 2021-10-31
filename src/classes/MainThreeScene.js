import * as THREE from "three"
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import Camera from './Camera'

import RAF from '../utils/RAF'
import MyGUI from '../utils/MyGUI'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'

import simpleFrag from '../shaders/simple.frag'
import simpleVert from '../shaders/simple.vert'

export default class MainThreeScene {
	constructor(_container) {

		window.experience = this
		this.targetElement = _container
		
		this.bind()
		this.init()
	}

	init() {
		if(!this.targetElement) {
			console.warn('Missing \'targetElement\' property')
			return
		}

		this.time = new Time()
		this.sizes = new Sizes()

		this.setConfig()
		this.setDebug()
		this.setScene()
		this.setCamera()
		this.setRenderer()

		this.setPostProcessing()
		this.setDummyCube()

		//RENDER LOOP AND WINDOW SIZE UPDATER SETUP
		this.sizes.on('resize', () => {
			this.resizeCanvas()
		})

		RAF.subscribe('threeSceneUpdate', this.update)
	}

	setConfig() {
		this.config = {}

		// debug
		this.config.debug = window.location.hash === '#debug'

		// pixel ratio
		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

		//dimensions
		const boundings = this.targetElement.getBoundingClientRect()
		this.config.width = boundings.width;
		this.config.height = boundings.height || window.innerHeight;

		// controls
		this.config.controls = true

		// post processing
		this.config.usePostProcessing = true;
	}

	setDebug() {
		MyGUI.hide()
		if(this.config.debug) {
			MyGUI.show()
		}
	}

	setScene() {
		this.scene = new THREE.Scene()
	}

	setCamera() {
		this.camera = new Camera()
	}

	setRenderer() {
		this.renderer = new THREE.WebGLRenderer({ antialias: true })
		this.renderer.setSize(this.config.width, this.config.height)
		this.renderer.setPixelRatio(this.config.pixelRatio)
		this.renderer.debug.checkShaderErrors = true

		this.targetElement.appendChild(this.renderer.domElement)
	}

	setPostProcessing() {
		this.postProcess = {}

		// render target
		const RenderTargetClass = this.config.pixelRatio >= 2 ? THREE.WebGLRenderTarget : THREE.WebGLMultisampleRenderTarget
		this.postProcess.renderTarget = new RenderTargetClass(
			this.config.width,
			this.config.height,
			{
				generateMipmaps: false,
				minFilter: THREE.LinearFilter,
				magFilter: THREE.LinearFilter,
				format: THREE.RGBFormat,
				encoding: THREE.sRGBEncoding
			}
		)

		// effect composer
		this.postProcess.composer = new EffectComposer(this.renderer, this.postProcess.renderTarget)

		// passes
		this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)

		// add passes
		this.postProcess.composer.addPass(this.postProcess.renderPass)
	}

	setDummyCube() {
		const shaderMat = new THREE.MeshBasicMaterial()
		const cube = new THREE.Mesh(new THREE.BoxGeometry(), shaderMat)
		this.scene.add(cube)
	}

	update() {
		if(this.camera)
			this.camera.update()

		if(this.config.usePostProcessing) {
			this.postProcess.composer.render()
		} else {
			this.renderer.render(this.scene, this.camera.instance);
		}
	}

	resizeCanvas() {
		const boundings = this.targetElement.getBoundingClientRect()
		this.config.width = boundings.width
		this.config.height = boundings.height || window.innerHeight
		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

		this.renderer.setSize(this.config.width, this.config.height)
		this.renderer.setPixelRatio(this.config.pixelRatio)

		if(this.camera)
			this.camera.resize()
	}

	bind() {
		this.resizeCanvas = this.resizeCanvas.bind(this)
		this.update = this.update.bind(this)
		this.init = this.init.bind(this)
	}
}