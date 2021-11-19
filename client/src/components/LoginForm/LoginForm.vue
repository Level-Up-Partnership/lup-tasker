<template>
  <!-- Component for the login form -->
  <div>
    <form @submit.prevent="submitData">
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <input
          type="email"
          id="userEmail"
          v-model.trim="enteredEmail"
          placeholder="Enter Email"
        />
      </div>
      <div>
        <span v-if="v$.enteredEmail.$error"
          >Email {{ v$.enteredEmail.$errors[0].$message }}</span
        >
      </div>
      <div class="form-group">
        <label for="userPassword">Password:</label>
        <input
          type="password"
          id="userPassword"
          placeholder="Enter Password"
          v-model.trim="enteredPassword"
        />
      </div>
      <div>
        <span v-if="v$.enteredPassword.$error"
          >Password {{ v$.enteredPassword.$errors[0].$message }}</span
        >
      </div>
      <div class="register-button">
        <base-button>Login</base-button>
      </div>
    </form>
    <div>
      <p>
        Dont have an account?
        <span @click="goToRegister" class="clickme">Click here</span> to
        register
      </p>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      enteredPassword: "",
      enteredEmail: "",
    };
  },
  //Vuelidation validation being done
  validations() {
    return {
      enteredPassword: { required, minLength: minLength(5) },
      enteredEmail: { email, required },
    };
  },
  //Once validation is met the user login information is checked in the backend
  methods: {
    submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("login-user", this.enteredEmail, this.enteredPassword);
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.4rem 0;
}
.register-button {
  margin: 1rem 0;
}
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
.clickme {
  cursor: pointer;
  text-decoration: underline;
  color: #1a0dab;
}
</style>
