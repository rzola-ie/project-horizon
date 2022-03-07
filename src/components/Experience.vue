<template>
  <div class="live" :id="$route.params.experience">
    <div class="container" ref="container">
      <canvas id="three-canvas"></canvas>
    </div>
    <div class="button-group">
      <button
        :class="{ selected: experience === 'blur' }"
        @click="selectMode('blur')"
      >
        blur
      </button>

      <button
        :class="{ selected: experience === 'light' }"
        @click="selectMode('light')"
      >
        light
      </button>

      <button
        :class="{ selected: experience === 'double' }"
        @click="selectMode('double')"
      >
        double
      </button>

      <button
        :class="{ selected: experience === 'color' }"
        @click="selectMode('color')"
      >
        color
      </button>
    </div>
  </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";
import Blur from "@/classes/Blur";

export default {
  data() {
    return {
      experience: "",
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
  $header-offset: 6em;

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
  inset: 6em 0 0;
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
  padding: 1em;
  display: flex;
  gap: 1em;
  bottom: 1em;
  left: 0;
  z-index: 9999;
}

button {
  color: white;
  width: 33%;
  padding: 0.5em;
  color: $color3;
  background-color: rgba($color2, 0.4);
  border: 1px solid $color3;

  &.selected {
    border: 1px solid $color2;
    color: teal;
    background-color: $color3;
    font-weight: bold;
  }
}
</style>