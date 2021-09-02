<template>
  <div>
    <h1>Social</h1>
    <router-link @click="creatingPost" to="/forum/social/postCreation"
      >CREATE POST</router-link
    >
    <router-view v-if="isCreatingPost"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCreatingPost: false,
    };
  },
  methods: {
    creatingPost() {
      this.isCreatingPost = !this.isCreatingPost;
    },
  },
};
</script>

<style>
</style>