<template>
  <div>
    <base-card>
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
            />
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">Choose Category</label>
            <select
              id="categoryTask"
              class="form-select"
              v-model="dropDownMenu"
            >
              <option value="health">Health</option>
              <option value="education">Education</option>
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
              <option value="mins25">25 mins</option>
              <option value="mins30">30 mins</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label" for="categoryTask">Rest Timer</label>
            <select
              id="categoryTask"
              class="form-select"
              v-model="restTimerMenu"
            >
              <option value="mins5">5 mins</option>
              <option value="mins3">3 mins</option>
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
export default {
  data() {
    return {
      taskName: "",
      dropDownMenu: "health",
      focusTimerMenu: "mins25",
      restTimerMenu: "mins5",
    };
  },
  methods: {
    submitData() {},
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