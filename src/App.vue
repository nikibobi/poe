<template>
  <div id="app">
    <GithubRibbon username="nikibobi" project="poe" orientation="right" color="white"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GithubRibbon from './components/GithubRibbon.vue';

@Component({
  components: {
    GithubRibbon
  }
})
export default class App extends Vue {}
</script>

<style>
@font-face {
    font-family: Fontin;
    src: url(~@/assets/fonts/Fontin-SmallCaps.ttf);
}

* {
    margin: 0;
    padding: 0;
    font-family: Fontin, sans-serif;
    box-sizing: border-box;
}

body {
    background-image: url('https://web.poecdn.com/gen/image/YTozOntpOjA7aTowO2k6/MjthOjI6e3M6MjoiaWQi/O2k6OTE3O3M6NDoic2l6/ZSI7czo0OiJvcmlnIjt9/aToxO2k6NDt9/8d591da8f8/Act5.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    color:white;
}
</style>
