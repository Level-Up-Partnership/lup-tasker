<template>
  <!-- 
 * I Hadi Fayad, 000397306 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. 
 * I have not made my work available to anyone else.
 */-->
  <body>
    <div>
      <the-header></the-header>
    </div>
    <router-view />
  </body>
</template>
<script>
import TheHeader from "./components/Layout/TheHeader.vue";
export default {
  components: {
    TheHeader,
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
