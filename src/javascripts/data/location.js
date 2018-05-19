import jstz from 'jstz';
import URL from 'url-parse';

import config from '../../../config/app.config';

import geo from '../modules/geo';
import xhr from '../modules/xhr';

import manipulator from './locationmanipulator';

const location = {};

function generateGeoIPUrl() {
  return config.external.geoIPService;
}

function generateReverseGeolocationUrl(coordinates) {
  const urlObj = new URL(config.external.geoLocationService, true);
  const { query } = urlObj;

  query.lat = coordinates.latitude;
  query.lon = coordinates.longitude;

  urlObj.set('query', query);

  return urlObj.href;
}

location.get = () =>
  // Try to use reverse geolocation first
  geo.locate().then(
    position => {
      const url = generateReverseGeolocationUrl(position.coords);
      return xhr.get(url).then(response => {
        const result = manipulator.transformReverseGeolocationResponse(response);
        const timezone = jstz.determine();

        result.timezone = timezone.name();

        return result;
      });
    },
    () => {
      // Use geoip if geolocation is not working, e.g. on Chromium
      const url = generateGeoIPUrl();

      return xhr.get(url).then(response => manipulator.transformIPLocationResponse(response));
    },
  );

export default location;
