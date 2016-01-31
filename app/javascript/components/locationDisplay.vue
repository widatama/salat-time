<template lang="jade">
  div.location
    | {{address.country}}
</template>

<script>
  export default {
    props: [
      "address"
    ]
  }
</script>
