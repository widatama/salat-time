<template lang="jade">
  div
    div(v-for="item in items")
      ul
        li {{item.fajr}}
        li {{item.dhuhr}}
        li {{item.asr}}
        li {{item.maghrib}}
        li {{item.isha}}
</template>

<script>
  export default {
    props: [
      "items"
    ]
  }
</script>
