<template>
  <div>
    <base-card>
      <h4>Add Category</h4>
      <form @submit.prevent="addCategory">
        <div class="form-group">
          <label for="categoryTitle">Title: </label>
          <input
            type="text"
            id="categoryTitle"
            class="form-control"
            v-model="categoryTitle"
          />
        </div>
        <div class="form-group">
          <label for="categoryDescription">Description: </label>
          <textarea
            id="story"
            name="story"
            rows="5"
            cols="33"
            class="form-control"
            v-model="categoryDescription"
          >
          </textarea>
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
      categoryTitle: "",
      categoryDescription: "",
    };
  },
  methods: {
    addCategory() {
      console.log(this.categoryTitle);
      this.addCategoryAction = !this.addCategoryAction;
      axios
        .post("/categoryCreation", {
          token: localStorage.getItem("token"),
          title: this.categoryTitle,
          description: this.categoryDescription,
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