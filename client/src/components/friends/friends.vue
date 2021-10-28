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

        <a class="card-link view" @click="declineFriend(friend.fromuserid)"
          >View
        </a>
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
  computed: {
    isFriends() {
      if (this.friendsArr.status == 1) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    async acceptFriend(friendId) {
      await axios
        .put("/acceptFriend", {
          token: localStorage.getItem("token"),
          friendId: friendId,
        })
        .then(() => {
          this.getFriendRequests();
        });
    },
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