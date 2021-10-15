<template>
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Create Subtask</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ taskName }}</h6>
        <input type="text" v-model="subtask" />
        <div class="clickme" @click="addSubTask">Save Sub-Task</div>
        <h5 class="card-title">Sub-task</h5>
        <div
          class="form-check"
          v-for="subtask in subTasks"
          :key="subtask.taskid"
        >
          <input
            class="form-check-input"
            type="checkbox"
            id="flexCheckDefault"
            :value="subtask.subtaskname"
            v-model="boxChecked"
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
  },
  data() {
    return {
      subtask: "",
      subTasks: [],
      boxChecked: [],
      isChecked: false,
    };
  },
  methods: {
    async addSubTask() {
      await axios
        .post("/createSubtask", {
          subTaskName: this.subtask,
          token: localStorage.getItem("token"),
          taskid: this.taskId,
        })
        .then((res) => {
          console.log(res);
          this.subtask = "";
          this.isChecked = false;
          this.$emit("is-checked", this.isChecked);
        });
      await this.getSubTask();
    },
    async getSubTask() {
      await axios
        .get("/getSubTask", {
          headers: {
            token: localStorage.getItem("token"),
            taskid: this.taskId,
          },
        })
        .then((res) => {
          this.subTasks = res.data.userTask;
        });
    },
    async checkSubTask() {
      console.log(this.boxChecked);
      if (this.boxChecked.length == this.subTasks.length) {
        this.isChecked = true;
        this.$emit("is-checked", this.isChecked);
      } else {
        this.isChecked = false;
        this.$emit("is-checked", this.isChecked);
      }
    },
  },
  async mounted() {
    console.log(this.subTasks);
    await this.getSubTask();
    if (this.subTasks.length == 0) {
      this.isChecked = true;
    }
    this.$emit("is-checked", this.isChecked);
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