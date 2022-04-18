<template>
  <header id="header" v-show="!isExperiencePage && !isEmbeddedPage && !isSymptomsPage">
    <button v-if="false" class="back" @click="goBack">
      <svg height="28" width="40" viewBox="0 0 40 29" stroke="#ffffff">
        <line
          x1="2"
          y1="14.5"
          x2="16"
          y2="2"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="2"
          y1="14.5"
          x2="38"
          y2="14.5"
          stroke-width="4"
          stroke-linecap="round"
        />
        <line
          x1="2"
          y1="14.5"
          x2="16"
          y2="27"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </button>
  </header>
</template>

<script>
export default {
  data() {
    return {
      route: "index",
    };
  },
  computed: {
    isHomePage() {
      return this.$route.name == "Home";
    },
    isExperiencePage() {
      return this.$route.name == "liveExperience";
    },
    isEmbeddedPage() {
      return this.$route.name == "embed"
    },
    isSymptomsPage() {
      return this.$route.name == 'liveMode'
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped lang="scss">
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-height: 60px;
  min-height: 60px;
  padding: 0.5em 1em;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  /* justify-content: center; */
  background-color: $color2;
  z-index: 9999;
}

#header > img {
  width: 100px;
}

button {
  position: relative;
  height: 22px;
  width: 22px;
  background-color: transparent;
  border: none;
  align-self: center;
}

button svg {
  height: 100%;
  width: 100%;
}

.back {
  position: relative;
  width: 29px;
  height: 21px;
  align-self: center;

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>