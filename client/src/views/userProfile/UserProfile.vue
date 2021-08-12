<template>
  <div>
    <user-profile-comp @change-password="changePassword"></user-profile-comp>
  </div>
</template>


<script>
import UserProfileComp from "../../components/UserProfile/UserProfileComp.vue";
import axios from "axios";
export default {
  components: { UserProfileComp },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  methods: {
    async changePassword(newPassword) {
      await axios
        .post("/changepassword", {
          newPassword: newPassword,
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
</style>