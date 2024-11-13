export type Location = {
  country: string;
  city: string;
  village: string;
  state: string;
  timezone: string;
  latitude: number;
  longitude: number;
};

export type GeoIPResponse = Record<string, unknown>;

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

function toSnakeCase(inp: string): string {
  return inp.replace(/\B[A-Z]/g, (letter: string) => `_${letter.toLowerCase()}`).toLowerCase();
}

function transformObjectKeyToSnakeCase(response: GeoIPResponse): GeoIPResponse {
  const result: Record<string, unknown> = {};

  Object.entries(response).forEach(([key, val]) => {
    result[toSnakeCase(key)] = val;
  });

  return result;
};

// These functions are for transforming location api response into Location object so the UI can
// just display it
// There are two apis being used, geolocation and geoip

function transformIPLocationResponse(inpResponse: GeoIPResponse): Location {
  const response = transformObjectKeyToSnakeCase(inpResponse);
  return {
    country: response.country_name as string,
    city: response.city as string,
    village: response.district as string,
    state: response.region as string,
    timezone: response.timezone_name as string || response.time_zone as string,
    latitude: response.latitude as number,
    longitude: response.longitude as number,
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
  toSnakeCase,
  transformObjectKeyToSnakeCase,
  transformIPLocationResponse,
  transformReverseGeolocationResponse,
};
