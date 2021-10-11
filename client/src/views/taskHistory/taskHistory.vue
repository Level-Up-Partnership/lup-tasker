<template>
  <div>
    <h1>Task History</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="dropdown">
            <select
              id="categoryTask"
              class="btn btn-secondary dropdown-toggle"
              v-model="taskCategory"
            >
              <option value="All" @click="filterBy(taskCategory)">All</option>
              <option value="Health" @click="filterBy(taskCategory)">
                Health
              </option>
              <option value="Education" @click="filterBy(taskCategory)">
                Education
              </option>
              <option value="Personal" @click="filterBy(taskCategory)">
                Personal
              </option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div>
            <input
              type="searach"
              v-model="searchFor"
              placeholder="Search.."
              @keydown.enter="searchBy"
            />

            <button
              type="button"
              class="btn btn-secondary btn-sm"
              @click="searchBy"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
    <task-history-comp
      v-for="tasks in userTask"
      :key="tasks.taskid"
      :taskName="tasks.taskname"
      :taskId="tasks.taskid"
      :category="tasks.category"
      :totalFocusTimer="tasks.totalfocustimer"
      :totalrestTimer="tasks.totalresttimer"
      :totalTimer="tasks.totaltimer"
    ></task-history-comp>
  </div>
</template>

<script>
import TaskHistoryComp from "../../components/TaskHistory/TaskHistoryComp.vue";
import axios from "axios";
export default {
  components: { TaskHistoryComp },
  data() {
    return {
      userTask: [],
      taskCategory: "All",
      searchFor: "",
    };
  },
  async mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    await axios
      .get("/getTask", { headers: { token: localStorage.getItem("token") } })
      .then((res) => {
        this.userTask = res.data.userTask;
        console.log(this.userTask);
      });
  },
  methods: {
    async filterBy(taskCategory) {
      await axios
        .get(`/filteredTask/?filteredby=${taskCategory}`, {
          headers: {
            token: localStorage.getItem("token"),
            category: taskCategory,
          },
        })
        .then((res) => {
          this.userTask = res.data.userTask;
        });
    },
    async searchBy() {
      await axios
        .get(
          `/searchTask/?taskName=${this.searchFor}&category=${this.taskCategory}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              category: this.taskCategory,
              searchFor: this.searchFor,
            },
          }
        )
        .then(async (res) => {
          this.userTask = res.data.userTask;
          this.searchFor = "";
        });
    },
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
</style>