import { isAfter, parse } from 'date-fns';

const manipulator = {};

function generateSalatArray(salatTiming, date) {
  const result = Object.keys(salatTiming).map((key) => {
    const time = salatTiming[key].split(':').join(' : ');

    return {
      name: key,
      date,
      time,
    };
  });

  return result;
}

function isNextSalat(salat) {
  const salatTime = parse(`${salat.date} ${salat.time}`, 'd MMM yyyy HH : mm', new Date());

  if (isAfter(salatTime, new Date())) {
    return true;
  }

  return false;
}

function cleanupSalatTiming(salatTiming) {
  const result = {};

  Object.assign(result, salatTiming);

  delete result.Firstthird;
  delete result.Lastthird;
  delete result.Imsak;
  delete result.Midnight;
  delete result.Sunrise;
  delete result.Sunset;

  return result;
}

manipulator.transformSalatData = (salatData) => {
  const salatTiming = cleanupSalatTiming(salatData.timings);

  return generateSalatArray(salatTiming, salatData.date.readable);
};

manipulator.getNextSalat = (salatDataToday, salatDataTomorrow) => {
  const salatArrayToday = manipulator.transformSalatData(salatDataToday);
  const salatArrayTomorrow = manipulator.transformSalatData(salatDataTomorrow);

  return salatArrayToday.concat(salatArrayTomorrow).find(isNextSalat);
};

export default manipulator;
