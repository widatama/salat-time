<template lang="pug">
ul.salat-items
  li.salat-item(v-for="salat in salatList" :key="salat.name + salat.date")
    salat(:salat="salat")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Salat from './Salat.vue';

export default defineComponent({
  components: {
    salat: Salat,
  },
  props: [
    'salatList',
  ],
});
</script>
