<template>
  <div>
    <h1>Discussion Forum</h1>
    <div v-if="!currentlyEditing">
      <category-pages
        v-for="categoryPages in CategoryName"
        :key="categoryPages.categoryid"
        :categoryTitle="categoryPages.title"
        :categoryDescription="categoryPages.description"
        :categoryId="categoryPages.categoryid"
        @edit-mode="inEditMode"
      ></category-pages>
    </div>
    <div>
      <editing-category
        :categoryId="categoryId"
        v-if="currentlyEditing"
        @edit-mode="doneEditing"
      ></editing-category>
    </div>
    <div>
      {{ categoryError }}
    </div>
  </div>
</template>


<script>
import axios from "axios";
import CategoryPages from "../../components/Forum/CategoriesPages.vue";
import EditingCategory from "../../components/Forum/EditingCategory.vue";
export default {
  components: {
    CategoryPages,
    EditingCategory,
  },
  data() {
    return {
      CategoryName: [],
      isLoaded: false,
      categoryError: "",
      currentlyEditing: false,
      categoryId: 0,
    };
  },
  methods: {
    inEditMode(isEditing, categoryId) {
      this.currentlyEditing = isEditing;
      this.categoryId = categoryId;
    },
    async doneEditing(editing) {
      this.currentlyEditing = editing;
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