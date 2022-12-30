import { addDays, format } from 'date-fns';
import URL from 'url-parse';

import client from '@/modules/client';
import type { Location } from './locationmanipulator';
import manipulator from './salatmanipulator';

function generateUrl(location: Location, timestamp: string) {
  const urlObj = new URL(import.meta.env.VITE_SALAT_API_URL, true);
  const { pathname, query } = urlObj;

  query.latitude = location.latitude.toString();
  query.longitude = location.longitude.toString();
  query.timezonestring = location.timezone;
  query.method = '3';

  urlObj.set('pathname', [pathname, timestamp].join('/'));
  urlObj.set('query', query);

  return urlObj.href;
}

async function get(location: Location) {
  const urlToday = generateUrl(location, format(new Date(), 't'));
  const urlTomorrow = generateUrl(location, format(addDays(new Date(), 1), 't'));

  const salatResponse: any[] = await Promise.all([client.get(urlToday), client.get(urlTomorrow)]);

  const todaySalat = manipulator.transformSalatData(salatResponse[0].data);
  const tomorrowSalat = manipulator.transformSalatData(salatResponse[1].data);
  const nextSalat = manipulator.getNextSalat(salatResponse[0].data, salatResponse[1].data);

  return {
    todaySalat,
    tomorrowSalat,
    nextSalat,
  };
}

export default {
  get,
};
