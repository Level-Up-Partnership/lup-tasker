<template>
  <div>
    <h1>Discussion Forum</h1>
    <category-pages
      v-for="categoryPages in CategoryName"
      :key="categoryPages.categoryid"
      :categoryTitle="categoryPages.title"
      :categoryDescription="categoryPages.description"
      :categoryId="categoryPages.categoryid"
    ></category-pages>
    <div>
      {{ categoryError }}
    </div>
  </div>
</template>


<script>
import axios from "axios";
import CategoryPages from "../../components/Forum/CategoriesPages.vue";
export default {
  components: {
    CategoryPages,
  },
  data() {
    return {
      CategoryName: [],
      isLoaded: false,
      categoryError: "",
    };
  },
  mounted() {
    this.$store.dispatch("CheckIfLoggedIn");
    this.$store.dispatch("CheckUserRole");
  },
  async created() {
    await axios
      .get("/categoryInfo", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        this.CategoryName = res.data;
      })
      .catch((err) => {
        this.categoryError = err.response.data.error;
      });
    this.isLoaded = true;
  },
};
</script>


<style scoped>
</style>