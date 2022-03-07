<template>
  <div id="live">
    <h1>
      Choose a symptom to see your world through the eyes of someone with a
      retinal eye condition
    </h1>
    <div class="symptoms">
      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'blur' } }"
      >
        <img src="/assets/Blur.svg" alt="" />
        Blurry Vision
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'double' } }"
      >
        <img src="/assets/Double.svg" alt="" />
        Double Vision
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'color' } }"
      >
        <img src="/assets/Color.svg" alt="" />
        Color Vision Loss
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'light' } }"
      >
        <img src="/assets/Light.svg" alt="" />
        Light Sensetivity
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'faceExperience', params: { experience: 'eyes' } }"
      >
        <img src="/assets/Eyes.svg" alt="" />
        Eye Bulge
      </router-link>
      <router-link
        class="symptom"
        :to="{ name: 'faceExperience', params: { experience: 'red' } }"
      >
        <img src="/assets/Red.svg" alt="" />
        Redness
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#live {
  height: calc(100vh - 6em);
  width: 100%;
  padding: 0.5em;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    padding: 2em;
  }
}

h1 {
  margin-bottom: 0.5em;
}

.symptoms {
  width: 100%;
  flex: 1;
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, auto);
  gap: 0.5em;

  @media screen and (min-width: 768px) {
    gap: 2em;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

.symptom {
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: $color2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  color: white;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: darken($color2, 10%);
    &::after {
      content: "";
      inset: 8px;
      position: absolute;
      border: 4px solid white;
    }
  }

  & a {
    text-decoration: none;
    color: white;
  }

  & img {
    height: 100px;
    width: 100px;
  }
}
</style>