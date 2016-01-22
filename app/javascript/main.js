import "../stylesheet/main.css";

import Vue from "vue";
import App from "./components/app.vue";

Vue.config.debug = true;

new Vue({
  el:         "body",
  components: { App }
});

