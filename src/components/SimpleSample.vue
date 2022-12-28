<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      default: '',
    },
  },
});
</script>

<template lang="pug">
div.tw-text-lg {{ message }}
</template>
