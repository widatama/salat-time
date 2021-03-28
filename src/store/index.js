import { createStore } from 'vuex';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export default createStore({
  actions,
  getters,
  mutations,
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
});
