// src/components/About.jsx

import React from 'react';
import './about.css'

import History from './about-history/History';
import Achievements from './about-achivement/Achivement';
import MissionVision from './about-mission/MissonVision';
import { BannerSection } from '../../../template-parts/clients/index.js';

const About = () => {

  // About page Element to provide hitory achivement and mission content 

    const historyContent = {
    text: "Bob's Garage has a storied history that mirrors the evolution of the automotive industry itself. Founded decades ago by Bob, a passionate car enthusiast with a knack for fixing anything on wheels, the garage began as a modest workshop tucked away in a quiet corner of town. It quickly became a gathering place for locals who admired Bob’s dedication to quality service and his unyielding honesty. Over time, the garage grew, both in size and reputation, becoming synonymous with reliability and community spirit.What sets Bobs Garage apart is its deep-rooted commitment to innovation while preserving its rich legacy.\n\n                                                                      From repairing vintage classics to embracing cutting-edge technologies for electric vehicles, the garage has always been ahead of its time. Generations of skilled technicians have honed their craft here, inspired by Bob’s original vision of treating every vehicle—and every customer—as unique. It’s not just about fixing cars; it’s about creating a trusted bond that keeps customers coming back, year after year.Today, Bobs Garage stands as a testament to hard work, resilience, and the unbreakable bond between a business and its community. \nIt remains a family-run operation, with Bob’s values firmly at its core. Whether you're a long-time customer or visiting for the first time, stepping into Bob's Garage feels like reconnecting with an old friend—one who ensures you leave the driveway safe, satisfied, and ready for the road ahead.",
    imageUrl: "https://img.freepik.com/free-photo/car-being-taking-care-workshop_23-2149580532.jpg?t=st=1731751183~exp=1731754783~hmac=9915eced58c15f1447901648361057a184441acacec68d1b00ac6507025774e0&w=1380"
  };

  const achievementsContent  = [
    { icon: '🏆', title: 'Best Business Award', description: 'Awarded for excellence in business practices and innovation.' },
    { icon: '🌟', title: 'Customer Excellence', description: 'Recognized for outstanding customer service and satisfaction.' },
    { icon: '🚀', title: 'Innovation Leader', description: 'Honored for our role in advancing technology and innovation.' },
   ] ;

  const missionVisionContent = {
    mission: "To innovate and deliver outstanding services that drive customer success.",
    vision: "To be a global leader known for excellence in our field and commitment to sustainability.",
    coreValues: [
      "Integrity and Trust",
      "Customer-Centric Approach",
      "Innovation and Excellence",
      "Social Responsibility",
      "Teamwork and Collaboration"
    ]
  };

  return (
    <>
    <BannerSection />
    <div className="about-container">
    
      <History content={historyContent} />
      <Achievements content={achievementsContent} />
      <MissionVision content={missionVisionContent} />
    </div>
    </>
  );
};

export default About;
