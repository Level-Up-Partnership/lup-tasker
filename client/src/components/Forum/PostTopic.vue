<template>
  <!-- Component for creating a topic -->
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
            v-model.trim="userTitle"
          />
        </div>
        <div>
          <span v-if="v$.userTitle.$error">
            {{ v$.userTitle.$errors[0].$message }}
          </span>
        </div>
        <div class="form-group">
          <label for="userDescription">Description: </label>
          <textarea
            id="story"
            name="story"
            rows="5"
            cols="33"
            class="form-control textarea"
            v-model.trim="userDescription"
          >
          </textarea>
        </div>
        <div>
          <span v-if="v$.userDescription.$error">
            {{ v$.userDescription.$errors[0].$message }}
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
export default {
  data() {
    return {
      v$: useVuelidate(),
      userTitle: "",
      userDescription: "",
      specialCharacterError: "",
    };
  },
  //Vuelidate validation
  validations() {
    return {
      userTitle: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(50),
      },
      userDescription: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(200),
      },
    };
  },
  //Once validation is met submit the user reply
  methods: {
    submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit(
          "post-creation",
          this.userTitle.replace(/^[^a-zA-Z0-9]+$/),
          this.userDescription
        );
        this.$router.push(`/forum/category/${this.$route.params.id}`);
      }
    },
  },
};
</script>


<style scoped>
</style>