import moment from 'moment';

const manipulator = {};

function generateSalatArray(salatList, date) {
  const result = Object.keys(salatList).map((key) => {
    const time = moment(salatList[key], 'HH:mm').format('HH : mm');

    return {
      name: key,
      date,
      time,
    };
  });

  return result;
}

manipulator.transformSalatList = function transformSalatList(salatList) {
  let salatArray = [];

  delete salatList.timings.Sunrise;
  delete salatList.timings.Sunset;
  delete salatList.timings.Imsak;
  delete salatList.timings.Midnight;

  salatArray = generateSalatArray(salatList.timings, salatList.date.readable);

  return salatArray;
};

function isNextSalat(salat) {
  const salatTime = moment(`${salat.date} ${salat.time}`, 'DD MMM YYYY HH : mm');

  if (moment().isSameOrBefore(salatTime)) {
    return true;
  }

  return false;
}

manipulator.getNextSalat = function getNextSalat(salatListToday, salatListTomorrow) {
  const salatArrayToday = manipulator.transformSalatList(salatListToday);
  const salatArrayTomorrow = manipulator.transformSalatList(salatListTomorrow);

  return salatArrayToday.concat(salatArrayTomorrow).find(isNextSalat);
};

export default manipulator;
