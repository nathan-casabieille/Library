import React, { useState, useEffect, useCallback } from 'react';
import { Button, Modal, Container } from 'react-bootstrap';
import { deleteManga, updateManga, getMangaList, addManga } from 'services/manga_services';
import { sortMedia } from 'utils/sort_media';
import MangaCard from './MangaCard';
import MangaForm from './MangaForm';
import MangaTag from './MangaTag';
import MangaSortOptions from './MangaSortOptions';
import { SORT_CRITERIA, SORT_ORDER } from 'Env';

const MangaList = () => {
  const [mangas, setMangas] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  const [selectedManga, setSelectedManga] = useState(null);

  const [sortCriteria, setSortCriteria] = useState(SORT_CRITERIA.MANGA_STATUS);
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASCENDING);

  const fetchAndSortMangas = useCallback(async () => {
    const fetchedMangas = await getMangaList();
    return sortMedia(fetchedMangas, sortCriteria, sortOrder);
  }, [sortCriteria, sortOrder]);

  useEffect(() => {
    (async () => {
      const sortedMangas = await fetchAndSortMangas();
      if (sortedMangas) {
        setMangas(sortedMangas);
      }
    })();
  }, [fetchAndSortMangas]);

  const handleModal = (show, manga = null) => {
    setShowModal(show);
    setSelectedManga(manga);
  };

  const updateMangaList = useCallback(
    async (mangaData) => {
      if (selectedManga) {
        await updateManga(selectedManga._id, mangaData);
      } else {
        await addManga(mangaData);
      }
      const sortedMangas = await fetchAndSortMangas();
      setMangas(sortedMangas);
      handleModal(false);
    },
    [selectedManga, fetchAndSortMangas]
  );

  const handleDelete = useCallback(
    async (id) => {
      await deleteManga(id);
      const sortedMangas = await fetchAndSortMangas();
      setMangas(sortedMangas);
    },
    [fetchAndSortMangas]
  );

  const handleSort = useCallback((criteria) => {
    setSortOrder((sortOrder) =>
      sortOrder === SORT_ORDER.ASCENDING ? SORT_ORDER.DESCENDING : SORT_ORDER.ASCENDING
    );
    setSortCriteria(criteria);
  }, []);

  const handleShowManga = useCallback(
    async (id) => {
      await updateManga(id, { last_check: new Date().toISOString() });
      const sortedMangas = await fetchAndSortMangas();
      setMangas(sortedMangas);
    },
    [fetchAndSortMangas]
  );

  return (
    <Container>
      {selectedManga && (
        <MangaTag
          showTagModal={showTagModal}
          setShowTagModal={setShowTagModal}
          selectedEntity={selectedManga}
        />
      )}
      <div className="mb-4">
        <Button variant="primary" onClick={() => handleModal(true)}>
          Add Manga
        </Button>
        <Modal show={showModal} onHide={() => handleModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedManga ? 'Edit Manga' : 'Add a New Manga'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MangaForm
              manga={selectedManga}
              updateMangaList={updateMangaList}
              handleCloseModal={() => handleModal(false)}
            />
          </Modal.Body>
        </Modal>
        <MangaSortOptions
          sortCriteria={sortCriteria}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
      </div>
      {mangas.map((manga) => (
        <div key={manga._id} style={{ margin: '3px' }}>
          <MangaCard
            manga={manga}
            handleDelete={handleDelete}
            handleEdit={() => handleModal(true, manga)}
            handleShowManga={handleShowManga}
            handleTag={() => {
              setShowTagModal(true);
              setSelectedManga(manga);
            }}
          />
        </div>
      ))}
    </Container>
  );
};

export default MangaList;
