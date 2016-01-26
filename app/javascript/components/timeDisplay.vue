<template lang="jade">
  | {{time}}
</template>

<script>
  import moment from "moment";

  export default {
    props: [
      "time"
    ]
  }
</script>
