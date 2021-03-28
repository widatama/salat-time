<template lang="pug">
.current-time
  span.clock
    | {{hour}}
    span.clock__ticker &nbsp;:&nbsp;
    | {{minute}}
</template>

<script lang="ts">
  import { format } from 'date-fns';
  import { computed, defineComponent, onMounted, ref } from 'vue';

  const INTERVAL = 1000;

  export default defineComponent({
    name: 'current-time',
    setup() {
      const dateObj = ref(new Date());

      onMounted(() => {
        setInterval(() => {
          dateObj.value = new Date();
        }, INTERVAL);
      });

      return {
        dateObj,
        hour: computed(() => format(dateObj.value, 'HH')),
        minute: computed(() => format(dateObj.value, 'mm')),
      };
    },
  })
</script>
