<template lang="jade">
header.app-header
  .app__title
    strong Salat
    | Time
  current-time-display
template(v-if="isLoading")
  .flex-container
    loading-cue-display(:loading-text="appPhase")
template(v-else)
  template(v-if="isError")
    .flex-container
      notification-display(:notification-message="appError")
  template(v-else)
    .flex-container
      .flex-group.flex-group--two
        salat-display(:salat="nextSalat", disp-type="next")

        location-display(:location="location")

      .flex-group
        salat-list-display(:salat-list="todaySalat")
</template>

<script>

  import store from "../modules/store";
  import locationDisplay from "./locationDisplay.vue";
  import salatDisplay from "./salatDisplay.vue";
  import salatListDisplay from "./salatListDisplay.vue";
  import currentTimeDisplay from "./currentTimeDisplay.vue";
  import loadingCueDisplay from "./loadingCueDisplay.vue";
  import notificationDisplay from "./notificationDisplay.vue";

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  function appCycle() {
    store.actions.loadSalat();
  }

  export default {
    components: {
      "location-display":     locationDisplay,
      "salat-display":        salatDisplay,
      "salat-list-display":   salatListDisplay,
      "current-time-display": currentTimeDisplay,
      "loading-cue-display":  loadingCueDisplay,
      "notification-display": notificationDisplay
    },
    computed: {
      isLoading() {
        let appPhase = store.state.appPhase;
        return appPhase === "loading salat" || appPhase === "locating";
      },
      isError() {
        let appPhase = store.state.appPhase;
        return appPhase.indexOf("error") > -1;
      },
      appPhase() {
        return store.state.appPhase;
      },
      appError() {
        return store.state.appError;
      },
      location() {
        return store.state.location;
      },
      todaySalat() {
        return store.state.todaySalat;
      },
      nextSalat() {
        return store.state.nextSalat;
      }
    },
    beforeCompile() {
      store.actions.loadState();
      setInterval(appCycle, APPCYCLEINTERVAL);
    }
  }
</script>
