<template lang="pug">
header.app-header
  h1
    span(class="tw:font-bold") Salat
    | Time
  CurrentTime
section(class="tw:flex tw:flex-col tw:grow")
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
