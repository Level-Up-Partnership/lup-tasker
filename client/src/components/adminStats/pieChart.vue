<template>
  <!-- Component for Piechart for most popular category  -->
  <div v-if="userRole === 1">
    <div>
      <h1>
        {{ pieChartError }}
      </h1>
    </div>
    <div v-if="!showStatsUser">
      <div class="spinner-border align" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
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
      this.adminStatsBool = true;
    },
  },
  //VueChartJS PieChart
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      timerInterval: null,
      pieChartError: "",
      userStats: [],
      doughnutChart: {
        type: "doughnut",
        options: {
          responsive: false,
          plugins: {
            title: {
              display: true,
              text: "Most Popular Categories",
            },
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
  //Get the data from backend and use the response to update the piechart arrray
  async created() {
    await axios
      .get("/getCategoriesAdmin", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
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
      })
      .catch((err) => {
        this.pieChartError = err.response.data.error;
      });
  },
};
</script>


<style scoped>
.align {
  text-align: center;
}
</style>