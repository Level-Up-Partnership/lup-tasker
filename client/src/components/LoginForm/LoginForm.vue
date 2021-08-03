<template>
  <div>
    <form @submit.prevent="submitData">
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <input type="email" id="userEmail" v-model="enteredEmail" />
      </div>
      <div class="form-group">
        <label for="userPassword">Password</label>
        <input
          type="password"
          id="userPassword"
          placeholder="Enter Password"
          v-model="enteredPassword"
        />
      </div>
      <div class="register-button">
        <base-button>Login</base-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredPassword: "",
      enteredEmail: "",
    };
  },
  methods: {
    submitData() {
      this.$emit("login-user", this.enteredEmail, this.enteredPassword);
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
</style>
