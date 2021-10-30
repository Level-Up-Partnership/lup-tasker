<template>
  <div>
    <div class="d-flex justify-content-center width">
      <div class="card">
        <div class="card-header">Created by: {{ userName }}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <div class="align-text">
              <div class="wrap-text">
                <p>{{ userReply }}</p>
              </div>
            </div>
            <footer class="blockquote-footer">
              {{ createdAt }}
            </footer>
          </blockquote>
          <button
            v-if="isUserId"
            type="button"
            class="btn-close subtaskDelete"
            aria-label="Close"
            @click="deleteForumReply(topicreplyid)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  props: ["userName", "userReply", "createdAt", "userid", "topicreplyid"],
  methods: {
    async deleteForumReply(topicreplyids) {
      console.log(topicreplyids);
      await axios
        .delete("/deleteForumReply", {
          token: localStorage.getItem("token"),
          topicreplyid: topicreplyids,
        })
        .catch((err) => {});
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

.align-text {
  width: 700px;
}
.wrap-text {
  word-wrap: break-word;
  text-align: left;
}
</style>