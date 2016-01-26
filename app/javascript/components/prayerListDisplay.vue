<template lang="jade">
  div.praytime-list-display
    ul
      li(v-for="prayer in prayers")
        prayer-display(:prayer="prayer")
</template>

<script>
  import prayerDisplay from "./prayerDisplay.vue";

  export default {
    components: {
      "prayer-display": prayerDisplay
    },
    props: [
      "prayers"
    ]
  }
</script>
