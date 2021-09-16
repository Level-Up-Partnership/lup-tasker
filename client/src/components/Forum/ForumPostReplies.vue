<template>
  <div>
    <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h5>Created by: {{ userName }}</h5>
        </li>
        <p>{{ userReply }}</p>
        <p>Message Created: {{ createdAt }}</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["userName", "userReply", "createdAt"],
};
</script>


<style scoped>
.list-group {
  display: inline-block;
  width: 50%;
}
</style>