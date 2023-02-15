<template lang="pug">
template(v-if="isLoading")
  loading-cue( :loading-text="appPhase")
Transition(name="fade")
  template(v-if="!isLoading")
    notification( :notification-message="appError", v-if="isError")
    .salat-layout(v-else)
      .salat-next
        salat( :salat="nextSalat", disp-type="next")
        current-location( :location="location")
      .salat-schedule
        .salat-schedule__heading
          Transition(name="fade", mode="out-in")
            DayDisplay(:dateObj="today", v-if="selectedDay === 'today'")
            DayDisplay(:dateObj="tomorrow", v-else)
          div.salat-schedule__switcher
            span.salat-schedule__switch(
              v-if="selectedDay !== 'today'"
              @click="selectDay('today')"
            ) &larr;
            span.salat-schedule__switch(
              v-if="selectedDay === 'today'"
              @click="selectDay('tomorrow')"
            ) &rarr;
        Transition(:name="slideTransitionName" mode="out-in")
          salat-list(:salat-list="todaySalat", v-if="selectedDay === 'today'")
          salat-list(:salat-list="tomorrowSalat", v-else)
</template>

<script lang="ts">
import { add } from 'date-fns';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import { useStore } from 'vuex';

import DayDisplay from '@/components/DayDisplay.vue';
import LoadingCue from '@/components/LoadingCue.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import Notification from '@/components/Notification.vue';
import Salat from '@/components/Salat.vue';
import SalatList from '@/components/SalatList.vue';

const APPREFRESHINTERVAL = 600000; // Ten minutes

export default defineComponent({
  name: 'DayView',
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
    const slideTransitionName = computed(() => {
      if (selectedDay.value === 'today') {
        return 'slide-l';
      }

      return 'slide-r';
    });
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
      }, APPREFRESHINTERVAL);
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
      slideTransitionName,
      today,
      todaySalat: computed(() => store.getters.todaySalat),
      tomorrow,
      tomorrowSalat: computed(() => store.getters.tomorrowSalat),
      selectDay,
    };
  },
});
</script>
