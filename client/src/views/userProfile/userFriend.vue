<template>
  <div>
    <h1>{{ userInfo.username }}'s Profile</h1>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      userInfo: [],
    };
  },
  watch: {
    "$route.params": {
      handler(newValue) {
        this.userId(newValue.id);
      },
      immediate: true,
    },
  },
  methods: {
    async userId(userId) {
      await axios
        .get("/user", {
          headers: {
            token: localStorage.getItem("token"),
            userId: userId,
          },
        })
        .then((res) => {
          this.userInfo = res.data.userInfo;
        })
        .catch((err) => {
          console.log("UserFriend Err", err);
        });
      console.log(this.userInfo);
    },
  },
};
</script>


<style scoped>
</style>