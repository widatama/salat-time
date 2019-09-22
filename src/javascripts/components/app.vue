<template lang="pug">
.app
  header.app-header
    h1.app__title
      strong Salat
      | Time
    current-time-display
  section.app-content
    template(v-if="isLoading")
      loading-cue-display( :loading-text="appPhase")
    template(v-else)
      template(v-if="isError")
        notification-display( :notification-message="appError")
      template(v-else)
        .salat-next
          salat-display( :salat="nextSalat", disp-type="next")

          location-display( :location="location")

        .salat-today
          current-day-display
          salat-list-display( :salat-list="todaySalat")
</template>

<script>
  import { mapGetters } from 'vuex';

  import locationDisplay from './locationDisplay.vue';
  import salatDisplay from './salatDisplay.vue';
  import salatListDisplay from './salatListDisplay.vue';
  import currentDayDisplay from './currentDayDisplay.vue';
  import currentTimeDisplay from './currentTimeDisplay.vue';
  import loadingCueDisplay from './loadingCueDisplay.vue';
  import notificationDisplay from './notificationDisplay.vue';

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  export default {
    components: {
      'location-display': locationDisplay,
      'salat-display': salatDisplay,
      'salat-list-display': salatListDisplay,
      'current-day-display': currentDayDisplay,
      'current-time-display': currentTimeDisplay,
      'loading-cue-display': loadingCueDisplay,
      'notification-display': notificationDisplay
    },
    computed: {
      ...mapGetters({
        isLoading: 'isLoading',
        isError: 'isError',
        appPhase: 'appPhase',
        appError: 'appError',
        location: 'location',
        todaySalat: 'todaySalat',
        nextSalat: 'nextSalat',
      }),
    },
    created() {
      this.$store.dispatch('initializeState');

      setInterval(() => {
        this.$store.dispatch('loadSalat');
      }, APPCYCLEINTERVAL);
    }
  }
</script>
