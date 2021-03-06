
import '../lib/jeeliz/dist/jeelizFaceFilter'
import { BufferGeometryLoader, Mesh, ShaderMaterial } from '../lib/three/v112/three.min.js'

import JeelizResizer from '../lib/jeeliz/helpers/JeelizResizer.js'
import '../lib/jeeliz/helpers/JeelizThreeHelper.js'

import vertex from '../shaders/bulge/vertex.glsl'
import fragment from '../shaders/bulge/fragment.glsl'

export default class EyeBulge {
  constructor(_options) {
    this.bind()

    this.container = document.querySelector('.container')
    this.canvasId = _options.canvasId
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    this.setCanvas()

    if(this.isMobile) {
      this.orientationCheck()
    } else {
      this.init()
    }
  }

  orientationCheck() {
    if(window.matchMedia('(orientation: portrait)').matches) {
      this.init()
    } else {
      window.addEventListener('resize', () => {
        this.init()
      }, { once: true })
    }
  }

  setCanvas() {
    const breakpoint = window.innerWidth >= 900

    if(document.querySelector('#three-canvas') == null) {
      this.canvas = document.createElement('canvas')
      this.canvas.setAttribute('id', this.canvasId)
      this.canvas.style.position = 'fixed'
      this.canvas.style.inset = 0
      this.canvas.style.height = '100%'
      this.canvas.style.width = '100%'
      this.canvas.style.zIndex = '9998'
      this.container.appendChild(this.canvas)
    }

    this.targetElement = document.getElementById(this.canvasId)
  }

  init() {
    JeelizResizer.size_canvas({
      canvasId: this.canvasId,
      callback: this.initFaceFilter,
      overSamplingFactor: Math.min(Math.max(window.devicePixelRatio, 1), 2),
      isFullScreen: true,
      onResize: () => {
        JeelizThreeHelper.update_camera(this.camera);
      }
    })
  }

  initFaceFilter(bestVideoSettings) {
    JEELIZFACEFILTER.init({
      canvasId: this.canvasId,
      NNCPath: '/neuralNets/', // path to JSON neural network model (NN_DEFAULT.json by default)
      videoSettings: { // increase the default video resolution since we are in full screen
        'idealWidth': 1280,  // ideal video width in pixels
        'idealHeight': 800,  // ideal video height in pixels
        'maxWidth': 1920,    // max video width in pixels
        'maxHeight': 1920    // max video height in pixels
      },
      maxFacesDetected: 1,
      callbackReady: (errCode, spec) => {
        if (errCode) {
          console.log('AN ERROR HAS OCCURRED. ERROR CODE =', errCode);
          return;
        }
        // [init scene with spec...]
        console.log('INFO: FACE FILTER IS READY');
        this.initThreeScene(spec)
      }, //end callbackReady()

      // called at each render iteration (drawing loop)
      callbackTrack: (detectState) => {
        // Render your scene here
        // [... do something with detectState]
        // console.log(detectState)
        JeelizThreeHelper.render(detectState, this.camera);
      } //end callbackTrack()
    });
  }

  initThreeScene(spec) {
    const threeStuffs = JeelizThreeHelper.init(spec, this.detectCallback);

    // CREATE THE MASK:
    const maskLoader = new BufferGeometryLoader();
    /*
    faceLowPoly.json has been exported from dev/faceLowPoly.blend using THREE.JS blender exporter with Blender v2.76
    */
    maskLoader.load('/models/face.json', (geometry) => {
      geometry.computeVertexNormals();

      const threeMask = new Mesh(geometry, this.buildMaskMaterial(spec.videoTransformMat2));

      threeMask.frustumCulled = false;
      threeMask.scale.multiplyScalar(1.2);
      threeMask.position.set(0, 0.2, -0.5);

      threeStuffs.faceObject.add(threeMask);
    });

    this.camera = JeelizThreeHelper.create_camera();
  }

  buildMaskMaterial(videoTransformMat2) {
    const mat = new ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      uniforms: {
        samplerVideo: { value: JeelizThreeHelper.get_threeVideoTexture() },
        videoTransformMat2: { value: videoTransformMat2 }
      }
    })

    return mat
  }

  detectCallback(isDetected) {
    if (isDetected) {
      console.log('INFO in detect_callback(): DETECTED');
    } else {
      console.log('INFO in detect_callback(): LOST');
    }
  }

  update() { }

  destroy() {
    JEELIZFACEFILTER.destroy()

    if(document.querySelector('canvas'))
      document.querySelector('canvas').remove()

    if(document.querySelector('video'))
      document.querySelector('video').remove()

    this.canvas = null
    this.camera = null
    this.gl = null

    window.removeEventListener('resize', this.resize, false)
  }

  bind() {
    this.initFaceFilter = this.initFaceFilter.bind(this)
  }
}