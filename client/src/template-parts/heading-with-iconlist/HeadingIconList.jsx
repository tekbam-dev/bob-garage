// src/components/HeadingIconList.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './headingiconlist.css';
import { FaArrowRight } from 'react-icons/fa';


const HeadingIconList = ({ heading, list}) => {
  return (
    <div className="heading-icon-list">
      <h2 className="heading">{heading}</h2>
      <ul className="list">
        {list.map((item, index) => (
          <li key={index} className="list-item">
          <FaArrowRight />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

HeadingIconList.propTypes = {
  heading: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
 
};

export default HeadingIconList;
