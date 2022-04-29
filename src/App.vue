<template>
  <Header />
  <main id="main">
    <router-view />
  </main>
</template>

<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style lang="scss">
body {
  font-family: $font1;
  background-color: $color2;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

h1,
h2,
h3,
h4 {
  font-family: $font2;
}

#main {
  height: calc(100vh - 60px);
  width: 100vw;
}

.sr-only {
  position: absolute !important;
  margin: -1px 0 0 -1px !important;
  padding: 0 !important;
  display: block !important;
  width: 1px !important;
  height: 1px !important;
  font-weight: normal !important;
  font-size: 15px !important;
  line-height: 1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  border: 0 !important;
  outline: 0 !important;
  cursor: text !important;
}
</style>
