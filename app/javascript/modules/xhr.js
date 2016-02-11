import FetchJsonp from "fetch-jsonp";

let Xhr = {};

function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.ok) {
    return response;
  }
  else {
    let error =      new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

Xhr.getJsonp = function(url, options) {

  return FetchJsonp(url, options)
    .then(checkStatus)
    .then(response => {return response.json();})
    .catch(error => console.log("Request failed", error));

};

Xhr.get = function(url, options) {

  return fetch(url, options)
    .then(checkStatus)
    .then(response => {return response.json();})
    .then(responseJson => {return responseJson.data;})
    .catch(error => console.log("Request failed", error));

};

const XhrModule = Xhr;

export default XhrModule;
