<template>
  <div id="content">
      <h1>Page Not Found</h1>
  </div>
</template>

<style scoped>
h1 {
    color: white;
}

#content {
  height: 100%;
  width: 100%;
  padding: 0.4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;

  @media screen and (min-width: 992px) {
    gap: 2em;
  }
}
</style>