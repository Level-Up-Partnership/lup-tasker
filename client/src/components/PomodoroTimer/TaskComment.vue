<template>
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
  </div>
</template>



<script>
import axios from "axios";
export default {
  props: {
    taskName: String,
    taskId: String,
  },
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    async addComment() {
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
          console.log(err);
        });
    },
  },
  async mounted() {
    await axios
      .get("/getSingleTask", {
        headers: { taskId: this.taskId, token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.comment = res.data.userTask[0].taskcomments;
      })
      .catch((err) => {
        console.log("TaskComment, getSingleTask err", err);
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