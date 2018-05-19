import moment from 'moment';
import minUrl from 'min-url';

import config from '../../../config/app.config';

import xhr from '../modules/xhr';

import manipulator from './salatmanipulator';

const salat = {};

function generateUrl(location, timestamp) {
  const urlObj = minUrl.parse(config.external.salatTimeService, true);

  urlObj.pathname = [urlObj.pathname, timestamp].join('');
  urlObj.query.latitude = location.latitude.toString();
  urlObj.query.longitude = location.longitude.toString();
  urlObj.query.timezonestring = location.timezone;
  urlObj.query.method = '3';

  return minUrl.format(urlObj);
}

salat.get = (location) => {
  const urlToday = generateUrl(location, moment().format('X'));
  const urlTomorrow = generateUrl(location, moment().add(1, 'd').format('X'));

  return Promise.all([xhr.get(urlToday), xhr.get(urlTomorrow)]).then((salat) => {
    const todaySalat = manipulator.transformSalatList(salat[0].data);
    const nextSalat = manipulator.getNextSalat(salat[0].data, salat[1].data);

    return {
      todaySalat,
      nextSalat,
    };
  });
};

export default salat;
