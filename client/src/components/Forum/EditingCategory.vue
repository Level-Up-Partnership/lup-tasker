<template>
  <!-- Component for Editing a category -->
  <div>
    <base-card>
      <h4>Category Edit</h4>
      <form @submit.prevent="submitData">
        <div class="form-group">
          <label for="adminTitle">Title: </label>
          <input
            type="text"
            id="adminTitle"
            class="form-control"
            v-model.trim="adminTitle"
          />
        </div>
        <div>
          <span v-if="v$.adminTitle.$error">
            {{ v$.adminTitle.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="adminDescription">Description: </label>
          <textarea
            id="story"
            name="story"
            rows="5"
            cols="33"
            class="form-control textarea"
            v-model.trim="adminDescription"
          >
          </textarea>
        </div>
        <div>
          <span v-if="v$.adminDescription.$error">
            {{ v$.adminDescription.$errors[0].$message }}
          </span>
        </div>
        <button class="btn btn-dark">SUBMIT POST</button>
        <div>
          {{ specialCharacterError }}
        </div>
      </form>
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
      v$: useVuelidate(),
      adminTitle: "",
      adminDescription: "",
      specialCharacterError: "",
    };
  },
  props: ["categoryId"],
  //Vuelidate validation
  validations() {
    return {
      adminTitle: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
      },
      adminDescription: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(200),
      },
    };
  },
  methods: {
    //Once validation is met update the current category to the new one
    async submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios
          .put("/editCategory", {
            token: localStorage.getItem("token"),
            categoryId: this.categoryId,
            adminTitle: this.adminTitle,
            adminDescription: this.adminDescription,
          })
          .catch((err) => {
            this.friendAcceptError = err.response.data.error;
          });
        this.$emit("edit-mode", false);
        // this.$router.push(`/forum/category/${this.$route.params.id}`);
      }
    },
  },
};
</script>


<style scoped>
</style>