<template>
  <div>
    <h1 @click="createUserTask" class="clickme">Create A Task</h1>
    <create-task
      v-if="createTaskComponent"
      @get-task="getCreatedTask"
    ></create-task>
    <h4>There is a limit of 3 Incomplete Tasks</h4>
    <div v-if="!inEditMode">
      <task-component
        v-for="tasks in userTask"
        :key="tasks.taskid"
        :taskName="tasks.taskname"
        :focusTimer="tasks.focustimer"
        :restTimer="tasks.resttimer"
        :category="tasks.category"
        :isComplete="tasks.iscomplete"
        :taskId="tasks.taskid"
        @edit-task="editedTask"
        @current-task="getCurrentTask"
        @stopped-task="getStoppedTask"
      ></task-component>
    </div>
    <div v-if="inEditMode">
      <edit-task-component
        @edited-task="getEditedTask"
        :taskId="taskId"
        :category="category"
        :focusTimer="focusTimer"
        :restTimer="restTimer"
        :taskName="taskName"
      ></edit-task-component>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateTask from "../../components/PomodoroTimer/CreateTask.vue";
import TaskComponent from "../../components/PomodoroTimer/TaskComponent.vue";
import EditTaskComponent from "../../components/PomodoroTimer/EditTaskComponent.vue";

export default {
  components: { CreateTask, TaskComponent, EditTaskComponent },
  data() {
    return {
      userName: "",
      email: "",
      createTaskComponent: false,
      userTask: [],
      userTaskEmpty: true,
      inEditMode: false,
      taskId: null,
      taskName: null,
      category: null,
      focusTimer: null,
      restTimer: null,
      unfinishedTasks: [],
      page: 1,
      per_page: 3,
      value: 0,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  methods: {
    createUserTask() {
      this.createTaskComponent = !this.createTaskComponent;
    },
    editedTask(taskId, taskName, category, focusTimer, restTimer) {
      this.taskId = taskId;
      this.taskName = taskName;
      this.category = category;
      this.focusTimer = focusTimer;
      this.restTimer = restTimer;
      this.inEditMode = true;
      console.log(this.inEditMode);
    },
    getCreatedTask(task) {
      this.userTask = task;
    },
    getEditedTask(task, editMode) {
      this.userTask = task;
      this.inEditMode = editMode;
    },
    getCurrentTask(taskId) {
      const currentTask = this.userTask.findIndex((x) => x.taskid === taskId);
      const slicedArray = this.userTask.slice(currentTask, currentTask + 1);
      this.userTask = slicedArray;
    },
    getStoppedTask(task, taskId) {
      const currentTask = task.find((x) => x.taskid === taskId);
      var updatedTasks = task.filter((item) => item.taskid !== taskId);
      updatedTasks.unshift(currentTask);
      this.userTask = updatedTasks;
    },
    getRunningTask() {
      const currentTasks = this.userTask.filter((x) => x.iscomplete === false);
      this.unfinishedTasks = currentTasks;
    },
  },
  async mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    await axios
      .get("/getTask", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userTask = res.data.userTask;
      })
      .catch((err) => {
        console.log("Homepage", err);
      });
    await this.getRunningTask();
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
