import Vuex from "vuex";
import Vue from "vue";

import moment from "moment";

import location from "../data/location";
import praytime from "../data/praytime";

const
  UPDATE_LOCATION =    "UPDATE_LOCATION",
  UPDATE_APPPHASE =    "UPDATE_APPPHASE",
  UPDATE_TODAYPRAYER = "UPDATE_TODAYPRAYER",
  UPDATE_NEXTPRAYER =  "UPDATE_NEXTPRAYER";

function generatePrayerArray(prayerList, dateStr) {
  let result = Object.keys(prayerList).map((key) => {
    let time = moment(prayerList[key], "h:m a").format("HH : mm");

    return {
      name: key,
      date: dateStr,
      time: time
    };
  });

  return result;
}

function isNextPrayer(prayer) {
  let praytime = moment(prayer.date + " " + prayer.time, "YYYY-M-D h:m a");

  if (moment().isSameOrBefore(praytime)) {
    return true;
  }
}

function transformPrayerList(prayerList) {
  let
    date =        prayerList.date_for,
    prayerArray = [];

  delete prayerList.date_for;
  delete prayerList.shurooq;

  prayerArray = generatePrayerArray(prayerList, date);

  prayerList.date_for = date;

  return prayerArray;
}

function getNextPrayer(prayerListToday, prayerListTomorrow) {
  let
    prayerArrayToday =    transformPrayerList(prayerListToday),
    prayerArrayTomorrow = transformPrayerList(prayerListTomorrow),
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

          return response.city;
        })
        .then((city) => {
          return praytime.get(city);
        })
        .then((response) => {
          let todayPrayers = transformPrayerList(response.items[0]);
          let nextPrayer = getNextPrayer(response.items[0], response.items[1]);

          store.dispatch(UPDATE_TODAYPRAYER, todayPrayers);
          store.dispatch(UPDATE_NEXTPRAYER, nextPrayer);

          store.dispatch(UPDATE_APPPHASE, "standby");
        });
    }
  }
});

export default store;
