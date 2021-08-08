<template>
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
  created() {},
  watch: {},
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
