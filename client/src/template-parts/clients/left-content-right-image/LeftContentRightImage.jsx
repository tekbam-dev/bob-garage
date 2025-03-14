// src/components/layouts/LeftContentRightImage.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './lcri.css';

const LeftContentRightImage = ({ title, text, imageUrl }) => {
  return (
    <section  style={{ display: "flex", padding: "", gap: "50px",justifyContent: "space-around",width:'100%'}}>
      <div className="text-content" style={{ flex: 1 ,paddingTop: "30px"}}>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="image-content" style={{ flex: 1 }}>
        <img src={imageUrl} alt={`${title} image`} style={{ width: "100%", borderRadius: "8px" }} />
      </div>
    </section>
  );
};

LeftContentRightImage.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default LeftContentRightImage;
