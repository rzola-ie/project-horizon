<template>
  <header id="header">
    <button v-if="isHomePage">
      <svg height="32" width="32" viewBox="0 0 32 32" stroke="#3d7664">
        <line
          x1="3"
          y1="3"
          x2="28"
          y2="3"
          stroke-width="6"
          stroke-linecap="round"
        />
        <line
          x1="3"
          y1="15.5"
          x2="16"
          y2="15.5"
          stroke-width="6"
          stroke-linecap="round"
        />
        <line
          x1="3"
          y1="29"
          x2="28"
          y2="29"
          stroke-width="6"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button v-else class="back" @click="goBack">
      <svg height="28" width="40" viewBox="0 0 40 29" stroke="#3d7664">
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
    <img src="/assets/tepezza.svg" alt="" />
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
  },
  mounted() {
    console.log(this.$route.name);
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

  padding: 0.5em 1em;

  display: grid;
  grid-template-columns: 1fr auto 1fr;
  /* justify-content: center; */
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