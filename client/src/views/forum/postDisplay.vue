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
        @update-replies="myCallback(page)"
      ></forum-post-replies>
    </div>
    <div class="position-absolute bottom--50 start-50 translate-middle-x">
      <pagination
        v-model="page"
        :records="userReplyTotalLength"
        :per-page="per_page"
        @paginate="myCallback($event)"
      />
    </div>
    <div>
      <h3>
        {{ firstToReply }}
        {{ deletePostError }}
        {{ getPostsError }}
      </h3>
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
      firstToReply: "",
      deletePostError: "",
      getPostsError: "",
      page: 1,
      per_page: 5,
      userReplyTotalLength: 0,
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
    await this.myCallback(1);
    await axios
      .get("/forumReplies", {
        headers: {
          token: localStorage.getItem("token"),
          forumid: this.forumId,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.length == 0) {
          this.firstToReply = "Be the first to reply";
        }
        this.userReplyTotalLength = res.data.length;
      })
      .catch((err) => {
        this.getPostsError = err.response.data.error;
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
        .catch((err) => {
          this.deletePostError = err.response.data.error;
        });
      this.$router.push(`/forum/category/${this.categoryId}/`);
    },
    async myCallback(page) {
      this.page = page;
      await axios
        .get("/getForumRepliesPag", {
          headers: {
            token: localStorage.getItem("token"),
            forumid: this.$route.params.id,
            limit: this.per_page,
            pageOffSet: (page - 1) * this.per_page,
          },
        })
        .then((res) => {
          this.forumReplies = res.data;
        })
        .catch((err) => {
          this.getPostsError = err.response.data.error;
        });
    },
  },
};
</script>
<style scoped>
</style>