<template>
  <div>
    <h1>Register</h1>
    <registration-form @add-user="userInfo"></registration-form>
  </div>
</template>

<script>
import RegistrationForm from "../components/RegForm/RegistrationForm.vue";
import axios from "axios";
export default {
  components: { RegistrationForm },
  data() {
    return {
      newUser: [],
    };
  },
  methods: {
    async userInfo(name, password, email) {
      const newUser = {
        name: name,
        password: password,
        email: email,
      };
      console.log(newUser);
      this.newUser = newUser;
      await axios.post("http://localhost:5000/register", {
        username: this.newUser.name,
        password: this.newUser.password,
        email: this.newUser.email,
      });
    },
  },
};
</script>


<style scoped>
</style>
