<template>
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
      <div
        class="collapse navbar-collapse nav-content"
        id="navbarSupportedContent"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              to="login"
              v-if="!isLoggedIn"
              class="nav-link active"
              aria-current="page"
              >Login</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/register" v-if="!isLoggedIn" class="nav-link"
              >Register</router-link
            >
          </li>
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
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.IsLoggedIn;
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
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
</style>