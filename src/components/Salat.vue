<template lang="pug">
.salat(:class="className('salat--')")
  .salat__name(:class="className('salat__name--')")
    | {{salat.name}}
  .salat__time(:class="className('salat__time--')")
    time-display(:time="salat.time")
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TimeDisplay from './TimeDisplay.vue';

export default defineComponent({
  components: {
    'time-display': TimeDisplay,
  },
  props: {
    salat: {
      type: Object,
      required: true,
    },
    dispType: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    return {
      className(prefix: string) {
        if (props.dispType) {
          return prefix + props.dispType;
        }

        return '';
      },
    };
  },
});
</script>
