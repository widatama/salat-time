const geo = {};

geo.locate = () =>
  new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
      });
    } else {
      reject(Error('Geolocation not available'));
    }
  });

export default geo;
