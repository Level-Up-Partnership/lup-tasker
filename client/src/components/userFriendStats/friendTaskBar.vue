<template>
  <!-- Component for the freinds Tasks hours by month -->
  <div v-if="!adminStatsBool">
    <div>
      <h1 style="color: red">
        {{ byTasksHoursError }}
      </h1>
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
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import axios from "axios";
export default {
  components: {
    Vue3ChartJs,
  },
  props: ["userId"],
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
  //VueChartJS barchart data
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      timerInterval: null,
      userStats: [],
      byTasksHoursError: "",
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
            "Nov",
            "Dec",
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
  //Gets the friendsTasks hours by month and adds to barchart array
  async created() {
    await axios
      .get("/friendTaskbyMonth", {
        headers: { token: localStorage.getItem("token"), userId: this.userId },
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
        this.byTasksHoursError = err.response.data.error;
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
</style>