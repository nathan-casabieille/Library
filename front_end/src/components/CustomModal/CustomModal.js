import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CustomModal = ({
  show,
  onHide,
  isPrompt = true,
  submitButton,
  cancelButton,
  title,
  placeholder = '',
  children,
  setInput
}) => {
  const handleCancel = () => {
    if (cancelButton && cancelButton.submit) {
      cancelButton.submit();
    }
    onHide();
  };

  const handleSubmit = () => {
    if (submitButton && submitButton.submit) {
      submitButton.submit();
    }
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {isPrompt && (
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasic">
              {children}
              <Form.Control
                className="my-2"
                type="text"
                placeholder={placeholder}
                onChange={(event) => setInput(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      )}
      {!isPrompt && children && <Modal.Body>{children}</Modal.Body>}
      <Modal.Footer>
        {cancelButton && cancelButton.text && (
          <Button
            variant={cancelButton.variant ?? 'secondary'}
            onClick={() => {
              handleCancel();
            }}
          >
            {cancelButton.text}
          </Button>
        )}
        <Button
          variant={submitButton.variant ?? 'primary'}
          onClick={() => {
            handleSubmit();
          }}
        >
          {submitButton.text}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  isPrompt: PropTypes.bool,
  submitButton: PropTypes.shape({
    variant: PropTypes.string,
    text: PropTypes.string.isRequired,
    submit: PropTypes.func
  }).isRequired,
  cancelButton: PropTypes.shape({
    variant: PropTypes.string,
    text: PropTypes.string.isRequired,
    submit: PropTypes.func
  }),
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  children: PropTypes.node,
  setInput: PropTypes.func
};

export default CustomModal;
