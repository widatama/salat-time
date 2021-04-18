const isLoading = (state) => {
  const { appPhase } = state;
  return appPhase === 'loading salat' || appPhase === 'locating';
};

const isError = (state) => {
  const { appPhase } = state;
  return appPhase.indexOf('error') > -1;
};

const appPhase = (state) => state.appPhase;

const appError = (state) => state.appError;

const location = (state) => state.location;

const todaySalat = (state) => state.todaySalat;
const tomorrowSalat = (state) => state.tomorrowSalat;

const nextSalat = (state) => state.nextSalat;

const getters = {
  isLoading,
  isError,
  appPhase,
  appError,
  location,
  todaySalat,
  tomorrowSalat,
  nextSalat,
};

export default getters;
