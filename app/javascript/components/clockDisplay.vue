<template lang="jade">
  div.clock
    | {{hour}} : {{minute}} : {{second}}
</template>

<script>
  const INTERVAL = 1000;

  let _helper = {
    padZero(value) {
      if (Math.round(value) === value) {
        if (value < 10) {
          return "0" + value;
        }
        else {
          return value + "";
        }
      }
      else {
        return "";
      }
    }
  };

  export default {
    data() {
      return {
        dateObj: (new Date())
      }
    },
    computed: {
      hour() {
        let rawHour = this.dateObj.getHours();
        return _helper.padZero(rawHour);
      },
      minute() {
        let rawMinute = this.dateObj.getMinutes();
        return _helper.padZero(rawMinute);
      },
      second() {
        let rawSecond = this.dateObj.getSeconds();
        return _helper.padZero(rawSecond);
      }
    },
    methods: {
      updateTime() {
        this.$data.dateObj = new Date();
      }
    },
    beforeCompile() {
      setInterval(this.updateTime.bind(this), INTERVAL);
    }
  }
</script>
