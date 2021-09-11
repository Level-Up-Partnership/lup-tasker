<template>
  <div>
    <h1>Category Suggestion</h1>
    <router-link
      @click="creatingPost"
      to="/forum/categorysuggestion/postCreation"
      >CREATE POST</router-link
    >
    <div v-if="isLoaded">
      <all-posts
        v-for="categoryPosts in categoryForumPosts"
        :key="categoryPosts.forumpostid"
        :fourmId="categoryPosts.forumpostid"
        :forumTitle="categoryPosts.title"
        :forumDescription="categoryPosts.description"
        :createdAt="categoryPosts.created_at"
      ></all-posts>
    </div>
    <router-view v-if="isCreatingPost"></router-view>
  </div>
</template>

<script>
import axios from "axios";
import AllPosts from "../../../components/Forum/AllPosts.vue";
export default {
  components: {
    AllPosts,
  },
  data() {
    return {
      isCreatingPost: false,
      isLoaded: false,
      categoryForumPosts: [],
      forumId: null,
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