<template>
  <div>
    <h1>Register</h1>
    <base-card>
      <registration-form @add-user="userInfo"></registration-form>
    </base-card>
  </div>
</template>

<script>
import RegistrationForm from "../../components/RegForm/RegistrationForm.vue";
import axios from "axios";
export default {
  components: { RegistrationForm },
  data() {
    return {};
  },
  created() {
    console.log(process.env.PORT);
  },
  methods: {
    async userInfo(name, password, email) {
      await axios.post("http://localhost:5000/register", {
        username: name,
        password: password,
        email: email,
      });
    },
  },
};
</script>


<style scoped>
</style>
