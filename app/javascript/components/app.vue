<template lang="jade">
  template(v-if="isLoading")
    div
      loading-cue-display
  template(v-else)
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
  import loadingCueDisplay from "./loadingCueDisplay.vue";

  export default {
    components: {
      "location-display":    locationDisplay,
      "praytime-display":    praytimeDisplay,
      "clock-display":       clockDisplay,
      "loading-cue-display": loadingCueDisplay
    },
    data() {
      return {
        isLoading: true
      }
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

      setTimeout( () => {this.$data.isLoading = false}, 5000 );
    }
  }
</script>
