<template>
  <div>
    <base-card>
      <h4>Create POST</h4>
      <form @submit.prevent="submitData">
        <div class="form-group">
          <label for="userTitle">Title: </label>
          <input
            type="text"
            id="userTitle"
            class="form-control"
            v-model="userTitle"
          />
        </div>
        <div class="form-group">
          <label for="userDescription">Description: </label>
          <textarea
            id="story"
            name="story"
            rows="5"
            cols="33"
            class="form-control"
            v-model="userDescription"
          >
          </textarea>
        </div>
        <button class="btn btn-dark">SUBMIT POST</button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userTitle: "",
      userDescription: "",
    };
  },
  methods: {
    submitData() {
      console.log(this.userTitle);
      console.log(this.userDescription);
      this.$emit("post-creation", this.userTitle, this.userDescription);
    },
  },
};
</script>


<style scoped>
</style>