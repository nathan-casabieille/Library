import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { GENRE, RATING, STATUS } from 'Env';

import { uploadDocument } from 'components/Upload/uploadDocument';
import SendDocument from 'components/Upload/SendDocument';

const AnimeForm = ({ anime, handleCloseModal, updateAnimeList }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const [newAnime, setNewAnime] = useState(null);

  useEffect(() => {
    if (anime) {
      setNewAnime({
        title: anime.title || '',
        genre: anime.genre || GENRE.SHONEN,
        rating: anime.rating || RATING.AVERAGE,
        status: anime.status || STATUS.ONGOING,
        season: anime.season || 0,
        episode: anime.episode || 0,
        next_episode_release_date: anime.next_episode_release_date || ''
      });
    } else {
      setNewAnime({
        title: '',
        genre: GENRE.SHONEN,
        rating: RATING.AVERAGE,
        status: STATUS.ONGOING,
        season: 0,
        episode: 0,
        next_episode_release_date: ''
      });
    }
  }, [anime]);

  const handleChange = (e) => {
    setNewAnime({ ...newAnime, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!anime) {
      const picturePath = await uploadDocument('anime', pictureObj);

      updateAnimeList({
        ...newAnime,
        picture_path: picturePath || anime?.picture_path
      });
    } else {
      updateAnimeList({
        ...newAnime
      });
    }
    handleCloseModal();
  };

  if (!newAnime) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formAnimeStatus" className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control as="select" name="status" value={newAnime.status} onChange={handleChange}>
          <option value={STATUS.FINISHED}>Finished</option>
          <option value={STATUS.ONGOING}>Ongoing</option>
          <option value={STATUS.AWAITING_NEXT_SEASON}>Awaiting Next Season</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formAnimeTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={newAnime.title}
          onChange={handleChange}
        />
      </Form.Group>

      {!anime && (
        <Form.Group className="mb-3">
          <Form.Label>Picture</Form.Label>
          <SendDocument setDocumentObj={setPictureObj} />
        </Form.Group>
      )}
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="formAnimeGenre" className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              aria-label="Genre"
              name="genre"
              value={newAnime.genre}
              onChange={handleChange}
            >
              <option value={GENRE.SHONEN}>Shonen</option>
              <option value={GENRE.SHOJO}>Shojo</option>
              <option value={GENRE.SEINEN}>Seinen</option>
              <option value={GENRE.JOSEI}>Josei</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col xs={12} md={6}>
          <Form.Group controlId="formAnimeRating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              aria-label="Rating"
              name="rating"
              value={newAnime.rating}
              onChange={handleChange}
            >
              <option value={RATING.POOR}>Poor</option>
              <option value={RATING.BELOW_AVERAGE}>Below Average</option>
              <option value={RATING.AVERAGE}>Average</option>
              <option value={RATING.GOOD}>Good</option>
              <option value={RATING.EXCELLENT}>Excellent</option>
              <option value={RATING.EXCEPTIONAL}>Exceptional</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {newAnime.status !== STATUS.FINISHED && (
        <Row>
          <Col
            className={
              newAnime.status === STATUS.AWAITING_NEXT_SEASON ? 'col-xs-12' : 'col xs-12 col-md-6'
            }
          >
            <Form.Group controlId="formAnimeSeason" className="mb-3">
              <Form.Label>Season</Form.Label>
              <Form.Control
                type="number"
                placeholder="Season number"
                name="season"
                value={newAnime.season}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          {newAnime.status === STATUS.ONGOING && (
            <>
              <Col xs={12} md={6}>
                <Form.Group controlId="formAnimeEpisode" className="mb-3">
                  <Form.Label>Episode</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Episode number"
                    name="episode"
                    value={newAnime.episode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Form.Group controlId="formAnimeNextEpisodeReleaseDate" className="mb-3">
                <Form.Label>Next Episode Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="next_episode_release_date"
                  value={newAnime.next_episode_release_date}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}
        </Row>
      )}

      <div className="mb-3">
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" type="submit" className="mx-2">
          Save Changes
        </Button>
      </div>
    </Form>
  );
};

AnimeForm.propTypes = {
  anime: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  updateAnimeList: PropTypes.func.isRequired
};

export default AnimeForm;
