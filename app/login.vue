<template>
  <div class="login-container">
    <div>
      <div>Log in with Github to manage reviews</div>
      <a class="btn btn-large btn-secondary" href="/api/login/github">Login with GitHub</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {

  },
  methods: {
  }
}

</script>

<style scoped>
  .login-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
