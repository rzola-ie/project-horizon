<template>
  <div class="container" ref="container"></div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
  name: "ThreeScene",
  props: {
    msg: String,
  },
  mounted() {
    this.scene = new MainThreeScene({ targetElement: this.$refs.container });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  overflow: hidden;
}

.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>
