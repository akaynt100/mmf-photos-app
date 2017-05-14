import qs from 'qs';

export const API_URL = '/api';

const makeRequest = (url, options) => fetch(url, options)
    .then((response) => response.json())
    .catch((responseError) => {
      throw new Error(responseError);
    });

const injectUrlParameters = (urlTemplate, data, injectQueryParams) => {
  const queryParams = { ...data };
  let url = urlTemplate.replace(/\$\{(.*?)\}/g, (match, parameter) => {
    if (parameter.length) {
      delete queryParams[parameter];
      return encodeURIComponent(data[parameter]);
    }
    return encodeURIComponent(data);
  });
  if (injectQueryParams && Object.keys(queryParams).length > 0) {
    url = `${url}?${qs.stringify(queryParams)}`;
  }
  return url;
};

export const sendData = (type, url) => (data) => (
  makeRequest(`${API_URL}${url}`, {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'same-origin'
  })
);

export const sendFormData = (type, url) => (data) => (
  makeRequest(`${API_URL}${url}`, {
    method: type,
    headers: {
      'Accept': 'application/json'
    },
    body: data
  })
);

export const getJSON = url => (data) => (
  makeRequest(`${API_URL}${injectUrlParameters(url, data, true)}`, {
    type: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
);
