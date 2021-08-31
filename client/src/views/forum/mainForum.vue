<template>
  <div>
    <h1>Discussion Forum</h1>
    <ul>
      <li>
        <router-link to="/forum/categorysuggestion"
          >Category Suggestion</router-link
        >
      </li>
      <li>
        <router-link to="/forum/generaldiscussion"
          >General Discussion</router-link
        >
      </li>
      <li>
        <router-link to="/forum/helpdesk">Help Desk</router-link>
      </li>
      <li>
        <router-link to="/forum/social">Social</router-link>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
  },
};
</script>


<style scoped>
</style>