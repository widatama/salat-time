import location from "../../data/location";
import salat from "../../data/salat";

export const initializeState = function({dispatch}) {
  location.get()
    .then((response) => {
      dispatch("UPDATE_APPPHASE", "locating");

      dispatch("UPDATE_LOCATION", response);

      return response;
    })
    .then((response) => {
      dispatch("UPDATE_APPPHASE", "loading salat");

      return salat.get({
        latitude:  response.latitude,
        longitude: response.longitude,
        timezone:  response.timezone
      });
    })
    .then((salat) => {
      dispatch("UPDATE_TODAYSALAT", salat.todaySalat);
      dispatch("UPDATE_NEXTSALAT", salat.nextSalat);

      dispatch("UPDATE_APPPHASE", "standby");
    })
    .catch((error) => {
      if (error.message === "Failed to fetch") {
        let err = new Error("Network error, please check your connection and disable adblock");

        dispatch("UPDATE_APPPHASE", "network error");
        dispatch("UPDATE_APPERROR", err);
      }

      console.log(error);
    });
};

export const loadSalat = function({dispatch, state}) {
  salat.get(state.location)
  .then((salat) => {
    dispatch("UPDATE_TODAYSALAT", salat.todaySalat);
    dispatch("UPDATE_NEXTSALAT", salat.nextSalat);
  });
};
