import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appPhase: 'locating',
    appError: {},
    location: {
      country: '',
      city: '',
      time_zone: '',
      latitude: 0,
      longitude: 0,
    },
    todaySalat: [
      {
        name: '',
        date: '',
        time: '',
      },
    ],
    nextSalat: {
      name: '',
      date: '',
      time: '',
    },
  },
  actions,
  getters,
  mutations,
});

export default store;
