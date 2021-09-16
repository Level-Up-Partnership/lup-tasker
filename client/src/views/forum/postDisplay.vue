<template>
  <div v-if="isLoaded">
    <button @click="deletePost" v-if="userIdPost === currentUserId">
      DELETE POST
    </button>
    <button>
      <router-link :to="`/forum/category/${categoryId}/postid=${forumId}`"
        >REPLY POST</router-link
      >
    </button>
    <forum-post-headings
      :forumTitle="title"
      :forumDescription="description"
    ></forum-post-headings>
  </div>
</template>

<script>
import axios from "axios";
import ForumPostReplies from "../../components/Forum/ForumPostReplies.vue";
import ForumPostHeadings from "../../components/Forum/ForumPostHeadings.vue";
export default {
  components: { ForumPostReplies, ForumPostHeadings },
  data() {
    return {
      description: "",
      forumId: null,
      categoryId: null,
      userIdPost: null,
      currentUserId: null,
      isLoaded: false,
      userForumInfo: [],
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
        this.userForumInfo = res;
        console.log(res);
        this.title = res.data.userPostInfo[0].title;
        this.categoryId = res.data.userPostInfo[0].categoryid;
        this.description = res.data.userPostInfo[0].description;
        this.forumId = res.data.userPostInfo[0].forumpostid;
        this.userIdPost = res.data.userPostInfo[0].userid;
        this.currentUserId = res.data.currentUserid;
        this.isLoaded = true;
      });
    console.log(this.userForumInfo);
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
    async topicReply() {
      await axios.post("/postReply", {});
    },
  },
};
</script>




<style scoped>
</style>