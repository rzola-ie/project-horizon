<template>
  <div class="live" :id="$route.params.experience">
    <div class="container" ref="container">
      <canvas id="three-canvas"></canvas>
    </div>
    <div :class="['button-group', { hidden: hideControls }]">
      <div class="controls">
        <button
          @click="
            () => {
              hideControls = !hideControls;
            }
          "
        >
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
  </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
  data() {
    return {
      experience: "",
      hideControls: false,
    };
  },
  mounted() {
    this.experience =
      this.$route.params.experience || sessionStorage.getItem("mode");

    console.log(this.experience);

    this.scene = new MainThreeScene({
      targetElement: this.$refs.container,
      mode: this.experience,
    });
  },
  unmounted() {
    this.scene.destroy();
    this.scene = null;
  },
  methods: {
    selectMode(mode) {
      this.experience = mode;

      this.scene.destroy();

      this.scene = new MainThreeScene({
        targetElement: this.$refs.container,
        mode: this.experience,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.live {
  $header-offset: 60px;

  position: relative;
  height: 100%;
  width: 100%;
  margin-top: $header-offset;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.container {
  position: fixed;
  overflow: hidden;
  inset: 60px 0 0;
  z-index: 1;

  @media screen and (min-width: 768px) {
    position: relative;
    height: auto;
    aspect-ratio: 16 / 9;
    width: 100%;
    // inset: 50%;
    // transform: translate(-50%, -50%);
  }
}
.container #three-canvas {
  height: 100%;
  width: 100%;
}

@media screen and (orientation: portrait) {
  // CSS applied when the device is in portrait mode
  .horizontal-message {
    // color: red;
    display: static;
  }
}

@media screen and (orientation: landscape) {
  // CSS applied when the device is in landscape mode
  .horizontal-message {
    // color: red;
    display: none;
  }
}

.button-group {
  position: fixed;
  width: 100%;
  padding: 0.4em 1em 1.4em 1em;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1em;
  justify-items: center;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(black, 0.5);
  transition: all 150ms ease-in-out;

  &.hidden {
    bottom: -110px;

    .controls button {
      transform: rotate(180deg);
    }
  }
}

button {
  color: white;
  width: 100%;
  padding: 0.5em;
  color: $color2;
  background-color: white;
  border: 1px solid $color2;
  border-radius: 30px;

  &.selected {
    border: 1px solid white;
    color: white;
    background-color: $color2;
    font-weight: bold;
  }
}

button#blur {
  grid-row: 2 / 3;
  grid-column: 1 / 3;
}
button#light {
  grid-row: 2 / 3;
  grid-column: 3 / 5;
}
button#double {
  grid-row: 2 / 3;
  grid-column: 5 / 7;
}
button#color {
  grid-row: 3 / 4;
  grid-column: 2 / 4;
}
button#eyes {
  grid-row: 3 / 4;
  grid-column: 4 / 6;
}

.button-group .controls {
  grid-row: 1 / 2;
  grid-column: 6 / 7;

  button {
    height: 30px;
    width: 30px;
    border: none;
    background-color: transparent;

    svg {
      height: 100%;
      width: 100%;
    }
  }
}
</style>