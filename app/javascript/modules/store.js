import Vuex from "vuex";
import Vue from "vue";

import location from "../data/location";
import salat from "../data/salat";

const
  UPDATE_LOCATION =   "UPDATE_LOCATION",
  UPDATE_APPPHASE =   "UPDATE_APPPHASE",
  UPDATE_TODAYSALAT = "UPDATE_TODAYSALAT",
  UPDATE_NEXTSALAT =  "UPDATE_NEXTSALAT";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    appPhase: "locating",
    location: {
      country: {
        name: "",
        code: ""
      },
      location: {
        latitude: 0,
        longitude: 0,
        time_zone: ""
      },
      city: ""
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
    [UPDATE_LOCATION] (state, newLocation) {
      Vue.set(state, "location", newLocation);
    },
    [UPDATE_TODAYSALAT] (state, newTodaySalat) {
      Vue.set(state, "todaySalat", newTodaySalat);
    },
    [UPDATE_NEXTSALAT] (state, newSalat) {
      Vue.set(state, "nextSalat", newSalat);
    }
  },
  actions: {
    loadState(store) {
      location.get()
        .then((response) => {
          store.dispatch(UPDATE_APPPHASE, "locating");

          store.dispatch(UPDATE_LOCATION, response);

          return response.location;
        })
        .then((location) => {
          store.dispatch(UPDATE_APPPHASE, "loading salat");

          return salat.get(location);
        })
        .then((salat) => {
          store.dispatch(UPDATE_TODAYSALAT, salat.todaySalat);
          store.dispatch(UPDATE_NEXTSALAT, salat.nextSalat);

          store.dispatch(UPDATE_APPPHASE, "standby");
        });
    },
    loadSalat(store) {
      salat.get(store.state.location.location)
      .then((salat) => {
        store.dispatch(UPDATE_TODAYSALAT, salat.todaySalat);
        store.dispatch(UPDATE_NEXTSALAT, salat.nextSalat);
      });
    }
  }
});

export default store;
