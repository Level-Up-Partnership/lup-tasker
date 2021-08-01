<template>
  <div>
    <form @submit.prevent="submitData">
      <div class="form-group">
        <label for="displayedName">Display Name: </label>
        <input type="text" id="displayedName" v-model="enteredName" />
      </div>
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <input
          type="email"
          id="userEmail"
          class="form-group"
          v-model="enteredEmail"
        />
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
      <div class="form-group">
        <label for="userConfirmedPassword">Confirm Password</label>
        <input
          type="password"
          id="userConfirmedPassword"
          placeholder="Confirm Password"
        />
      </div>
      <div>
        <button>Register</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredName: "",
      enteredPassword: "",
      enteredEmail: "",
    };
  },
  methods: {
    submitData() {
      this.$emit(
        "add-user",
        this.enteredName,
        this.enteredPassword,
        this.enteredEmail
      );
    },
  },
};
</script>

<style scoped></style>
