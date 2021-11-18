<template>
  <!-- Component for the task comments -->
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Comment</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ taskName }}</h6>
        <textarea
          id="w3review"
          name="w3review"
          rows="4"
          cols="30"
          class="card-text"
          v-model="comment"
        >
        </textarea>
        <div class="clickme" @click="addComment">Save Comment</div>
      </div>
    </div>
    <div>
      <span v-if="v$.comment.$error">
        {{ v$.comment.$errors[0].$message }}
      </span>
    </div>
    <div>
      {{ addCommentError }}
      {{ getSingleTaskError }}
    </div>
  </div>
</template>



<script>
import axios from "axios";
import { maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  props: {
    taskName: String,
    taskId: String,
  },
  data() {
    return {
      v$: useVuelidate(),
      comment: "",
      addCommentError: "",
      getSingleTaskError: "",
    };
  },
  //Vuelidation validation being done
  validations() {
    return {
      comment: { maxLength: maxLength(140) },
    };
  },
  //Adds the comment to backend once validation is met
  methods: {
    async addComment() {
      this.v$.$validate();
      if (!this.v$.$error) {
        await axios
          .put("/updateComment", {
            token: localStorage.getItem("token"),
            taskId: this.taskId,
            comment: this.comment,
          })
          .then((res) => {
            this.$emit("comment-saved");
          })
          .catch((err) => {
            this.addCommentError = err.response.data.error;
          });
      }
    },
  },
  //gets the comments from the single task
  async mounted() {
    await axios
      .get("/getSingleTask", {
        headers: { taskId: this.taskId, token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.comment = res.data.userTask[0].taskcomments;
      })
      .catch((err) => {
        this.getSingleTaskError = err.response.data.error;
      });
  },
};
</script>


<style scoped>
.clickme {
  cursor: pointer;
  text-decoration: underline;
  color: #1a0dab;
}
</style>