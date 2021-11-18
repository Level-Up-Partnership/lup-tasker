<template>
  <!-- The purpose of this view is for notfoundpage-->
  <div>
    <div class="container">
      <div class="d-flex align-items-start flex-column">
        <h1 class="title">Tasker</h1>
        <h2 class="notfoundcode">404 Not Found</h2>
        <p>
          The request URL {{ userUrl }} was not found on this server
          <router-link to="/homepage">Click here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userUrl: this.$route.fullPath,
    };
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
};
</script>


<style scoped>
.title {
  font-size: 100px;
}
.notfoundcode {
  font-size: 50px;
}
</style>