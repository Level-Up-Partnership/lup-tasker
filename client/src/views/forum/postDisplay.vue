<template>
  <div v-if="isLoaded">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <button @click="deletePost" v-if="userIdPost === currentUserId">
      DELETE
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
      forumId: null,
      categoryId: null,
      userIdPost: null,
      currentUserId: null,
      isLoaded: false,
    };
  },
  async created() {
    await axios
      .get("/getPosts", {
        headers: {
          token: localStorage.getItem("token"),
          forumid: this.$route.params.id,
        },
      })
      .then((res) => {
        console.log(res);
        this.title = res.data.userPostInfo[0].title;
        this.categoryId = res.data.userPostInfo[0].categoryid;
        this.description = res.data.userPostInfo[0].description;
        this.forumId = res.data.userPostInfo[0].forumpostid;
        this.userIdPost = res.data.userPostInfo[0].userid;
        this.currentUserId = res.data.currentUserid;
        this.isLoaded = true;
      });
  },
  methods: {
    async deletePost() {
      await axios
        .delete("/deletePost", {
          headers: {
            token: localStorage.getItem("token"),
            forumid: this.forumId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.$router.push(`/forum/category/${this.categoryId}/`);
    },
  },
};
</script>


<style scoped>
</style>