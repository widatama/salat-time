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
    .salat-today
      current-day
      salat-list( :salat-list="todaySalat")
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { mapGetters } from 'vuex';

  import CurrentDay from '@/components/CurrentDay.vue';
  import LoadingCue from '@/components/LoadingCue.vue';
  import CurrentLocation from '@/components/CurrentLocation.vue';
  import Notification from '@/components/Notification.vue';
  import Salat from '@/components/Salat.vue';
  import SalatList from '@/components/SalatList.vue';

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  export default defineComponent({
    name: 'day',
    components: {
      'current-day': CurrentDay,
      'current-location': CurrentLocation,
      'loading-cue': LoadingCue,
      'notification': Notification,
      'salat': Salat,
      'salat-list': SalatList,
    },
    computed: {
      ...mapGetters({
        appError: 'appError',
        appPhase: 'appPhase',
        isError: 'isError',
        isLoading: 'isLoading',
        location: 'location',
        nextSalat: 'nextSalat',
        todaySalat: 'todaySalat',
      }),
    },
    created() {
      this.$store.dispatch('initializeState');

      setInterval(() => {
        this.$store.dispatch('loadSalat');
      }, APPCYCLEINTERVAL);
    },
  })
</script>
