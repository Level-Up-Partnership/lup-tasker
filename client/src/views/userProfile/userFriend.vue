<template>
  <div>
    <h1>{{ userInfo.username }}'s Profile</h1>
    <button
      type="button"
      @click="sendRequest"
      class="btn btn-dark"
      :disabled="isNotAwaiting"
      v-if="isSameUser"
    >
      {{ awaitingResponse }}
    </button>
    <div>
      <h1>
        <div>
          {{ friendStatusError }}
        </div>
        <div>
          {{ getUsersError }}
        </div>
        <div>
          {{ sendRequestError }}
        </div>
      </h1>
    </div>
    <div v-if="friendStatus != 1">
      <h1>User Stats are blocked until you become friends</h1>
    </div>
    <div v-if="friendStatus == 1">
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
      currentUserId: localStorage.getItem("userid"),
      friendStatusError: "",
      getUsersError: "",
      sendRequestError: "",
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
      if (this.friendStatus) {
        if (this.friendStatus == 2) {
          this.isNotAwaiting = true;
          return "Awaiting Response";
        } else if (this.friendStatus == 1) {
          this.isNotAwaiting = true;
          return "Friends";
        }
      } else {
        return "Send Friend Request";
      }
    },
    isSameUser() {
      if (this.currentUserId == this.userIdParam) {
        return false;
      } else {
        return true;
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
          this.sendRequestError = err.response.data.error;
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
            this.getUsersError = err.response.data.error;
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
            this.friendStatusError = err.response.data.error;
          });
      }
    },
  },
};
</script>


<style scoped>
</style>