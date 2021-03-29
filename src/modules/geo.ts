interface Geo {
  locate: () => Promise<GeolocationPosition>;
}

function locate(): Promise<GeolocationPosition> {
  return new Promise((resolve: PositionCallback, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      });
    } else {
      reject(Error('Geolocation not available'));
    }
  });
}

const geo: Geo = {
  locate,
};

export default geo;
