<template lang="pug">
ul.salat-items
  li.salat-item(v-for="salat in salatList")
    salat-display( :salat="salat")
</template>

<script>
  import salatDisplay from './salatDisplay.vue';

  export default {
    components: {
      'salat-display': salatDisplay
    },
    props: [
      'salatList'
    ]
  }
</script>
