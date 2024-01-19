import { API_URL, API_ROUTES } from 'Env';

export function addManga(manga) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(manga)
  };
  return fetch(`${API_URL}${API_ROUTES.MANGA}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function deleteManga(id) {
  const requestOptions = {
    method: 'DELETE'
  };
  return fetch(`${API_URL}${API_ROUTES.MANGA}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function updateManga(id, fieldObj) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fieldObj)
  };

  return fetch(`${API_URL}${API_ROUTES.MANGA}/${id}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

export function getMangaList() {
  const requestOptions = {
    method: 'GET'
  };
  return fetch(`${API_URL}${API_ROUTES.MANGA}`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data.data;
    });
}
