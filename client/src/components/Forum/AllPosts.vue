<template>
  <div>
    <ol class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-start"
      >
        <div class="ms-2 me-auto">
          <div class="fw-bold">
            <router-link :to="`/forum/categorysuggestion/post/${fourmId}`">{{
              forumTitle
            }}</router-link>
          </div>
          {{ forumDescription }}
        </div>
        <span class="badge bg-primary rounded-pill">{{ createdAt }}</span>
      </li>
    </ol>
  </div>
</template>



<script>
export default {
  props: ["fourmId", "forumTitle", "forumDescription", "createdAt"],
};
</script>


<style scoped>
h2 {
  cursor: pointer;
  text-decoration: underline;
  color: #1a0dab;
}
</style>