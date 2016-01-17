let Gelo = {};

if ("geolocation" in navigator) {
  const geolocation = navigator.geolocation;

  Gelo.locate = function(options) {
    return new Promise(function(resolve, reject) {
      geolocation.getCurrentPosition(resolve, reject, options);
    })
    .catch(error => console.log(error.message));
  };
}
else {
  /*Use IP maybe*/
  Gelo.locate = function() {
    return Promise
      .reject("Geolocation is not available")
      .catch(error => console.log(error));
  };
}


const GeloModule = Gelo;

export default GeloModule;
