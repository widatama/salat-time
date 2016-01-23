import config from "../../../config/app.config";

import moment from "moment";
import urlFactory from "url-factory";

import xhr from "../modules/xhr";

const praytime = {};

let generateUrl = function generateUrl(country) {
  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.praytimeService,
    completeUrl = "",
    path =        [country, "weekly", moment().format("D-M-YYYY"), "3.json"];

  completeUrl = urlBuilder.setBaseURL(baseUrl)
    .appendPath(path.join("/"))
    .setQueryParameter("key", config.external.praytimeServiceKey)
    .build();

  return completeUrl;
};

praytime.get = function(country) {
  const url = generateUrl(country);

  return xhr.get(url, {
    jsonpCallback: "callback"
  });
};

export default praytime;
