import location from '@/api/location';
import salat from '@/api/salat';

function initializeState({ commit }) {
  location.get()
    .then((response) => {
      commit('UPDATE_APPPHASE', 'locating');

      commit('UPDATE_LOCATION', response);

      return response;
    })
    .then((response) => {
      commit('UPDATE_APPPHASE', 'loading salat');

      return salat.get({
        latitude: response.latitude,
        longitude: response.longitude,
        timezone: response.timezone,
      });
    })
    .then((response) => {
      commit('UPDATE_TODAYSALAT', response.todaySalat);
      commit('UPDATE_TOMORROWSALAT', response.tomorrowSalat);
      commit('UPDATE_NEXTSALAT', response.nextSalat);

      commit('UPDATE_APPPHASE', 'standby');
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        const err = new Error('Network error, please check your connection and disable adblock');

        commit('UPDATE_APPPHASE', 'network error');
        commit('UPDATE_APPERROR', err);
      }
    });
}

function loadSalat({ commit, state }) {
  salat.get(state.location)
    .then((response) => {
      commit('UPDATE_TODAYSALAT', response.todaySalat);
      commit('UPDATE_TOMORROWSALAT', response.tomorrowSalat);
      commit('UPDATE_NEXTSALAT', response.nextSalat);
    });
}

const actions = {
  initializeState,
  loadSalat,
};

export default actions;
