import Vuex from "vuex";
import Vue from "vue";

import location from "../data/location";
import praytime from "../data/praytime";

const UPDATE_LOCATION = "UPDATE_LOCATION";
const UPDATE_PRAYTIME = "UPDATE_PRAYTIME";
const UPDATE_APPPHASE = "UPDATE_APPPHASE";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    appPhase: "loading",
    location: {
      address: {
        country:  "",
        state:    "",
        city:     "",
        county:   "",
        postcode: ""
      }
    },
    praytime: {
      items: []
    }
  },
  mutations: {
    [UPDATE_APPPHASE] (state, newAppPhase) {
      Vue.set(state, "appPhase", newAppPhase);
    },
    [UPDATE_LOCATION] (state, newLocation) {
      Vue.set(state.location, "address", newLocation.address);
    },
    [UPDATE_PRAYTIME] (state, newPraytime) {
      Vue.set(state, "praytime", newPraytime);
    }
  },
  actions: {
    updateAppPhase(store, newPhase) {
      store.dispatch(UPDATE_APPPHASE, newPhase);
    },
    loadState(store) {
      return location.get()
        .then((response) => {
          store.dispatch(UPDATE_LOCATION, response);
          let country = response.address.country;
          return country;
        })
        .then((country) => {
          return praytime.get(country);
        })
        .then((response) => {
          store.dispatch(UPDATE_PRAYTIME, response);

          return "standby";
        });
    }
  }
});

export default store;
