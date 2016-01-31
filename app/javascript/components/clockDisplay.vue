<template lang="jade">
  div.clock
    | {{hour}}&nbsp;
    span.clock__ticker :
    |  {{minute}}
</template>

<script>
  import moment from "moment";

  const INTERVAL = 1000;

  export default {
    data() {
      return {
        dateObj: moment()
      }
    },
    computed: {
      hour() {
        return this.dateObj.format("HH");
      },
      minute() {
        return this.dateObj.format("mm");
      },
      second() {
        return this.dateObj.format("ss");
      }
    },
    methods: {
      updateTime() {
        this.$data.dateObj = moment();
      }
    },
    beforeCompile() {
      setInterval(this.updateTime.bind(this), INTERVAL);
    }
  }
</script>
