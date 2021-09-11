<template>
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
        </li>
      </ol>
    </div>
  </div>
</template>



<script>
export default {
  props: ["categoryId", "categoryTitle", "categoryDescription"],
};
</script>


<style scoped>
</style>