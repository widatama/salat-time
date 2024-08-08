import { isAfter, parse } from 'date-fns';

type SalatTiming = { [key: string]: string };
export type SalatResponse = {
  timings: SalatTiming;
  date: { readable: string };
};
export type Salat = {
  name: string;
  date: string;
  time: string;
};

function generateSalatArray(salatTiming: SalatTiming, date: string): Salat[] {
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

function isNextSalat(salat: Salat) {
  const salatTime = parse(`${salat.date} ${salat.time}`, 'd MMM yyyy HH : mm', new Date());

  if (isAfter(salatTime, new Date())) {
    return true;
  }

  return false;
}

function cleanupSalatTiming(salatTiming: SalatTiming) {
  const keep = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const result: SalatTiming = {};

  return Object.keys(salatTiming).reduce((acc, key) => {
    if (keep.includes(key)) {
      acc[key] = salatTiming[key];
    }

    return acc;
  }, result);
}

function transformSalatData(salatData: SalatResponse): Salat[] {
  const salatTiming = cleanupSalatTiming(salatData.timings);

  return generateSalatArray(salatTiming, salatData.date.readable);
}

function getNextSalat(salatDataToday: SalatResponse, salatDataTomorrow: SalatResponse): Salat {
  const salatArrayToday = transformSalatData(salatDataToday);
  const salatArrayTomorrow = transformSalatData(salatDataTomorrow);

  return salatArrayToday.concat(salatArrayTomorrow).find(isNextSalat) as Salat;
}

export default {
  transformSalatData,
  getNextSalat,
};
