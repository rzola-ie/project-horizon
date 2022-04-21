<template>
  <div id="live">
    <div class="text-container">
      <h1 class="mobile">
        LOOK CLOSER, the danger can be hard to see. <br />
        Choose a symptom to get started.
      </h1>

      <div class="desktop">
        <h1>LOOK CLOSER,<br />the danger can be hard to see.</h1>
        <p>Choose a symptom to get started.</p>
      </div>
    </div>
    <nav class="symptoms">
      <router-link
        class="symptom"
        @click="sendGTM('blur')"
        :to="{ name: 'liveExperience', params: { experience: 'blur' } }"
      >
        <img src="/assets/icons/dry.png" alt="" />
        Blurred Vision
      </router-link>

      <router-link
        class="symptom"
        @click="sendGTM('double')"
        :to="{ name: 'liveExperience', params: { experience: 'double' } }"
      >
        <img src="/assets/icons/diplo.png" alt="" />
        Diplopia
      </router-link>

      <router-link
        class="symptom"
        @click="sendGTM('color')"
        :to="{ name: 'liveExperience', params: { experience: 'color' } }"
      >
        <img src="/assets/icons/color.png" alt="" />
        Color Vision Loss
      </router-link>

      <router-link
        class="symptom"
        @click="sendGTM('light')"
        :to="{ name: 'liveExperience', params: { experience: 'light' } }"
      >
        <img src="/assets/icons/photo.png" alt="" />
        Photophobia
      </router-link>

      <router-link
        class="symptom"
        @click="sendGTM('eyes')"
        :to="{ name: 'liveExperience', params: { experience: 'eyes' } }"
      >
        <img src="/assets/icons/proptosis.png" alt="" />
        Proptosis
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    sendGTM(data) {
      try {
        let postObject = JSON.stringify({
          event: 'click',
          data: data
        })
        parent.postMessage(postObject, window.origin)
      } catch(e) {
        window.console && window.console.log(e)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* CONTAINER
================================ */
#live {
  height: 100vh;
  width: 100%;
  margin-top: 60px;
  background-color: $color2;
  display: flex;
  flex-direction: column;
}

/* TEXT CONTAINER
================================ */
.text-container {
  padding: 2rem 1rem;
  background-color: white;

  @media screen and (min-width: $breakpoint) {
    padding: 2em 1em 1em;
    background-color: transparent;
  }

  @media screen and (orientation: landscape) {
    padding: 1rem;
  }
}

.text-container .mobile {
  margin: auto;
  font-weight: 500;
  font-size: 1.2em;
  font-family: $font2;
  text-align: center;
  color: $color2;
  margin: auto;

  @media screen and (min-width: $breakpoint) {
    display: none;
  }

  @media screen and (orientation: portrait) {
    width: clamp(300px, 100%, $breakpoint);

    br {
      display: none;
    }
  }

  @media screen and (orientation: landscape) {

    text-align: center;
  }
}

.text-container .desktop {
  display: none;
  color: white;

  text-align: center;
  line-height: 1.2;


  @media screen and (min-width: $breakpoint) {
    display: block;
    background-color: $color2;
  }

  h1 {
    font-size: 4em; 
    text-transform: uppercase;
  }

  p {
    font-family: "Helvetica", sans-serif;
    padding: 1em;
    font-size: 1.5em;
    color: rgba(white, 0.6);
  }
}

.symptoms {
  max-width: 1440px;
  margin: auto;
  padding: 1.6em 0.8em;
  display: grid;
  flex: 1;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 1fr);
  gap: 0.5em;

  @media screen and (orientation: landscape) {
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    gap: 0.5rem;
  }

  @media screen and (min-width: $breakpoint) {
    padding: 0 5rem;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 1rem;
    align-items: unset;
  }
}

.symptom {
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  justify-self: center;
  align-items: center;
  color: $color2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  background-color: $color3;
  font-family: $font2;
  font-size: 1em;
  font-weight: bold;
  text-decoration: none;
  padding: 1rem;
  cursor: pointer;

  @media screen and (orientation: landscape) {
      height: 120px;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      justify-items: center;
      font-size: 1.5vw;
  }

  @media screen and (min-width: $breakpoint) {
      height: 200px;
      grid-template-columns: 1fr;
      grid-template-rows: auto auto;
      justify-items: center;
      font-size: 1.5vw;
  }

  &:hover {
    background-color: lighten($color2, 60%);
    &::after {
      content: "";
      inset: 4px;
      position: absolute;
      border: 2px solid $color2;
    }
  }

  & img {
    width: 50%;
    min-width: 90px;

    @media screen and (orientation: landscape) {
        width: 65%;
    }
  }
}
</style>