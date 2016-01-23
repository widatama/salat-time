<template lang="jade">
  div.location-display
    | {{address.village}}, {{address.state}}
</template>

<script>
  export default {
    props: [
      "address"
    ]
  }
</script>
