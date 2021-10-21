<template>
  <div>
    <h1>Task History</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="dropdown">
            Category:
            <select
              id="categoryTask"
              class="btn btn-secondary dropdown-toggle"
              v-model="taskCategory"
              @click="filterBy(taskCategory)"
            >
              <option value="All">All</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Personal">Personal</option>
            </select>
          </div>
        </div>
        <div class="col-sm">
          <div class="dropdown">
            Status:
            <select
              id="categoryTask"
              class="btn btn-secondary dropdown-toggle"
              v-model="taskStatus"
              @click="filterByStatus()"
            >
              <option value="All">All</option>
              <option value="Complete">Complete</option>
              <option value="inComplete">inComplete</option>
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
      :isComplete="tasks.iscomplete"
    ></task-history-comp>
    <h2 v-if="isEmpty">Sorry, "{{ storedSearch }}" was not found</h2>
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
      storedSearch: "",
      isEmpty: false,
      taskStatus: "All",
      taskStatusHolder: "All",
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
    async filterBy() {
      await axios
        .get(
          `/filteredTask/?filteredby=${this.taskCategory}&status=${this.taskStatusHolder}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              category: this.taskCategory,
              status: this.taskStatus,
            },
          }
        )
        .then((res) => {
          this.userTask = res.data.userTask;
        });
    },
    async filterByStatus() {
      console.log(this.taskStatus);
      if (this.taskStatus == "Complete") {
        this.taskStatusHolder = true;
      } else if (this.taskStatus == "inComplete") {
        this.taskStatusHolder = false;
      } else if (this.taskStatus == "All") {
        this.taskStatusHolder = "All";
      }
      await axios
        .get(
          `/filteredTaskStatus/?filteredby=${this.taskStatusHolder}&category=${this.taskCategory}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              status: status,
              category: this.taskCategory,
            },
          }
        )
        .then((res) => {
          this.userTask = res.data.userTask;
        });
    },

    async searchBy() {
      await axios
        .get(
          `/searchTask/?taskName=${this.searchFor}&category=${this.taskCategory}&status=${this.taskStatusHolder}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              category: this.taskCategory,
              searchFor: this.searchFor,
              status: this.taskStatus,
            },
          }
        )
        .then(async (res) => {
          this.userTask = res.data.userTask;
          if (res.data.userTask.length == 0) {
            this.isEmpty = true;
            this.storedSearch = this.searchFor;
          } else {
            this.isEmpty = false;
          }
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