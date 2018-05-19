import Vue from 'vue';

const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_APPPHASE = 'UPDATE_APPPHASE';
const UPDATE_APPERROR = 'UPDATE_APPERROR';
const UPDATE_TODAYSALAT = 'UPDATE_TODAYSALAT';
const UPDATE_NEXTSALAT = 'UPDATE_NEXTSALAT';

const mutations = {
  [UPDATE_APPPHASE](state, newAppPhase) {
    Vue.set(state, 'appPhase', newAppPhase);
  },
  [UPDATE_APPERROR](state, newAppError) {
    Vue.set(state, 'appError', newAppError);
  },
  [UPDATE_LOCATION](state, newLocation) {
    Vue.set(state, 'location', newLocation);
  },
  [UPDATE_TODAYSALAT](state, newTodaySalat) {
    Vue.set(state, 'todaySalat', newTodaySalat);
  },
  [UPDATE_NEXTSALAT](state, newSalat) {
    Vue.set(state, 'nextSalat', newSalat);
  },
};

export default mutations;
