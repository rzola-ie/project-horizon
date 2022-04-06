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
  height: 100vh;
  width: 100vw;
}
</style>
