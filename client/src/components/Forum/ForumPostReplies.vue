<template>
  <div>
    <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h2>{{ userName }}</h2>
        </li>
        <h3>{{ userReply }}</h3>
        <p>{{ createdAt }}</p>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["topicReplyId", "userName", "userReply", "createdAt"],
};
</script>


<style scoped>
.list-group {
  display: inline-block;
  width: 50%;
}
</style>