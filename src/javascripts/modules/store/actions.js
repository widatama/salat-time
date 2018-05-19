import location from '../../data/location';
import salat from '../../data/salat';

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
    .then((salat) => {
      commit('UPDATE_TODAYSALAT', salat.todaySalat);
      commit('UPDATE_NEXTSALAT', salat.nextSalat);

      commit('UPDATE_APPPHASE', 'standby');
    })
    .catch((error) => {
      if (error.message === 'Failed to fetch') {
        const err = new Error('Network error, please check your connection and disable adblock');

        commit('UPDATE_APPPHASE', 'network error');
        commit('UPDATE_APPERROR', err);
      }

      console.error(error);
    });
}

function loadSalat({ commit, state }) {
  salat.get(state.location)
    .then((salat) => {
      commit('UPDATE_TODAYSALAT', salat.todaySalat);
      commit('UPDATE_NEXTSALAT', salat.nextSalat);
    });
}

const actions = {
  initializeState,
  loadSalat,
};

export default actions;
