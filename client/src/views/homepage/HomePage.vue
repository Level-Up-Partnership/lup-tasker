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
  created() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  mounted() {
    axios
      .get("/user", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        console.log(res);
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
