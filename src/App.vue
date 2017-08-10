<template>
  <div id="app">
    <login></login>
  </div>
</template>

<script>
import login from './login.vue';

export default {
  name: 'app',
  data () {
  },
  components: {
    login
  }
}
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
    background-color: blue;
  }
</style>
