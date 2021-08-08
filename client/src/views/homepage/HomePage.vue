<template>
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
};
</script>

<style scoped></style>
