<template>
  <div>
    <base-card>
      <h4>Create POST</h4>
      <form @submit.prevent="submitData">
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
      <div>
        <span v-if="v$.userDescription.$error">
          {{ v$.userDescription.$errors[0].$message }}
        </span>
      </div>
      <div>
        {{ specialCharacterError }}
      </div>
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
      userDescription: "",
      specialCharacterError: "",
    };
  },
  validations() {
    return {
      userDescription: {
        required,
        minLength: minLength(5),
        maxLength: maxLength(200),
      },
    };
  },
  methods: {
    isValid(str) {
      return !/[~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/g.test(str);
    },
    submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
        if (this.isValid(this.userDescription)) {
          this.$emit("post-creation", this.userDescription);
        }
      }
    },
  },
};
</script>


<style scoped>
</style>