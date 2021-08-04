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
  methods: {
    async login(email, password) {
      await axios
        .post("http://localhost:5000/login", {
          email: email,
          password: password,
        })
        .then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err.response);
            this.error = err.response.data.error;
          }
        );
    },
  },
};
</script>

<style scoped></style>
