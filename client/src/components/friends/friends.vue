<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">Friends</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li
        class="list-group-item"
        v-for="friend in friendsArr"
        :key="friend.fromuserid"
      >
        {{ friend.username }}
        <router-link class="userSearch" :to="`/user/${friend.fromuserid}`"
          >View</router-link
        >
        <a class="card-link clickme" @click="declineFriend(friend.fromuserid)"
          >Remove
        </a>
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
    };
  },
  async mounted() {
    this.getFriendRequests();
  },
  methods: {
    async declineFriend(friendId) {
      await axios
        .delete("/deleteFriend", {
          headers: { token: localStorage.getItem("token"), friendId: friendId },
        })
        .then(() => {
          this.getFriendRequests();
        });
    },
    async getFriendRequests() {
      await axios
        .get("/getFriends", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          console.log(res);
          this.friendsArr = res.data.friendRequests;
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