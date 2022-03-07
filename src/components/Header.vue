<template>
  <header id="header">
    <img src="/assets/ie.svg" alt="" />
    <img src="/assets/horizon.svg" alt="" />
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  min-height: 6em;
  height: 6em;
  padding: 2em;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
}

#header img {
  height: 100%;
}
</style>