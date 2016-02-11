<template lang="jade">
  div.location
    | {{location.city}}, {{location.country.name}}
</template>

<script>
  export default {
    props: [
      "location"
    ]
  }
</script>
