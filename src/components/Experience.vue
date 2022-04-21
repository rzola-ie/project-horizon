<template>
  <div class="live" :id="$route.params.experience">
    <div class="menu">
      <div class="header">
        <router-link class="header-back-button" to="/">
          <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664" aria-hidden="true">
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
          <span class="sr-only">Back to main menu</span>
        </router-link>
        <!-- back button -->

        <h1>LOOK CLOSER,<br />the danger can be hard to see.</h1>
        <p>Choose a symptom to get started.</p>
      </div>
      <div class="menu-group">
        <button
          id="blur"
          :class="['menu-button', {selected: experience === 'blur' }]"
          :disabled=" experience === 'blur'"
          @click="selectMode('blur')"
        >
        <img src="/assets/dry-gritty-eyes-icon.svg" alt="" />
          Blurred Vision
        </button>

        <button
          id="double"
          :class="['menu-button', { selected: experience === 'double' }]"
          :disabled=" experience === 'double'"
          @click="selectMode('double')"
        >
          <img src="/assets/diplopia-icon.svg" alt="" />
          Diplopia
        </button>

        <button
          id="color"
          :class="['menu-button', { selected: experience === 'color' }]"
          :disabled=" experience === 'color'"
          @click="selectMode('color')"
        >
          <img src="/assets/color-loss.svg" alt="" />
          Color Vision Loss
        </button>

        <button
          id="light"
          :class="['menu-button', { selected: experience === 'light' }]"
          :disabled=" experience === 'light'"
          @click="selectMode('light')"
        >
          <img src="/assets/photophobia-icon.svg" alt="" />
          Photophobia
        </button>

        <button
          id="eyes"
          :class="['menu-button', { selected: experience === 'eyes' }]"
          :disabled=" experience === 'eyes'"
          @click="selectMode('eyes')"
        >
          <img src="/assets/proptosis-icon.svg" alt="" />
          Proptosis
        </button>
      </div>
    </div>
    <div class="container" ref="container"></div>

    <svg viewBox="0 0 8 17" id="overlay-mobile" v-if="experience === 'eyes' && isMobile">
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
          @click="toggleMenu"
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
        :class="['menu-button', { selected: experience === 'blur' }]"
        @click="selectMode('blur')"
      >
        Blurred Vision
      </button>

      <button
        id="double"
        :class="['menu-button', { selected: experience === 'double' }]"
        @click="selectMode('double')"
      >
        Diplopia
      </button>

      <button
        id="color"
        :class="['menu-button', { selected: experience === 'color' }]"
        @click="selectMode('color')"
      >
        Color Vision Loss
      </button>

      <button
        id="light"
        :class="['menu-button', { selected: experience === 'light' }]"
        @click="selectMode('light')"
      >
        Photophobia
      </button>

      <button
        id="eyes"
        :class="['menu-button', { selected: experience === 'eyes' }]"
        @click="selectMode('eyes')"
      >
        Proptosis
      </button>
    </div>
    <!-- mobile button -->

    <router-link class="back-button" to="/">
      <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664" aria-hidden="true">
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
      <span class="sr-only">Back to main menu</span>
    </router-link>
    <!-- mobile back button -->

    <div class="orientation-modal" id="turn-landscape">
      <router-link class="back-button" to="/">
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
          <h2>Please turn your device.</h2>
          <p>This experience cannot be used in portrait mode</p>
        </div>
      </div>
    </div>
    <!-- turn landscape modal -->

    <div class="orientation-modal" id="turn-portrait">
      <router-link class="back-button" to="/">
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
          <h2>Please turn your device.</h2>
          <p>This experience cannot be used in landscape mode</p>
        </div>
      </div>
    </div>
    <!-- turn portrait modal -->

    <div class="legal">
      Simulated Image
    </div>
  </div>
</template>

<script>
import MainThreeScene from "../classes/MainThreeScene";
import EyeBulge from "../classes/EyeBulge";

export default {
  data() {
    return {
      experience: "",
      hideControls: true,
      hideOverlay: true,
    };
  },
  mounted() {
    if(this.$route.params.experience == undefined && !sessionStorage.getItem('mode')){
      this.$router.push('/')
      return
    }

    this.experience =
      this.$route.params.experience || sessionStorage.getItem('mode');

    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if(!this.isMobile) {
      document.querySelector('#turn-landscape').style.display = 'none'
      document.querySelector('#turn-portrait').style.display = 'none'
    }

    if(this.experience === 'eyes')
      this.scene = new EyeBulge({ canvasId: "three-canvas" });

    if(this.experience !== 'eyes')
      this.selectMode(this.experience, true)

    this.setIdleTimeout();
  },
  beforeUnmount() {
    if(this.scene)
      this.scene.destroy();
      this.scene = null;
  },
  methods: {
    toggleMenu() {
      this.hideControls = !this.hideControls

      this.setIdleTimeout()
    },
    selectMode(mode) {
      this.experience = mode;
      document.querySelector('.live').setAttribute('id', mode);

      this.hideControls = true

      if(this.scene)
        this.scene.destroy();

      if(document.querySelector('#three-canvas'))
        document.querySelector('#three-canvas').remove()

      if(document.querySelector('video'))
        document.querySelector('video').remove()

      if(mode === 'eyes') {
        this.scene = new EyeBulge({ canvasId: "three-canvas" });
        this.hideOverlay = false
      }

      if(mode !== 'eyes') {
        this.scene = new MainThreeScene({
          targetElement: this.$refs.container,
          mode: this.experience,
        });
        this.hideOverlay = true
      }

      this.setIdleTimeout()
      this.sendGTM(mode)
    },
    sendGTM(data, isFirstCall = false) {
      if(isFirstCall) return

      try {
        let postObject = JSON.stringify({
          event: 'click',
          data: data
        })
        parent.postMessage(postObject, window.origin)
      } catch(e) {
        window.console && window.console.log(e)
      }
    },
    setIdleTimeout() {
      if(this.timeOut) clearTimeout(this.timeOut)

      this.timeOut = setTimeout(() => {
        this.$router.push('/')
      }, 1000 * 60 * 2)
    }
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

.menu {
  display: none;

  @media screen and (min-width: $breakpoint) {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: scroll;
    min-width: 350px;
    width: 25%;
    background-color: $color2;
    z-index: 9999;
  }
}

.menu .header {
  padding: 1rem 1rem 2rem;
  background-color: white;
  z-index: 10;

  h1 {
    color: $color2;
    margin-bottom: 1rem;
    padding: 0 1rem;
    text-transform: uppercase;
  }

  p {
    padding: 0 1rem;
    font-family: "Helvetica", sans-serif;
    font-size: 1.1rem;
    color: #666;
  }
}

.menu .menu-group {
  padding: 1rem;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  gap: 0.5rem;
  z-index: 9;
}

.menu .menu-group button {
  position: relative;
  padding: 1rem 1rem 1rem 20px;
  border-radius: 0;
  border: none;
  background-color: $color3;
  font-size: 1.2em;
  font-family: $font2;
  color: $color2;
  font-weight: bold;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1em;
  box-shadow: 0 4px 10px rgb(black, 0.3);
  cursor: pointer;


  &.selected {
    background-color: white;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 12px;
      height: 100%;
      background-color: $color4;
    }
  }

  & img {
    width: 100px;
  }
}

#overlay-mobile {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  @media screen and (min-width: $breakpoint) {
    display: none;
  }
}

.container {
  position: fixed;
  overflow: hidden;
  inset: 0;
  z-index: 1;

  @media screen and (min-width: $breakpoint) {
    position: relative;
    height: auto;
    height: 100%;
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

  @media screen and (min-width: $breakpoint) {
    display: none
  }
}

@media screen and (orientation: portrait) {
  .button-group {
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 50px);

    &.hidden {
      bottom: -350px;
    }

    button#blur {
      grid-row: 2;
    }

    button#light {
      grid-row: 5;
    }
    button#double {
      grid-row: 3;
    }
    button#color {
      grid-row: 4;
    }
    button#eyes {
      grid-row: 6;
    }
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

  button#blur {
    grid-row: 2;
    grid-column: 1 / 3;

  }
  button#light {
    grid-row: 3;
    grid-column: 2/4;

  }
  button#double {
    grid-row: 2;
    grid-column: 3/5;
  }
  button#color {
    grid-row: 2;
    grid-column: 5/7

  }
  button#eyes {
    grid-row: 3;
    grid-column: 4/6;
  }
  }

.button-group .controls {
  grid-row: 1;
  grid-column: 3 / 5;
}
}

.button-group button {
  position: relative;
  color: white;
  width: 100%;
  padding: 0.5em;
  color: $color2;
  background-color: white;
  border: 1px solid $color2;
  font-family: "Oswald", sans-serif;
  font-size: 1.2em;

  &.selected {
    background-color: $color3;

    &::before {
      $border-size: 4px;
      $border-width: 2px;
      $border-offset: calc($border-size * 2 - $border-width) * 2;

      content: '';
      position: absolute;
      border: $border-width solid $color2;
      top: $border-size;
      left: $border-size;
      height: calc(100% - $border-offset);
      width: calc(100% - $border-offset);
    }
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


  @media screen and (min-width: $breakpoint) {
    display: none
  }
}

.header-back-button {
  height: 40px;
  width: 40px;
  padding: 10px;
  margin-bottom: 1rem;
  border-radius: 50%;
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

.legal {
  position: absolute;
  padding: 0.5rem 1rem;
  color: white;
  background: rgba(black, 0.3);
  z-index: 9998;
  bottom: 62px;
  right: 0;
  left: 0;
  text-align: right;
  font-size: 12px;

  @media screen and (min-width: $breakpoint) {
    bottom: 0;
  }
}
</style>