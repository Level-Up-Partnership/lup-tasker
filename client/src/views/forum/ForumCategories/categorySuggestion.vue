<template>
  <div>
    <h1>Category Suggestion</h1>
    <router-link
      @click="creatingPost"
      to="/forum/categorysuggestion/postCreation"
      >CREATE POST</router-link
    >
    <div v-if="isLoaded">
      <div
        v-for="categoryPosts in categoryForumPosts"
        :key="categoryPosts.forumpostid"
      >
        {{ categoryPosts }}
      </div>
    </div>
    <router-view v-if="isCreatingPost"></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      isCreatingPost: false,
      isLoaded: false,
      categoryForumPosts: [],
    };
  },
  async created() {
    await axios
      .get("/getPosts", {
        headers: {
          token: localStorage.getItem("token"),
          route: this.$route.name,
          categoryid: 1,
        },
      })
      .then((res) => {
        // console.log(res);
        this.categoryForumPosts = res.data;
        this.isLoaded = true;
      });
    console.log(this.categoryForumPosts);
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