<template>
    <div id="app">
        <site-title title="QuiEz"></site-title>
        <transition name="router-animation"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <router-view></router-view>
            <router-view name="user"></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "App"
    };
</script>

<style scoped lang="scss">
    @import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css";

    .app {
        position: relative;
    }
</style>
