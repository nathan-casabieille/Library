import React from 'react';
import { updateManga } from 'services/manga_services';
import MediaTag from 'components/Media/MediaTag';
import PropTypes from 'prop-types';
import CustomModal from 'components/CustomModal/CustomModal';

import { TAG_MAX_LENGTH } from 'Env';

const MangaTag = ({
  showTagModal,
  onHideModal,
  setInput,
  placeholder,
  submitButtonConfig,
  // eslint-disable-next-line no-unused-vars
  updateTags
}) => (
  <CustomModal
    show={showTagModal}
    title="Enter a tag"
    isPrompt={true}
    setInput={setInput}
    onHide={onHideModal}
    placeholder={placeholder}
    submitButton={submitButtonConfig}
    maxLength={TAG_MAX_LENGTH}
  >
    Add Tags (e.g., theme, author, unread chapter...)
  </CustomModal>
);

MangaTag.propTypes = {
  showTagModal: PropTypes.bool,
  onHideModal: PropTypes.func,
  setInput: PropTypes.func,
  placeholder: PropTypes.string,
  submitButtonConfig: PropTypes.object,
  updateTags: PropTypes.func
};

export default MediaTag(MangaTag, updateManga);
