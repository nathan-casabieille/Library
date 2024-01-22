import React from 'react';
import { updateAnime } from 'services/anime_services';
import MediaTag from 'components/Media/MediaTag';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal/CustomModal';

const AnimeTag = ({ showTagModal, onHideModal, setInput, placeholder, submitButtonConfig }) => (
  <CustomModal
    show={showTagModal}
    title="Enter a tag"
    isPrompt={true}
    setInput={setInput}
    onHide={onHideModal}
    placeholder={placeholder}
    submitButton={submitButtonConfig}
  >
    Add Tags (e.g., theme, author, episode not viewed...)
  </CustomModal>
);

AnimeTag.propTypes = {
  showTagModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  setInput: PropTypes.func,
  placeholder: PropTypes.string,
  submitButtonConfig: PropTypes.object
};

export default MediaTag(AnimeTag, updateAnime);
