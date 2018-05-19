const XhrModule = {};

function checkStatus(response) {
  if ((response.status >= 200 && response.status < 300) || response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

XhrModule.get = (url, options) =>
  fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => {
      throw error;
    });

export default XhrModule;
