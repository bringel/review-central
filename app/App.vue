<template>
  <div id="app">
    <navigation-bar :user="user"></navigation-bar>
    <login v-if="!loggedIn"></login>
    <user-reviews v-else></user-reviews>
  </div>
</template>

<script>
import axios from 'axios';
import navigationBar from './navigation-bar.vue';
import login from './login.vue';
import userReviews from './user-reviews.vue';

export default {
  name: 'app',
  data() {
    return {
      loggedIn: false,
      user: {}
    };
  },
  mounted: function() {
    axios.get('/api/user').then(response => {
      if (response.data) {
        this.loggedIn = true;
        this.user = response.data;
      }
    });
  },
  components: {
    login,
    navigationBar,
    userReviews
  }
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
