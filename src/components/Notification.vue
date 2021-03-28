<template lang="pug">
.notification {{notificationMessage}}
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    props: [
      'notificationMessage',
    ],
  })
</script>
