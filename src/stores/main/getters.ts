import type { State } from './index';

const isLoading = (state: State) => {
  const { appPhase } = state;
  return appPhase === 'loading salat' || appPhase === 'locating';
};

const isError = (state: State) => {
  const { appPhase } = state;
  return appPhase.indexOf('error') > -1;
};

const appPhase = (state: State) => state.appPhase;
const appError = (state: State) => state.appError;
const location = (state: State) => state.location;
const todaySalat = (state: State) => state.todaySalat;
const tomorrowSalat = (state: State) => state.tomorrowSalat;
const nextSalat = (state: State) => state.nextSalat;

export default {
  isLoading,
  isError,
  appPhase,
  appError,
  location,
  todaySalat,
  tomorrowSalat,
  nextSalat,
};
