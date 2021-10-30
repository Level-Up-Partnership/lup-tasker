<template>
  <div>
    <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h2>{{ forumTitle }}</h2>
        </li>
        <h5>Created by: {{ userName }}</h5>
        <p class="description">{{ forumDescription }}</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["forumTitle", "forumDescription", "userName"],
};
</script>


<style scoped>
.list-group {
  display: inline-block;
  width: 50%;
}
</style>