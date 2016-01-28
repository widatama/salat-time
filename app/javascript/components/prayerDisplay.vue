<template lang="jade">
  div.prayer
    div.prayer__name
      | {{prayer.name}}&nbsp;
    div.prayer__time
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
