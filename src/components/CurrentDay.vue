<template lang="pug">
.current-day
  | {{day}}&ensp;{{date}} {{month}} {{year}}
</template>

<script lang="ts">
  import { format } from 'date-fns';
  import { computed, defineComponent, onMounted, ref } from 'vue';

  const INTERVAL = 60000; // a minute

  export default defineComponent({
    name: 'current-day',
    setup() {
      const dateObj = ref(new Date());

      onMounted(() => {
        setInterval(() => {
          dateObj.value = new Date();
        }, INTERVAL);
      });

      return {
        date: computed(() => format(dateObj.value, 'dd')),
        dateObj,
        day: computed(() => format(dateObj.value, 'EEEE')),
        month: computed(() => format(dateObj.value, 'MMMM')),
        year: computed(() => format(dateObj.value, 'yyyy')),
      };
    },
  })
</script>
