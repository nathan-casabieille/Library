import React, { useMemo } from 'react';
import { Col, Badge } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MediaCard from 'components/Media/MediaCard';
import { calculateDaysRemaining } from 'utils/date_utils';
import { STATUS } from 'Env';

const DaysRemainingBadge = ({ releaseDate }) => {
  const daysRemaining = useMemo(() => calculateDaysRemaining(releaseDate), [releaseDate]);

  return (
    <Col xs="auto">
      {daysRemaining <= 0 ? (
        <Badge bg="danger" className="badge-next-release">
          Released
        </Badge>
      ) : (
        <Badge bg="secondary" className="badge-next-release">
          {daysRemaining} days
        </Badge>
      )}
    </Col>
  );
};

const StatusBadge = ({ status, nextEpisodeReleaseDate }) => {
  switch (status) {
    case STATUS.ONGOING:
      return <DaysRemainingBadge releaseDate={nextEpisodeReleaseDate} />;
    case STATUS.AWAITING_NEXT_SEASON:
      return <BadgeCol content="hiatus" bg="warning" />;
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

const AnimeCard = ({ anime, handleDelete, handleEdit }) => {
  const { status, season, episode, next_episode_release_date } = anime;

  const displayBadges = useMemo(
    () => (
      <>
        {status !== STATUS.FINISHED && (
          <>
            <BadgeCol content={`s${season}`} bg="primary" />
            <BadgeCol content={`ep${episode}`} bg="primary" />
          </>
        )}
        <StatusBadge status={status} nextEpisodeReleaseDate={next_episode_release_date} />
      </>
    ),
    [status, season, episode, next_episode_release_date]
  );

  return (
    <MediaCard
      media={anime}
      renderSpecificContent={displayBadges}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
    />
  );
};

DaysRemainingBadge.propTypes = {
  releaseDate: PropTypes.string.isRequired
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
  nextEpisodeReleaseDate: PropTypes.string
};

BadgeCol.propTypes = {
  content: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired
};

AnimeCard.propTypes = {
  anime: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};

export default AnimeCard;
