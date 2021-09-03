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
      categoryID: null,
    };
  },
  methods: {
    async postCreationData(title, description) {
      if (this.$route.name === "postCreationCategory") {
        this.categoryID = 1;
      } else if (this.$route.name === "postCreationGeneral") {
        this.categoryID = 2;
      } else if (this.$route.name === "postCreationHelp") {
        this.categoryID = 3;
      } else if (this.$route.name === "postCreationSocial") {
        this.categoryID = 4;
      }
      axios
        .post("/postCreation", {
          title: title,
          description: description,
          token: localStorage.getItem("token"),
          category: this.categoryID,
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
  created() {
    console.log(this.$route.name);
  },
  computed: {
    //Depending on the name you'll have different axios calls that will add to the specific category
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>


<style>
</style>