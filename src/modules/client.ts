function checkStatus(response: Response): Response | never {
  if ((response.status >= 200 && response.status < 300) || response.ok) {
    return response;
  }

  const error = new Error(response.statusText);

  throw error;
}

function get<T>(url: string, options?: RequestInit): Promise<T> {
  return fetch(url, options)
    .then(checkStatus)
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
}

export default {
  get,
};
