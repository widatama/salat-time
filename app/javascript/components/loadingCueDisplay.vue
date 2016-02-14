<template lang="jade">
  div.loading-cue {{loadingText}}
</template>

<script>
  export default {
    props: [
      "loadingText"
    ]
  }
</script>
