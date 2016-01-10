import tape from "tape";
import Vue from "vue";
import App from "../../../app/javascript/components/app.vue";

tape("App component", function(assert) {
  const vm = new Vue({
    template: "<div><app></app></div>",
    components: {app: App}
  }).$mount();

  assert.ok(vm.$el.querySelector("h1"), "H1 element generated");
  assert.end();
});
