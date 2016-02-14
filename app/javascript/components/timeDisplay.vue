<template lang="jade">
.time-display
  | {{time}}
</template>

<script>
  export default {
    props: [
      "time"
    ]
  }
</script>
