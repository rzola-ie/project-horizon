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
:root {
  --mobile-breakpoint: 567px;
  --tablet-breakpoint: 768px;
  --desktop-up: 992px;
  --big-desktop: 1200px;

  --main-padding: 0.2em;
  --header-clearing: 6em;
}

$header-clearing: 6em;

body {
  font-family: "Barlow", sans-serif;
  // background-color: $color3;
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
  font-family: "Oswald", sans-serif;
  color: $color1;
}

#main {
  height: calc(100vh - 60px);
  width: 100vw;
}
</style>
