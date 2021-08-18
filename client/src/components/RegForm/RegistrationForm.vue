<template>
  <div>
    <Form @submit="submitData">
      <div class="form-group">
        <label for="displayedName">Display Name: </label>
        <Field name="userName" type="text" id="displayedName" />
      </div>
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <Field
          type="email"
          id="userEmail"
          name="enteredEmail"
          :rules="validateEmail"
        />
      </div>
      <div class="form-group">
        <label for="userPassword">Password</label>
        <Field
          type="password"
          id="userPassword"
          placeholder="Enter Password"
          name="enteredPassword"
        />
      </div>
      <div class="form-group">
        <label for="userConfirmedPassword">Confirm Password</label>
        <Field
          type="password"
          id="userConfirmedPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
        />
      </div>
      <div class="register-button">
        <base-button>Register</base-button>
      </div>
      <ErrorMessage name="enteredEmail" />
    </Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {};
  },
  methods: {
    submitData(values) {
      console.log(values.userName);
      this.$emit(
        "add-user",
        values.userName,
        values.enteredPassword,
        values.enteredEmail
      );
    },
    validateEmail(value) {
      if (!value) {
        return "Email field is required";
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
