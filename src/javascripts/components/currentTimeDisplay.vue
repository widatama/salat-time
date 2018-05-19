<template lang="pug">
.current-time
  span.current-date
    | {{day}} {{month}}
  span.clock
    | {{hour}}
    span.clock__ticker &nbsp;:&nbsp;
    | {{minute}}
</template>

<script>
  import moment from 'moment';

  const INTERVAL = 1000;

  export default {
    data() {
      return {
        dateObj: moment()
      }
    },
    computed: {
      day() {
        return this.dateObj.format('DD');
      },
      month() {
        return this.dateObj.format('MMM');
      },
      hour() {
        return this.dateObj.format('HH');
      },
      minute() {
        return this.dateObj.format('mm');
      }
    },
    methods: {
      updateTime() {
        this.$data.dateObj = moment();
      }
    },
    created() {
      setInterval(this.updateTime.bind(this), INTERVAL);
    }
  }
</script>
