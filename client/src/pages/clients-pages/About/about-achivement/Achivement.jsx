// src/components/sections/Achievements.jsx

import React from 'react';
import {IconTopBelowContent} from '../../../../template-parts/clients/index.js';
import './achivement.css';

const Achievements = ({ content  }) => {
   const achievements = content;
    // console.log(content);
  return (
    <section className="achievements">
      {achievements.map((achievement, index) => (
        <IconTopBelowContent
          key={index}
          icon={achievement.icon}
          title={achievement.title}
          description={achievement.description}
        />
      ))}
    </section>
  );
};

export default Achievements;
