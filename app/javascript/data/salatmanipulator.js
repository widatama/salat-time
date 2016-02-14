import moment from "moment";

const manipulator = {};

function generateSalatArray(salatList, date) {
  let result = Object.keys(salatList).map((key) => {
    let time = moment(salatList[key], "HH:mm").format("HH : mm");

    return {
      name: key,
      date: date,
      time: time
    };
  });

  return result;
}

manipulator.transformSalatList = function transformSalatList(salatList) {
  let salatArray = [];

  delete salatList.timings.Sunrise;
  delete salatList.timings.Sunset;

  salatArray = generateSalatArray(salatList.timings, salatList.date.readable);

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
    salatArrayToday =    manipulator.transformSalatList(salatListToday),
    salatArrayTomorrow = manipulator.transformSalatList(salatListTomorrow),
    nextSalat =          {};

  nextSalat = salatArrayToday.concat(salatArrayTomorrow).find(manipulator.isNextSalat);

  return nextSalat;
};

export default manipulator;
