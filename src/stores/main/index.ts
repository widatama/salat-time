import { defineStore } from 'pinia';

import locationSvc from '@/api/location';
import salatSvc from '@/api/salat';
import type { Location } from '@/api/locationmanipulator';
import type { Salat } from '@/api/salatmanipulator';

import getters from './getters';

export type State = {
  appPhase: string;
  appError?: Error;
  location: Location;
  todaySalat: Salat[];
  tomorrowSalat: Salat[];
  nextSalat: Salat;
};

const useMainStore = defineStore('main', {
  state() {
    const state: State = {
      appPhase: 'locating',
      location: {
        country: '',
        city: '',
        village: '',
        state: '',
        timezone: '',
        latitude: 0,
        longitude: 0,
      },
      todaySalat: [
        {
          name: '',
          date: '',
          time: '',
        },
      ],
      tomorrowSalat: [
        {
          name: '',
          date: '',
          time: '',
        },
      ],
      nextSalat: {
        name: '',
        date: '',
        time: '',
      },
    };

    return state;
  },
  actions: {
    UPDATE_APPPHASE(newAppPhase: string) {
      this.appPhase = newAppPhase;
    },
    UPDATE_APPERROR(newAppError: Error) {
      this.appError = newAppError;
    },
    UPDATE_LOCATION(newLocation: Location) {
      this.location = newLocation;
    },
    UPDATE_NEXTSALAT(newSalat: Salat) {
      this.nextSalat = newSalat;
    },
    UPDATE_TODAYSALAT(newSalat: Salat[]) {
      this.todaySalat = newSalat;
    },
    UPDATE_TOMORROWSALAT(newSalat: Salat[]) {
      this.tomorrowSalat = newSalat;
    },
    async initializeState() {
      try {
        this.UPDATE_APPPHASE('locating');

        const location = await locationSvc.get();

        this.UPDATE_LOCATION(location);
        this.UPDATE_APPPHASE('loading salat');

        const salatResponses = await salatSvc.get(location);

        this.UPDATE_TODAYSALAT(salatResponses.todaySalat);
        this.UPDATE_TOMORROWSALAT(salatResponses.tomorrowSalat);
        this.UPDATE_NEXTSALAT(salatResponses.nextSalat);
        this.UPDATE_APPPHASE('standby');
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Failed to fetch') {
            const err = new Error('Network error, please check your connection and disable adblock');

            this.UPDATE_APPPHASE('network error');
            this.UPDATE_APPERROR(err);
          } else {
            this.UPDATE_APPPHASE('error');
            this.UPDATE_APPERROR(error);
          }
        } else {
          this.UPDATE_APPPHASE('error');
          this.UPDATE_APPERROR(new Error(String(error)));
        }
      }
    },
    async loadSalat() {
      try {
        const salatResponses = await salatSvc.get(this.location);
        this.UPDATE_TODAYSALAT(salatResponses.todaySalat);
        this.UPDATE_TOMORROWSALAT(salatResponses.tomorrowSalat);
        this.UPDATE_NEXTSALAT(salatResponses.nextSalat);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === 'Failed to fetch') {
            const msg = 'Network error when loading salat, '
              + 'please check your connection and disable adblock';
            const err = new Error(msg);

            this.UPDATE_APPPHASE('network error');
            this.UPDATE_APPERROR(err);
          } else {
            this.UPDATE_APPPHASE('error');
            this.UPDATE_APPERROR(error);
          }
        } else {
          this.UPDATE_APPPHASE('error');
          this.UPDATE_APPERROR(new Error(String(error)));
        }
      }
    },
  },
  getters,
});

export default useMainStore;
