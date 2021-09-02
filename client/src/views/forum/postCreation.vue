<template>
  <div>
    <post-topic @post-creation="postCreationData"></post-topic>
    <div>
      {{ currentRouteName }}
    </div>
  </div>
</template>

<script>
import PostTopic from "../../components/Forum/PostTopic.vue";
import axios from "axios";
export default {
  components: { PostTopic },
  data() {
    return {};
  },
  methods: {
    // async postCreationData(title, description) {
    //   axios.post("/postCreation");
    // },
  },
  created() {
    console.log(this.$route.name);
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>


<style>
</style>