import * as THREE from 'three'
import JeelizResizer from '../lib/jeeliz/helpers/JeelizResizer.js'

export default class JeelizTest {
    constructor(_options) {
        this.canvasId = _options.canvasId
        console.log('flenein', this.canvasId)
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500)
        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        })
        this.idealWidth
        this.idealHeight

        let that = this
        JeelizResizer.size_canvas({
            canvasId: this.canvasId,
            callback: (isError, bestVideoSettings) => {
              if (isError) {
                console.log('failed to init canvas')
                return
              }

              this.setIdealDimensions(bestVideoSettings.idealWidth, bestVideoSettings.idealHeight)
            }
          })
    }

    setIdealDimensions(width, height) {
        this.idealWidth = width;
        this.idealHeight = height

        console.log(this.idealWidth, this.idealHeight)
    }

    destroy() {
        console.log('bye bestie')
    }
}