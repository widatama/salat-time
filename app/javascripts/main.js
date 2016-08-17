import "../images/favicon.png";

import "../stylesheets/app.css";

import Vue from "vue";

import App from "./components/app.vue";

import store from "./modules/store/store";

Vue.component("app", App);

new Vue({
  el: "#vue",
  store: store,
  render: (h) => {return h(App);}
});
