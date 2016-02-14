<template lang="jade">
  div.time-display
    | {{time}}
</template>

<script>
  export default {
    props: [
      "time"
    ]
  }
</script>
