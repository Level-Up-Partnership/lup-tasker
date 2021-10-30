<template>
  <div>
    <div class="row justify-content-center">
      <ol class="list-group col-6 text-left">
        <li class="list-group-item d-flex align-items-start">
          <div class="ms-2 me-auto">
            <div class="fw-bold text-start">
              <router-link
                :to="`/forum/${categoryName}/post/${fourmId}`"
                class="align-items-start"
                >{{ forumTitle }}</router-link
              >
            </div>
            <div class="align">
              <p class="text-start wrap">
                {{ forumDescription }}
              </p>
            </div>
          </div>
          <span class="badge bg-primary rounded-pill">{{ createdAt }}</span>
        </li>
        <span class="badge rounded-pill bg-light text-dark"
          >Created by: {{ username }}</span
        >
      </ol>
    </div>
  </div>
</template>



<script>
export default {
  props: [
    "username",
    "fourmId",
    "forumTitle",
    "forumDescription",
    "createdAt",
    "categoryName",
  ],
  methods: {},
};
</script>


<style scoped>
.align {
  width: 750px;
  /* border: 2px solid red; */
}
.wrap {
  word-wrap: break-word;
}
</style>