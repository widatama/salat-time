<template lang="jade">
  div.prayer(class="{{dispType ? 'prayer--' + dispType : ''}}")
    div.prayer__name(class="{{dispType ? 'prayer__name--' + dispType : ''}}")
      | {{prayer.name}}
    div.prayer__time(class="{{dispType ? 'prayer__time--' + dispType : ''}}")
      time-display(:time="prayer.time")
</template>

<script>
  import timeDisplay from "./timeDisplay.vue";

  export default {
    components: {
      "time-display": timeDisplay
    },
    props: [
      "prayer",
      "dispType"
    ]
  }
</script>
