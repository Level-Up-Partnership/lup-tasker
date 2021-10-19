<template>
  <div v-if="!taskDeleted">
    <base-card>
      <div>
        <div>
          <div class="position-absolute top-0 end-0">
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="deleteTask"
            ></button>
          </div>
          <div class="position-absolute top-0 start-0 category">
            Category: {{ category }}
          </div>
          <h1>{{ taskName }}</h1>
        </div>
        <div id="timer">
          <span id="minutes">{{ minutes }}</span>
          <span id="middle">:</span>
          <span id="seconds">{{ seconds }}</span>
          <span> Mins Focused Time</span>
        </div>
        <div id="timer">
          <span id="minutes">{{ restMinutes }}</span>
          <span id="middle">:</span>
          <span id="seconds">{{ restSeconds }}</span>
          <span> Mins Rest Time</span>
        </div>
        <div id="timer">
          <span id="minutes">{{ totalTimerMinutes }}</span>
          <span id="middle">:</span>
          <span id="seconds">{{ totalTimerSeconds }}</span>
          <span> Mins Total Time</span>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    taskName: String,
    category: String,
    isComplete: Boolean,
    totalFocusTimer: Number,
    totalrestTimer: Number,
    totalTimer: Number,
    taskId: Number,
  },
  data() {
    return {
      taskDeleted: false,
    };
  },
  methods: {
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    async deleteTask() {
      await axios
        .delete("/deleteTask", {
          headers: {
            token: localStorage.getItem("token"),
            taskid: this.taskId,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.taskDeleted = true;
    },
  },
  computed: {
    minutes() {
      const minutes = Math.floor((this.totalFocusTimer * 60) / 60);
      return this.padTime(Math.round(minutes));
    },
    seconds() {
      const seconds = this.totalFocusTimer * 60 - this.minutes * 60;
      return this.padTime(Math.round(seconds));
    },
    restMinutes() {
      const minutes = Math.floor((this.totalrestTimer * 60) / 60);
      return this.padTime(Math.round(minutes));
    },
    restSeconds() {
      const seconds = this.totalrestTimer * 60 - this.restMinutes * 60;
      return this.padTime(Math.round(seconds));
    },
    totalTimerMinutes() {
      const minutes = Math.floor((this.totalTimer * 60) / 60);
      return this.padTime(Math.round(minutes));
    },
    totalTimerSeconds() {
      const seconds = this.totalTimer * 60 - this.totalTimerMinutes * 60;
      return this.padTime(Math.round(seconds));
    },
    isFinished() {
      if (this.isComplete) {
        return "Complete";
      } else {
        return "Incomplete";
      }
    },
  },
};
</script>



<style scoped>
#timer {
  font-size: 24px;
  line-height: 1;
  margin-bottom: 40px;
}
</style>