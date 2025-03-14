import React from "react";
import styled from "styled-components";
import "./teamcard.css";

const TeamCard = ({ name, role, image, description }) => {
  return (
    <div className="team-member-card">
      {/* Image at the top */}
      <img src={image} alt={name} className="team-member-image" />

      {/* Name */}
      <h2 className="team-member-name">{name}</h2>

      {/* Designation */}
      <p className="team-member-designation">{role}</p>

      {/* Short description */}
      <p className="team-member-description">{description}</p>
    </div>
  );
};

export default TeamCard;


