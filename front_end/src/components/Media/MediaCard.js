import React from 'react';
import {
  Container,
  Row,
  Col,
  Dropdown,
  Image,
  Tooltip,
  OverlayTrigger,
  Badge
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { API_URL, API_ROUTES, GENRE, RATING } from 'Env';
import { PiSword, PiDrop, PiHeart, PiDiamondsFour, PiDotsThreeVertical } from 'react-icons/pi';

const MediaCard = ({
  media,
  renderSpecificContent,
  handleDelete,
  handleEdit,
  handleTag,
  onClick
}) => {
  const RATING_COLORS = {
    [RATING.POOR]: 'red',
    [RATING.BELOW_AVERAGE]: 'orange',
    [RATING.AVERAGE]: 'yellow',
    [RATING.GOOD]: 'lightgreen',
    [RATING.EXCELLENT]: 'green',
    [RATING.EXCEPTIONAL]: 'blue'
  };

  const getRatingColor = (rating) => {
    return RATING_COLORS[rating] || 'grey';
  };

  const genreColor = getRatingColor(media.rating);

  const GENRE_COMPONENTS = {
    [GENRE.SHONEN]: <PiSword color={genreColor} size={40} />,
    [GENRE.SEINEN]: <PiDrop color={genreColor} size={40} />,
    [GENRE.SHOJO]: <PiHeart color={genreColor} size={40} />,
    [GENRE.JOSEI]: <PiDiamondsFour color={genreColor} size={40} />
  };

  const genreComponent = GENRE_COMPONENTS[media.genre];
  const genreName = Object.keys(GENRE).find((key) => GENRE[key] === media.genre);

  return (
    <Container fluid>
      <Row
        className="align-items-center justify-content-between"
        style={{ backgroundColor: '#343a40', color: 'white' }}
      >
        <Col xs="auto" className="d-flex align-items-center media-card" onClick={onClick}>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id={`tooltip-top`}>{genreName}</Tooltip>}
          >
            <div>{genreComponent}</div>
          </OverlayTrigger>

          <div className="image-badge-container">
            <Image
              src={
                media.picture_path
                  ? `${API_URL}${API_ROUTES.UPLOADS}/${media.picture_path}`
                  : 'https://image.adkami.com/mini/4981.jpg?1695971844'
              }
              alt="Anime"
              style={{ height: '40px', width: '120px', objectFit: 'cover', marginLeft: '10px' }}
              loading="lazy"
            />
            {media.tags && (
              <Col xs="auto">
                <Badge bg="danger">{media.tags}</Badge>
              </Col>
            )}
          </div>
        </Col>
        <Col className="media-card" onClick={onClick}>
          <h5>{media.title}</h5>
        </Col>
        {renderSpecificContent}

        <Col xs="auto">
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              style={{ background: 'none', border: 'none', color: 'white', boxShadow: 'none' }}
            >
              <PiDotsThreeVertical size={30} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/edit" onClick={() => handleEdit(media._id)}>
                Edit
              </Dropdown.Item>
              <Dropdown.Item href="#/tag" onClick={() => handleTag(media._id)}>
                Add tag
              </Dropdown.Item>
              <Dropdown.Item href="#/delete" onClick={() => handleDelete(media._id)}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};

MediaCard.propTypes = {
  media: PropTypes.object.isRequired,
  renderSpecificContent: PropTypes.node.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleTag: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

export default MediaCard;
