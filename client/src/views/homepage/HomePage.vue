<template>
  <div>
    <h1>Username: {{ userName }} <span v-if="userRole === 1">(Admin)</span></h1>
    email : {{ email }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userName: "",
      email: "",
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    axios
      .get("/user", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userName = res.data.userInfo.username;
        this.email = res.data.userInfo.email;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
