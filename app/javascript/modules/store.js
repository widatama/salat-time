import Vuex from "vuex";
import Vue from "vue";

import moment from "moment";

import location from "../data/location";
import prayer from "../data/prayer";

const
  UPDATE_LOCATION =    "UPDATE_LOCATION",
  UPDATE_APPPHASE =    "UPDATE_APPPHASE",
  UPDATE_TODAYPRAYER = "UPDATE_TODAYPRAYER",
  UPDATE_NEXTPRAYER =  "UPDATE_NEXTPRAYER";

function generatePrayerArray(prayerList, date) {
  let result = Object.keys(prayerList).map((key) => {
    let time = moment(prayerList[key], "HH:mm").format("HH : mm");

    return {
      name: key,
      date: date,
      time: time
    };
  });

  return result;
}

function isNextPrayer(prayer) {
  let praytime = moment(prayer.date + " " + prayer.time, "DD MMM YYYY HH : mm");

  if (moment().isSameOrBefore(praytime)) {
    return true;
  }
}

function transformPrayerList(prayerList, date) {
  let prayerArray = [];

  delete prayerList.Sunrise;
  delete prayerList.Sunset;

  prayerArray = generatePrayerArray(prayerList, date);

  return prayerArray;
}

function getNextPrayer(prayerListToday, prayerListTomorrow) {
  let
    prayerArrayToday =    transformPrayerList(prayerListToday.timings, prayerListToday.date.readable),
    prayerArrayTomorrow = transformPrayerList(prayerListTomorrow.timings, prayerListTomorrow.date.readable),
    nextPrayer =          {};

  nextPrayer = prayerArrayToday.concat(prayerArrayTomorrow).find(isNextPrayer);

  return nextPrayer;
}


Vue.use(Vuex);

let store = new Vuex.Store({
  state: {
    appPhase: "loading",
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
    todayPrayers: [
      {
        name: "",
        date: "",
        time: ""
      }
    ],
    nextPrayer: {
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
    [UPDATE_TODAYPRAYER] (state, newPrayers) {
      Vue.set(state, "todayPrayers", newPrayers);
    },
    [UPDATE_NEXTPRAYER] (state, newPrayer) {
      Vue.set(state, "nextPrayer", newPrayer);
    }
  },
  actions: {
    loadState(store) {
      return location.get()
        .then((response) => {
          store.dispatch(UPDATE_LOCATION, response);

          return response.location;
        })
        .then((location) => {
          return prayer.get(location);
        })
        .then((response) => {
          let
            todayPrayers = transformPrayerList(response[0].timings, response[0].date.timestamp),
            nextPrayer = getNextPrayer(response[0], response[1]);

          store.dispatch(UPDATE_TODAYPRAYER, todayPrayers);
          store.dispatch(UPDATE_NEXTPRAYER, nextPrayer);

          store.dispatch(UPDATE_APPPHASE, "standby");
        });
    }
  }
});

export default store;
