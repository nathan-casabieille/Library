import { API_URL, API_ROUTES } from 'Env';

export function addAnime(anime) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anime)
  };
  return fetch(`${API_URL}${API_ROUTES.ANIME}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function deleteAnime(id) {
  const requestOptions = {
    method: 'DELETE'
  };
  return fetch(`${API_URL}${API_ROUTES.ANIME}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function updateAnime(id, fieldObj) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fieldObj)
  };

  return fetch(`${API_URL}${API_ROUTES.ANIME}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getAnimeList() {
  const requestOptions = {
    method: 'GET'
  };
  return fetch(`${API_URL}${API_ROUTES.ANIME}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
}
