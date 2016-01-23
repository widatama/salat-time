<template lang="jade">
  div.praytime-list-display
    ul
      li(v-for="praytime in praytimes")
        praytime-display(:praytime="praytime")
</template>

<script>
  import praytimeDisplay from "./praytimeDisplay.vue";

  export default {
    components: {
      "praytime-display": praytimeDisplay
    },
    props: [
      "praytimes"
    ]
  }
</script>
