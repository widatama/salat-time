import Vue from 'vue';

import '../stylesheets/app.css';

import App from './components/app.vue';
import store from './modules/store';

// eslint-disable-next-line no-new
new Vue({
  name: 'SalatTime',
  el: '#vue',
  components: {
    App,
  },
  store,
  render: h => h(App),
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in global.navigator) {
  global.addEventListener('load', () => {
    global.navigator.serviceWorker.register('sw.js');
  });
}
