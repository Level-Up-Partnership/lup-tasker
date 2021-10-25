<template>
  <div v-if="isLoaded">
    <button
      @click="deletePost"
      v-if="
        userPost.data.userPostInfo[0].userid === userPost.data.currentUserid
      "
    >
      DELETE POST
    </button>
    <button>
      <router-link
        :to="`/forum/category/${userPost.data.userPostInfo[0].categoryid}/postid=${forumId}`"
        >REPLY POST</router-link
      >
    </button>
    <forum-post-headings
      :forumTitle="userPost.data.userPostInfo[0].title"
      :forumDescription="userPost.data.userPostInfo[0].description"
      :userName="userPost.data.userPostInfo[0].username"
    ></forum-post-headings>
    <div>
      <forum-post-replies
        v-for="userReply in forumReplies"
        :key="userReply.topicreplyid"
        :userName="userReply.username"
        :userReply="userReply.replycomment"
        :createdAt="userReply.created_at"
        :userid="userReply.userid"
        :topicreplyid="userReply.topicreplyid"
      ></forum-post-replies>
    </div>
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
      forumId: this.$route.params.id,
      isLoaded: false,
      userPost: [],
      forumReplies: [],
    };
  },
  async created() {
    await axios
      .get("/getPosts", {
        headers: {
          token: localStorage.getItem("token"),
          forumid: this.forumId,
        },
      })
      .then((res) => {
        this.categoryId = res.data.userPostInfo[0].categoryid;
        this.isLoaded = true;
        this.userPost = res;
      });
    await axios
      .get("/forumReplies", {
        headers: {
          token: localStorage.getItem("token"),
          forumid: this.forumId,
        },
      })
      .then((res) => {
        console.log(res);
        this.forumReplies = res.data;
      });
    console.log(this.forumReplies);
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