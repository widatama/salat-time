<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  components: {
    RouterLink,
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

<template lang="pug">
header
  nav
    RouterLink(to="/") Home
    | &ensp;
    RouterLink(to="/about") About

br
div {{ state.content }}
RouterView
</template>
