<template>
  <div>
    <div>
      <h1>
        {{ completedTasksError }}
      </h1>
    </div>
    <div v-if="!adminStatsBool">
      <div class="position-relative byWeek">
        <div class="position-absolute top-50 start-50 translate-middle">
          <vue3-chart-js
            v-if="showStatsUser"
            :height="350"
            :type="barChart.type"
            :width="400"
            :data="barChart.data"
          ></vue3-chart-js>
        </div>
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
  data() {
    return {
      showStatsUser: false,
      adminStatsBool: false,
      timerInterval: null,
      userStats: [],
      completedTasksError: "",
      barChart: {
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
    };
  },
  async mounted() {
    setTimeout(() => (this.showStatsUser = true), 1000);
  },
  async created() {
    await axios
      .get("/getTasksCompleted", {
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
        this.completedTasksError = err.response.data.error;
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