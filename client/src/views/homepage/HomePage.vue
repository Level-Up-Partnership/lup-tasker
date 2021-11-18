<template>
  <!-- Homepage view that displays the task component, creating a task, and editing a task -->
  <div>
    <div v-if="!inEditMode">
      <div v-if="!inStartMode">
        <button @click="createUserTask" class="btn btn-dark createTask">
          Create A Task
        </button>
        <create-task
          v-if="createTaskComponent"
          @get-task="getCreatedTask"
        ></create-task>
        <h4 class="incomplete">There is a limit of 3 Incomplete Tasks</h4>
      </div>
      <div>
        {{ getTaskError }}
      </div>
    </div>
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
      <button @click="resetEditMode" class="btn btn-dark">homepage</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateTask from "../../components/PomodoroTimer/CreateTask.vue";
import TaskComponent from "../../components/PomodoroTimer/TaskComponent.vue";
import EditTaskComponent from "../../components/PomodoroTimer/EditTaskComponent.vue";

export default {
  components: {
    CreateTask,
    TaskComponent,
    EditTaskComponent,
  },
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
      getTaskError: "",
      inStartMode: false,
    };
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  methods: {
    //If this is enabled turn off create task component
    createUserTask() {
      this.createTaskComponent = !this.createTaskComponent;
    },
    //Set the current task being edited data
    editedTask(taskId, taskName, category, focusTimer, restTimer) {
      this.taskId = taskId;
      this.taskName = taskName;
      this.category = category;
      this.focusTimer = focusTimer;
      this.restTimer = restTimer;
      this.inEditMode = true;
    },
    //Get the task that was created
    getCreatedTask(task) {
      this.userTask = task;
    },
    //get the editied task and turn on editmode to on
    getEditedTask(task, editMode) {
      this.userTask = task;
      this.inEditMode = editMode;
    },
    //Once the user starts the timer only display the current task
    getCurrentTask(taskId) {
      this.inStartMode = true;
      const currentTask = this.userTask.findIndex((x) => x.taskid === taskId);
      const slicedArray = this.userTask.slice(currentTask, currentTask + 1);
      this.userTask = slicedArray;
    },
    //Once the user stops the timer display all the other tasks
    getStoppedTask(task, taskId) {
      this.inStartMode = false;
      const currentTask = task.find((x) => x.taskid === taskId);
      var updatedTasks = task.filter((item) => item.taskid !== taskId);
      updatedTasks.unshift(currentTask);
      this.userTask = updatedTasks;
    },
    //Display the current running task
    getRunningTask() {
      const currentTasks = this.userTask.filter((x) => x.iscomplete === false);
      this.unfinishedTasks = currentTasks;
    },
    //Change edit mode back to false once the user is done
    resetEditMode() {
      this.inEditMode = false;
    },
  },
  async mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    //Get tasks from backend
    await axios
      .get("/getTask", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userTask = res.data.userTask;
      })
      .catch((err) => {
        this.getTaskError = err.response.data.error;
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
.createTask {
  top: 20px;
  position: relative;
  width: 250px;
}
.incomplete {
  position: relative;
  top: 30px;
}
</style>
