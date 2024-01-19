import { v4 as uuidv4 } from 'uuid';

import { API_URL } from 'Env';

export function uploadDocument(documentType, documentObj) {
  const data = new FormData();

  const fileNameParts = documentObj.name.split('.');
  const fileExtension = fileNameParts.pop();

  const randomFileName = uuidv4();

  const newFileName = `${randomFileName}.${fileExtension}`;

  data.append('file', documentObj);
  data.append('folder_name', documentType);
  data.append('file_name', newFileName);

  return fetch(API_URL + '/upload', {
    method: 'POST',
    body: data
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.code === 415) {
        console.log('Erreur', 'Type de fichier non supporté');
      }
      return `${documentType}/${newFileName}`;
    });
}
