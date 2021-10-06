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
          <h3>{{ taskName }}</h3>
          <div id="timer" v-if="!restTimerOn && !longTimeOn">
            <h4>Focus Timer</h4>
            <span id="minutes">{{ minutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ seconds }}</span>
          </div>
          <div id="timer" v-if="restTimerOn && !longTimeOn">
            <h4>Rest Timer</h4>
            <span id="minutes">{{ restMinutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ restSeconds }}</span>
          </div>
          <div id="timer" v-if="longTimeOn && !restTimerOn">
            <h4>Long Break Timer</h4>
            <span id="minutes">{{ restLongMinutes }}</span>
            <span id="middle">:</span>
            <span id="seconds">{{ restLongSeconds }}</span>
          </div>
          <div class="gap-2 col-13 mx-auto">
            <div class="row">
              <div class="col">
                <button class="btn btn-lg btn-primary" @click="startFocusTimer">
                  Start
                </button>
              </div>
              <div class="col">
                <button
                  class="btn btn-lg btn-primary"
                  :disabled="isRunning"
                  @click="resetTimer"
                >
                  Reset
                </button>
              </div>
              <div class="col">
                <button class="btn btn-lg btn-primary" @click="stopTimer">
                  Stop
                </button>
              </div>
              <div class="position-absolute bottom-0 end-0">
                Pomdoro Cycle: {{ pomodoroCycle }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>
<script>
//Create a different timer for rest that activates when
//focus timer is set to 0, and put focusTimer back to regular timer
import axios from "axios";
export default {
  props: {
    taskName: String,
    category: String,
    isComplete: Boolean,
    focusTimer: Number,
    restTimer: Number,
    taskId: Number,
  },
  data() {
    return {
      focusTimerInterval: null,
      restTimerInterval: null,
      longTimerInterval: null,
      isRunning: false,
      restTimerOn: false,
      longTimeOn: false,
      focusTimerHolder: this.focusTimer * 60,
      restTimeHolder: this.restTimer * 60,
      longTimeHolder: 15 * 60,
      timePassedFocused: null,
      timePassedRest: null,
      timePassedLong: null,
      taskDeleted: false,
      pomodoroCycle: 1,
      totalFocusTime: 0,
      totalRestTime: 0,
      totalLongTime: 0,
      focusTimePassed: this.focusTimer * 60,
      restTimePassed: this.restTimer * 60,
      longTimePassed: 15 * 60,
      currentTask: null,
      isDisabled: false,
      audio: new Audio(require("../../assets/audio/Inosuke_Alarm.mp3")),
    };
  },
  methods: {
    startFocusTimer() {
      this.isDisabled = true;
      if (this.restTimerOn) {
        this.startRestTimer();
      } else if (this.longTimeOn) {
        this.startLongBreakTimer();
      } else {
        clearInterval(this.restTimerInterval);
        clearInterval(this.focusTimerInterval);
        this.isRunning = true;
        this.focusTimerInterval = setInterval(() => {
          if (this.focusTimerHolder <= 0) {
            this.audio.play();
            clearInterval(this.focusTimerInterval);
            this.restTimeHolder = this.restTimer * 60;
            this.restTimePassed = this.restTimer * 60;
            this.restTimerOn = true;
            this.pomodoroCycle = this.pomodoroCycle + 1;
            this.totalFocusTime += this.timePassedFocused;
            this.timePassedFocused = 0;
            this.startRestTimer();
            return;
          }
          this.focusTimerHolder -= 1;
          this.focusTimePassed -= 1;
          var focusBaseTimer = this.focusTimer * 60 - this.focusTimePassed; //1500 - 1499
          this.timePassedFocused = focusBaseTimer / 60; //Use time passed to add it in total Focus Timer
        }, 1000);

        if (this.pomodoroCycle == 5) {
          this.pomodoroCycle = 1;
          this.longTimeHolder = 15 * 60;
          this.longTimePassed = 15 * 60;
          this.longTimeOn = true;
          this.startLongBreakTimer();
        }
      }
    },
    startRestTimer() {
      clearInterval(this.restTimerInterval);
      clearInterval(this.focusTimerInterval);
      this.isRunning = true;
      this.restTimerInterval = setInterval(() => {
        if (this.restTimeHolder <= 0) {
          clearInterval(this.restTimerInterval);
          this.audio.play();
          this.focusTimerHolder = this.focusTimer * 60;
          this.focusTimePassed = this.focusTimer * 60;
          this.restTimerOn = false;
          this.pomodoroCycle = this.pomodoroCycle + 1;
          this.totalRestTime += this.timePassedRest;
          this.timePassedRest = 0;
          this.startFocusTimer();
          return;
        }
        this.restTimeHolder -= 1;
        this.restTimePassed -= 1;
        var restBaseTimer = this.restTimer * 60 - this.restTimePassed; //1500 - 1499
        this.timePassedRest = restBaseTimer / 60; //Use time passed to add it in total Focus Timer
      }, 1000);
    },
    startLongBreakTimer() {
      clearInterval(this.focusTimerInterval);
      clearInterval(this.restTimerInterval);
      this.longTimerInterval = setInterval(() => {
        if (this.longTimeHolder <= 0) {
          this.audio.play();
          clearInterval(this.longTimerInterval);
          this.focusTimerHolder = this.focusTimer * 60;
          this.focusTimePassed = this.focusTimer * 60;
          this.restTimerOn = false;
          this.longTimeOn = false;
          this.totalLongTime += this.timePassedLong;
          this.timePassedLong = 0;
          this.startFocusTimer();
          return;
        }
        this.longTimeHolder -= 1;
        this.longTimePassed -= 1;
        var longBaseTimer = 15 * 60 - this.longTimePassed; //1500 - 1499
        this.timePassedLong = longBaseTimer / 60; //Use time passed to add it in total Focus Timer
      }, 1000);
    },
    async stopTimer() {
      this.isRunning = false;
      clearInterval(this.focusTimerInterval);
      clearInterval(this.restTimerInterval);
      clearInterval(this.longTimerInterval);
      console.log(
        "TOTAL FOCUS TIME PASSED:",
        this.totalFocusTime + this.timePassedFocused
      );
      console.log(
        "TOTAL REST TIME PASSED:",
        this.totalRestTime + this.timePassedRest
      );
      console.log(
        "LONG BREAK TIME PASSED:",
        this.totalLongTime + this.timePassedLong
      );
      this.resetButton = true;
      await axios
        .put("/updateTime", {
          token: localStorage.getItem("token"),
          totalFocusTime: this.totalFocusTime + this.timePassedFocused,
          totalRestTime: this.totalRestTime + this.timePassedRest,
          TotalLongTime: this.totalLongTime + this.timePassedLong,
          taskid: this.taskId,
        })
        .then((res) => {
          this.focusTimePassed = this.focusTimer * 60;
          this.restTimePassed = this.restTimer * 60;
          this.longTimePassed = 15 * 60;
          this.timePassedFocused = 0;
          this.timePassedRest = 0;
          this.timePassedLong = 0;
          this.totalFocusTime = 0;
          this.totalRestTime = 0;
          this.totalLongTime = 0;
          console.log(res.data);
        });
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    padRestTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    resetTimer() {
      clearInterval(this.focusTimerInterval);
      clearInterval(this.restTimerInterval);
      clearInterval(this.longTimerInterval);
      this.pomodoroCycle = 1;
      this.restTimerOn = false;
      this.focusTimerInterval = null;
      this.restTimerInterval = null;
      this.longTimerInterval = null;
      this.focusTimerHolder = this.focusTimer * 60;
      this.longTimeOn = false;
      this.resetButton = false;
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
      const minutes = Math.floor(this.focusTimerHolder / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.focusTimerHolder - this.minutes * 60;
      return this.padTime(seconds);
    },
    restMinutes() {
      const minutes = Math.floor(this.restTimeHolder / 60);
      return this.padRestTime(minutes);
    },
    restSeconds() {
      const seconds = this.restTimeHolder - this.restMinutes * 60;
      return this.padRestTime(seconds);
    },
    restLongMinutes() {
      const minutes = Math.floor(this.longTimeHolder / 60);
      return this.padRestTime(minutes);
    },
    restLongSeconds() {
      const seconds = this.longTimeHolder - this.restLongMinutes * 60;
      return this.padRestTime(seconds);
    },
  },
};
</script>

<style scoped>
.task-button {
  margin: 1rem 0;
  width: 50%;
}
#timer {
  font-size: 60px;
  line-height: 1;
  margin-bottom: 40px;
}
.category {
  margin-bottom: 40px;
}
</style>