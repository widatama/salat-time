import tape from "tape";
import Vue from "vue";
import SalatDisplay from "../../../app/javascript/components/salatDisplay.vue";

tape("Salat display component", function(assert) {
  const vm = new Vue({
    template: "<div><salat-display></salat-display></div>",
    components: {"salat-display": SalatDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".salat"), "Salat display generated");

  assert.end();
});
