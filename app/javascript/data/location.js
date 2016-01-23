import config from "../../../config/app.config";

import urlFactory from "url-factory";

import gelo from "../modules/gelo";
import xhr from "../modules/xhr";

const location = {};

let generateUrl = function generateUrl(position) {
  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.geoService,
    completeUrl = "";

  completeUrl = urlBuilder.setBaseURL(baseUrl)
    .appendPath("reverse/")
    .setQueryParameter("format", "json")
    .setQueryParameter("lat", position.coords.latitude + "")
    .setQueryParameter("lon", position.coords.longitude + "")
    .setQueryParameter("zoom", "18")
    .setQueryParameter("addressdetails", "1")
    .setQueryParameter("namedetails", "1")
    .setQueryParameter("extratags", "1")
    .build();

  return completeUrl;
};

let reverseGeocode = function reverseGeocode(position) {

  if(position) {
    const url = generateUrl(position);

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
