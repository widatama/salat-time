<template lang="jade">
.notification {{notificationMessage}}
</template>

<script>
  export default {
    props: [
      "notificationMessage"
    ]
  }
</script>
