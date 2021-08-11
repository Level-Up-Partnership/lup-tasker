<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-sm">USER PROFILE</div>
      </div>
    </div>
    <div class="container">
      <div class="row align-items-start">
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
      </div>
      <div class="row align-items-center">
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
        <div class="col">One of three columns</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
};
</script>


<style scoped>
</style>