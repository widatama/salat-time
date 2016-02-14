import tape from "tape";
import Vue from "vue";
import TimeDisplay from "../../../app/javascript/components/timeDisplay.vue";

tape("Time display component", function(assert) {
  const vm = new Vue({
    template: "<div><time-display></time-display></div>",
    components: {"time-display": TimeDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".time-display"), "Time display generated");

  assert.end();
});
