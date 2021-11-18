<template>
  <!--The purpose of this app is to see the Task stats imported from the components files-->
  <div>
    <h1>Task Stats</h1>
    <div class="clickme" v-if="userRole === 1">
      <router-link to="adminStats" class="nav-link active" aria-current="page">
        Admin Stats</router-link
      >
    </div>
    <tasks-completed></tasks-completed>
    <task-hours-bar></task-hours-bar>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import TasksCompleted from "../../components/userStats/tasksCompleted.vue";
import TaskHoursBar from "../../components/userStats/taskHoursBar.vue";
export default {
  //Components imported
  components: {
    Vue3ChartJs,
    TasksCompleted,
    TaskHoursBar,
  },
  computed: {
    //Gets the userRole if they're admin display admin option
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  methods: {
    adminStats() {
      this.adminStatsBool = true;
    },
  },
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      userStats: [],
    };
  },
};
</script>


<style scoped>
.btn-sm {
  height: 30px;
}
.position {
  height: 2px;
}
.byWeek {
  top: 180px;
}
.byMonth {
  top: 550px;
}
.clickme {
  cursor: pointer;
  text-decoration: underline;
  color: #1a0dab;
}
</style>