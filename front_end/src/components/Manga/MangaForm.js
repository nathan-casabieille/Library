import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { GENRE, RATING, STATUS } from 'Env';

import { uploadDocument } from 'components/Upload/uploadDocument';
import SendDocument from 'components/Upload/SendDocument';

const MangaForm = ({ manga, handleCloseModal, updateMangaList }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const [newManga, setNewManga] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const defaultManga = {
      title: '',
      genre: GENRE.SHONEN,
      rating: RATING.AVERAGE,
      status: STATUS.ONGOING,
      chapter: 0,
      last_release_date: '',
      last_check: null,
      website: ''
    };

    setNewManga({
      ...defaultManga,
      ...(manga && {
        title: manga.title || defaultManga.title,
        genre: manga.genre || defaultManga.genre,
        rating: manga.rating || defaultManga.rating,
        status: manga.status || defaultManga.status,
        chapter: manga.chapter || defaultManga.chapter,
        last_release_date: manga.last_release_date || defaultManga.last_release_date,
        last_check: manga.last_check || defaultManga.last_check,
        website: manga.website || defaultManga.website
      })
    });
  }, [manga]);

  const handleChange = (e) => {
    setNewManga({ ...newManga, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const ERROR_MESSAGES = {
      title: 'Title is required.',
      genre: 'Genre is required.',
      rating: 'Rating is required.',
      status: 'Status is required.',
      chapter: 'Chapter is required.',
      last_release_date: 'Last release date is required.',
      website: 'Website is required.',
      picture: 'Picture is required.'
    };

    const { title, genre, rating, status, chapter, last_release_date, website } = newManga;
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

    if (status === STATUS.ONGOING) {
      validateField(chapter, 'chapter');
      validateField(website, 'website');
      validateField(last_release_date, 'last_release_date');
    }

    if (!manga && !pictureObj) {
      validateField(null, 'picture');
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!manga) {
      const picturePath = await uploadDocument('manga', pictureObj);

      updateMangaList({
        ...newManga,
        picture_path: picturePath || manga?.picture_path
      });
    } else {
      updateMangaList({
        ...newManga
      });
    }
    handleCloseModal();
  };

  if (!newManga) return null;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formMangaStatus" className="mb-3">
        <Form.Label>Status</Form.Label>
        <Form.Control
          as="select"
          name="status"
          value={newManga.status}
          onChange={handleChange}
          isInvalid={!!validationErrors.status}
        >
          <option value={STATUS.FINISHED}>Finished</option>
          <option value={STATUS.ONGOING}>Ongoing</option>
        </Form.Control>
        <Form.Control.Feedback type="invalid">{validationErrors.status}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formMangaTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={newManga.title}
          onChange={handleChange}
          isInvalid={!!validationErrors.title}
        />
        <Form.Control.Feedback type="invalid">{validationErrors.title}</Form.Control.Feedback>
      </Form.Group>

      {!manga && (
        <Form.Group className="mb-3">
          <Form.Label>Picture</Form.Label>
          <SendDocument
            setDocumentObj={setPictureObj}
            validationErrors={validationErrors}
            feedback={
              <Form.Control.Feedback type="invalid">
                {validationErrors.picture}
              </Form.Control.Feedback>
            }
          />
        </Form.Group>
      )}
      <Row>
        <Col xs={12} md={6}>
          <Form.Group controlId="formMangaGenre" className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              aria-label="Genre"
              name="genre"
              value={newManga.genre}
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
          <Form.Group controlId="formMangaRating" className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              aria-label="Rating"
              name="rating"
              value={newManga.rating}
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

      {newManga.status == STATUS.ONGOING && (
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formMangaChapter" className="mb-3">
              <Form.Label>Chapter</Form.Label>
              <Form.Control
                type="number"
                placeholder="Chapter number"
                name="chapter"
                value={newManga.chapter}
                onChange={handleChange}
                isInvalid={!!validationErrors.chapter}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.chapter}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formMangaNextEpisodeReleaseDate" className="mb-3">
              <Form.Label>Last Release Date</Form.Label>
              <Form.Control
                type="date"
                name="last_release_date"
                value={newManga.last_release_date}
                onChange={handleChange}
                isInvalid={!!validationErrors.last_release_date}
              />
              <Form.Control.Feedback type="invalid">
                {validationErrors.last_release_date}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Form.Group controlId="formMangaWebsite" className="mb-3">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter website"
              name="website"
              value={newManga.website}
              onChange={handleChange}
              isInvalid={!!validationErrors.website}
            />
            <Form.Control.Feedback type="invalid">{validationErrors.website}</Form.Control.Feedback>
          </Form.Group>
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

MangaForm.propTypes = {
  manga: PropTypes.object,
  handleCloseModal: PropTypes.func.isRequired,
  updateMangaList: PropTypes.func.isRequired
};

export default MangaForm;
