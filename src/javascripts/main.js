import Vue from 'vue';

import '../stylesheets/app.css';

import App from './components/app.vue';

import store from './modules/store/';

Vue.component('app', App);

const salatTime = new Vue({
  el: '#vue',
  store,
  render: h => h(App),
});
