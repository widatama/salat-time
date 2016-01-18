import config from "../../../config/app.config";

import uri from "urijs";

import xhr from "../modules/xhr";

const praytime = {};

let generateUrl = function generateUrl(city) {

  let baseUrl = config.external.praytimeService;
  let completeUrl = uri(baseUrl)
    .directory(city)
    .query({
      key: config.external.praytimeServiceKey
    }).toString();

  return completeUrl;
};

praytime.get = function(city) {
  const url = generateUrl(city);

  return xhr.get(url, {
    jsonpCallback: "callback"
  });
};

export default praytime;
