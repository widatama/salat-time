<template lang="pug">
header.app-header
  h1.app__title
    strong Salat
    | Time
  CurrentTime
section.app-content
  RouterView
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

import CurrentTime from '@/components/CurrentTime.vue';

export default defineComponent({
  components: {
    CurrentTime,
    RouterView,
  },
});
</script>
