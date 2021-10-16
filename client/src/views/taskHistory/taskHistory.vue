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
          <div class="dropdown">
            Status:
            <select
              id="categoryTask"
              class="btn btn-secondary dropdown-toggle"
              v-model="taskStatus"
            >
              <option value="All" @click="filterByStatus(taskStatus)">
                All
              </option>
              <option value="Complete" @click="filterByStatus(taskStatus)">
                Complete
              </option>
              <option value="inComplete" @click="filterByStatus(taskStatus)">
                inComplete
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
    async filterBy(taskCategory) {
      await axios
        .get(
          `/filteredTask/?filteredby=${taskCategory}&status=${this.taskStatusHolder}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              category: taskCategory,
              status: this.taskStatus,
            },
          }
        )
        .then((res) => {
          this.userTask = res.data.userTask;
        });
    },
    async filterByStatus(status) {
      if (status == "Complete") {
        this.taskStatusHolder = true;
      } else if (status == "inComplete") {
        this.taskStatusHolder = false;
      } else if (status == "All") {
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