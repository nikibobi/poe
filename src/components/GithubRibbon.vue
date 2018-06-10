<template>
    <a :href="link">
        <img :src="image" :style="{ [this.orientation]: 0 }" alt="Fork me on GitHub">
    </a>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

const palete = {
    red: "aa0000",
    green: "007200",
    darkblue: "121621",
    orange: "ff7600",
    gray: "6d6d6d",
    white: "ffffff"
}

// https://blog.github.com/2008-12-19-github-ribbons
@Component
export default class GitHubRibbon extends Vue {
  @Prop() username!: string;
  @Prop({ default: null }) project!: string;
  @Prop({ default: "left" }) orientation!: "left" | "right";
  @Prop({ default: "red" }) color!: "red" | "green" | "darkblue" | "orange" | "gray" | "white";

  get link() {
      let url = `https://github.com/${this.username}`;
      if (this.project) {
          url += `/${this.project}`;
      }
      return url;
  }

  get image() {
      return `https://s3.amazonaws.com/github/ribbons/forkme_${this.orientation}_${this.color}_${palete[this.color]}.png`;
  }
}
</script>

<style scoped>
img {
    position: fixed;
    top: 0;
    border: 0;
}
</style>
