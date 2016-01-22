import Vuex from "vuex";
import Vue from "vue";

import location from "../data/location";
import praytime from "../data/praytime";

const UPDATE_LOCATION = "UPDATE_LOCATION";
const UPDATE_PRAYTIME = "UPDATE_PRAYTIME";

Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
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
    [UPDATE_LOCATION] (state, newLocation) {
      Vue.set(state.location, "address", newLocation.address);
    },
    [UPDATE_PRAYTIME] (state, newPraytime) {
      Vue.set(state, "praytime", newPraytime);
    }
  },
  actions: {
    loadState: (store) => {
      location.get()
        .then((response) => {
          store.dispatch(UPDATE_LOCATION, response);
          let city = response.address.state.split(" ")[0];
          return city;
        })
        .then((city) => {
          return praytime.get(city);
        })
        .then((response) => {
          store.dispatch(UPDATE_PRAYTIME, response);
        });
    }
  }
});

export default store;
