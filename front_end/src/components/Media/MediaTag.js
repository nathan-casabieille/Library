import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const MediaTag = (WrappedComponent, updateFunction) => {
  const HOC = ({ showTagModal, setShowTagModal, selectedEntity }) => {
    const [tagInput, setTagInput] = useState('');

    const onHideModal = useCallback(() => {
      setShowTagModal(false);
    }, []);

    const onTagSave = useCallback(() => {
      updateFunction(selectedEntity._id, { tags: tagInput }).then(() => {
        console.log('tag added');
      });
    }, [selectedEntity._id, tagInput]);

    const submitButtonConfig = useMemo(
      () => ({
        variant: 'primary',
        text: 'save',
        submit: onTagSave
      }),
      [onTagSave]
    );

    return (
      <WrappedComponent
        showTagModal={showTagModal}
        onHideModal={onHideModal}
        setInput={setTagInput}
        placeholder={selectedEntity?.tags}
        submitButtonConfig={submitButtonConfig}
      />
    );
  };

  HOC.propTypes = {
    selectedEntity: PropTypes.object,
    showTagModal: PropTypes.bool,
    setShowTagModal: PropTypes.func
  };

  return HOC;
};

export default MediaTag;
