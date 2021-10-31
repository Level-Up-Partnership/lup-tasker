<template>
  <div>
    <post-topic @post-creation="postCreationData"></post-topic>
    <div>
      {{ postCreationError }}
    </div>
  </div>
</template>

<script>
import PostTopic from "../../components/Forum/PostTopic.vue";
import axios from "axios";
export default {
  components: { PostTopic },
  data() {
    return {
      categoryId: this.$route.params.id,
      postCreationError: "",
    };
  },
  methods: {
    async postCreationData(title, description) {
      await axios
        .post("/postCreation", {
          title: title,
          description: description,
          token: localStorage.getItem("token"),
          category: this.categoryId,
        })
        .catch((err) => {
          this.postCreationError = err.response.data.error;
        });
    },
  },
};
</script>


<style>
</style>