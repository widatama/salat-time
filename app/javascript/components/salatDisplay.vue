<template lang="jade">
  div.salat(class="{{dispType ? 'salat--' + dispType : ''}}")
    div.salat__name(class="{{dispType ? 'salat__name--' + dispType : ''}}")
      | {{salat.name}}
    div.salat__time(class="{{dispType ? 'salat__time--' + dispType : ''}}")
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
