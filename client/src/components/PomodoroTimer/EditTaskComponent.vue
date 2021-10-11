<template>
  <div>
    <base-card v-if="!isEdited">
      <h3>Edit Task</h3>
      <form @submit.prevent="changeData">
        <div class="row g-3">
          <div class="col-6">
            <label for="taskName" class="form-label">New Task Name: </label>
            <input
              type="text"
              id="taskName"
              v-model="taskFormName"
              class="form-control"
              placeholder="Enter Task Name"
            />
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">New Category</label>
            <select
              id="categoryTask"
              class="form-select"
              v-model="taskCategory"
            >
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">New Focus Timer</label>
            <select
              id="categoryTask"
              class="form-select"
              v-model="focusTimerMenu"
            >
              <option value="25">25 mins</option>
              <option value="30">30 mins</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">New Rest Timer</label>
            <select
              id="categoryTask"
              class="form-select"
              v-model="restTimerMenu"
            >
              <option value="5">5 mins</option>
              <option value="3 ">3 mins</option>
            </select>
          </div>
        </div>
        <div class="register-button">
          <button class="btn btn-dark change-task">Edit Task</button>
        </div>
      </form>
    </base-card>

    <base-card class="userOldTask">
      <div>
        <h3>Current Task:</h3>
      </div>
      <div class="container">
        <div class="row row-cols-2">
          <div class="col">Task Name: {{ taskName }}</div>
          <div class="col">Category: {{ category }}</div>
          <div class="col">Focus Timer: {{ focusTimer }}</div>
          <div class="col">Rest Timer: {{ restTimer }}</div>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    taskName: String,
    category: String,
    focusTimer: Number,
    restTimer: Number,
    taskId: Number,
  },
  data() {
    return {
      taskFormName: "",
      taskCategory: "Health",
      focusTimerMenu: "25",
      restTimerMenu: "5",
      isEdited: false,
      inEditMode: false,
    };
  },
  methods: {
    async changeData() {
      await axios
        .put("/editTask", {
          token: localStorage.getItem("token"),
          taskId: this.taskId,
          newTaskName: this.taskFormName,
          newTaskCategory: this.taskCategory,
          newFocusTimer: this.focusTimerMenu,
          newRestTimer: this.restTimerMenu,
        })
        .then((res) => {
          console.log(res);
        });
      await axios
        .get("/getTask", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          this.$emit("edited-task", res.data.userTask, this.inEditMode);
          this.isEdited = true;
        });
    },
  },
};
</script>


<style scoped>
.change-task {
  margin: 1rem 0;
}
.userOldTask {
  left: 500px;
  top: -428px;
}
.row-cols-2 {
  font-size: 18px;
}
</style>