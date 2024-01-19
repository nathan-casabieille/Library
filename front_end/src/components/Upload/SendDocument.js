import React from 'react';

import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const SendDocument = ({ setDocumentObj }) => {
  const handleUploadDocument = (ev) => {
    ev.preventDefault();
    const fileObj = ev.target.files && ev.target.files[0];
    if (!fileObj) {
      alert("L'envoi du fichier a échoué");
      return;
    }

    setDocumentObj(fileObj);
  };

  return (
    <Form.Group className="mb-3">
      <Form.Control type="file" onChange={handleUploadDocument} />
    </Form.Group>
  );
};

SendDocument.propTypes = {
  setDocumentObj: PropTypes.func.isRequired
};

export default SendDocument;
