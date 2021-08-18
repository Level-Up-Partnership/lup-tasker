<template>
  <div>
    <h1>Username: {{ userName }}</h1>
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
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    axios
      .get("/user", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userName = res.data.userInfo.username;
        this.email = res.data.userInfo.email;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped></style>
