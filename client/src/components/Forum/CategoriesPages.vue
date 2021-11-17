<template>
  <div>
    <div>
      <div class="row justify-content-center">
        <ol class="list-group col-6 text-left">
          <li class="list-group-item d-flex align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold text-start">
                <router-link
                  :to="`/forum/category/${categoryId}/`"
                  class="align-items-start"
                  >{{ categoryTitle }}</router-link
                >
              </div>
              <div>
                <p class="text-start">
                  {{ categoryDescription }}
                </p>
              </div>
            </div>
            <button
              v-if="userRole === 1"
              class="badge rounded-pill bg-dark"
              @click="editCategory"
            >
              Edit
            </button>
            <button
              v-if="userRole === 1"
              class="badge rounded-pill bg-danger"
              @click="deleteCategory"
            >
              Delete
            </button>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>



<script>
import axios from "axios";
export default {
  props: ["categoryId", "categoryTitle", "categoryDescription"],
  computed: {
    userRole() {
      return this.$store.getters.UserRole;
    },
  },
  data() {
    return {
      inEditMode: false,
    };
  },
  methods: {
    async deleteCategory() {
      await axios
        .delete("/deleteCategory", {
          headers: {
            token: localStorage.getItem("token"),
            categoryid: this.categoryId,
          },
        })
        .then((res) => {});
      window.location.reload();
    },
    editCategory() {
      this.inEditMode = true;
      this.$emit("edit-mode", this.inEditMode, this.categoryId);
    },
  },
};
</script>


<style scoped>
</style>