<template lang="jade">
  div.prayer-list
    ul
      li.prayer-item(v-for="prayer in prayers")
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
