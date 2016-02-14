import tape from "tape";
import Vue from "vue";
import LocationDisplay from "../../../app/javascript/components/locationDisplay.vue";

tape("Loading cue display component", function(assert) {
  const vm = new Vue({
    template: "<div><location-display></location-display></div>",
    components: {"location-display": LocationDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".location"), "Location display generated");

  assert.end();
});
