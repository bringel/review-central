<template>
  <div class="login-container">
    <div class="login-content">
      <div>Log in with Github to manage reviews</div>
      <a class="btn btn-large btn-success" href="/login/github">Login with GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {};
  },
  methods: {
  }
}

</script>

<style scoped>
  .login-container {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

</style>
