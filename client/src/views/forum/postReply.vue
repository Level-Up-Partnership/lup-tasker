<template>
  <div>
    <post-topic @post-creation="postCreationData"></post-topic>
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
    };
  },
  methods: {
    async postCreationData(title, description) {
      //   axios
      //     .post("/postCreation", {
      //       title: title,
      //       description: description,
      //       token: localStorage.getItem("token"),
      //       category: this.categoryId,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     });
      ////forum/${categoryName}/post/${fourmId}
      this.$router.push(`/forum/category/${this.categoryId}/`);
    },
  },
};
</script>


<style>
</style>