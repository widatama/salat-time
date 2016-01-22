<template lang="jade">
  div
    clock-display
  div
    location-display(:address="location.address")
  div
    praytime-display(:items="praytime.items")
</template>

<script>
  import store from "../modules/store";
  import locationDisplay from "./locationDisplay.vue";
  import praytimeDisplay from "./praytimeDisplay.vue";
  import clockDisplay from "./clockDisplay.vue";

  export default {
    components: {
      "location-display": locationDisplay,
      "praytime-display": praytimeDisplay,
      "clock-display":    clockDisplay
    },
    computed: {
      location() {
        return store.state.location;
      },
      praytime() {
        return store.state.praytime;
      }
    },
    beforeCompile() {
      store.actions.loadState();
    }
  }
</script>
