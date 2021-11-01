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
              v-model.trim="taskName"
              class="form-control"
              placeholder="Enter Task Name"
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
        <div>
          <span v-if="v$.taskName.$error">
            {{ v$.taskName.$errors[0].$message }}
          </span>
        </div>
      </form>
      <div>{{ getTaskError }}</div>
    </base-card>
    <div>
      <h4 style="color: red">{{ createTaskError }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, maxLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  data() {
    return {
      taskName: "",
      taskCategory: "Health",
      focusTimerMenu: "25",
      restTimerMenu: "5",
      isCreated: false,
      limitReached: "",
      createTaskError: "",
      getTaskError: "",
      v$: useVuelidate(),
    };
  },
  validations() {
    return {
      taskName: { required, minLength: minLength(3), maxLength: maxLength(15) },
    };
  },
  methods: {
    async submitData() {
      this.v$.$validate();
      if (!this.v$.$error) {
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
          .catch((err) => {
            this.createTaskError = err.response.data.error;
          });
        await axios
          .get("/getTask", {
            headers: { token: localStorage.getItem("token") },
          })
          .then((res) => {
            this.$emit("get-task", res.data.userTask);
            this.isCreated = true;
          })
          .catch((err) => {
            this.getTaskError = err.response.data.error;
          });
      }
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