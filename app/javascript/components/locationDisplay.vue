<template lang="jade">
.location
  | {{location.city}}, {{location.country.name}}
</template>

<script>
  export default {
    props: [
      "location"
    ]
  }
</script>
