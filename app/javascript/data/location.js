import config from "../../../config/app.config";

import urlFactory from "url-factory";

import xhr from "../modules/xhr";

const location = {};

let generateUrl = function generateUrl() {

  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.geoService,
    completeUrl = "";

  completeUrl = urlBuilder.setBaseURL(baseUrl)
    .appendPath("api/")
    .build();

  return completeUrl;
};

location.get = function() {
  const url = generateUrl();
  return xhr.get(url);
};

export default location;
