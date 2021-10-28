<template>
  <div>
    <h1>{{ userInfo.username }}'s Profile</h1>
    <button
      type="button"
      @click="sendRequest"
      class="btn btn-dark"
      :disabled="isNotAwaiting"
    >
      {{ awaitingResponse }}
    </button>
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
      friendStatus: 0,
      isNotAwaiting: null,
    };
  },
  watch: {
    "$route.params.id": {
      handler(newValue) {
        this.userIdParam = newValue;
        this.checkFriendStats();
        this.userId();
      },
      immediate: true,
    },
  },
  computed: {
    awaitingResponse() {
      console.log(this.friendStatus);
      if (this.friendStatus) {
        if (this.friendStatus == 2) {
          this.isNotAwaiting = true;
          return "Awaiting Response";
        } else if (this.friendStatus == 1) {
          this.isNotAwaiting = false;
          return "Friends";
        }
      } else {
        return "Send Friend Request";
      }
    },
  },
  methods: {
    async sendRequest() {
      await axios
        .post("/sendFriendRequest", {
          token: localStorage.getItem("token"),
          friendId: this.userIdParam,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("UserFriend Err", err);
        });
      this.checkFriendStats();
    },
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
    async checkFriendStats() {
      if (this.$route.params.id) {
        await axios
          .get("/getFriendStatus", {
            headers: {
              token: localStorage.getItem("token"),
              friendId: this.userIdParam,
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.friendStatus.length == 1) {
              this.friendStatus = res.data.friendStatus[0].status;
            } else {
              this.friendStatus = 0;
              this.isNotAwaiting = false;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>


<style scoped>
</style>