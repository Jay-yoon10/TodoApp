import { API_BASE_URL } from '../config/app-config';
const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const call = (api, method, request) => {
  let headers = new Headers({
    'Content-Type': 'application/json',
  });

  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  if (accessToken && accessToken !== null) {
    headers.append('Authorization', 'Bearer ' + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };

  if (request) {
    // GET
    options.body = JSON.stringify(request);
  }

  return fetch(options.url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 403) {
        window.location.href = '/login'; // redirect
      } else {
        new Error(response);
      }
    })
    .catch((error) => {
      console.log('http error');
      console.log(error);
    });
};
export const signIn = (userDTO) => {
  return call('/auth/signin', 'POST', userDTO).then((response) => {
    if (response.token) {
      localStorage.setItem('ACCESS_TOKEN', response.token);
      window.location.href = '/';
    }
  });
};
export const signout = () => {
  localStorage.setItem('ACCESS_TOKEN', null);
  window.location.href = '/login';
};

export const signup = (userDTO) => {
  return call('/auth/signup', 'POST', userDTO);
};
