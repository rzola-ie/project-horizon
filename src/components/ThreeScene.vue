<template>
    <div class="container" ref="container"></div>
</template>

<script>
import MainThreeScene from "@/classes/MainThreeScene";

export default {
    name: "ThreeScene",
    props: {
        msg: String,
    },
    mounted() {
        this.scene = new MainThreeScene({ targetElement: this.$refs.container });
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus"></style>
