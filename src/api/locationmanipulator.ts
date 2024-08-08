export type Location = {
  country: string;
  city: string;
  village: string;
  state: string;
  timezone: string;
  latitude: number;
  longitude: number;
};

type GeoIPResponse = {
  city: string;
  country_name: string;
  district: string;
  latitude: string;
  longitude: string;
  region: string;
  timezone_name: string;
};

type GeoLocationResponse = {
  address: {
    country: string;
    city: string;
    state: string;
    state_district: string;
    village: string;
  };
  lat: string;
  lon: string;
};

// These functions are for transforming location api response into Location object so the UI can
// just display it
// There are two apis being used, geolocation and geoip

function transformIPLocationResponse(response: GeoIPResponse): Location {
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

function transformReverseGeolocationResponse(response: GeoLocationResponse): Location {
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
