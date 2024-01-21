import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { GENRE, RATING, STATUS } from 'Env';

import { uploadDocument } from 'components/Upload/uploadDocument';
import SendDocument from 'components/Upload/SendDocument';

const AnimeForm = ({ anime, handleCloseModal, updateAnimeList }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const [newAnime, setNewAnime] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const defaultAnime = {
      title: '',
      genre: GENRE.SHONEN,
      rating: RATING.AVERAGE,
      status: STATUS.ONGOING,
      season: 0,
      episode: 0,
      next_episode_release_date: ''
    };

    setNewAnime({
      ...defaultAnime,
      ...(anime && {
        title: anime.title || defaultAnime.title,
        genre: anime.genre || defaultAnime.genre,
        rating: anime.rating || defaultAnime.rating,
        status: anime.status || defaultAnime.status,
        season: anime.season || defaultAnime.season,
        episode: anime.episode || defaultAnime.episode,
        next_episode_release_date:
          anime.next_episode_release_date || defaultAnime.next_episode_release_date
      })
    });
  }, [anime]);

  const handleChange = (e) => {
    setNewAnime({ ...newAnime, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const ERROR_MESSAGES = {
      title: 'Title is required.',
      genre: 'Genre is required.',
      rating: 'Rating is required.',
      status: 'Status is required.',
      season: 'Season is required.',
      episode: 'Episode is required.',
      next_episode_release_date: 'Next episode release date is required.',
      picture: 'Picture is required.'
    };

    const { title, genre, rating, status, season, episode, next_episode_release_date } = newAnime;
    let errors = {};
    let isValid = true;

    const validateField = (field, errorKey) => {
      if (field === null || field === undefined || field === '' || field === 0) {
        isValid = false;
        errors[errorKey] = ERROR_MESSAGES[errorKey];
      }
    };

    validateField(title, 'title');
    validateField(genre, 'genre');
    validateField(rating, 'rating');
    validateField(status, 'status');

    if (status !== STATUS.FINISHED) {
      validateField(season, 'season');
    }

    if (status === STATUS.ONGOING) {
      validateField(episode, 'episode');
      validateField(next_episode_release_date, 'next_episode_release_date');
    }

    if (!anime && !pictureObj) {
      validateField(null, 'picture');
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        <Form.Control
          as="select"
          name="status"
          value={newAnime.status}
          onChange={handleChange}
          isInvalid={!!validationErrors.status}
        >
          <option value={STATUS.FINISHED}>Finished</option>
          <option value={STATUS.ONGOING}>Ongoing</option>
          <option value={STATUS.AWAITING_NEXT_SEASON}>Awaiting Next Season</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{validationErrors.status}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formAnimeTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={newAnime.title}
          onChange={handleChange}
          isInvalid={!!validationErrors.title}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.title}</Form.Control.Feedback>
      </Form.Group>

      {!anime && (
        <Form.Group className="mb-3">
          <Form.Label>Picture</Form.Label>
          <SendDocument
            setDocumentObj={setPictureObj}
            feedback={
              <Form.Control.Feedback type="invalid">
                {validationErrors.picture}
              </Form.Control.Feedback>
            }
            validationErrors={validationErrors}
          />
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
              isInvalid={!!validationErrors.genre}
            >
              <option value={GENRE.SHONEN}>Shonen</option>
              <option value={GENRE.SHOJO}>Shojo</option>
              <option value={GENRE.SEINEN}>Seinen</option>
              <option value={GENRE.JOSEI}>Josei</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{validationErrors.genre}</Form.Control.Feedback>
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
              isInvalid={!!validationErrors.rating}
            >
              <option value={RATING.POOR}>Poor</option>
              <option value={RATING.BELOW_AVERAGE}>Below Average</option>
              <option value={RATING.AVERAGE}>Average</option>
              <option value={RATING.GOOD}>Good</option>
              <option value={RATING.EXCELLENT}>Excellent</option>
              <option value={RATING.EXCEPTIONAL}>Exceptional</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{validationErrors.rating}</Form.Control.Feedback>
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
                isInvalid={!!validationErrors.season}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.season}
              </Form.Control.Feedback>
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
                    isInvalid={!!validationErrors.episode}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.episode}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Form.Group controlId="formAnimeNextEpisodeReleaseDate" className="mb-3">
                <Form.Label>Next Episode Release Date</Form.Label>
                <Form.Control
                  type="date"
                  name="next_episode_release_date"
                  value={newAnime.next_episode_release_date}
                  onChange={handleChange}
                  isInvalid={!!validationErrors.next_episode_release_date}
                />
                <Form.Control.Feedback type="invalid">
                  {validationErrors.next_episode_release_date}
                </Form.Control.Feedback>
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
