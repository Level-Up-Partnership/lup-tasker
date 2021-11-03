<template>
  <div v-if="userRole === 1">
    <h1>Task Stats</h1>
    <div>
      <h1>
        <div>
          {{ tasksByCompletedError }}
        </div>
        <div>
          {{ tasksByHourError }}
        </div>
      </h1>
    </div>
    <div class="clickme" v-if="userRole === 1">
      <router-link to="taskStats" class="nav-link active" aria-current="page">
        User Stats</router-link
      >
    </div>
    <div>
      <div class="position-relative byWeek">
        <div class="position-absolute top-50 start-50 translate-middle">
          <vue3-chart-js
            v-if="showStatsUser"
            :height="350"
            :type="barChart.type"
            :width="400"
            :data="barChart.data"
            :options="barChart.options"
          ></vue3-chart-js>
        </div>
      </div>
      <div class="position-relative byMonth">
        <div class="position-absolute top-100 start-50 translate-middle">
          <vue3-chart-js
            v-if="showStatsUser"
            :height="350"
            :type="barChartMonth.type"
            :width="400"
            :data="barChartMonth.data"
          ></vue3-chart-js>
        </div>
      </div>
      <div class="position-relative pieChart">
        <div class="position-absolute top-50 start-50 translate-middle">
          <pie-chart></pie-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import axios from "axios";
import PieChart from "../../components/adminStats/pieChart.vue";
export default {
  components: {
    Vue3ChartJs,
    PieChart,
  },
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      timerInterval: null,
      userStats: [],
      tasksByCompletedError: "",
      tasksByHourError: "",
      barChart: {
        type: "bar",
        options: {
          responsive: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              ticks: {
                callback: function (value) {
                  return `${value}`;
                },
              },
            },
          },
        },
        data: {
          labels: [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7",
          ],
          datasets: [
            {
              label: "Tasks Completed in the last 7 days",

              backgroundColor: ["#1abc9c", "#f1c40f", "#2980b9", "#34495e"],
            },
          ],
        },
      },
      barChartMonth: {
        type: "bar",
        options: {
          min: 0,
          max: 50,
          responsive: false,
          plugins: {
            legend: {
              position: "top",
            },
          },
          scales: {
            y: {
              min: 0,
              max: 10,
              ticks: {
                callback: function (value) {
                  return `${value}`;
                },
              },
            },
          },
        },
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
          datasets: [
            {
              label: "Tasks Hours By Month",
              backgroundColor: [
                "#1abc9c",
                "#f1c40f",
                "#2980b9",
                "#34495e",
                "#94AED0",
                "#863ADD",
                "#3E572F",
                "#C89E98",
                "#052D59",
                "#7F5C5D",
                "#D58D16",
                "#655777",
              ],
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
      .get("/getTasksCompletedAdmin", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.barChart.data.datasets[0].data = [
          res.data.last1Day.length,
          res.data.last2Day.length,
          res.data.last3Day.length,
          res.data.last4Day.length,
          res.data.last5Day.length,
          res.data.last6Day.length,
          res.data.last7Day.length,
        ];
      })
      .catch((err) => {
        this.tasksByCompletedError = err.response.data.error;
      });
    await axios
      .get("/getTasksByMonthAdmin", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        Array.prototype.sum = function (prop) {
          var total = 0;
          for (var i = 0, _len = this.length; i < _len; i++) {
            total += this[i][prop];
          }
          return total;
        };
        let sum = 0;
        this.barChartMonth.data.datasets[0].data = [];
        for (let index = 0; index < 12; index++) {
          sum = res.data.tasksByMonth[index].sum("totaltimer");
          this.barChartMonth.data.datasets[0].data.push(sum / 60);
        }
      })
      .catch((err) => {
        this.tasksByHourError = err.response.data.error;
      });
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
.pieChart {
  right: 400px;
  top: 155px;
}
</style>