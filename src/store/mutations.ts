import type { Location } from '@/api/locationmanipulator';
import type { Salat } from '@/api/salatmanipulator';
import type { State } from './index';

const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_APPPHASE = 'UPDATE_APPPHASE';
const UPDATE_APPERROR = 'UPDATE_APPERROR';
const UPDATE_TODAYSALAT = 'UPDATE_TODAYSALAT';
const UPDATE_TOMORROWSALAT = 'UPDATE_TOMORROWSALAT';
const UPDATE_NEXTSALAT = 'UPDATE_NEXTSALAT';

export default {
  [UPDATE_APPPHASE](state: State, newAppPhase: string) {
    state.appPhase = newAppPhase;
  },
  [UPDATE_APPERROR](state: State, newAppError: Error) {
    state.appError = newAppError;
  },
  [UPDATE_LOCATION](state: State, newLocation: Location) {
    state.location = newLocation;
  },
  [UPDATE_TODAYSALAT](state: State, newTodaySalat: Salat[]) {
    state.todaySalat = newTodaySalat;
  },
  [UPDATE_TOMORROWSALAT](state: State, newTomorrowoSalat: Salat[]) {
    state.tomorrowSalat = newTomorrowoSalat;
  },
  [UPDATE_NEXTSALAT](state: State, newSalat: Salat) {
    state.nextSalat = newSalat;
  },
};
