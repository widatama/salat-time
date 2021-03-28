import tape from 'tape';
import { addDays, format, isAfter, parse } from 'date-fns';

import salatManipulator from '@/api/salatmanipulator';

tape('Salat data manipulator', assert => {
  const salatDataToday = {
    timings: {
      Fajr: '04:46',
      Sunrise: '05:57',
      Dhuhr: '12:07',
      Asr: '15:22',
      Sunset: '18:16',
      Maghrib: '18:16',
      Isha: '19:24',
    },
    date: {
      readable: format(new Date(), 'd MMM yyyy'),
      timestamp: format(new Date(), 't'),
    },
  };
  const salatDataTomorrow = {
    timings: {
      Fajr: '04:46',
      Sunrise: '05:57',
      Dhuhr: '12:07',
      Asr: '15:22',
      Sunset: '18:16',
      Maghrib: '18:16',
      Isha: '19:24',
    },
    date: {
      readable: format(addDays(new Date(), 1), 'd MMM yyyy'),
      timestamp: format(addDays(new Date(), 1), 't'),
    },
  };

  const salatArrayToday = salatManipulator.transformSalatData(salatDataToday);
  const nextSalat = salatManipulator.getNextSalat(salatDataToday, salatDataTomorrow);
  const nextSalatTime = parse(
    `${nextSalat.date} ${nextSalat.time}`,
    'd MMM yyyy HH : mm',
    new Date(),
  );

  assert.equal(
    Object.prototype.toString.call(salatArrayToday),
    '[object Array]',
    'Generates an array from salat list',
  );

  assert.equal(
    Object.prototype.toString.call(salatArrayToday[0]),
    '[object Object]',
    'Generated salat array item is an object',
  );

  assert.deepEqual(
    salatArrayToday[0],
    {
      name: 'Fajr',
      date: salatDataToday.date.readable,
      time: salatDataToday.timings.Fajr.split(':').join(' : '),
    },
    'Generated salat array item has proper structure',
  );

  assert.equal(salatArrayToday.length, 5, 'Generated salat array has exactly five items');

  assert.equal(
    isAfter(nextSalatTime, new Date()),
    true,
    'Next salat time is the same or after current time',
  );

  assert.end();
});
