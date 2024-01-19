import { useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './HorizontalBar.css';

const HorizontalBar = ({ activeItem, onItemClick, elems }) => {
  const scroll = (val) => {
    document.getElementById('containerBar').scrollLeft += val;
  };

  useEffect(() => {
    elems.forEach((elem, index) => {
      const element = document.getElementById(`li${index}`);
      const texte = element.innerText;
      const longueur = texte.length;
      element.style.minWidth = longueur + 'ch';
    });
  }, [elems]);

  return (
    <Navbar className="prevent-select my-3">
      <div
        className="d-lg-none me-2 d-flex align-items-center justify-content-center prevent-selection"
        onClick={() => {
          scroll(-150);
        }}
      >
        <div className="btnscroll d-flex align-items-center justify-content-center prevent-selection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
      </div>
      <Container id="containerBar" className="horizontalBar p-1">
        <ul className="navbar-nav">
          {elems.map((elem, index) => (
            <li
              id={`li${index}`}
              key={index}
              style={{ minWidth: '150px' }}
              className={`nav-item align-self-center ${activeItem === elem ? 'active' : ''}`}
            >
              <a className="nav-link-dashboard" href="#" onClick={() => onItemClick(elem)}>
                {elem}
              </a>
            </li>
          ))}
        </ul>
      </Container>
      <div
        className="d-lg-none ms-2 d-flex align-items-center justify-content-center prevent-selection"
        onClick={() => {
          scroll(150);
        }}
      >
        <div className="btnscroll d-flex align-items-center justify-content-center prevent-selection">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
      </div>
    </Navbar>
  );
};

HorizontalBar.propTypes = {
  activeItem: PropTypes.string,
  onItemClick: PropTypes.func.isRequired,
  elems: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default HorizontalBar;
