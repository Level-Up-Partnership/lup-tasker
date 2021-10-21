<template>
  <div>
    <h1>Task Stats</h1>
    <div class="position-relative">
      <div class="position-absolute top-50 start-50 translate-middle">
        <vue3-chart-js
          v-if="showStatsUser"
          :height="350"
          :type="barChart.type"
          :width="400"
          :data="test.data"
        ></vue3-chart-js>
      </div>
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { ref } from "vue";
import axios from "axios";
export default {
  components: {
    Vue3ChartJs,
  },
  data() {
    return {
      showStatsUser: false,
      timerInterval: null,
      userStats: [],
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
      test: {
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
              data: [1, 2, 3],
            },
          ],
        },
      },
    };
  },
  mounted() {
    setTimeout(() => (this.showStatsUser = true), 1000);
  },
  async created() {
    await axios
      .get("/getTasksCompleted", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        console.log(res.data);
        this.test.data.datasets[0].data = [
          res.data.last1Day.length,
          res.data.last2Day.length,
          res.data.last3Day.length,
          res.data.last4Day.length,
          res.data.last5Day.length,
          res.data.last6Day.length,
          res.data.last7Day.length,
        ];
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
.position-relative {
  top: 180px;
}
</style>