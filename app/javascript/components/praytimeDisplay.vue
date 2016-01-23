<template lang="jade">
  div.praytime-display
    | {{praytime.name}}&nbsp;
    time-display(:time="praytime.time")
</template>

<script>
  import timeDisplay from "./timeDisplay.vue";

  export default {
    components: {
      "time-display": timeDisplay
    },
    props: [
      "praytime"
    ]
  }
</script>
