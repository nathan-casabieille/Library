import React from 'react';
import { Container, Row, Col, Dropdown, Image, Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { API_URL, API_ROUTES, GENRE } from 'Env';
import { PiSword, PiDrop, PiHeart, PiDiamondsFour, PiDotsThreeVertical } from 'react-icons/pi';

const MediaCard = ({ media, renderSpecificContent, handleDelete, handleEdit, onClick }) => {
  const GENRE_COMPONENTS = {
    [GENRE.SHONEN]: <PiSword size={40} />,
    [GENRE.SEINEN]: <PiDrop size={40} />,
    [GENRE.SHOJO]: <PiHeart size={40} />,
    [GENRE.JOSEI]: <PiDiamondsFour size={40} />
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

          <Image
            src={
              media.picture_path
                ? `${API_URL}${API_ROUTES.UPLOADS}/${media.picture_path}`
                : 'https://image.adkami.com/mini/4981.jpg?1695971844' // TODO: replace with placeholder img
            }
            alt="Anime"
            style={{ height: '40px', width: '120px', objectFit: 'cover', marginLeft: '10px' }}
          />
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
  onClick: PropTypes.func
};

export default MediaCard;
