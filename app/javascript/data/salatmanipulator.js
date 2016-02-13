import moment from "moment";

const manipulator = {};

manipulator.generateSalatArray = function generateSalatArray(salatList, date) {
  let result = Object.keys(salatList).map((key) => {
    let time = moment(salatList[key], "HH:mm").format("HH : mm");

    return {
      name: key,
      date: date,
      time: time
    };
  });

  return result;
};

manipulator.transformSalatList = function transformSalatList(salatList, date) {
  let salatArray = [];

  delete salatList.Sunrise;
  delete salatList.Sunset;

  salatArray = manipulator.generateSalatArray(salatList, date);

  return salatArray;
};

manipulator.isNextSalat = function isNextSalat(salat) {
  let salatTime = moment(salat.date + " " + salat.time, "DD MMM YYYY HH : mm");

  if (moment().isSameOrBefore(salatTime)) {
    return true;
  }
};

manipulator.getNextSalat = function getNextSalat(salatListToday, salatListTomorrow) {
  let
    salatArrayToday =    manipulator.transformSalatList(salatListToday.timings, salatListToday.date.readable),
    salatArrayTomorrow = manipulator.transformSalatList(salatListTomorrow.timings, salatListTomorrow.date.readable),
    nextSalat =          {};

  nextSalat = salatArrayToday.concat(salatArrayTomorrow).find(manipulator.isNextSalat);

  return nextSalat;
};

export default manipulator;
