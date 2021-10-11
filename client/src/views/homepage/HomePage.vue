<template>
  <div>
    <h1 @click="createUserTask" class="clickme">Create A Task</h1>
    <create-task v-if="createTaskComponent"></create-task>
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
      ></task-component>
    </div>
    <div v-if="inEditMode">
      <edit-task-component
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
    },
  },
  async mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    await axios
      .get("/getTask", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userTask = res.data.userTask;
        console.log(this.userTask);
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
