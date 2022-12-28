<template lang="pug">
header.app-header
  h1.app__title
    strong Salat
    | Time
section.app-content
  RouterView
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    RouterView,
  },
  setup() {
    const { state } = useStore();

    return {
      state,
    };
  },
});
</script>
