<template>
  <div>
    <base-card v-if="!isCreated">
      <form @submit.prevent="submitData">
        <div class="row g-3">
          <div class="col-6">
            <label for="taskName" class="form-label">Task Name: </label>
            <input
              type="text"
              id="taskName"
              v-model="taskName"
              class="form-control"
              placeholder="Enter Task Name"
              required
            />
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">Choose Category</label>
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
            <label class="form-label" for="categoryTask">Focus Timer</label>
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
            <label class="form-label" for="categoryTask">Rest Timer</label>
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
          <base-button>Create Task</base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      taskName: "",
      taskCategory: "Health",
      focusTimerMenu: "25",
      restTimerMenu: "5",
      isCreated: false,
      limitReached: "",
    };
  },
  methods: {
    async submitData() {
      await axios
        .post("/postTask", {
          taskName: this.taskName,
          taskCategory: this.taskCategory,
          focusTimer: this.focusTimerMenu,
          restTimer: this.restTimerMenu,
          totalFocusTimer: "",
          totalRestTimer: "",
          isComplete: false,
          token: localStorage.getItem("token"),
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      await axios
        .get("/getTask", { headers: { token: localStorage.getItem("token") } })
        .then((res) => {
          this.$emit("get-task", res.data.userTask);
          this.isCreated = true;
        });
    },
  },
};
</script>



<style scoped>
.register-button {
  margin: 1rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}
</style>