<template>
  <div class="face">
    <div class="container" ref="container">
      <canvas id="three-canvas"></canvas>
    </div>
  </div>
</template>

<script>
import EyeBulge from "../classes/EyeBulge";
import EyeRed from "../classes/EyeRed";

export default {
  data() {
    return {
      scene: null,
      experience: null,
    };
  },
  mounted() {
    this.experience =
      this.$route.params.experience || sessionStorage.getItem("mode");

    if (this.experience == "eyes")
      this.scene = new EyeBulge({ canvasId: "three-canvas" });

    if (this.experience == "red")
      this.scene = new EyeRed({ canvasId: "three-canvas" });
  },
  unmounted() {
    this.scene.destroy();
    this.scene = null;
  },
};
</script>

<style lang="scss" scoped>
.face {
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

.container canvas {
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
  padding: 0.2em;
  color: yellow;
  background-color: rgba(#4bc0e1, 0.4);
  border: 1px solid yellow;

  &.selected {
    border: 1px solid #4bc0e1;
    color: teal;
    background-color: yellow;
  }
}
</style>