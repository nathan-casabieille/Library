import React, { useState } from 'react';

import MangaList from 'components/Manga/MangaList';
import AnimeList from 'components/Anime/AnimeList';
import HorizontalBar from 'components/HorizontalBar/HorizontalBar';

import { Image } from 'react-bootstrap';

import { MEDIA } from 'Env';

import logo from 'assets/logo.png';

function App() {
  const [activeItem, setActiveItem] = useState(MEDIA.ANIME);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };

  let contentComponent = null;

  switch (activeItem) {
    case MEDIA.ANIME:
      contentComponent = <AnimeList />;
      break;
    case MEDIA.MANGA:
      contentComponent = <MangaList />;
      break;
  }

  return (
    <div>
      <Image src={logo} alt="logo" className=" d-flex mx-auto" />

      <HorizontalBar
        activeItem={activeItem}
        onItemClick={handleItemClick}
        elems={[MEDIA.ANIME, MEDIA.MANGA]}
      />
      {contentComponent}
    </div>
  );
}

export default App;
