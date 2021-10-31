<template>
  <div>
    <post-topic-reply @post-creation="postCreationData"></post-topic-reply>
    <div>
      {{ postCreationError }}
    </div>
  </div>
</template>

<script>
import PostTopicReply from "../../components/Forum/PostTopicReply.vue";
import axios from "axios";
export default {
  components: { PostTopicReply },
  data() {
    return {
      postCreationError: "",
    };
  },
  methods: {
    async postCreationData(description) {
      await axios
        .post("/postCreation", {
          replycomment: description,
          token: localStorage.getItem("token"),
          forumid: this.$route.params.id,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          this.postCreationError = err.response.data.error;
        });
      this.$router.go(-1);
    },
  },
};
</script>


<style>
</style>