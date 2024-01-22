import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const MediaTag = (WrappedComponent, updateFunction) => {
  const HOC = ({ showTagModal, setShowTagModal, selectedEntity, updateTags }) => {
    const [tagInput, setTagInput] = useState('');

    const onHideModal = useCallback(() => {
      setShowTagModal(false);
      setTagInput('');
    }, [setShowTagModal]);

    const onTagSave = useCallback(() => {
      updateFunction(selectedEntity._id, { tags: tagInput }).then(() => {
        updateTags(selectedEntity._id, tagInput);
      });
    }, [selectedEntity._id, tagInput, updateTags]);

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
    setShowTagModal: PropTypes.func,
    updateTags: PropTypes.func
  };

  return HOC;
};

export default MediaTag;
