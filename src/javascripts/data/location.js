import jstz from 'jstz';
import minUrl from 'min-url';

import config from '../../../config/app.config';

import geo from '../modules/geo';
import xhr from '../modules/xhr';

import manipulator from './locationmanipulator';

const location = {};

function generateGeoIPUrl() {
  const urlObj = minUrl.parse(config.external.geoIPService, true);

  return minUrl.format(urlObj);
}

function generateReverseGeolocationUrl(coordinates) {
  const urlObj = minUrl.parse(config.external.geoLocationService, true);

  urlObj.query.lat = coordinates.latitude;
  urlObj.query.lon = coordinates.longitude;

  return minUrl.format(urlObj);
}

location.get = () => {
  // Try to use reverse geolocation first
  return geo.locate().then((position) => {
    const url = generateReverseGeolocationUrl(position.coords);
    return xhr.get(url).then((response) => {
      const result = manipulator.transformReverseGeolocationResponse(response);
      const timezone = jstz.determine();

      result.timezone = timezone.name();

      return result;
    });
  }, () => {
    // Use geoip if geolocation is not working, e.g. on Chromium
    const url = generateGeoIPUrl();
    return xhr.get(url).then((response) => {
      return manipulator.transformIPLocationResponse(response);
    });
  });
};

export default location;
