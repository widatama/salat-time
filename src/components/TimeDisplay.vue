<template lang="pug">
.time-display
  | {{time}}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    time: { type: String, required: true },
  },
});
</script>
