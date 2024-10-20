<template lang="pug">
template(v-if="isLoading")
  loading-cue(:loading-text="appPhase")
Transition(name="fade")
  template(v-if="!isLoading")
    notification(:notification-message="appError", v-if="isError")
    .salat-layout(v-else)
      div(class="tw-flex tw-flex-col tw-justify-center")
        salat(:salat="nextSalat", disp-type="next")
        current-location(:location="location")
      .salat-schedule(class="tw-flex tw-flex-col tw-justify-start md:tw-justify-center")
        .salat-schedule__heading(class="tw-mb-2")
          Transition(name="fade", mode="out-in")
            DayDisplay(:dateObj="today", v-if="selectedDay === 'today'")
            DayDisplay(:dateObj="tomorrow", v-else)
          div.salat-schedule__switcher
            button.salat-schedule__switch(@click="toggleDay")
              | {{ selectedDay !== 'today' ? '&larr;' : '&rarr;' }}
        Transition(:name="slideTransitionName" mode="out-in")
          salat-list(:salat-list="todaySalat", v-if="selectedDay === 'today'")
          salat-list(:salat-list="tomorrowSalat", v-else)
</template>

<script lang="ts">
import { add } from 'date-fns';
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';

import DayDisplay from '@/components/DayDisplay.vue';
import LoadingCue from '@/components/LoadingCue.vue';
import CurrentLocation from '@/components/CurrentLocation.vue';
import Notification from '@/components/Notification.vue';
import Salat from '@/components/Salat.vue';
import SalatList from '@/components/SalatList.vue';

import useMainStore from '@/stores/main';

const APPREFRESHINTERVAL = 600000; // Ten minutes

export default defineComponent({
  name: 'DayView',
  components: {
    DayDisplay,
    'current-location': CurrentLocation,
    'loading-cue': LoadingCue,
    'notification': Notification,
    'salat': Salat,
    'salat-list': SalatList,
  },
  setup() {
    const mainStore = useMainStore();
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
      mainStore.initializeState();
      setInterval(() => {
        mainStore.loadSalat();
      }, APPREFRESHINTERVAL);
    });

    function selectDay(inp: string) {
      selectedDay.value = inp;
    }

    function toggleDay() {
      if (selectedDay.value === 'today') {
        selectedDay.value = 'tomorrow';
      } else {
        selectedDay.value = 'today';
      }
    }

    return {
      selectedDay,
      dateToDisplay,
      appError: computed(() => mainStore.appError),
      appPhase: computed(() => mainStore.appPhase),
      isError: computed(() => mainStore.isError),
      isLoading: computed(() => mainStore.isLoading),
      location: computed(() => mainStore.location),
      nextSalat: computed(() => mainStore.nextSalat),
      slideTransitionName,
      today,
      todaySalat: computed(() => mainStore.todaySalat),
      tomorrow,
      tomorrowSalat: computed(() => mainStore.tomorrowSalat),
      selectDay,
      toggleDay,
    };
  },
});
</script>
