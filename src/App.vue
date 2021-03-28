<template lang="pug">
header.app-header
  h1.app__title
    strong Salat
    | Time
  current-time
section.app-content
  router-view
</template>

<script lang="ts">
  import CurrentTime from '@/components/CurrentTime.vue';

  export default {
    components: {
      'current-time': CurrentTime,
    },
  };
</script>
