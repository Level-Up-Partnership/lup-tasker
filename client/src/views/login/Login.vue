<template>
  <!-- The purpose of this view is for login-->
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
  //get the website banner and display it
  async created() {
    await axios
      .get("/getimgurl", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        if (res.data.img_url) {
          this.taskerImage = res.data.img_url;
        } else {
          this.taskerImage = taskerImage;
        }
      })
      .catch(() => {
        this.imgError =
          "Could not get website banner, please refresh the page or contact the owner of the page";
      });
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  //once the user is logged in the token he'll recieve will be st in the localstroage, same with the id
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
