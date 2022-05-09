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
  created() {
    window.onload = () => {
      if(this.$route.query.GTMID) {
        const googleHeadTag = document.head.getElementsByTagName('script')[0]
        googleHeadTag.src = `https://www.googletagmanager.com/gtm.js?id=${this.$route.query.GTMID}`

        const googleBodyTag = document.body.getElementsByTagName('noscript')[0]
        googleBodyTag.innerText = `<iframe src="https://www.googletagmanager.com/ns.html?id=${this.$route.query.GTMID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
      }
    }

  },
};
</script>

<style lang="scss">
html,
body {
  font-family: $font1;
  background-color: black;
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
