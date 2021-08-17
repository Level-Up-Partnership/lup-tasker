<template>
  <div>
    <user-profile-comp @change-password="changePassword"></user-profile-comp>
    <h3 class="error">{{ passwordError }}</h3>
  </div>
</template>


<script>
import UserProfileComp from "../../components/UserProfile/UserProfileComp.vue";
import axios from "axios";
export default {
  components: { UserProfileComp },
  data() {
    return {
      passwordError: "",
    };
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  methods: {
    async changePassword(newPassword, currentPassword) {
      await axios
        .post("/changepassword", {
          token: localStorage.getItem("token"),
          currentPassword: currentPassword,
          newPassword: newPassword,
        })
        .catch((error) => {
          this.passwordError = error.response.data.error;
        });
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
</style>