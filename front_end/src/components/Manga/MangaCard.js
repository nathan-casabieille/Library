import React, { useMemo } from 'react';
import { Col, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MediaCard from 'components/Media/MediaCard';
import { calculateDaysElapsed } from 'utils/date_utils';
import { STATUS } from 'Env';

const LastCheckBadge = ({ lastCheck }) => {
  const daysElapsed = useMemo(() => {
    if (lastCheck === null) {
      return 0;
    }
    return calculateDaysElapsed(lastCheck);
  }, [lastCheck]);
  return (
    <Col xs="auto">
      <Badge bg={daysElapsed > 0 ? 'danger' : 'success'} className="badge-last-check">
        last check {daysElapsed}
      </Badge>
    </Col>
  );
};

const LastReleaseDateBadge = ({ lastReleaseDate }) => {
  const daysElapsed = useMemo(() => calculateDaysElapsed(lastReleaseDate), [lastReleaseDate]);

  return (
    <Col xs="auto">
      <Badge bg="dark" className="badge-last-release">
        {daysElapsed} days
      </Badge>
    </Col>
  );
};

const StatusBadge = ({ status, lastCheck, lastReleaseDate }) => {
  switch (status) {
    case STATUS.ONGOING:
      return (
        <>
          <LastReleaseDateBadge lastReleaseDate={lastReleaseDate} />
          <LastCheckBadge lastCheck={lastCheck} />
        </>
      );
    case STATUS.FINISHED:
      return <BadgeCol content="finished" bg="secondary" />;
    default:
      return null;
  }
};

const BadgeCol = ({ content, bg }) => (
  <Col xs="auto">
    <Badge bg={bg} className="badge-next-release">
      {content}
    </Badge>
  </Col>
);

const MangaCard = ({ manga, handleDelete, handleEdit, handleShowManga, handleTag }) => {
  const { status, chapter, last_check, last_release_date } = manga;

  const openMangaWebsite = () => {
    if (manga.status === STATUS.FINISHED) return null;
    window.open(manga.website, '_blank');
    handleShowManga(manga._id);
  };

  const displayBadges = useMemo(
    () => (
      <>
        {status === STATUS.ONGOING && (
          <>
            <BadgeCol content={`ch${chapter}`} bg="primary" />
          </>
        )}
        <StatusBadge status={status} lastCheck={last_check} lastReleaseDate={last_release_date} />
      </>
    ),
    [status, chapter, last_check, last_release_date]
  );

  return (
    <MediaCard
      media={manga}
      renderSpecificContent={displayBadges}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      handleTag={handleTag}
      onClick={openMangaWebsite}
    />
  );
};

LastCheckBadge.propTypes = {
  lastCheck: PropTypes.string.isRequired
};

LastReleaseDateBadge.propTypes = {
  lastReleaseDate: PropTypes.string.isRequired
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  lastCheck: PropTypes.string.isRequired,
  lastReleaseDate: PropTypes.string.isRequired
};

BadgeCol.propTypes = {
  content: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired
};

MangaCard.propTypes = {
  manga: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleShowManga: PropTypes.func.isRequired,
  handleTag: PropTypes.func.isRequired
};

export default MangaCard;
