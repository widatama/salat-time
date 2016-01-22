import tape from "tape";
import Vue from "vue";
import App from "../../../app/javascript/components/app.vue";

tape("App component", function(assert) {
  const vm = new Vue({
    template: "<div><app></app></div>",
    components: {app: App}
  }).$mount();

  assert.pass("Just pass, nothing to test for now");
  assert.end();
});
