import moment from 'moment';

const manipulator = {};

function generateSalatArray(salatList, date) {
  const result = Object.keys(salatList).map(key => {
    const time = moment(salatList[key], 'HH:mm').format('HH : mm');

    return {
      name: key,
      date,
      time,
    };
  });

  return result;
}

function isNextSalat(salat) {
  const salatTime = moment(`${salat.date} ${salat.time}`, 'DD MMM YYYY HH : mm');

  if (moment().isSameOrBefore(salatTime)) {
    return true;
  }

  return false;
}

function cleanupSalatTiming(salatTiming) {
  const result = {};

  Object.assign(result, salatTiming);

  delete result.Sunrise;
  delete result.Sunset;
  delete result.Imsak;
  delete result.Midnight;

  return result;
}

manipulator.transformSalatData = salatData => {
  const salatTiming = cleanupSalatTiming(salatData.timings);

  return generateSalatArray(salatTiming, salatData.date.readable);
};

manipulator.getNextSalat = (salatDataToday, salatDataTomorrow) => {
  const salatArrayToday = manipulator.transformSalatData(salatDataToday);
  const salatArrayTomorrow = manipulator.transformSalatData(salatDataTomorrow);

  return salatArrayToday.concat(salatArrayTomorrow).find(isNextSalat);
};

export default manipulator;
