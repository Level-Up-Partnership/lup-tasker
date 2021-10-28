<template>
  <div>
    <h1>{{ userInfo.username }}'s Profile</h1>
    <div>
      <friend-task-bar
        :key="userIdParam"
        :userId="userIdParam"
      ></friend-task-bar>
    </div>
    <div>
      <friend-completed
        :key="userIdParam"
        :userId="userIdParam"
      ></friend-completed>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import friendTaskBar from "../../components/userFriendStats/friendTaskBar.vue";
import FriendCompleted from "../../components/userFriendStats/friendCompleted.vue";
export default {
  components: { friendTaskBar, FriendCompleted },
  data() {
    return {
      userInfo: [],
      userIdParam: "",
    };
  },
  watch: {
    "$route.params.id": {
      handler(newValue) {
        this.userIdParam = newValue;
        this.userId(newValue);
      },
      immediate: true,
    },
  },
  methods: {
    async userId() {
      if (this.$route.params.id) {
        await axios
          .get("/user", {
            headers: {
              token: localStorage.getItem("token"),
              userId: this.userIdParam,
            },
          })
          .then((res) => {
            this.userInfo = res.data.userInfo;
          })
          .catch((err) => {
            console.log("UserFriend Err", err);
          });
      }
    },
  },
};
</script>


<style scoped>
</style>