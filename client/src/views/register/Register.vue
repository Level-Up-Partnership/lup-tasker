<template>
  <!-- The purpose of this view is for register-->
  <div>
    <h1>Register</h1>
    <base-card>
      <registration-form></registration-form>
    </base-card>
  </div>
</template>

<script>
import RegistrationForm from "../../components/RegForm/RegistrationForm.vue";
export default {
  //Imports registartion component
  components: { RegistrationForm },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
  methods: {},
};
</script>

<style scoped></style>
