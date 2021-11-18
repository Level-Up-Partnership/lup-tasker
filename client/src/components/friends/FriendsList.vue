<template>
  <!-- Component for displaying current users friend requests -->
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Friend Request</h5>
      <div>
        {{ friendGetRequestError }} {{ friendDeleteError }}
        {{ friendAcceptError }}
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="friend in friendsArr"
        :key="friend.fromuserid"
      >
        {{ friend.username }}
        <a class="card-link clickme" @click="acceptFriend(friend.fromuserid)"
          >Accept</a
        >
        <a class="card-link clickme" @click="declineFriend(friend.fromuserid)"
          >Decline</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      friendsArr: [],
      counter: 0,
      friendDeleteError: "",
      friendGetRequestError: "",
      friendAcceptError: "",
    };
  },
  async mounted() {
    this.getFriendRequests();
  },
  //Checks the friend status
  computed: {
    isFriends() {
      if (this.friendsArr.status == 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  //If the user accepts the friend request change their status in the backend to friends
  methods: {
    async acceptFriend(friendId) {
      this.counter++;
      await axios
        .put("/acceptFriend", {
          token: localStorage.getItem("token"),
          friendId: friendId,
        })
        .then(() => {
          this.getFriendRequests();
          this.$emit("update-friend", this.counter);
        })
        .catch((err) => {
          this.friendAcceptError = err.response.data.error;
        });
    },
    //If the user declines the friend request remove any relation from backend
    async declineFriend(friendId) {
      await axios
        .delete("/deleteFriend", {
          headers: { token: localStorage.getItem("token"), friendId: friendId },
        })
        .then(() => {
          this.getFriendRequests();
        })
        .catch((err) => {
          this.friendDeleteError = err.response.data.error;
        });
    },
    //Get the friendrequests sent to this user
    async getFriendRequests() {
      await axios
        .get("/getFriendRequsts", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          this.friendsArr = res.data.friendRequests;
        })
        .catch((err) => {
          this.friendGetRequestError = err.response.data.error;
        });
    },
  },
};
</script>


<style scoped>
.clickme {
  cursor: pointer;
}
</style>