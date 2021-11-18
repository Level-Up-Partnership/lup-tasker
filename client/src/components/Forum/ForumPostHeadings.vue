<template>
  <!-- Component topic headings -->
  <div>
    <div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <h2>Title: {{ forumTitle }}</h2>
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-center width">
      <div class="card">
        <div class="card-header userName">Created by: {{ userName }}</div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <div class="align-text">
              <div class="wrap-text">
                <p>{{ forumDescription }}</p>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
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

.align-text {
  width: 900px;
}
.wrap-text {
  word-wrap: break-word;
  text-align: center;
}
.userName {
  font-weight: bold;
}
</style>