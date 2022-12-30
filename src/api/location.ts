import jstz from 'jstz';
import URL from 'url-parse';

import geo from '@/modules/geo';
import client from '@/modules/client';

import manipulator from './locationmanipulator';

type Coordinate = {
  latitude: number;
  longitude: number;
};

function generateReverseGeolocationUrl(coordinate: Coordinate) {
  // const geolocationServiceUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1';
  const urlObj = new URL(import.meta.env.VITE_GEOLOCATION_API_URL, true);
  const { query } = urlObj;

  query.format = 'json';
  query.zoom = 15;
  query.addressdetails = 1;
  query.lat = coordinate.latitude.toString();
  query.lon = coordinate.longitude.toString();

  urlObj.set('query', query);

  return urlObj.href;
}

async function get() {
  try {
    // Try to use reverse geolocation first
    const position = await geo.locate();

    const url = generateReverseGeolocationUrl(position.coords);

    const response = await client.get(url);

    const location = manipulator.transformReverseGeolocationResponse(response);
    const timezone = jstz.determine();
    location.timezone = timezone.name();
    return location;
  } catch (_) {
    // Use geoip if geolocation is not working, e.g. on Chromium
    const response = await client.get(import.meta.env.VITE_GEO_IP_API_URL);
    return manipulator.transformIPLocationResponse(response);
  }
}

export default {
  get,
};
