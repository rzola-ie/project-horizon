<template>
    <div class="threeScene">
        <div class="container" ref="container"></div>
    </div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
    name: "ThreeScene",
    props: {
        msg: String,
    },
    mounted() {
        new MainThreeScene(this.$refs.container);
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
