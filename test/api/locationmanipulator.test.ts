import { describe, expect, test } from 'vitest';

import lm from '@/api/locationmanipulator';

describe('Transform title case string to snake case', () => {
  test('Normal case is not transformed', () => {
    expect(lm.toSnakeCase('lowercase')).toBe('lowercase');
  });

  test('Transform to lower case', () => {
    expect(lm.toSnakeCase('Titlecase')).toBe('titlecase');
  });

  test('Transform to snake case', () => {
    expect(lm.toSnakeCase('TitleCase')).toBe('title_case');
  });
});

describe('Transform object key to snake case', () => {
  const raw = {
    City: 'Jakarta',
    ContinentCode: 'AS',
  };
  const result = lm.transformObjectKeyToSnakeCase(raw);

  test('Object key is in snake case', () => {
    expect(result.city).toBe('Jakarta');
    expect(result.continent_code).toBe('AS');
  });
});

describe('Transform geo ip lookup response', () => {
  // This is geo ip lookup response sample
  const rawLocation = {
    City: 'Jakarta',
    ContinentCode: 'AS',
    ContinentName: 'Asia',
    CountryCode: 'ID',
    CountryName: 'Indonesia',
    Latitude: -6.1744,
    Longitude: 106.8294,
    RegionName: 'Jakarta',
    Postal: '',
    TimeZone: 'Asia/Jakarta',
  };

  // Transform raw location data to get only what is needed in the correct format
  const location = lm.transformIPLocationResponse(rawLocation);

  test('Country is correct', () => {
    expect(location.country).toBe('Indonesia');
  });

  test('City is correct', () => {
    expect(location.city).toBe('Jakarta');
  });

  test('Timezone is correct', () => {
    expect(location.timezone).toBe('Asia/Jakarta');
  });

  test('Latitude is correct', () => {
    expect(location.latitude).toBe(-6.1744);
  });

  test('Longitude is correct', () => {
    expect(location.longitude).toBe(106.8294);
  });
});

describe('Transform reverse geolocation response', () => {
  // This is reverse geolocation response sample
  const response = {
    address: {
      country: 'Indonesia',
      county: 'Bogor',
      municipality: 'Ciomas',
      region: 'Java',
      state: 'West Java',
      village: 'Ciomas',
    },
    lat: '-6.1744',
    lon: '106.8294',
  };

  // Transform response sample to get only what is needed in the correct format
  const location = lm.transformReverseGeolocationResponse(response);

  test('Country is correct', () => {
    expect(location.country).toBe('Indonesia');
  });

  test('City is correct', () => {
    expect(location.city).toBe('Bogor');
  });

  test('Timezone is correct', () => {
    // Reverse geolocation response does not contain timezone
    expect(location.timezone).toBe('');
  });

  test('Latitude is correct', () => {
    expect(location.latitude).toBe(-6.1744);
  });

  test('Longitude is correct', () => {
    expect(location.longitude).toBe(106.8294);
  });
});
