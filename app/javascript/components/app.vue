<template lang="jade">
  header.app-header
    .app__title
      strong Salat
      | Time
    clock-display
  template(v-if="isLoading")
    .flex-container
      loading-cue-display
  template(v-else)
    .flex-container
      .flex-group.flex-group--two
        prayer-display(:prayer="nextPrayer", disp-type="next")

        location-display(:location="location")

      .flex-group
        prayer-list-display(:prayers="todayPrayers")
</template>

<script>
  import moment from "moment";

  import store from "../modules/store";
  import locationDisplay from "./locationDisplay.vue";
  import prayerDisplay from "./prayerDisplay.vue";
  import prayerListDisplay from "./prayerListDisplay.vue";
  import clockDisplay from "./clockDisplay.vue";
  import loadingCueDisplay from "./loadingCueDisplay.vue";

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  function appCycle() {
    store.actions.loadState();
  }

  export default {
    components: {
      "location-display":    locationDisplay,
      "prayer-display":      prayerDisplay,
      "prayer-list-display": prayerListDisplay,
      "clock-display":       clockDisplay,
      "loading-cue-display": loadingCueDisplay
    },
    computed: {
      isLoading() {
        return store.state.appPhase === "loading";
      },
      isStandby() {
        return store.state.appPhase === "standby";
      },
      location() {
        return store.state.location;
      },
      todayPrayers() {
        return store.state.todayPrayers;
      },
      nextPrayer() {
        return store.state.nextPrayer;
      }
    },
    beforeCompile() {
      appCycle();
      setInterval(appCycle, APPCYCLEINTERVAL);
    }
  }
</script>
