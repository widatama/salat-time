import { addDays, format } from 'date-fns';
import URL from 'url-parse';

import config from '../../../config/app.config';

import xhr from '../modules/xhr';

import manipulator from './salatmanipulator';

const salatModule = {};

function generateUrl(location, timestamp) {
  const urlObj = new URL(config.external.salatTimeService, true);
  const { query } = urlObj;

  urlObj.pathname = [urlObj.pathname, timestamp].join('');
  query.latitude = location.latitude.toString();
  query.longitude = location.longitude.toString();
  query.timezonestring = location.timezone;
  query.method = '3';

  urlObj.set('query', query);

  return urlObj.href;
}

salatModule.get = location => {
  const urlToday = generateUrl(location, format(new Date(), 't'));
  const urlTomorrow = generateUrl(
    location,
    format(addDays(new Date(), 1), 't'),
  );

  return Promise.all([xhr.get(urlToday), xhr.get(urlTomorrow)]).then(salat => {
    const todaySalat = manipulator.transformSalatData(salat[0].data);
    const nextSalat = manipulator.getNextSalat(salat[0].data, salat[1].data);

    return {
      todaySalat,
      nextSalat,
    };
  });
};

export default salatModule;
