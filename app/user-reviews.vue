<template>
  <div class="content">
      <!-- TODO: add settings here for additional options, and maybe a blurb or some help text -->
      <review-group groupTitle="Active Reviews"></review-group>
      <review-group groupTitle="Waiting"></review-group>
  </div>
</template>

<script>
import reviewGroup from './review-group.vue';

export default {
  name: 'user-reviews',
  components: {
    reviewGroup
  }
};
</script>

<style>
.content {
  padding: 20px;
}
</style>
