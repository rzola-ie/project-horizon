<template>
  <div class="face">
    <div class="container" ref="container">
    </div>
  </div>
</template>

<script>
import JeelizTest from '../classes/JeelizTest'

export default {
  data() {
    return {
      scene: null,
      experience: null,
    };
  },
  mounted() {
      this.scene = new JeelizTest({ targetElement: this.$refs.container });
  },
  unmounted() {
    this.scene.destroy();
    this.scene = null;
  },
};
</script>

<style lang="scss" scoped>
$header-offset: 60px;

.face {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  z-index: 1;
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
</style>