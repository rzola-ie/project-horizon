<template>
  <ThreeScene />
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
import ThreeScene from "./ThreeScene.vue";

export default {
  name: "Home",
  components: {
    ThreeScene,
  },
};
</script>

<style lang="scss" scoped>
#content {
  height: 100%;
  width: 100%;
  /* background-color: rgba(220, 220, 220, 0.7); */
  padding: 2em;
  display: flex;
  align-items: center;
  gap: 1rem;
}

#content a {
  text-align: center;
  padding: 6em;
  text-decoration: none;
  transition: background-color 250ms ease-in-out;
}

#content a.story {
  background-color: teal;
  color: white;
  transition: background-color 250ms ease-in-out;
}

#content a.story:hover {
  background-color: rgb(0, 71, 71);
}

#content a.live {
  background-color: white;
  color: teal;
}

#content a.live:hover {
  background-color: rgb(213, 213, 213);
}
</style>