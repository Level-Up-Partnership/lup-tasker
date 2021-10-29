<template>
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
