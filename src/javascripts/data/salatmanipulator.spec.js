import tape from 'tape';
import moment from 'moment';

import salatManipulator from './salatmanipulator';

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
      readable: moment().format('DD MMM YYYY'),
      timestamp: moment().format('X'),
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
      readable: moment()
        .add(1, 'd')
        .format('DD MMM YYYY'),
      timestamp: moment()
        .add(1, 'd')
        .format('X'),
    },
  };

  const salatArrayToday = salatManipulator.transformSalatData(salatDataToday);
  const nextSalat = salatManipulator.getNextSalat(salatDataToday, salatDataTomorrow);
  const nextSalatTime = moment(`${nextSalat.date} ${nextSalat.time}`, 'DD MMM YYYY HH : mm');

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
      time: moment(salatDataToday.timings.Fajr, 'HH:mm').format('HH : mm'),
    },
    'Generated salat array item has proper structure',
  );
  assert.equal(salatArrayToday.length, 5, 'Generated salat array has exactly five items');

  assert.equal(
    moment().isSameOrBefore(nextSalatTime),
    true,
    'Next salat time is the same or after current time',
  );

  assert.end();
});
