<template>
  <div class="live" :id="$route.params.experience">
    <div class="container" ref="container"></div>

    <svg viewBox="0 0 8 17" class="overlay" v-if="!hideOverlay">
      <defs>
        <mask id="eye-mask" maskUnits="objectBoundingBox">
          <rect x="0" y="0" width="8" height="17" fill="rgba(255, 255, 255, 0.15)" />
          <rect x="0.1" y="4.5" width="7.8" height="2.5" fill="black" />
        </mask>
      </defs>
      <g mask="url(#eye-mask)">
        <rect x="0" y="0" width="8" height="17" fill="black" />
      </g>  

      <path d="M0.1 5 v-0.5h0.5 m6.8 0 h0.5v0.5 m0 1.5 v0.5h-0.5 m-6.8 0 h-0.5v-0.5" stroke="white" stroke-width="0.05" fill="none"/>
    </svg>

    <div :class="['button-group', { hidden: hideControls }]">
      <div class="controls">
        <button
          @click="
            () => {
              hideControls = !hideControls;
            }
          "
        >Menu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
      <button
        id="blur"
        :class="{ selected: experience === 'blur' }"
        @click="selectMode('blur')"
      >
        Blurry
      </button>

      <button
        id="light"
        :class="{ selected: experience === 'light' }"
        @click="selectMode('light')"
      >
        Light
      </button>

      <button
        id="double"
        :class="{ selected: experience === 'double' }"
        @click="selectMode('double')"
      >
        Double
      </button>

      <button
        id="color"
        :class="{ selected: experience === 'color' }"
        @click="selectMode('color')"
      >
        Color
      </button>

      <button
        id="eyes"
        :class="{ selected: experience === 'eyes' }"
        @click="selectMode('eyes')"
      >
        Eye Bulge
      </button>
    </div>

    <router-link class="back-button" to="/live">
      <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664">
        <line
          x1="2"
          y1="14.5"
          x2="16"
          y2="2"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="2"
          y1="14.5"
          x2="38"
          y2="14.5"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="2"
          y1="14.5"
          x2="16"
          y2="27"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </router-link>

    <div class="orientation-modal" id="turn-landscape">
      <router-link class="back-button" to="/live">
        <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664">
          <line
            x1="2"
            y1="14.5"
            x2="16"
            y2="2"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="2"
            y1="14.5"
            x2="38"
            y2="14.5"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="2"
            y1="14.5"
            x2="16"
            y2="27"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </router-link>

      <div class="body">
        <img src="/assets/landscape-mode.svg" alt="">
        <div class="content">
          <h2>Please turn your phone.</h2>
          <p>This experience cannot be used in portrait mode</p>
        </div>
      </div>
    </div>

    <div class="orientation-modal" id="turn-portrait">
      <router-link class="back-button" to="/live">
        <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664">
          <line
            x1="2"
            y1="14.5"
            x2="16"
            y2="2"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="2"
            y1="14.5"
            x2="38"
            y2="14.5"
            stroke-width="4"
            stroke-linecap="round"
          />
          <line
            x1="2"
            y1="14.5"
            x2="16"
            y2="27"
            stroke-width="4"
            stroke-linecap="round"
          />
        </svg>
      </router-link>

      <div class="body">
        <img src="/assets/portrait-mode.svg" alt="">
        <div class="content">
          <h2>Please turn your phone.</h2>
          <p>This experience cannot be used in landscape mode</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";
import EyeBulge from "../classes/EyeBulge";

export default {
  data() {
    return {
      experience: "",
      hideControls: true,
      hideOverlay: false
    };
  },
  mounted() {
    this.experience =
      this.$route.params.experience || sessionStorage.getItem("mode");

    this.hideOverlay = this.experience !== 'eyes'

    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(!this.isMobile) {
      document.querySelector('.orientation-modal').style.display = 'none'
    }


    if(this.experience != 'eyes') {
      this.scene = new MainThreeScene({
        targetElement: this.$refs.container,
        mode: this.experience,
      });
    } else {
      this.scene = new EyeBulge({ canvasId: "three-canvas" });
    }

    document.addEventListener('resize', () => {
      this.selectMode(this.experience)
    })
  },
  unmounted() {
    this.scene.destroy();
    this.scene = null;
  },
  methods: {
    selectMode(mode) {
      this.experience = mode;
      document.querySelector('.live').setAttribute('id', mode);

      this.scene.destroy();
      if(document.querySelector('canvas'))
        document.querySelector('canvas').remove()

      if(mode != 'eyes') {
        this.scene = new MainThreeScene({
          targetElement: this.$refs.container,
          mode: this.experience,
        });
      } else {
        this.scene = new EyeBulge({ canvasId: "three-canvas" });
      }

      this.hideControls = true
    },
  },
};
</script>

<style lang="scss" scoped>
.live {
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  background-color: black;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.container {
  position: fixed;
  overflow: hidden;
  inset: 0;
  z-index: 1;

  @media screen and (min-width: 768px) {
    position: relative;
    height: auto;
    aspect-ratio: 16 / 9;
    width: 100%;
  }
}

.container canvas {
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  z-index: 9998;
}

.orientation-modal {
  position: fixed;
  inset: 1em;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2em;
  z-index: 9999;
  border-radius: 0.25em;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);

  img {
    height: 150px;
    width: 150px;
  }

  .header {
    padding: 1em
  }

  .body {
    padding: 0 3.5em;
    display: flex;
    align-items: center;
    flex-direction: column;

    * {
      color: $color2;
      text-align: center;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 0.4em;
  }

  p {
    font-size: 1.2em;
    text-align: center;
  }
}

@media screen and (orientation: portrait) {
  // CSS applied when the device is in portrait mode
.live:not(#eyes) .orientation-modal#turn-landscape {
    display: flex;
  }
.live:not(#eyes) .orientation-modal#turn-portrait {
    display: none;
  }
.live#eyes .orientation-modal#turn-portrait {
    display: none;
  }
.live#eyes .orientation-modal#turn-landscape {
    display: none;
  }
}

@media screen and (orientation: landscape) {
  // CSS applied when the device is in landscape mode
.live:not(#eyes) .orientation-modal#turn-landscape {
    display: none;
  }
.live:not(#eyes) .orientation-modal#turn-portrait {
    display: none;
  }
.live#eyes .orientation-modal#turn-portrait {
    display: flex;
  }
}

.button-group {
  position: fixed;
  width: 100%;
  padding: 0.4em 1em 1.4em 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 40px);
  gap: 1em;
  justify-items: center;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: $color2;
  transition: all 150ms ease-in-out;

  &.hidden {
    bottom: 0px;

    .controls button svg {
      transform: rotate(180deg);
    }
  }
}

@media screen and (orientation: portrait) {
  .button-group {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 50px);

    &.hidden {
      bottom: -350px;
    }
  }

  button#blur {
    grid-row: 2;

  }
  button#light {
    grid-row: 3;

  }
  button#double {
    grid-row: 4;

  }
  button#color {
    grid-row: 5;

  }
  button#eyes {
    grid-row: 6;
  }

  .button-group .controls {
    grid-row: 1;
  }
}

@media screen and (orientation: landscape) {
  .button-group {
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: 1fr 1fr 1fr;

    &.hidden {
      bottom: -155px;
    }
  }

  button#blur {
    grid-row: 2;
    grid-column: 1 / 3;

  }
  button#light {
    grid-row: 2;
    grid-column: 3/5;

  }
  button#double {
    grid-row: 2;
    grid-column: 5/7;
  }
  button#color {
    grid-row: 3;
    grid-column: 2/4

  }
  button#eyes {
    grid-row: 3;
    grid-column: 4/6;
  }

.button-group .controls {
  grid-row: 1;
  grid-column: 3 / 5;
}
}

button {
  color: white;
  width: 100%;
  padding: 0.5em;
  color: $color2;
  background-color: white;
  border: 1px solid $color2;
  border-radius: 4px;
  font-family: "Oswald", sans-serif;
  font-size: 1.2em;

  &.selected {
    border: 1px solid white;
    color: $color4;

    font-weight: bold;
  }
}

.button-group .controls {

  button {
    border: none;
    background-color: transparent;
    align-self: end;
    color: white;
    justify-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5em;
    font-size: 1.3em;

    svg {
   height: 30px;
    width: 30px;
    }
  }
}

.back-button {
  height: 40px;
  width: 40px;
  position: fixed;
  padding: 10px;
  border-radius: 50%;
  top: 1em;
  left: 1em;
  z-index: 9999;
  background-color: rgba(white, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>