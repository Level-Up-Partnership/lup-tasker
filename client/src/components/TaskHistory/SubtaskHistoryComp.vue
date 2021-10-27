<template>
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h6 class="card-subtitle mb-2 text-muted">For: {{ taskName }}</h6>
        <h5 class="card-title">Sub-tasks</h5>
        <div
          class="form-check"
          v-for="subtask in subTasks"
          :key="subtask.taskid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            :checked="subtask.ischecked == true"
            :disabled="true"
            @change="checkSubTask"
          />
          <label class="form-check-label" for="flexCheckDefault">
            {{ subtask.subtaskname }}
          </label>
        </div>
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
    subtaskDisabled: Boolean,
  },
  data() {
    return {
      subTasks: [],
    };
  },

  methods: {
    async getSubTask() {
      await axios
        .get("/getSubTask", {
          headers: {
            token: localStorage.getItem("token"),
            taskid: this.taskId,
            subtasks: "All",
          },
        })
        .then((res) => {
          this.subTasks = res.data.userTask;
        });
    },
  },
  async mounted() {
    await this.getSubTask();
  },
};
</script>


<style scoped>
.clickme {
  cursor: pointer;
  text-decoration: underline;
  color: #1a0dab;
}
.subtaskDelete {
  position: absolute;
  left: 92%;
  height: 23px;
  font-size: 10px;
}
</style>