<template>
  <div v-if="userRole === 1">
    <div v-if="showStatsUser">
      <div style="max-width: 400px">
        <vue3-chart-js
          :type="doughnutChart.type"
          :data="doughnutChart.data"
          :options="doughnutChart.options"
        ></vue3-chart-js>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import axios from "axios";
export default {
  components: {
    Vue3ChartJs,
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  methods: {
    adminStats() {
      console.log("hello");
      this.adminStatsBool = true;
    },
  },
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      timerInterval: null,
      userStats: [],
      doughnutChart: {
        type: "doughnut",
        options: {
          responsive: false,
          title: {
            display: true,
            text: "Chart.js Doughnut Chart",
          },
        },
        data: {
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            },
          ],
        },
      },
    };
  },
  async mounted() {
    await this.$store.dispatch("CheckUserRole");
    setTimeout(() => (this.showStatsUser = true), 1000);
  },
  async created() {
    await axios
      .get("/getCategoriesAdmin", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res);

        this.doughnutChart.data.datasets[0].data = [];
        this.doughnutChart.data.labels = [];
        for (let index = 0; index < res.data.categoryTotal.length; index++) {
          this.doughnutChart.data.labels.push(
            res.data.categoryTotal[index][0].category
          );
          this.doughnutChart.data.datasets[0].data.push(
            res.data.categoryTotal[index][0].count
          );
        }
        console.log(this.doughnutChart.data.labels);
        console.log(this.doughnutChart.data.datasets[0].data);
      });
  },
};
</script>


<style scoped>
</style>