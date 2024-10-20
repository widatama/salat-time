<template lang="pug">
.day-display
  | {{day}}&ensp;{{date}} {{month}} {{year}}
</template>

<script lang="ts">
import { format } from 'date-fns';
import { computed, defineComponent, toRefs } from 'vue';

export default defineComponent({
  name: 'DayDisplay',
  props: {
    dateObj: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const { dateObj } = toRefs(props);

    return {
      date: computed(() => format(dateObj.value, 'dd')),
      day: computed(() => format(dateObj.value, 'EEEE')),
      month: computed(() => format(dateObj.value, 'MMMM')),
      year: computed(() => format(dateObj.value, 'yyyy')),
    };
  },
});
</script>
