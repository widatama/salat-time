<template lang="jade">
  template(v-if="isLoading")
    div
      loading-cue-display
  template(v-else)
    div
      clock-display
    div
      praytime-display(:prayer="nextPrayer")
    div
      location-display(:address="location.address")
    div
      praytime-list-display(:prayers="todayPrayers")
</template>

<script>
  import moment from "moment";

  import store from "../modules/store";
  import locationDisplay from "./locationDisplay.vue";
  import praytimeDisplay from "./praytimeDisplay.vue";
  import praytimeListDisplay from "./praytimeListDisplay.vue";
  import clockDisplay from "./clockDisplay.vue";
  import loadingCueDisplay from "./loadingCueDisplay.vue";

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  function appCycle() {
    store.actions.loadState();
  }

  export default {
    components: {
      "location-display":      locationDisplay,
      "praytime-display":      praytimeDisplay,
      "praytime-list-display": praytimeListDisplay,
      "clock-display":         clockDisplay,
      "loading-cue-display":   loadingCueDisplay
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
