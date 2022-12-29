import { createStore } from 'vuex';

import type { Location } from '@/api/locationmanipulator';
import type { Salat } from '@/api/salatmanipulator';

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export type State = {
  appPhase: string;
  appError?: Error;
  location: Location;
  todaySalat: Salat[];
  tomorrowSalat: Salat[];
  nextSalat: Salat;
};

const state: State = {
  appPhase: 'locating',
  location: {
    country: '',
    city: '',
    village: '',
    state: '',
    timezone: '',
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
  tomorrowSalat: [
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
};

export default createStore({
  actions,
  getters,
  mutations,
  state,
});
