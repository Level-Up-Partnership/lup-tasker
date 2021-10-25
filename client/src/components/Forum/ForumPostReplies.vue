<template>
  <div>
    <div>
      <button
        v-if="isUserId"
        type="button"
        class="btn-close subtaskDelete"
        aria-label="Close"
        @click="deleteForumReply(topicreplyid)"
      ></button>
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
  data() {
    return {};
  },
  props: ["userName", "userReply", "createdAt", "userid", "topicreplyid"],
  methods: {
    deleteForumReply(topicreplyids) {
      console.log(topicreplyids);
    },
  },
  computed: {
    isUserId() {
      if (this.userid == localStorage.getItem("userid")) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.list-group {
  display: inline-block;
  width: 50%;
}
</style>