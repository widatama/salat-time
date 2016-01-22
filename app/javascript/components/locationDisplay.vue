<template lang="jade">
  div
    | {{address.state}}
</template>

<script>
  export default {
    props: [
      "address"
    ]
  }
</script>
