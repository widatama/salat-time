import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const
  UPDATE_LOCATION =   "UPDATE_LOCATION",
  UPDATE_APPPHASE =   "UPDATE_APPPHASE",
  UPDATE_APPERROR =   "UPDATE_APPERROR",
  UPDATE_TODAYSALAT = "UPDATE_TODAYSALAT",
  UPDATE_NEXTSALAT =  "UPDATE_NEXTSALAT";

let store = new Vuex.Store({
  state: {
    appPhase: "locating",
    appError: {},
    location: {
      country:   "",
      city:      "",
      time_zone: "",
      latitude:  0,
      longitude: 0
    },
    todaySalat: [
      {
        name: "",
        date: "",
        time: ""
      }
    ],
    nextSalat: {
      name: "",
      date: "",
      time: ""
    }
  },
  mutations: {
    [UPDATE_APPPHASE] (state, newAppPhase) {
      Vue.set(state, "appPhase", newAppPhase);
    },
    [UPDATE_APPERROR] (state, newAppError) {
      Vue.set(state, "appError", newAppError);
    },
    [UPDATE_LOCATION] (state, newLocation) {
      Vue.set(state, "location", newLocation);
    },
    [UPDATE_TODAYSALAT] (state, newTodaySalat) {
      Vue.set(state, "todaySalat", newTodaySalat);
    },
    [UPDATE_NEXTSALAT] (state, newSalat) {
      Vue.set(state, "nextSalat", newSalat);
    }
  }
});

export default store;
