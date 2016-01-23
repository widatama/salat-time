<template lang="jade">
  template(v-if="isLoading")
    div
      loading-cue-display
  template(v-else)
    div
      clock-display
    div
      praytime-display(:praytime="nextPraytime")
    div
      location-display(:address="location.address")
    div
      praytime-list-display(:praytimes="todayPraytimes")
</template>

<script>
  import moment from "moment";

  import store from "../modules/store";
  import locationDisplay from "./locationDisplay.vue";
  import praytimeDisplay from "./praytimeDisplay.vue";
  import praytimeListDisplay from "./praytimeListDisplay.vue";
  import clockDisplay from "./clockDisplay.vue";
  import loadingCueDisplay from "./loadingCueDisplay.vue";

  const APPCYCLEINTERVAL = 300000; // Five minutes

  function isNextPraytime(element) {
    let praytime = moment(element.date + " " + element.time, "YYYY-M-D h:m a");

    if (moment().isSameOrBefore(praytime)) {
      return true;
    }
  }

  function generatePraytimeArray(praytimeList, dateStr) {
    let result = Object.keys(praytimeList).map((key) => {
      return {
        name: key,
        date: dateStr,
        time: praytimeList[key]
      }
    });

    return result;
  }

  function appCycle() {
    store.actions.loadState()
      .then( (newPhase) => {store.actions.updateAppPhase(newPhase)} );
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
      todayPraytimes() {
        let
          praytimeList =  store.state.praytime.items[0],
          date =          praytimeList.date_for,
          praytimeArray = [];

        delete praytimeList.date_for;
        delete praytimeList.shurooq;

        praytimeArray = generatePraytimeArray(praytimeList, date);

        return praytimeArray;
      },
      nextPraytime() {
        let
          praytimeListToday =     store.state.praytime.items[0],
          praytimeListTomorrow =  store.state.praytime.items[1],
          todayDate =             praytimeListToday.date_for,
          tomorrowDate =          praytimeListTomorrow.date_for,
          praytimeArrayToday =    [],
          praytimeArrayTomorrow = [],
          nextPraytime =          {};

        delete praytimeListToday.date_for;
        delete praytimeListToday.shurooq;
        delete praytimeListTomorrow.date_for;
        delete praytimeListTomorrow.shurooq;

        praytimeArrayToday =    generatePraytimeArray(praytimeListToday, todayDate);
        praytimeArrayTomorrow = generatePraytimeArray(praytimeListTomorrow, tomorrowDate);

        nextPraytime = praytimeArrayToday.concat(praytimeArrayTomorrow).find(isNextPraytime);

        // Restore date_for because todayPraytimes needs it
        praytimeListToday.date_for =    todayDate;
        praytimeListTomorrow.date_for = tomorrowDate;

        return nextPraytime;
      }
    },
    beforeCompile() {
      appCycle();
      setInterval(appCycle, APPCYCLEINTERVAL);
    }
  }
</script>
