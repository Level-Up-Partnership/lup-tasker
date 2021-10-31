<template>
  <div>
    <h1>Login</h1>
    <base-card>
      <login-form @login-user="login"></login-form>
    </base-card>
    <p>{{ error }}</p>
    <img :src="taskerImage" class="img" alt="" />
    <div>
      {{ imgError }}
    </div>
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
      imgError: "",
    };
  },
  async created() {
    await axios
      .get("/getimgurl", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.taskerImage = res.data.img_url;
      })
      .catch(() => {
        this.imgError =
          "Could not get website banner, please refresh the page or contact the owner of the page";
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
              localStorage.setItem("userid", res.data.userId);
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

<style scoped>
.img {
  width: 500px;
}
</style>
