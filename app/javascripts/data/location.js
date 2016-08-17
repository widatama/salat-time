import config from "../../../config/app.config";

import urlFactory from "url-factory";

import xhr from "../modules/xhr";

import manipulator from "./locationManipulator";

const location = {};

let generateUrl = function generateUrl() {

  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.geoService,
    completeUrl = "";

  completeUrl = urlBuilder.setBaseURL(baseUrl)
    .build();

  return completeUrl;
};

location.get = function() {
  const url = generateUrl();
  return xhr.get(url).then((response) => {
    return manipulator.transformLocationResponse(response);
  });
};

export default location;
