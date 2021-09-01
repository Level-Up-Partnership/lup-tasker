<template>
  <div>
    <h1>Discussion Forum</h1>
    <ul v-if="isLoaded">
      <li>
        <router-link to="/forum/categorysuggestion">{{
          CategoryName[0].title
        }}</router-link>
        <div>{{ CategoryName[0].description }}</div>
      </li>
      <li>
        <router-link to="/forum/generaldiscussion"
          >{{ CategoryName[1].title }}
        </router-link>
        <div>{{ CategoryName[1].description }}</div>
      </li>
      <li>
        <router-link to="/forum/helpdesk"
          >{{ CategoryName[2].title }}
        </router-link>
        <div>{{ CategoryName[2].description }}</div>
      </li>
      <li>
        <router-link to="/forum/social"
          >{{ CategoryName[3].title }}
        </router-link>
        <div>{{ CategoryName[3].description }}</div>
      </li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      CategoryName: [],
      isLoaded: false,
    };
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
  },
  async created() {
    await axios.get("/categoryInfo").then((res) => {
      //   console.log(res.data);
      this.CategoryName = res.data;
    });
    this.isLoaded = true;
  },
};
</script>


<style scoped>
</style>