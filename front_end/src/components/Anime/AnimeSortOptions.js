import React from 'react';
import { Button } from 'react-bootstrap';
import { SORT_CRITERIA, SORT_ORDER } from 'Env';

import PropTypes from 'prop-types';

const AnimeSortOptions = ({ sortCriteria, sortOrder, handleSort }) => {
  return (
    <>
      <Button
        variant="outline-primary"
        onClick={() => handleSort(SORT_CRITERIA.ANIME_STATUS)}
        className={`mx-2 ${sortCriteria === SORT_CRITERIA.ANIME_STATUS ? 'active' : ''}`}
      >
        <div style={{ color: 'white' }}>
          Sort by status{' '}
          {sortCriteria === SORT_CRITERIA.ANIME_STATUS && sortOrder === SORT_ORDER.ASCENDING
            ? '▲'
            : '▼'}
        </div>
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => handleSort(SORT_CRITERIA.TITLE)}
        className={`${sortCriteria === SORT_CRITERIA.TITLE ? 'active' : ''}`}
      >
        <div style={{ color: 'white' }}>
          Sort by title{' '}
          {sortCriteria === SORT_CRITERIA.TITLE && sortOrder === SORT_ORDER.ASCENDING ? '▲' : '▼'}
        </div>
      </Button>
      <Button
        variant="outline-primary"
        onClick={() => handleSort(SORT_CRITERIA.RATING)}
        className={`mx-2 ${sortCriteria === SORT_CRITERIA.RATING ? 'active' : ''}`}
      >
        <div style={{ color: 'white' }}>
          Sort by rating{' '}
          {sortCriteria === SORT_CRITERIA.RATING && sortOrder === SORT_ORDER.ASCENDING ? '▲' : '▼'}
        </div>
      </Button>
    </>
  );
};

AnimeSortOptions.propTypes = {
  sortCriteria: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired
};

export default AnimeSortOptions;
