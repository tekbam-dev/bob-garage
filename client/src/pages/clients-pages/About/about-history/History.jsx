// src/components/sections/History.jsx

import React from 'react';
import {LeftContentRightImage} from '../../../../template-parts/clients/index.js';
import './history.css';

const History = ({ content }) => {
  return (
    <div className="history-container" style= {{whiteSpace:'pre-line'}}>
    <LeftContentRightImage
      title="Our History"
      text={content.text}
      imageUrl={content.imageUrl}
    />
    </div>
  );
};

export default History;
