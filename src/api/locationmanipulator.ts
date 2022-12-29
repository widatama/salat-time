export type Location = {
  country: string;
  city: string;
  village: string;
  state: string;
  timezone: string;
  latitude: number;
  longitude: number;
};

// These functions are for transforming location api response into Location object so the UI can
// just display it
// There are two apis being used, geolocation and geoip

function transformIPLocationResponse(response: any): Location {
  return {
    country: response.country_name,
    city: response.city,
    village: response.district,
    state: response.region,
    timezone: response.timezone_name,
    latitude: parseFloat(response.latitude),
    longitude: parseFloat(response.longitude),
  };
}

function transformReverseGeolocationResponse(response: any): Location {
  return {
    country: response.address.country,
    city: response.address.state_district || response.address.city,
    village: response.address.village,
    state: response.address.state,
    timezone: '',
    latitude: parseFloat(response.lat),
    longitude: parseFloat(response.lon),
  };
}

export default {
  transformIPLocationResponse,
  transformReverseGeolocationResponse,
};
