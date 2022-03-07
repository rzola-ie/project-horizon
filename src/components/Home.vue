<template>
  <div id="content">
    <a class="story" href="/story">
      <h2>Story Mode</h2>
      <p>
        Experience life through the eyes of a patient with a retinal eye
        condition
      </p>
    </a>
    <a class="live" href="/live">
      <h2>Live Mode</h2>
      <p>
        See what the world around you would look like with a retinal eye
        condition.
      </p>
    </a>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
#content {
  height: 100%;
  width: 100%;
  /* background-color: rgba(220, 220, 220, 0.7); */
  padding: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;

  @media screen and (min-width: 992px) {
    gap: 2em;
  }
}

@media screen and (orientation: portrait) {
  // CSS applied when the device is in portrait mode
  #content {
    // color: red;
    flex-direction: column;
  }
}

@media screen and (orientation: landscape) {
  // CSS applied when the device is in landscape mode
  #content {
    // color: red;
    flex-direction: row;
  }
}

#content a {
  height: 100%;
  width: 100%;
  position: relative;
  text-align: center;
  padding: 2em;
  text-decoration: none;
  transition: background-color 250ms ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 992px) {
    height: 250px;
    width: 400px;
  }
}

#content a.story {
  background-color: $color2;
  color: white;
  transition: background-color 250ms ease-in-out;

  h2 {
    color: white;
  }

  &:hover {
    background-color: darken($color: $color2, $amount: 10%);

    &::after {
      content: "";
      inset: 8px;
      position: absolute;

      border: 4px solid white;
    }
  }
}

#content a.live {
  background-color: white;
  color: $color2;

  h2 {
    color: $color2;
  }

  &:hover {
    background-color: lighten($color: $color2, $amount: 65%);
    color: darken($color: $color2, $amount: 15%);

    h2 {
      color: darken($color: $color2, $amount: 15%);
    }

    &::after {
      content: "";
      inset: 8px;
      position: absolute;

      border: 4px solid $color2;
    }
  }
}
</style>