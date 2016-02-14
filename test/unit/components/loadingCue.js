import tape from "tape";
import Vue from "vue";
import LoadingCueDisplay from "../../../app/javascript/components/loadingCueDisplay.vue";

tape("Loading cue display component", function(assert) {
  const vm = new Vue({
    template: "<div><loading-cue-display></loading-cue-display></div>",
    components: {"loading-cue-display": LoadingCueDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".loading-cue"), "Loading cue display generated");

  assert.end();
});
