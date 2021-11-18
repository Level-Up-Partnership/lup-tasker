<template>
  <!-- Component for the admin being able to add a category in the forum -->
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
        <div>
          <span v-if="v$.categoryTitle.$error">
            Please ensure the title is less than 50 characters long
          </span>
        </div>
        <div>
          <span v-if="v$.categoryDescription.$error">
            Please ensure the description is less than 255 characters long
          </span>
        </div>
      </form>
      <div>
        {{ categorySuccess }}
      </div>
      <div>
        {{ categoryError }}
      </div>
    </base-card>
  </div>
</template>


<script>
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import axios from "axios";
export default {
  data() {
    return {
      categoryTitle: "",
      categoryDescription: "",
      categoryError: "",
      categorySuccess: "",
      v$: useVuelidate(),
    };
  },
  //Vuelidate validation being done
  validations() {
    return {
      categoryTitle: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(50),
      },
      categoryDescription: {
        required,
        maxLength: maxLength(144),
      },
    };
  },
  //Once the admin clicks the button the category is added to the backend
  methods: {
    async addCategory() {
      this.addCategoryAction = !this.addCategoryAction;
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios
          .post("/categoryCreation", {
            token: localStorage.getItem("token"),
            title: this.categoryTitle,
            description: this.categoryDescription,
          })
          .then((res) => {
            this.categorySuccess = res.data.title;
          })
          .catch((err) => {
            this.categoryError = err.response.data.error;
          });
      }
    },
  },
};
</script>


<style scoped>
</style>