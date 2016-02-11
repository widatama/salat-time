import config from "../../../config/app.config";

import moment from "moment";
import urlFactory from "url-factory";

import xhr from "../modules/xhr";

const prayer = {};

let generateUrl = function generateUrl(location, timestamp) {
  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.praytimeService,
    completeUrl = "";

  completeUrl = urlBuilder.setBaseURL(baseUrl)
    .appendPath(["timings", timestamp].join("/"))
    .setQueryParameter("latitude", location.latitude.toString())
    .setQueryParameter("longitude", location.longitude.toString())
    .setQueryParameter("timezonestring", location.time_zone)
    .setQueryParameter("method", "3")
    .build();

  return completeUrl;
};

prayer.get = function(location) {
  const urlToday = generateUrl(location);
  const urlTomorrow = generateUrl(location, moment().add(1, "d").format("X"));

  return Promise.all([xhr.get(urlToday), xhr.get(urlTomorrow)]);
};

export default prayer;
