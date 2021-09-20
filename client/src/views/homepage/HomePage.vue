<template>
  <div>
    <h1 @click="createUserTask" class="clickme">Create A Task</h1>
    <create-task v-if="createTaskComponent"></create-task>
  </div>
</template>

<script>
import axios from "axios";
import CreateTask from "../../components/PomodoroTimer/CreateTask.vue";
export default {
  components: { CreateTask },
  data() {
    return {
      userName: "",
      email: "",
      createTaskComponent: false,
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
  created() {
    setTimeout(() => {
      localStorage.clear("token");
      this.$router.push("/login");
    }, 18000000);
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    axios
      .get("/user", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userName = res.data.userInfo.username;
        this.email = res.data.userInfo.email;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
