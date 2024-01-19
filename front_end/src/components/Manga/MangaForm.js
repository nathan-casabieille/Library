import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { GENRE, RATING, STATUS } from 'Env';

import { uploadDocument } from 'components/Upload/uploadDocument';
import SendDocument from 'components/Upload/SendDocument';

const MangaForm = ({ manga, handleCloseModal, updateMangaList }) => {
  const [pictureObj, setPictureObj] = useState(null);
  const [newManga, setNewManga] = useState(null);

  useEffect(() => {
    if (manga) {
      setNewManga({
        title: manga.title || '',
        genre: manga.genre || GENRE.SHONEN,
        rating: manga.rating || RATING.AVERAGE,
        status: manga.status || STATUS.ONGOING,
        chapter: manga.chapter || 0,
        last_release_date: manga.last_release_date || '',
        last_check: manga.last_check || null,
        website: manga.website || ''
      });
    } else {
      setNewManga({
        title: '',
        genre: GENRE.SHONEN,
        rating: RATING.AVERAGE,
        status: STATUS.ONGOING,
        chapter: 0,
        next_episode_release_date: '',
        last_check: null,
        website: ''
      });
    }
  }, [manga]);

  const handleChange = (e) => {
    setNewManga({ ...newManga, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        <Form.Control as="select" name="status" value={newManga.status} onChange={handleChange}>
          <option value={STATUS.FINISHED}>Finished</option>
          <option value={STATUS.ONGOING}>Ongoing</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="formMangaTitle" className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={newManga.title}
          onChange={handleChange}
        />
      </Form.Group>

      {!manga && (
        <Form.Group className="mb-3">
          <Form.Label>Picture</Form.Label>
          <SendDocument setDocumentObj={setPictureObj} />
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
            >
              <option value={GENRE.SHONEN}>Shonen</option>
              <option value={GENRE.SHOJO}>Shojo</option>
              <option value={GENRE.SEINEN}>Seinen</option>
              <option value={GENRE.JOSEI}>Josei</option>
            </Form.Select>
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
              />
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
              />
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
            />
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
