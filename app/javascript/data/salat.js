import config from "../../../config/app.config";

import moment from "moment";
import urlFactory from "url-factory";

import xhr from "../modules/xhr";

import manipulator from "./salatManipulator";

const salat = {};

let generateUrl = function generateUrl(location, timestamp) {
  let
    urlBuilder =  new urlFactory.Builder(),
    baseUrl =     config.external.salatTimeService,
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

salat.get = function(location) {
  const urlToday = generateUrl(location);
  const urlTomorrow = generateUrl(location, moment().add(1, "d").format("X"));

  return Promise.all([xhr.get(urlToday), xhr.get(urlTomorrow)]).then((salat) => {
    let
      todaySalat = manipulator.transformSalatList(salat[0]),
      nextSalat = manipulator.getNextSalat(salat[0], salat[1]);

    return {
      todaySalat: todaySalat,
      nextSalat:  nextSalat
    };
  });
};

export default salat;
