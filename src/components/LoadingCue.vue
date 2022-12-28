<template lang="pug">
.loading-cue {{loadingText}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: [
    'loadingText',
  ],
});
</script>
