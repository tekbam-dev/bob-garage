// src/components/layouts/LeftContentRightImage.jsx

import React from "react";
import PropTypes from "prop-types";
import "./lirc.css";

const LeftImageRightContent = ({ blog }) => {
  const { blog_description, blog_thumbnail, blog_title, createdAt } = blog;

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString(); // Outputs date in local format (e.g., "11/24/2024" in MM/DD/YYYY)

  return (
    <section className="left-content-right-image ">
      <div className="image-content">
        <img src={blog_thumbnail} alt={`${blog_title} image`} />
      </div>

      <div className="text-content">
        <h2>{blog_title}</h2>
        <p>{blog_description}</p>
        <strong>{`Created: ${formattedDate}`}</strong>
      </div>
    </section>
  );
};

LeftImageRightContent.propTypes = {
  blog: PropTypes.object.isRequired,
  // blog_description: PropTypes.string.isRequired,
  // blog_thumbnail: PropTypes.string.isRequired,
};

export default LeftImageRightContent;
