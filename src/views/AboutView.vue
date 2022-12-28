<script lang="ts">
import { defineComponent } from 'vue';
import SimpleSample from '@/components/SimpleSample.vue';

export default defineComponent({
  components: {
    SimpleSample,
  },
});
</script>

<template lang="pug">
main
  SimpleSample(message="About Page")
</template>
