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
          />
        </div>
        <button class="btn btn-dark">Add</button>
      </form>
    </base-card>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      bannerURL: "",
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    async addBanner() {
      await axios
        .put("/addBanner", {
          token: this.token,
          bannerURL: this.bannerURL,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>


<style scoped>
</style>