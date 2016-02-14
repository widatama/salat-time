<template lang="jade">
.salat(class="{{dispType ? 'salat--' + dispType : ''}}")
  .salat__name(class="{{dispType ? 'salat__name--' + dispType : ''}}")
    | {{salat.name}}
  .salat__time(class="{{dispType ? 'salat__time--' + dispType : ''}}")
    time-display(:time="salat.time")
</template>

<script>
  import timeDisplay from "./timeDisplay.vue";

  export default {
    components: {
      "time-display": timeDisplay
    },
    props: [
      "salat",
      "dispType"
    ]
  }
</script>
