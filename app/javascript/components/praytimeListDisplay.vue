<template lang="jade">
  div.praytime-list-display
    ul
      li(v-for="prayer in prayers")
        praytime-display(:prayer="prayer")
</template>

<script>
  import praytimeDisplay from "./praytimeDisplay.vue";

  export default {
    components: {
      "praytime-display": praytimeDisplay
    },
    props: [
      "prayers"
    ]
  }
</script>
