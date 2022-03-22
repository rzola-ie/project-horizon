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
        <img src="/assets/dry-gritty-eyes-icon.svg" alt="" />
        Blurred Vision
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'double' } }"
      >
        <img src="/assets/diplopia-icon.svg" alt="" />
        Double Vision / <br > Diplopia
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'color' } }"
      >
        <img src="/assets/eye-pressure-pain-icon.svg" alt="" />
        Color Vision Loss
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'light' } }"
      >
        <img src="/assets/photophobia-icon.svg" alt="" />
        Light Sensetivity / <br > Photophobia
      </router-link>

      <router-link
        class="symptom"
        :to="{ name: 'liveExperience', params: { experience: 'eyes' } }"
      >
        <img src="/assets/proptosis-icon.svg" alt="" />
        Bulging Eyes / <br > Proptosis
      </router-link>
      <!-- <router-link
        class="symptom"
        :to="{ name: 'faceExperience', params: { experience: 'red' } }"
      >
        <img src="/assets/Red.svg" alt="" />
        Redness
      </router-link> -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#live {
  height: calc(100vh - 60px);
  width: 100%;
  background-color: white;

  display: flex;
  flex-direction: column;

  @media screen and (min-width: 768px) {
    padding: 2em;
  }
}

h1 {
  margin-bottom: 0.5em;
  padding: 0.5em 2em;
  font-weight: 500;
  font-size: 1.2em;
  font-family: "Barlow", sans-serif;
  text-align: center;
  color: $color2;

  @media screen and (min-width: 768px) {
    font-size: 2em
  }
}

.symptoms {
  width: 100%;
  padding: 1.6em 0.5em;
  display: grid;
  flex: 1;
  grid-template-rows: repeat(5, auto);
  background-color: $color2;
  // grid-template-columns: repeat(2, auto);
  gap: 0.5em;

  @media screen and (min-width: 768px) {
    gap: 2em;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

.symptom {
  position: relative;

  width: 100%;
  padding: 0 1em;
  display: grid;
  grid-template-columns: auto 1fr;
  // flex-direction: column;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  border-radius: 0.4em;
  color: $color2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  background-color: white;
  font-family: "Oswald", sans-serif;
  font-size: 1.3em;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: lighten($color2, 60%);
    &::after {
      content: "";
      inset: 8px;
      position: absolute;
      border: 4px solid $color2;
    }
  }

  & a {
    text-decoration: none;
    color: white;
  }

  & img {
    height: 90px;
    width: 90px;
  }
}
</style>