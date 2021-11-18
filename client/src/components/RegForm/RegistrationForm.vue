<template>
  <!-- Component for registration form -->
  <div>
    <form @submit.prevent="submitData">
      <div class="form-group">
        <label for="displayedName">Display Name: </label>
        <input
          type="text"
          id="displayedName"
          v-model.trim="userName"
          placeholder="Enter Username"
        />
        <div>
          <span v-if="v$.userName.$error">{{
            v$.userName.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <input
          type="email"
          id="userEmail"
          v-model.trim="enteredEmail"
          placeholder="Enter Email"
        />
        <div>
          <span v-if="v$.enteredEmail.$error">{{
            v$.enteredEmail.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="userPassword">Password:</label>
        <input
          type="password"
          id="userPassword"
          v-model="enteredPassword"
          placeholder="Enter Password"
        />
        <div>
          <span v-if="v$.enteredPassword.$error">{{
            v$.enteredPassword.$errors[0].$message
          }}</span>
        </div>
      </div>
      <div class="form-group">
        <label for="userConfirmedPassword">Confirm Password:</label>
        <input
          type="password"
          id="userConfirmedPassword"
          v-model="confirmedPassword"
          placeholder="Confirm Password"
        />
        <div>
          <span v-if="v$.confirmedPassword.$error">Passwords must match</span>
        </div>
      </div>
      <div class="register-button">
        <base-button>Register</base-button>
      </div>
      <div>
        {{ errorRegister }}
      </div>
    </form>
  </div>
</template>

<script>
import { required, email, sameAs, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";
export default {
  data() {
    return {
      v$: useVuelidate(),
      userName: "",
      enteredPassword: "",
      confirmedPassword: "",
      enteredEmail: "",
      errorRegister: "",
    };
  },
  //Vuelidate validation being done
  validations() {
    return {
      userName: { required },
      enteredPassword: { required, minLength: minLength(5) },
      confirmedPassword: {
        required,
        sameAs: sameAs(this.enteredPassword),
      },
      enteredEmail: { email, required },
    };
  },
  //If all the validation are successful call a POST in the backend to create the user
  methods: {
    async submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios
          .post("/register", {
            username: this.userName,
            password: this.enteredPassword,
            email: this.enteredEmail,
          })
          .then(() => {
            this.$router.push("/login");
          })
          .catch((err) => {
            this.errorRegister = err.response.data;
          });
      }
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
.register-header {
  margin-top: 10px;
}
</style>
