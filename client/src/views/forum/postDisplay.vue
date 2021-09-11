<template>
  <div v-if="isLoaded">
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "",
      description: "",
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
        this.title = res.data[0].title;
        this.description = res.data[0].description;
        this.isLoaded = true;
      });
  },
};
</script>


<style scoped>
</style>