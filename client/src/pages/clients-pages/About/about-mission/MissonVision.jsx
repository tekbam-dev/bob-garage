// src/components/sections/MissionVision.jsx

import React from 'react';
import {HeadingIconList} from '../../../../template-parts/clients/index.js';
import './missionvision.css';
// Sample data for Mission, Vision, and Core Values
const mission = [
  'To deliver high-quality products that create value and make a difference.',
  'To exceed our customers’ expectations in all aspects of our business.',
];

const vision = [
  'To be a leader in our industry through innovation and integrity.',
  'To inspire a positive impact on the communities we serve.',
];

const coreValues = [
  'Integrity',
  'Excellence',
  'Innovation',
  'Customer Focus',
  'Teamwork',
];



const MissionVision = () => {
  return (
    <div className="mission-vision-container">
      <HeadingIconList heading="Mission" list={mission}  />
      <HeadingIconList heading="Vision" list={vision}  />
      <HeadingIconList heading="Core Values" list={coreValues} />
    </div>
  );
};

export default MissionVision;
