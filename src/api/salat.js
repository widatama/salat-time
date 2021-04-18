import { addDays, format } from 'date-fns';
import URL from 'url-parse';

import client from '@/modules/client';

import manipulator from './salatmanipulator';

const salatModule = {};

function generateUrl(location, timestamp) {
  const salatTimeServiceUrl = 'https://api.aladhan.com/timings/';
  const urlObj = new URL(salatTimeServiceUrl, true);
  const { query } = urlObj;

  urlObj.pathname = [urlObj.pathname, timestamp].join('');
  query.latitude = location.latitude.toString();
  query.longitude = location.longitude.toString();
  query.timezonestring = location.timezone;
  query.method = '3';

  urlObj.set('query', query);

  return urlObj.href;
}

salatModule.get = (location) => {
  const urlToday = generateUrl(location, format(new Date(), 't'));
  const urlTomorrow = generateUrl(location, format(addDays(new Date(), 1), 't'));

  return Promise.all([client.get(urlToday), client.get(urlTomorrow)]).then((salat) => {
    const todaySalat = manipulator.transformSalatData(salat[0].data);
    const tomorrowSalat = manipulator.transformSalatData(salat[1].data);
    const nextSalat = manipulator.getNextSalat(salat[0].data, salat[1].data);

    return {
      todaySalat,
      tomorrowSalat,
      nextSalat,
    };
  });
};

export default salatModule;
