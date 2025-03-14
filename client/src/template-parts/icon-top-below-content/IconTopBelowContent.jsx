// src/components/cards/IconCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import './icontopbelowcontent.css';

const IconTopBelowContent = ({ icon, title, description }) => {

 
  return (
    <div className="icon-card" >
      <div style={{height: "30%",fontSize:"xxx-large"}}>
       
        {icon}
      </div>
      <h3 >{title}</h3>
      <p >{description}</p>
    </div>
  );
};

IconTopBelowContent.propTypes = {
  icon: PropTypes.string.isRequired,       // URL or path to the icon image
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};





export default IconTopBelowContent;
