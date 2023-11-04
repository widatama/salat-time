import type { State } from './index';

const isLoading = (state: State) => {
  return state.appPhase === 'loading salat' || state.appPhase === 'locating';
};

const isError = (state: State) => {
  return state.appPhase.includes('error');
};

export default {
  isLoading,
  isError,
};
