import {
  addDays,
  format,
  isAfter,
  parse,
} from 'date-fns';
import { describe, expect, test } from 'vitest';

import salatManipulator from '@/api/salatmanipulator';

// Sample salat api response
const salatResponseToday = {
  timings: {
    Fajr: '04:46',
    Sunrise: '05:57',
    Dhuhr: '12:07',
    Asr: '15:22',
    Sunset: '18:16',
    Maghrib: '18:16',
    Isha: '19:24',
  },
  date: {
    readable: format(new Date(), 'd MMM yyyy'),
    timestamp: format(new Date(), 't'),
  },
};
const salatResponseTomorrow = {
  timings: {
    Fajr: '04:46',
    Sunrise: '05:57',
    Dhuhr: '12:07',
    Asr: '15:22',
    Sunset: '18:16',
    Maghrib: '18:16',
    Isha: '19:24',
  },
  date: {
    readable: format(addDays(new Date(), 1), 'd MMM yyyy'),
    timestamp: format(addDays(new Date(), 1), 't'),
  },
};

describe('Generates a list of Salat', () => {
  test('Generates an array of Salat from salat api response', () => {
    const salatToday = salatManipulator.transformSalatData(salatResponseToday);

    expect(salatToday.length).toBe(5);

    expect(salatToday[0]).toEqual({
      name: 'Fajr',
      date: salatResponseToday.date.readable,
      time: salatResponseToday.timings.Fajr.split(':').join(' : '),
    });
  });
});

describe('Generates next salat', () => {
  const nextSalat = salatManipulator.getNextSalat(salatResponseToday, salatResponseTomorrow);
  const nextSalatTime = parse(
    `${nextSalat.date} ${nextSalat.time}`,
    'd MMM yyyy HH : mm',
    new Date(),
  );

  test('Next salat time is the same or after current time', () => {
    expect(isAfter(nextSalatTime, new Date())).toBe(true);
  });
});
