<template>
  <div>
    <button @click="logout">logout</button>
  </div>
</template>


<script>
export default {
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
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
</style>