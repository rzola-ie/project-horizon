<template>
  <div class="story">
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
  data() {
    return {
      scene: null,
    };
  },
  mounted() {
    this.scene = new MainThreeScene({ targetElement: this.$refs.container });
  },
};
</script>

<style lang="scss" scoped>
.story {
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
</style>