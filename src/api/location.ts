import jstz from 'jstz';
import URL from 'url-parse';

import geo from '@/modules/geo';
import client from '@/modules/client';

import manipulator from './locationmanipulator';

const location = {};

function generateGeoIPUrl() {
  return 'https://json.geoiplookup.io/';
}

function generateReverseGeolocationUrl(coordinates) {
  const geolocationServiceUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1';
  const urlObj = new URL(geolocationServiceUrl, true);
  const { query } = urlObj;

  query.lat = coordinates.latitude;
  query.lon = coordinates.longitude;

  urlObj.set('query', query);

  return urlObj.href;
}

// Try to use reverse geolocation first
location.get = () => geo.locate().then(
  (position) => {
    const url = generateReverseGeolocationUrl(position.coords);
    return client.get(url).then((response) => {
      const result = manipulator.transformReverseGeolocationResponse(response);
      const timezone = jstz.determine();

      result.timezone = timezone.name();

      return result;
    });
  },
  () => {
    // Use geoip if geolocation is not working, e.g. on Chromium
    const url = generateGeoIPUrl();

    return client.get(url).then((response) => manipulator.transformIPLocationResponse(response));
  },
);

export default location;
