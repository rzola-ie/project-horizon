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
      <div class="symptom"></div>
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


}

h1 {
  margin: auto;
  padding: 0.8em 2em;
  font-weight: 500;
  font-size: 1.2em;
  font-family: "Barlow", sans-serif;
  text-align: center;
  color: $color2;

  @media screen and (orientation: portrait) {

    width: clamp(375px, 100%, 550px);
  }

  @media screen and (orientation: landscape) {
    max-width: 500px;
    padding: 0.4em 2em;
  }

}

.symptoms {
  width: 100%;
  padding: 1.6em 0.8em;
  display: grid;
  flex: 1;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, auto);
  background-color: $color2;
  gap: 0.5em;



  @media screen and (orientation: landscape) {
    gap: 1em;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}

.symptom {
  position: relative;

  display: grid;
  grid-template-columns: auto 1fr;
  justify-content: space-between;
  justify-self: center;
  justify-items: center;
  align-items: center;
  color: $color2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  background-color: $color3;
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

  @media screen and (orientation: portrait) {
    width: clamp(375px, 100%, 550px);
    padding: 0 1em;

    & img {
      height: 90px;
      width: 90px;
    }

    &:last-child {
      display: none;
    }
  }

  @media screen and (orientation: landscape) {
    width: 100%;
    padding: 0 0.5em;

    & img {
      height: 60px;
      width: 60px;
    }
  }
}
</style>