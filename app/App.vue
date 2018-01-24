<template>
  <div id="app">
    <navigation-bar></navigation-bar>
    <login></login>
  </div>
</template>

<script>
import axios from 'axios';
import navigationBar from './navigation-bar.vue';
import login from './login.vue';

export default {
  name: 'app',
  data () {
    return {};
  },
  mounted: function() {
    axios.get('/api/user').then((response) => {
      console.log(response.data);
    });
  },
  components: {
    navigationBar,
    login
  }
}
</script>

<style lang="scss">
  #app {
    width: 100vw;
    height: 100vh;
  }
</style>
