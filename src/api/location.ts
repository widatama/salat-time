import jstz from 'jstz';

import geo from '@/modules/geo';
import client from '@/modules/client';

import manipulator from './locationmanipulator';

type Coordinate = {
  latitude: number;
  longitude: number;
};

function generateReverseGeolocationUrl(coordinate: Coordinate) {
  // https://nominatim.openstreetmap.org/reverse?format=json&zoom=15&addressdetails=1;
  const urlObj = new URL(import.meta.env.VITE_GEOLOCATION_API_URL);
  const { searchParams } = urlObj;

  searchParams.append('format', 'json');
  searchParams.append('zoom', '15');
  searchParams.append('addressdetails', '1');
  searchParams.append('lat', coordinate.latitude.toString());
  searchParams.append('lon', coordinate.longitude.toString());

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
