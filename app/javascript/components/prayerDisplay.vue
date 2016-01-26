<template lang="jade">
  div.praytime-display
    | {{prayer.name}}&nbsp;
    time-display(:time="prayer.time")
</template>

<script>
  import timeDisplay from "./timeDisplay.vue";

  export default {
    components: {
      "time-display": timeDisplay
    },
    props: [
      "prayer"
    ]
  }
</script>
