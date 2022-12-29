import type { ActionContext } from 'vuex';

import locationSvc from '@/api/location';
import salatSvc from '@/api/salat';

import type { State } from './index';

type Context = ActionContext<State, unknown>;

async function initializeState({ commit }: Context) {
  try {
    commit('UPDATE_APPPHASE', 'locating');

    const location = await locationSvc.get();

    commit('UPDATE_LOCATION', location);
    commit('UPDATE_APPPHASE', 'loading salat');

    const salatResponses = await salatSvc.get(location);

    commit('UPDATE_TODAYSALAT', salatResponses.todaySalat);
    commit('UPDATE_TOMORROWSALAT', salatResponses.tomorrowSalat);
    commit('UPDATE_NEXTSALAT', salatResponses.nextSalat);
    commit('UPDATE_APPPHASE', 'standby');
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        const err = new Error('Network error, please check your connection and disable adblock');

        commit('UPDATE_APPPHASE', 'network error');
        commit('UPDATE_APPERROR', err);
      } else {
        commit('UPDATE_APPPHASE', 'error');
        commit('UPDATE_APPERROR', error);
      }
    } else {
      commit('UPDATE_APPPHASE', 'error');
      commit('UPDATE_APPERROR', new Error(String(error)));
    }
  }
}

async function loadSalat({ commit, state }: Context) {
  try {
    const salatResponses = await salatSvc.get(state.location);
    commit('UPDATE_TODAYSALAT', salatResponses.todaySalat);
    commit('UPDATE_TOMORROWSALAT', salatResponses.tomorrowSalat);
    commit('UPDATE_NEXTSALAT', salatResponses.nextSalat);
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        const msg = 'Network error when loading salat, '
          + 'please check your connection and disable adblock';
        const err = new Error(msg);

        commit('UPDATE_APPPHASE', 'network error');
        commit('UPDATE_APPERROR', err);
      } else {
        commit('UPDATE_APPPHASE', 'error');
        commit('UPDATE_APPERROR', error);
      }
    } else {
      commit('UPDATE_APPPHASE', 'error');
      commit('UPDATE_APPERROR', new Error(String(error)));
    }
  }
}

export default {
  initializeState,
  loadSalat,
};
