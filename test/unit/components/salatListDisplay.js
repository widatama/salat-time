import tape from "tape";
import Vue from "vue";
import SalatListDisplay from "../../../app/javascript/components/salatListDisplay.vue";

tape("Salat list display component", function(assert) {
  const vm = new Vue({
    template: "<div><salat-list-display></salat-list-display></div>",
    components: {"salat-list-display": SalatListDisplay}
  }).$mount();

  assert.ok(vm.$el.querySelector(".salat-list"), "Salat list display generated");

  assert.end();
});
