import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Container } from 'react-bootstrap';
import { deleteAnime, updateAnime, getAnimeList, addAnime } from 'services/anime_services';
import { sortMedia } from 'utils/sort_media';
import AnimeCard from './AnimeCard';
import AnimeForm from './AnimeForm';
import AnimeSortOptions from './AnimeSortOptions';
import { SORT_CRITERIA, SORT_ORDER } from 'Env';

const AnimeList = () => {
  const [animes, setAnimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [sortCriteria, setSortCriteria] = useState(SORT_CRITERIA.ANIME_STATUS);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASCENDING);

  const fetchAndsortAnimes = useCallback(async () => {
    const fetchedAnimes = await getAnimeList();
    return sortMedia(fetchedAnimes, sortCriteria, sortOrder);
  }, [sortCriteria, sortOrder]);

  useEffect(() => {
    (async () => {
      const sortedAnimes = await fetchAndsortAnimes();
      if (sortedAnimes) {
        setAnimes(sortedAnimes);
      }
    })();
  }, [fetchAndsortAnimes]);

  const handleModal = (show, anime = null) => {
    setShowModal(show);
    setSelectedAnime(anime);
  };

  const updateAnimeList = useCallback(
    async (animeData) => {
      if (selectedAnime) {
        await updateAnime(selectedAnime._id, animeData);
      } else {
        await addAnime(animeData);
      }
      const sortedAnimes = await fetchAndsortAnimes();
      setAnimes(sortedAnimes);
      handleModal(false);
    },
    [selectedAnime, fetchAndsortAnimes]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteAnime(id);
      const sortedAnimes = await fetchAndsortAnimes();
      setAnimes(sortedAnimes);
    },
    [fetchAndsortAnimes]
  );

  const handleSort = useCallback((criteria) => {
    setSortOrder((sortOrder) =>
      sortOrder === SORT_ORDER.ASCENDING ? SORT_ORDER.DESCENDING : SORT_ORDER.ASCENDING
    );
    setSortCriteria(criteria);
  }, []);

  return (
    <Container>
      <div className="mb-4">
        <Button variant="primary" onClick={() => handleModal(true)}>
          Add Anime
        </Button>
        <Modal show={showModal} onHide={() => handleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedAnime ? 'Edit Anime' : 'Add a New Anime'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AnimeForm
              anime={selectedAnime}
              updateAnimeList={updateAnimeList}
              handleCloseModal={() => handleModal(false)}
            />
          </Modal.Body>
        </Modal>
        <AnimeSortOptions
          sortCriteria={sortCriteria}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
      </div>
      {animes.map((anime) => (
        <div key={anime._id} style={{ margin: '3px' }}>
          <AnimeCard
            anime={anime}
            handleDelete={handleDelete}
            handleEdit={() => handleModal(true, anime)}
          />
        </div>
      ))}
    </Container>
  );
};

export default AnimeList;
