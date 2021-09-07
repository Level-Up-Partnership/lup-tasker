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
import axios from "axios";
export default {
  data() {
    return {
      isCreatingPost: false,
    };
  },
  async created() {
    await axios
      .get("/getPosts", {
        headers: {
          token: localStorage.getItem("token"),
          route: this.$route.name,
          categoryid: 3,
        },
      })
      .then((res) => {
        console.log(res);
      });
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