<template>
  <div>
    <user-profile-comp @change-password="changePassword"></user-profile-comp>
    <h3 class="error">{{ passwordError }}</h3>
    <h3 class="success">{{ passwordSuccess }}</h3>
    <friends-list
      @update-friend="updateFriend"
      class="friendList"
    ></friends-list>
    <friends class="friends" :key="counter"></friends>
  </div>
</template>


<script>
import UserProfileComp from "../../components/UserProfile/UserProfileComp.vue";
import axios from "axios";
import FriendsList from "../../components/friends/FriendsList.vue";
import Friends from "../../components/friends/friends.vue";

export default {
  components: { UserProfileComp, FriendsList, Friends },
  data() {
    return {
      passwordError: "",
      counter: 0,
      passwordSuccess: "",
    };
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn"); //Check if the user is logged In
    this.$store.dispatch("CheckUserRole"); //Check the user role
  },
  //Axios call to the /changepassword  API
  methods: {
    //Sends over the newPassowrd and currentPassword, use the token for verification.
    async changePassword(newPassword, currentPassword) {
      await axios
        .post("/changepassword", {
          token: localStorage.getItem("token"),
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        .then((res) => {
          this.passwordSuccess = res.data.success;
        })
        .catch((error) => {
          this.passwordError = error.response.data.error;
        });
    },
    updateFriend(counter) {
      this.counter = counter;
      console.log(counter);
    },
  },
};
</script>

<style scoped>
.error {
  text-align: center;
  position: fixed;
  bottom: 50%;
  right: 36%;
}
.friendList {
  position: absolute;
  top: 212px;
  left: 125px;
}
.friends {
  position: absolute;
  top: 212px;
  right: 125px;
}
.success {
  position: relative;
  bottom: 60px;
  text-align: center;
}
</style>