<template>
  <div>
    <base-card>
      <h4>Add Category</h4>
      <form @submit.prevent="addBanner">
        <div class="form-group">
          <label for="bannerURL">Banner URL: </label>
          <input
            type="text"
            id="bannerURL"
            class="form-control"
            v-model="bannerURL"
            required
          />
        </div>
        <div>
          <span v-if="v$.bannerURL.$error">
            Please ensure that it's a URL
          </span>
        </div>
        <div>
          {{ successMessage }}
          {{ bannerError }}
        </div>
        <button class="btn btn-dark">Add</button>
      </form>
    </base-card>
  </div>
</template>


<script>
import axios from "axios";
import { required, url } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  data() {
    return {
      v$: useVuelidate(),
      bannerURL: "",
      token: localStorage.getItem("token"),
      bannerError: "",
      successMessage: "",
    };
  },
  validations() {
    return {
      bannerURL: { required, url },
    };
  },
  methods: {
    async addBanner() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios
          .put("/addBanner", {
            token: this.token,
            bannerURL: this.bannerURL,
          })
          .then((res) => {
            console.log(res);
            this.successMessage = res.data.title;
          })
          .catch((err) => {
            this.bannerError = err.response.data.error;
          });
      }
    },
  },
};
</script>


<style scoped>
</style>