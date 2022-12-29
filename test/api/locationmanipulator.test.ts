import { describe, expect, test } from 'vitest';

import locationManipulator from '@/api/locationmanipulator';

describe('Transform geo ip lookup response', () => {
  // This is location data sample fetched from geo ip lookup
  const rawLocation = {
    ip: '202.62.16.22',
    country_code: 'ID',
    country_name: 'Indonesia',
    region_code: 'JK',
    region_name: 'Jakarta',
    city: 'Jakarta',
    zip_code: '',
    timezone_name: 'Asia/Jakarta',
    latitude: -6.1744,
    longitude: 106.8294,
    metro_code: 0,
  };

  // Transform raw location data to get only what is needed in the correct format
  const location = locationManipulator.transformIPLocationResponse(rawLocation);

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
      city: 'Jakarta',
    },
    lat: -6.1744,
    lon: 106.8294,
  };

  // Transform response sample to get only what is needed in the correct format
  const location = locationManipulator.transformReverseGeolocationResponse(response);

  test('Country is correct', () => {
    expect(location.country).toBe('Indonesia');
  });

  test('City is correct', () => {
    expect(location.city).toBe('Jakarta');
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
