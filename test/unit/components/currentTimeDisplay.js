import tape from "tape";
import moment from "moment";
import Vue from "vue";
import CurrentTimeDisplay from "../../../app/javascript/components/currentTimeDisplay.vue";

tape("Current time display component", function(assert) {
  const vm = new Vue({
    template: "<div><current-time-display></current-time-display></div>",
    components: {"current-time-display": CurrentTimeDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".current-date"), "Current date display generated");
  assert.equal(vm.$el.querySelector(".current-date").textContent, moment().format("DD MMM"), "Current date displayed");

  assert.ok(vm.$el.querySelector(".clock"), "Clock display generated");

  assert.end();
});
