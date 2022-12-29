<template lang="pug">
.location
  div {{area}}
  div {{country}}
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  props: {
    location: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const area = computed(() => {
      const result = [];

      if (props.location.city) {
        result.push(props.location.city);
      } else if (props.location.village) {
        result.push(props.location.village);
      }

      if (props.location.state) {
        result.push(props.location.state);
      }

      return result.join(', ');
    });

    return {
      area,
      country: computed(() => props.location.country),
    };
  },
});
</script>
