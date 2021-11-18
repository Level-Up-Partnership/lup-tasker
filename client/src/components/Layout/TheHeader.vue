<template>
  <!-- Component for the header -->
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand tasker-header" to="/homepage"
          >Tasker</router-link
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div v-if="timerRunning">
          <div
            class="collapse navbar-collapse nav-content"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item searchBar">
                <input
                  placeholder="Search for a user"
                  v-model="searchFriend"
                  v-if="isLoggedIn"
                  @keydown="getUsers"
                  type="search"
                />
              </li>
              <li class="nav-item">
                <router-link
                  to="login"
                  v-if="!isLoggedIn"
                  class="nav-link active"
                  aria-current="page"
                  >Login</router-link
                >
              </li>
              <div v-if="isLoggedIn">
                <div
                  class="card autocomp"
                  style="width: 18rem"
                  v-if="searchUsers.length"
                >
                  <ul class="list-group list-group-flush">
                    <li
                      class="list-group-item"
                      v-for="user in searchUsers"
                      :key="user.user_id"
                    >
                      <router-link
                        class="userSearch"
                        @click="selectUser(user.username)"
                        :to="`/user/${user.user_id}`"
                        >{{ user.username }}</router-link
                      >
                    </li>
                  </ul>
                </div>
              </div>
              <li>
                <router-link
                  v-if="isLoggedIn"
                  to="/profile"
                  class="nav-link"
                  type="button"
                >
                  Profile
                </router-link>
              </li>
              <li>
                <router-link
                  v-if="isLoggedIn"
                  to="/taskhistory"
                  class="nav-link"
                  type="button"
                >
                  History
                </router-link>
              </li>
              <li>
                <router-link
                  v-if="isLoggedIn"
                  to="/taskStats"
                  class="nav-link"
                  type="button"
                >
                  Stats
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  v-if="isLoggedIn"
                  to="/forum"
                  class="nav-link"
                  type="button"
                >
                  Forum
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  v-if="isLoggedIn"
                  to="/login"
                  class="nav-link"
                  type="button"
                  @click="logout"
                >
                  Logout
                </router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link" type="button">
                  About
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      searchFriend: "",
      usersArr: [],
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.IsLoggedIn; //If token = true
    },
    //If the timer is running disable the header content
    timerRunning() {
      return this.$store.getters.isNotRunning;
    },
    //Search the user to add them ass a friend
    searchUsers() {
      if (this.searchFriend === "") {
        return [];
      }
      let matches = 0;
      return this.usersArr.filter((user) => {
        if (
          user.username.toLowerCase().includes(this.searchFriend.toLowerCase())
        ) {
          matches++;
          return this.usersArr;
        }
      });
    },
  },
  methods: {
    //If logout is pressed, remove the token and push them to the login form
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
    selectUser(username) {
      this.searchFriend = "";
    },
    //Get all the users to display for searching
    async getUsers() {
      await axios
        .get("/getAllUsers", {
          headers: { token: localStorage.getItem("token") },
        })
        .then((res) => {
          this.usersArr = res.data.userInfo;
        })
        .catch((err) => {});
    },
  },
};
</script>
<style scoped>
.tasker-header {
  font-size: 25px;
}
.nav-colour {
  color: black;
}
.nav-content {
  position: absolute;
  top: 8px;
  right: 16px;
  font-size: 18px;
}
.searchBar {
  position: absolute;
  bottom: 8px;
  right: 400px;
}
.searchBar input {
  height: 25px;
  width: 180px;
}
.autocomp {
  position: absolute;
  right: 300px;
  top: 56px;
}
.userSearch {
  cursor: pointer;
}
</style>