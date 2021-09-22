<template>
  <div>
    <base-card>
      <h3>{{ taskName }}</h3>
      <div id="timer">
        <span id="minutes">{{ minutes }}</span>
        <span id="middle">:</span>
        <span id="seconds">{{ seconds }}</span>
      </div>
      <div class="gap-2 col-13 mx-auto">
        <div class="row">
          <div class="col">
            <button class="btn btn-lg btn-primary" @click="startTimer">
              Start
            </button>
          </div>
          <div class="col">
            <button class="btn btn-lg btn-primary" @click="resetTimer">
              Reset
            </button>
          </div>
          <div class="col">
            <button class="btn btn-lg btn-primary" @click="stopTimer">
              Stop
            </button>
          </div>
        </div>
      </div>
    </base-card>
  </div>
</template>



<script>
export default {
  props: {
    taskName: String,
    isComplete: Boolean,
    focusTimer: Number,
    restTimer: Number,
  },
  data() {
    return {
      timer: null,
      totalTime: this.focusTimer * 60,
    };
  },
  mounted() {},
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.countDown();
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = true;
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    resetTimer() {
      this.totalTime = this.focusTimer * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },
    countDown() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer();
      }
    },
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      console.log(this.minutes);
      const seconds = this.totalTime - this.minutes * 60;
      // console.log("Seconds:" + seconds);
      console.log(seconds);
      return this.padTime(seconds);
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
</style>