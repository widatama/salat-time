import { addDays, format } from 'date-fns';

import client from '@/modules/client';
import type { Location } from './locationmanipulator';
import manipulator from './salatmanipulator';

type ClientResponse = {
  data: object;
};

function generateUrl(location: Location, timestamp: string) {
  const urlObj = new URL(import.meta.env.VITE_SALAT_API_URL);
  const { pathname, searchParams } = urlObj;

  searchParams.append('latitude', location.latitude.toString());
  searchParams.append('longitude', location.longitude.toString());
  searchParams.append('timezonestring', location.timezone);
  searchParams.append('method', '3');

  urlObj.pathname = [pathname, timestamp].join('/');

  return urlObj.href;
}

async function get(location: Location) {
  const urlToday = generateUrl(location, format(new Date(), 't'));
  const urlTomorrow = generateUrl(location, format(addDays(new Date(), 1), 't'));

  const salatResponse: ClientResponse[] = await Promise.all([client.get(urlToday), client.get(urlTomorrow)]);

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
