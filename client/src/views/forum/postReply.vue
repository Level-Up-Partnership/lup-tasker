<template>
  <!-- This displays the view for posting a reply which holds the component  -->
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
  //Once the user clicks on create post, it is send to the backend where it gets added to database
  methods: {
    async postCreationData(description) {
      await axios
        .post("/postCreation", {
          replycomment: description,
          token: localStorage.getItem("token"),
          forumid: this.$route.params.id,
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