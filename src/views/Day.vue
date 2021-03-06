<template lang="pug">
template(v-if="isLoading")
  loading-cue( :loading-text="appPhase")
template(v-else)
  template(v-if="isError")
    notification( :notification-message="appError")
  template(v-else)
    .salat-next
      salat( :salat="nextSalat", disp-type="next")
      current-location( :location="location")
    .salat-schedule
      .salat-schedule__heading
        DayDisplay(:dateObj="dateToDisplay")
        div.salat-schedule__switcher
          span.salat-schedule__switch(
            :class="{'salat-schedule__switch--inactive': selectedDay === 'today'}"
            @click="selectDay('today')"
          ) &larr;
          | &emsp;
          span.salat-schedule__switch(
            :class="{'salat-schedule__switch--inactive': selectedDay !== 'today'}"
            @click="selectDay('tomorrow')"
          ) &rarr;
      salat-list(:salat-list="selectedDay === 'today' ? todaySalat : tomorrowSalat")
</template>

<script lang="ts">
import { add } from 'date-fns';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import { mapGetters, useStore } from 'vuex';

import DayDisplay from '@/components/DayDisplay.vue';
import LoadingCue from '@/components/LoadingCue.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import Notification from '@/components/Notification.vue';
import Salat from '@/components/Salat.vue';
import SalatList from '@/components/SalatList.vue';

const APPCYCLEINTERVAL = 600000; // Ten minutes

export default defineComponent({
  name: 'day',
  components: {
    DayDisplay,
    'current-location': CurrentLocation,
    'loading-cue': LoadingCue,
    notification: Notification,
    salat: Salat,
    'salat-list': SalatList,
  },
  setup() {
    const store = useStore();
    const selectedDay = ref('today');
    const today = computed(() => new Date());
    const tomorrow = computed(() => add(new Date(), { days: 1 }));

    const dateToDisplay = computed(() => {
      if (selectedDay.value === 'today') {
        return today.value;
      }

      return tomorrow.value;
    });

    onMounted(() => {
      store.dispatch('initializeState');
      setInterval(() => {
        store.dispatch('loadSalat');
      }, APPCYCLEINTERVAL);
    });

    function selectDay(inp: string) {
      selectedDay.value = inp;
    }

    return {
      selectedDay,
      dateToDisplay,
      appError: computed(() => store.getters.appError),
      appPhase: computed(() => store.getters.appPhase),
      isError: computed(() => store.getters.isError),
      isLoading: computed(() => store.getters.isLoading),
      location: computed(() => store.getters.location),
      nextSalat: computed(() => store.getters.nextSalat),
      todaySalat: computed(() => store.getters.todaySalat),
      tomorrowSalat: computed(() => store.getters.tomorrowSalat),
      selectDay,
    };
  },
});
</script>
