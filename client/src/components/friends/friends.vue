<template>
  <!-- Component for displaying current friends -->
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Friends</h5>
      <div>
        {{ friendsGetError }}
        {{ friendDeleteError }}
      </div>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="friend in friendsArr" :key="friend">
        <div v-for="friends in friend.friendRequests" :key="friends.username">
          {{ friends.username }}
          <router-link class="userSearch" :to="`/user/${friends.fromuserid}`"
            >View</router-link
          >
          <a
            class="card-link clickme"
            @click="declineFriend(friends.fromuserid)"
            >Remove
          </a>
        </div>
        <div
          v-for="friends in friend.friendRequestsTo"
          :key="friends.fromuserid"
        >
          {{ friends.username }}
          <router-link class="userSearch" :to="`/user/${friends.touserid}`"
            >View</router-link
          >
          <a
            class="card-link clickme"
            @click="declineFriendToUser(friends.touserid)"
            >Remove
          </a>
        </div>
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
      friendsGetError: "",
      friendDeleteError: "",
      toUser: false,
    };
  },
  async mounted() {
    this.getFriendRequests();
  },
  methods: {
    //Delete a current friend
    async declineFriend(friendId) {
      await axios
        .delete("/deleteFriend", {
          headers: { token: localStorage.getItem("token"), friendId: friendId },
        })
        .then(() => {
          this.friendsArr = [];
          this.getFriendRequests();
        })
        .catch((err) => {
          this.friendDeleteError = err.response.data.error;
        });
    },
    //Decline both instances of user relation so both users get removed
    async declineFriendToUser(friendId) {
      this.toUser = true;
      await axios
        .delete("/deleteFriend", {
          headers: {
            token: localStorage.getItem("token"),
            friendId: friendId,
            toUser: this.toUser,
          },
        })
        .then(() => {
          this.friendsArr = [];
          this.getFriendRequests();
        })
        .catch((err) => {
          this.friendDeleteError = err.response.data.error;
        });
    },
    //get all the current friends
    async getFriendRequests() {
      await axios
        .get("/getFriends", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          this.friendsArr.push(res.data);
        })
        .catch((err) => {
          this.friendsGetError = err.response.data.error;
        });
    },
  },
};
</script>


<style scoped>
.clickme {
  position: absolute;
  right: 15px;
  cursor: pointer;
}
.view {
  position: absolute;
  right: 80px;
  cursor: pointer;
}
</style>