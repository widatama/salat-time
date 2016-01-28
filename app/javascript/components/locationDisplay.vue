<template lang="jade">
  div.location
    | {{address.village}}, {{address.state}}
</template>

<script>
  export default {
    props: [
      "address"
    ]
  }
</script>
