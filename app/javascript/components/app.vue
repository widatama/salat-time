<template lang="jade">
  h1
   | {{greeting}}
</template>

<script>
  export default {
    data() {
      return {
        greeting: "Hello Vue"
      }
    }
  }
</script>
