export const isLoading = function(state) {
  let appPhase = state.appPhase;
  return appPhase === "loading salat" || appPhase === "locating";
};

export const isError = function(state) {
  let appPhase = state.appPhase;
  return appPhase.indexOf("error") > -1;
};

export const appPhase = function(state) {
  return state.appPhase;
};

export const appError = function(state) {
  return state.appError;
};

export const location = function(state) {
  return state.location;
};

export const todaySalat = function(state) {
  return state.todaySalat;
};

export const nextSalat = function(state) {
  return state.nextSalat;
};
