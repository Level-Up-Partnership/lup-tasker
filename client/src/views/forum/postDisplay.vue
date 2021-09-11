<template>
  <div>
    <h1>Post</h1>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params.id);
  },
};
</script>


<style scoped>
</style>