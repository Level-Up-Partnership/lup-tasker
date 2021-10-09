<template>
  <div>
    <h1 @click="createUserTask" class="clickme">Create A Task</h1>
    <create-task v-if="createTaskComponent"></create-task>
    <task-component
      v-for="tasks in userTask"
      :key="tasks.taskid"
      :taskName="tasks.taskname"
      :focusTimer="tasks.focustimer"
      :restTimer="tasks.resttimer"
      :category="tasks.category"
      :isComplete="tasks.iscomplete"
      :taskId="tasks.taskid"
    ></task-component>
  </div>
</template>

<script>
import axios from "axios";
import CreateTask from "../../components/PomodoroTimer/CreateTask.vue";
import TaskComponent from "../../components/PomodoroTimer/TaskComponent.vue";

export default {
  components: { CreateTask, TaskComponent },
  data() {
    return {
      userName: "",
      email: "",
      createTaskComponent: false,
      userTask: [],
      userTaskEmpty: true,
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
