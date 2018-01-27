<template>
  <nav class="navbar navbar-dark navbar-expand-xl bg-dark">
    <div class="navbar-brand">
      Review Central
    </div>
    <div class="items-container navbar-nav">
        <span class="nav-item nav-link" v-if="user.githubUsername">@{{user.githubUsername}}</span>
        <a href="#" class="nav-item nav-link">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation-bar',
  props: ['user']
};
</script>

<style>
.items-container {
  margin-left: auto;
  margin-right: 8px;
}
</style>
