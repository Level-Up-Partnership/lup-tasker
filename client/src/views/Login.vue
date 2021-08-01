<template>
  <div>
    <h1>Users</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ users.username }}
      </li>
    </ul>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:5000/users/");
      this.users = res.data;
      console.log(this.users[0].username);
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style scoped>
</style>