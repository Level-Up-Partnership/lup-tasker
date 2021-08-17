<template>
  <div>
    <h1>Login</h1>
    <base-card>
      <login-form @login-user="login"></login-form>
    </base-card>
    <p>{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import LoginForm from "../../components/LoginForm/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      error: "",
    };
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
              // localStorage.setItem("user", res.data.user);
              localStorage.setItem("role", res.data.role);
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
