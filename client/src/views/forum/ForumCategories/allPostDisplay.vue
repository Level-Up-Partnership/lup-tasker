<template>
  <div>
    <h1>{{ title }}</h1>
    <router-link
      @click="creatingPost"
      :to="`/forum/category/${categoryId}/postcreation`"
      >CREATE POST</router-link
    >
    <div>
      <h1>
        {{ getPostsError }}
      </h1>
    </div>
    <div v-if="isLoaded">
      <all-posts
        :categoryName="routeTitle"
        v-for="categoryPosts in categoryForumPosts"
        :key="categoryPosts.forumpostid"
        :username="categoryPosts.username"
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
      title: "",
      routeTitle: "",
      isCreatingPost: false,
      isLoaded: false,
      categoryForumPosts: [],
      categoryId: this.$route.params.id,
      getPostsError: "",
    };
  },
  async created() {
    await axios
      .get("/getPosts", {
        headers: {
          token: localStorage.getItem("token"),
          categoryid: this.$route.params.id,
        },
      })
      .then((res) => {
        this.categoryForumPosts = res.data.userPosts;
        this.title = res.data.title[0].title;
        this.isLoaded = true;
        console.log(res);
      })
      .catch(() => {
        this.getPostsError = "No posts have been created";
      });
    if (this.isLoaded) {
      this.routeTitle = this.title;
      const routeName = this.routeTitle.replace(" ", "");
      this.routeTitle = routeName;
    }
  },

  methods: {
    creatingPost() {
      this.isCreatingPost = !this.isCreatingPost;
    },
  },
};
</script>



<style scoped>
</style>