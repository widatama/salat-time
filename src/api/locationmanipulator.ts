export type Location = {
  country: string;
  city: string;
  village: string;
  state: string;
  timezone: string;
  latitude: number;
  longitude: number;
};

export type GeoIPResponse = {
  city: string;
  country_code: string;
  country_name: string;
  district: string;
  ip: string;
  latitude: number;
  longitude: number;
  region: string;
  timezone_name: string;
  zip_code: string;
};

export type GeoLocationResponse = {
  address: {
    country: string;
    county: string;
    municipality: string;
    region: string;
    state: string;
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
    latitude: response.latitude,
    longitude: response.longitude,
  };
}

function transformReverseGeolocationResponse(response: GeoLocationResponse): Location {
  return {
    country: response.address.country,
    city: response.address.county,
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
