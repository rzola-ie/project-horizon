import { WebGLRenderer, sRGBEncoding, PCFSoftShadowMap, ReinhardToneMapping, WebGLRenderTarget, WebGLMultisampleRenderTarget, LinearFilter, RGBAFormat } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

import MainThreeScene from './MainThreeScene'

export default class Renderer {
  constructor(_options) {
    this.bind()

    this.experience = new MainThreeScene()
    this.scene = this.experience.scene
    this.config = this.experience.config
    this.stats = this.experience.stats
    this.debug = this.experience.debug
    this.time = this.experience.time
    this.sizes = this.experience.sizes
    this.camera = this.experience.camera

    this.usePostprocess = true

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Renderer'
      })
    }

    this.setInstance()
    this.setPostProcess()
  }

  setInstance() {
    this.clearColor = '#000000'

    if (this.debug) {
      this.debugFolder.addInput(
        this,
        'clearColor'
      )
        .on('change', () => {
          this.instance.setClearColor(this.clearColor)
        })
    }

    // Renderer
    this.instance = new WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.inset = '0'
    this.instance.domElement.setAttribute('id', 'three-canvas')

    this.instance.setClearColor(this.clearColor, 1)
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    this.instance.outputEncoding = sRGBEncoding

    this.context = this.instance.getContext()

    // add stats panel
    if (this.stats) {
      this.stats.setRenderPanel(this.context)
    }
  }

  setPostProcess() {
    this.postProcess = {}

    // render target
    const RenderTargetClass = this.config.pixelRatio >= 2 ? WebGLRenderTarget : WebGLMultisampleRenderTarget
    this.renderTarget = new RenderTargetClass(
      this.config.width,
      this.config.height,
      {
        generateMipmaps: false,
        minFilter: LinearFilter,
        magFilter: LinearFilter,
        format: RGBAFormat,
        encoding: sRGBEncoding
      }
    )
    // effect composer
    this.postProcess.composer = new EffectComposer(this.instance, this.renderTarget)

    // passes
    this.postProcess.renderPass = new RenderPass(this.scene, this.camera.instance)

    // add passes
    this.postProcess.composer.addPass(this.postProcess.renderPass)
  }

  resize() {
    // Instance
    this.instance.setSize(this.config.width, this.config.height)
    this.instance.setPixelRatio(this.config.pixelRatio)

    // Post process
    this.postProcess.composer.setSize(this.config.width, this.config.height)
    this.postProcess.composer.setPixelRatio(this.config.pixelRatio)
  }

  update() {
    if (this.stats) {
      this.stats.beforeRender()
    }

    if (this.usePostprocess) {
      this.postProcess.composer.render()
    }
    else {
      this.instance.render(this.scene, this.camera.instance)
    }

    if (this.stats) {
      this.stats.afterRender()
    }
  }

  destroy() {
    this.instance.renderLists.dispose()
    this.instance.dispose()
    this.renderTarget.dispose()
    this.postProcess.composer.renderTarget1.dispose()
    this.postProcess.composer.renderTarget2.dispose()
  }

  bind() {
    this.resize = this.resize.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }
}