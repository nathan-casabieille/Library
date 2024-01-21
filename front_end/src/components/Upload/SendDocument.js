import React from 'react';

import PropTypes from 'prop-types';

import { Form } from 'react-bootstrap';

const SendDocument = ({ setDocumentObj, feedback, validationErrors }) => {
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
      <Form.Control
        type="file"
        onChange={handleUploadDocument}
        isInvalid={!!validationErrors.picture}
      />
      {feedback}
    </Form.Group>
  );
};

SendDocument.propTypes = {
  setDocumentObj: PropTypes.func.isRequired,
  feedback: PropTypes.element,
  validationErrors: PropTypes.object
};

export default SendDocument;
