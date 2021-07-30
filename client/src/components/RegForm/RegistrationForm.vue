<template>
  <div>
    <form>
      <div class="form-group">
        <label for="displayedName">Display Name: </label>
        <input type="text" id="displayedName" />
      </div>
      <div class="form-group">
        <label for="userEmail">Email: </label>
        <input type="email" id="userEmail" class="form-group" />
      </div>
      <div class="form-group">
        <label for="userPassword">Password</label>
        <input type="password" id="userPassword" placeholder="Enter Password" />
      </div>
      <div class="form-group">
        <label for="userConfirmedPassword">Confirm Password</label>
        <input
          type="password"
          id="userConfirmedPassword"
          placeholder="Confirm Password"
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>


<style scoped>
</style>