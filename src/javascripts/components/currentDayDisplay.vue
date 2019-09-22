<template lang="pug">
.current-day
  | {{day}}&ensp;{{date}} {{month}} {{year}}
</template>

<script>
  import { format } from 'date-fns';

  const INTERVAL = 60000; // a minute

  export default {
    data() {
      return {
        dateObj: new Date(),
      };
    },
    computed: {
      day() {
        return format(this.dateObj, 'EEEE');
      },
      date() {
        return format(this.dateObj, 'dd');
      },
      month() {
        return format(this.dateObj, 'MMM');
      },
      year() {
        return format(this.dateObj, 'yyyy');
      }
    },
    methods: {
      updateTime() {
        this.dateObj = new Date();
      }
    },
    created() {
      setInterval(this.updateTime.bind(this), INTERVAL);
    }
  }
</script>

