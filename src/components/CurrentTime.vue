<template lang="pug">
.current-time
  | {{hour}}
  span.animate--blink &nbsp;:&nbsp;
  | {{minute}}
</template>

<script lang="ts">
import { format } from 'date-fns';
import {
  computed,
  defineComponent,
  onMounted,
  ref,
} from 'vue';

const REFRESHINTERVAL = 1000; // One second

export default defineComponent({
  name: 'CurrentTime',
  setup() {
    const dateObj = ref(new Date());

    onMounted(() => {
      setInterval(() => {
        dateObj.value = new Date();
      }, REFRESHINTERVAL);
    });

    return {
      dateObj,
      hour: computed(() => format(dateObj.value, 'HH')),
      minute: computed(() => format(dateObj.value, 'mm')),
    };
  },
});
</script>
