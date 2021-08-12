<template>
  <div>
    <h1>User Profile</h1>
    <div class="img-container">
      <img src="../../assets/user/index.png" alt="" />
    </div>
    <form @submit.prevent="changePassword">
      <div class="d-flex align-items-start">
        <h3>Change Password</h3>
      </div>
      <div class="row">
        <label for="newPassword" class="col-sm-2 col-form-label"
          >New Password</label
        >
        <div class="col-sm-2">
          <input
            type="password"
            v-model="newPassword"
            class="form-control"
            id="newPassword"
            placeholder="New Password"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="confirmPassword" class="col-sm-2 col-form-label"
          >Password</label
        >
        <div class="col-sm-2">
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
      </div>
      <div class="form-group row">
        <div class="col-sm-10">
          <button class="btn btn-dark button-form">Change Password</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newPassword: "",
    };
  },
  methods: {
    changePassword() {
      this.$emit("change-password", this.newPassword);
    },
  },
};
</script>

<style scoped>
.form-control-inline {
  display: inline;
}
form {
  margin: 0;
  position: absolute;
  right: 10%;
  bottom: 40%;
  width: 70%;
}
.button-form {
  margin: 0;
  position: relative;
  bottom: -60%;
  right: 40%;
}
.img-container img {
  margin-top: 2%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>