import * as THREE from "three"
import { Pane } from 'tweakpane'

import Camera from './Camera'
import Renderer from './Renderer'

import Sizes from '../utils/Sizes'
import Stats from '../utils/Stats'
import Time from '../utils/Time'
import RAF from '../utils/RAF'

import Screen from './Screen'
import EyeBulge from "./EyeBulge"

export default class MainThreeScene {
	static instance

	constructor(_options) {
		this.bind()

		if (MainThreeScene.instance) {
			return MainThreeScene.instance
		}

		MainThreeScene.instance = this

		this.targetElement = _options.targetElement

		if (!this.targetElement) {
			console.warn('Missing \'targetElement\' property')
			return
		}

		this.time = new Time()
		this.sizes = new Sizes()

		this.setConfig()
		this.setStats()
		this.setDebug()
		this.setScene()
		this.setCamera()
		this.setRenderer()

		this.mode = _options.mode || sessionStorage.getItem('mode');
		sessionStorage.setItem('mode', this.mode)

		this.setScreen()

		RAF.subscribe('threeSceneUpdate', this.update)
		window.addEventListener('resize', this.resize)
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
	}

	setStats() {
		if (this.config.debug) {
			this.stats = new Stats(true)
		}
	}

	setDebug() {
		if (this.config.debug) {
			this.debug = new Pane()
			this.debug.containerElem_.style.width = '320px'
			this.debug.containerElem_.style.zIndex = 99999
		}
	}

	setScene() {
		this.scene = new THREE.Scene()
	}

	setCamera() {
		this.camera = new Camera()
	}

	setRenderer() {
		this.renderer = new Renderer()
		this.targetElement.appendChild(this.renderer.instance.domElement)
	}

	setScreen() {
		this.screen = new Screen({ mode: this.mode })
	}

	update() {
		if (this.stats)
			this.stats.update()

		if (this.renderer)
			this.renderer.update()

		if (this.camera)
			this.camera.update()

		if (this.screen)
			this.screen.update()
	}

	resize() {
		const boundings = this.targetElement.getBoundingClientRect()
		this.config.width = boundings.width
		this.config.height = boundings.height || window.innerHeight
		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2)

		if (this.camera)
			this.camera.resize()

		if (this.renderer)
			this.renderer.resize()

		if(this.screen)
			this.screen.resize()
	}

	destroy() {
		if (this.camera)
			this.camera.destroy()

		if (this.renderer)
			this.renderer.destroy()

		if (this.screen)
			this.screen.destroy()

		if (this.mode)
			sessionStorage.removeItem('mode')

		MainThreeScene.instance = null
	}

	bind() {
		this.resize = this.resize.bind(this)
		this.update = this.update.bind(this)
	}
}