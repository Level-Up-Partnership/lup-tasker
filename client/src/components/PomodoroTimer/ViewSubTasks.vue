<template>
  <div>
    <div class="card" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">Create Subtask</h5>
        <h6 class="card-subtitle mb-2 text-muted">For: {{ taskName }}</h6>
        <input type="text" v-model="subtask" />
        <div class="clickme" @click="addSubTask">Add</div>
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
            :value="subtask.subtaskid"
            v-model="boxChecked"
            @change="checkSubTask"
          />
          <button
            type="button"
            class="btn-close subtaskDelete"
            aria-label="Close"
            @click="deleteSubTask(subtask.subtaskid)"
          ></button>
          <label class="form-check-label" for="flexCheckDefault">
            {{ subtask.subtaskname }}
          </label>
        </div>
        <div>
          {{ limitSubTasks }}
        </div>
        <div>
          {{ errorSubtask }}
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
      subtask: "",
      errorSubtask: "",
      subTasks: [],
      boxChecked: [],
      isChecked: false,
      disableTask: false,
      currentsubtask: null,
    };
  },
  computed: {
    limitSubTasks() {
      if (this.subTasks.length == 0) {
        return "There is a limit of 5 sub-tasks";
      } else {
        return "";
      }
    },
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
        })
        .catch((err) => {
          this.errorSubtask = err.response.data;
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
      this.boxChecked.forEach((element) => {
        this.currentsubtask = element;
      });
      await axios
        .put("/updateSubtask", {
          token: localStorage.getItem("token"),
          currentsubtask: this.currentsubtask,
        })
        .then(async (res) => {
          await this.getSubTask();
          this.boxChecked = [];
        });
      if (this.boxChecked.length == this.subTasks.length) {
        this.isChecked = true;
        this.$emit("is-checked", this.isChecked);
      } else {
        this.isChecked = false;
        this.$emit("is-checked", this.isChecked);
      }
    },
    async deleteSubTask(subtaskId) {
      await axios
        .delete("/deleteSubTask", {
          headers: {
            token: localStorage.getItem("token"),
            subtaskid: subtaskId,
          },
        })
        .then(async (res) => {
          await this.getSubTask();
          this.subTasks = this.subTasks;
        });
      if (this.subTasks.length == 0) {
        this.isChecked = true;
      }
      this.$emit("is-checked", this.isChecked);
    },
  },
  async mounted() {
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
.subtaskDelete {
  position: absolute;
  left: 92%;
  height: 23px;
  font-size: 10px;
}
</style>