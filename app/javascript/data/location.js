import config from "../../../config/app.config";

import uri from "urijs";

import gelo from "../modules/gelo";
import xhr from "../modules/xhr";

let location = {};

let generateUrl = function generateUrl(position) {

  let baseUrl = config.external.geoService;
  let completeUrl = uri(baseUrl)
    .directory("reverse")
    .query({
      format:         "json",
      lat:            position.coords.latitude,
      lon:            position.coords.longitude,
      zoom:           18,
      addressdetails: 1,
      namedetails:    1
    }).toString();

  return completeUrl;
};

let reverseGeocode = function reverseGeocode(position) {

  if(position) {
    let url = generateUrl(position);

    return xhr.get(url, {
      jsonpCallback: "json_callback"
    });
  }
  /*Use IP maybe*/

};

location.get = function() {
  return gelo.locate()
    .then(reverseGeocode);
};

export default location;
