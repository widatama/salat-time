<template lang="pug">
div.app
  header.app-header
    .app__title
      strong Salat
      | Time
    current-time-display
  template(v-if="isLoading")
    .flex-container
      loading-cue-display( :loading-text="appPhase")
  template(v-else)
    template(v-if="isError")
      .flex-container
        notification-display( :notification-message="appError")
    template(v-else)
      .flex-container
        .flex-group.flex-group--two
          salat-display( :salat="nextSalat", disp-type="next")

          location-display( :location="location")

        .flex-group
          salat-list-display( :salat-list="todaySalat")
</template>

<script>

  import locationDisplay from "./locationDisplay.vue";
  import salatDisplay from "./salatDisplay.vue";
  import salatListDisplay from "./salatListDisplay.vue";
  import currentTimeDisplay from "./currentTimeDisplay.vue";
  import loadingCueDisplay from "./loadingCueDisplay.vue";
  import notificationDisplay from "./notificationDisplay.vue";

  import * as actions from "../modules/store/actions";
  import * as getters from "../modules/store/getters";

  const APPCYCLEINTERVAL = 600000; // Ten minutes

  export default {
    components: {
      "location-display":     locationDisplay,
      "salat-display":        salatDisplay,
      "salat-list-display":   salatListDisplay,
      "current-time-display": currentTimeDisplay,
      "loading-cue-display":  loadingCueDisplay,
      "notification-display": notificationDisplay
    },
    vuex: {
      actions,
      getters
    },
    created() {
      this.initializeState();
      setInterval(this.loadSalat, APPCYCLEINTERVAL);
    }
  }
</script>
