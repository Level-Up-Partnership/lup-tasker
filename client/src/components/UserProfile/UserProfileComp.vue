<template>
  <div>
    <h1>{{ userName }}'s Profile</h1>
    <base-card v-if="addCategoryAction && addNewBanner">
      <div class="col">
        <form @submit.prevent="changePassword">
          <div>
            <h3>Change Password</h3>
          </div>
          <div class="form-group">
            <label for="currentPassword">Current Password</label>
            <input
              type="password"
              v-model="currentPassword"
              class="form-control"
              id="currentPassword"
              placeholder="Current Password"
            />
          </div>
          <span v-if="v$.currentPassword.$error">{{
            v$.currentPassword.$errors[0].$message
          }}</span>
          <div class="form-group">
            <label for="confirmPassword"> Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="confirmedPassword"
              placeholder="Confirm Password"
              v-model="confirmedPassword"
            />
          </div>
          <div>
            <span v-if="v$.confirmedPassword.$error">{{
              v$.confirmedPassword.$errors[0].$message
            }}</span>
          </div>
          <div class="form-group">
            <label for="newPassword">New Password</label>
            <input
              type="password"
              v-model="newPassword"
              class="form-control"
              id="newPassword"
              placeholder="New Password"
            />
          </div>
          <span v-if="v$.newPassword.$error">{{
            v$.newPassword.$errors[0].$message
          }}</span>
          <div class="form-group change-password">
            <button class="btn btn-dark button-form">Change Password</button>
          </div>
        </form>
      </div>
    </base-card>
    <admin-category v-if="!addCategoryAction"></admin-category>
    <admin-banner v-if="!addNewBanner"></admin-banner>
    <div class="container">
      <div class="row">
        <div v-if="userRole === 1" class="col" @click="addBanner">
          <button class="btn btn-dark">Change Banner</button>
        </div>
        <div v-if="userRole === 1" class="col" @click="addCategory">
          <button class="btn btn-dark">Add Category</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminCategory from "../UserProfile/AdminCategory.vue";
import AdminBanner from "./AdminBanner.vue";
import { required, sameAs, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";
export default {
  components: {
    AdminCategory,
    AdminBanner,
  },
  data() {
    return {
      v$: useVuelidate(),
      currentPassword: "",
      newPassword: "",
      confirmedPassword: "",
      addCategoryAction: true,
      addNewBanner: true,
      userName: "",
    };
  },
  validations() {
    return {
      currentPassword: { required, minLength: minLength(5) },
      confirmedPassword: {
        required,
        sameAs: sameAs(this.currentPassword),
      },
      newPassword: {
        required,
        minLength: minLength(5),
      },
    };
  },
  methods: {
    changePassword() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("change-password", this.newPassword, this.currentPassword);
      }
    },
    addCategory() {
      this.addCategoryAction = !this.addCategoryAction;
    },
    addBanner() {
      this.addNewBanner = !this.addNewBanner;
    },
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  async created() {
    await axios
      .get("/user", {
        headers: {
          token: localStorage.getItem("token"),
          userid: localStorage.getItem("userid"),
        },
      })
      .then((res) => {
        this.userName = res.data.userInfo.username;
      })
      .catch((err) => {});
  },
};
</script>

<style scoped>
.change-password {
  margin: 1rem 0;
}
</style>