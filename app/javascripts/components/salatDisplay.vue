<template lang="pug">
.salat( :class="className('salat--')")
  .salat__name( :class="className('salat__name--')")
    | {{salat.name}}
  .salat__time( :class="className('salat__time--')")
    time-display( :time="salat.time")
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
    ],
    methods: {
      className(prefix) {
        if (this.dispType) {
          return prefix + this.dispType;
        }
        else {
          return "";
        }
      }
    }
  }
</script>
