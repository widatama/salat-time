<template lang="pug">
.notification {{notificationMessage}}
</template>

<script>
  export default {
    props: [
      'notificationMessage'
    ]
  }
</script>
