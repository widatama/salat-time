<template lang="jade">
  | {{time}}
</template>

<script>
  import moment from "moment";

  export default {
    props: {
      time: {
        coerce(val) {
          let tempTime = moment(val, "h:m a");
          return moment(tempTime).format("HH : mm");
        }
      }
    }
  }
</script>
