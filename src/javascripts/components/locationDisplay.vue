<template lang="pug">
.location
  | {{location.city}}, {{location.country}}
</template>

<script>
  export default {
    props: [
      'location'
    ]
  }
</script>
