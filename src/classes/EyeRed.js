
import '../lib/jeeliz/jeelizFaceFilter'
import * as THREE from '../lib/three/v112/three.min.js'
import JeelizResizer from '../lib/jeeliz/helpers/JeelizResizer.js'
import '../lib/jeeliz/helpers/JeelizThreeHelper.js'

import vertex from '../shaders/bulge/vertex.glsl'
import fragment from '../shaders/bulge/fragment.glsl'

export default class EyeBulge {
  constructor(_options) {
    this.canvasId = _options.canvasId
    this.init()
    console.log('lets goooo')
  }

  init() {
    JeelizResizer.size_canvas({
      canvasId: this.canvasId,
      callback: (isError, bestVideoSettings) => {
        this.initFaceFilter(bestVideoSettings);
      }
    })
  }

  initFaceFilter(videoSettings) {
    JEELIZFACEFILTER.init({
      canvasId: this.canvasId,
      NNCPath: '/neuralNets/', // path to JSON neural network model (NN_DEFAULT.json by default)
      videoSettings: videoSettings,
      callbackReady: (errCode, spec) => {
        if (errCode) {
          console.log('AN ERROR HAPPENS. ERROR CODE =', errCode);
          return;
        }
        // [init scene with spec...]
        console.log('INFO: JEELIZFACEFILTER IS READY');
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

    // Add our face model:
    const loader = new THREE.BufferGeometryLoader();

    loader.load(
      '/models/face.json',
      (geometry) => {
        const mat = new THREE.MeshBasicMaterial({
          // DEBUG: uncomment color, comment map and alphaMap
          // color: new THREE.Color(0xFF0000),
          map: new THREE.TextureLoader().load('/models/texture.png'),
          alphaMap: new THREE.TextureLoader().load('/models/alpha_map_256.png'),
          transparent: true,
          opacity: 0.6
        });

        const faceMesh = new THREE.Mesh(geometry, mat);
        faceMesh.position.y += 0.25;
        faceMesh.position.z -= 0.3;

        threeStuffs.faceObject.add(faceMesh);
      }
    )

    // CREATE THE VIDEO BACKGROUND
    function create_mat2d(threeTexture, isTransparent) { //MT216 : we put the creation of the video material in a func because we will also use it for the frame
      return new THREE.RawShaderMaterial({
        depthWrite: false,
        depthTest: false,
        transparent: isTransparent,
        vertexShader: "attribute vec2 position;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_Position=vec4(position, 0., 1.);\n\
          vUV=0.5+0.5*position;\n\
        }",
        fragmentShader: "precision lowp float;\n\
        uniform sampler2D samplerVideo;\n\
        varying vec2 vUV;\n\
        void main(void){\n\
          gl_FragColor=texture2D(samplerVideo, vUV);\n\
        }",
        uniforms: {
          samplerVideo: { value: threeTexture }
        }
      });
    }

    //MT216 : create the frame. We reuse the geometry of the video
    const calqueMesh = new THREE.Mesh(threeStuffs.videoMesh.geometry, create_mat2d(new THREE.TextureLoader().load('./images/cadre_france.png'), true))
    calqueMesh.renderOrder = 999; // render last
    calqueMesh.frustumCulled = false;
    threeStuffs.scene.add(calqueMesh);

    // CREATE THE CAMERA
    this.camera = JeelizThreeHelper.create_camera();
  } // end init_threeScene()


  buildMaskMaterial(videoTransformMat2) {
    /*
      THIS IS WHERE THE DEFORMATIONS ARE BUILT:
      1) create a tearpoint where the deformation will be located
      2) add a displacement(x, y) to deform the zone around your tearpoint
      3) select a radius: the bigger the radius the bigger the size of the deformed zone
      around your tearpoint will be
    */
    // const vertexShaderSource = 'uniform mat2 videoTransformMat2;\n\
    // varying vec2 vUVvideo;\n\
    // // deformation 0 parameters:\n\
    // const vec2 TEARPOINT0 = vec2(0.,-0.5);\n\
    // const vec2 DISPLACEMENT0 = vec2(0.,0.15);\n\
    // const float RADIUS0 = 0.4;\n\
    // // deformation 1 parameters:\n\
    // const vec2 TEARPOINT1 = vec2(0.25,-0.4);\n\
    // const vec2 DISPLACEMENT1 = vec2(0.12,-0.07);\n\
    // const float RADIUS1 = 0.3;\n\
    // // deformation 2 parameters:\n\
    // const vec2 TEARPOINT2 = vec2(-0.25,-0.4);\n\
    // const vec2 DISPLACEMENT2 = vec2(-0.12,-0.07);\n\
    // const float RADIUS2 = 0.3;\n\
    // void main() {\n\
    //   vec3 positionDeformed=position;\n\
    //   // apply deformation 0\n\
    //   float deformFactor0 = 1.-smoothstep(0.0, RADIUS0, distance(TEARPOINT0, position.xy));\n\
    //   positionDeformed.xy += deformFactor0*DISPLACEMENT0;\n\
    //   // apply deformation 1\n\
    //   float deformFactor1 = 1.-smoothstep(0.0, RADIUS1, distance(TEARPOINT1, position.xy));\n\
    //   positionDeformed.xy += deformFactor1*DISPLACEMENT1;\n\
    //   // apply deformation 2\n\
    //   float deformFactor2 = 1. - smoothstep(0.0, RADIUS2, distance(TEARPOINT2, position.xy));\n\
    //   positionDeformed.xy += deformFactor2*DISPLACEMENT2;\n\
    //   // project deformed point:\n\
    //   vec4 mvPosition = modelViewMatrix * vec4( positionDeformed, 1.0 );\n\
    //   vec4 projectedPosition=projectionMatrix * mvPosition;\n\
    //   gl_Position=projectedPosition;\n\
    //   // compute UV coordinates on the video texture:\n\
    //   vec4 mvPosition0 = modelViewMatrix * vec4( position, 1.0 );\n\
    //   vec4 projectedPosition0 = projectionMatrix * mvPosition0;\n\
    //   vUVvideo = vec2(0.5,0.5) + videoTransformMat2 * projectedPosition0.xy / projectedPosition0.w;\n\
    // }';

    // const fragmentShaderSource = "precision mediump float;\n\
    // uniform sampler2D samplerVideo;\n\
    // varying vec2 vUVvideo;\n\
    // void main() {\n\
    //   gl_FragColor = texture2D(samplerVideo, vUVvideo);\n\
    // }";

    const mat = new THREE.ShaderMaterial({
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
    console.log(isDetected)
    if (isDetected) {
      console.log('INFO in detect_callback(): DETECTED');
    } else {
      console.log('INFO in detect_callback(): LOST');
    }
  }

  update() { }

  destroy() {
    JEELIZFACEFILTER.destroy()
  }
}