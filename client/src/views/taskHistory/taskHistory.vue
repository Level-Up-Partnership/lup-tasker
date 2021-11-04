<template>
  <div>
    <h1>Task History</h1>
    <div>
      <h4>
        {{ searchByError }}
        {{ filterByStatusError }}
        {{ filterByCategoryError }}
        {{ getTasksError }}
      </h4>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <div class="dropdown">
            Category:
            <select
              id="categoryTask"
              class="btn btn-secondary dropdown-toggle"
              v-model="query.taskCategory"
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
              v-model="query.taskStatusHolder"
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
              v-model="query.searchFor"
              placeholder="Search.."
            />

            <button type="button" class="btn btn-secondary btn-sm">
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
    <div class="position-absolute bottom--50 start-50 translate-middle-x">
      <pagination
        v-model="page"
        :records="userTaskTotalLength"
        :per-page="per_page"
        @paginate="myCallback($event)"
      />
    </div>
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
      query: {
        taskCategory: "All",
        searchFor: "",
        taskStatusHolder: "All",
      },
      storedSearch: "",
      isEmpty: false,
      page: 1,
      per_page: 3,
      getTaskError: 0,
      searchByError: "",
      filterByStatusError: "",
      filterByCategoryError: "",
      getTasksError: "",
      userTaskTotalLength: 0,
    };
  },
  async mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
    await this.myCallback(1);
  },
  methods: {
    async myCallback(page) {
      this.page = page;
      let nullStatus = "";
      if (this.query.taskStatusHolder == "Complete") {
        nullStatus = true;
      } else if (this.query.taskStatusHolder == "inComplete") {
        nullStatus = false;
      }
      await axios
        .get(
          `/filterBy/?taskName=${this.query.searchFor}&category=${this.query.taskCategory}&status=${nullStatus}`,
          {
            headers: {
              token: localStorage.getItem("token"),
              limit: this.per_page,
              pageOffSet: (page - 1) * this.per_page,
            },
          }
        )
        .then(async (res) => {
          console.log(res);
          this.userTaskTotalLength = res.data.lengthPag.length;
          this.userTask = res.data.userTask;
        });
    },
  },
  watch: {
    query: {
      deep: true,
      async handler() {
        await this.myCallback(this.page);
      },
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