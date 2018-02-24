<template>
  <div id="app">
    <!-- <navigation-bar :user="user"></navigation-bar> -->
    <b-navbar type="dark" variant="dark" toggleable="md">
      <b-navbar-brand>Review Central</b-navbar-brand>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-text v-if="user.githubUsername">@{{user.githubUsername}}</b-nav-text>
          <b-nav-item href="#">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <login v-if="!loggedIn"></login>
    <user-reviews v-else></user-reviews>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
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
html,
body {
  height: 100%;
  width: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
