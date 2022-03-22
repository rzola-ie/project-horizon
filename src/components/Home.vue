<template>
  <div id="content">
    <div class="info top">
      <h1>
        Thyroid Eye Disease <span>(TED)</span> is a
        progressive, chronic autoimmune disease
        with heterogeneous signs and symptoms
        that can threaten patients' vision<sup><small>1,2</small></sup>
      </h1>
      <p>
        TED symptoms are caused by the stimulation of
        orbital fibroblasts, which causes inflammation
        behind the eye.<sup><small>4</small></sup>
      </p>
    </div>
    <div class="modes">
      <a class="live" href="/live">
        <img src="/assets/eye.svg" alt="" />
        <h2>Live Mode</h2>
        <p>
          See what the world around you would look like with a retinal eye
          condition.
        </p>
      </a>
    </div>
    <div class="info bottom">
      <p>
        If you notice any changes or worsening symptopms it is
        important to consult with a TED Specialist quickly. <sup><small>3</small></sup> 
        Thyroid Eye Disease is a progressive chronic, 
        potentially vision-threatening autoimmune disease,
        and co-managing can change the course of TED.<sup><small>3,9</small></sup>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss" scoped>
h1 {
  position: relative;
  font-size: 1.2em;
  padding: 1em 1em 1em 2em;

  &::before {
    content: '';
    position: absolute;
    left: 1em;
    height: calc(100% - 2em);
    width: 8px;
    background-color: $color4;
  }

  & span {
    color: $color2;
  }
}

.info.top {
  margin-bottom: 1.5em;
}

.info p {
  padding: 0 1em;
    font-size: 0.95em;
    line-height: 1.4;
}

h2 {
  font-size: 2em;
}

p {
  font-size: 1.1em;
  color: $color2;
  font-weight: 500;
}

#content {
  height: 100%;
  width: 100%;
  padding: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 992px) {
    gap: 2em;
  }
}

.modes {
  margin-bottom: 1.5em;
}

.modes a {
  width: 350px;
  height: 350px;
  position: relative;
  text-align: center;
  padding: 2em;
  text-decoration: none;
  transition: background-color 250ms ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 992px) {
    height: 250px;
    width: 400px;
  }
}

a img {
  width: 40%;
}

.modes a.live {
  background-color: $color3;
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

@media screen and (orientation: portrait) {
  // CSS applied when the device is in portrait mode
  .modes {
    // color: red;
    flex-direction: column;
  }
}

@media screen and (orientation: landscape) {
  // CSS applied when the device is in landscape mode
  .modes {
    // color: red;
    flex-direction: row;
  }
}
</style>