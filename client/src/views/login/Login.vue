<template>
  <div>
    <h1>Login</h1>
    <base-card>
      <login-form @login-user="login"></login-form>
    </base-card>
    <p>{{ error }}</p>
    <img :src="taskerImage" alt="" />
  </div>
</template>

<script>
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm.vue";
import taskerImage from "../../../../images/Tasker.png";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      error: "",
      taskerImage: taskerImage,
    };
  },
  async created() {
    await axios
      .get("/getimgurl", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.taskerImage = res.data[0].img_url;
      });
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  methods: {
    async login(email, password) {
      await axios
        .post("/login", {
          email: email,
          password: password,
        })
        .then(
          (res) => {
            if (res.status === 200) {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              this.$router.push("/homepage");
            }
          },
          (err) => {
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>

<style scoped></style>
