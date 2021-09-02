<template>
  <div>
    <h1>Help Desk</h1>
    <router-link @click="creatingPost" to="/forum/helpdesk/postCreation"
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