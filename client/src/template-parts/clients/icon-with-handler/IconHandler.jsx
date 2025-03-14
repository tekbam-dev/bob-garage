import React from "react";

// SocialComponent to display a social icon and handle action
const IconHandler = (social) => {
  const { social_icon, social_handler } = social.data;
  return (
    <>
      <a href={social_handler} target="_blank">
        <img src={social_icon} alt="Social Icon" style={styles.icon} />
      </a>
    </>
  );
};

// Basic styles for the component
const styles = {
  icon: {
    width: "24px",
    height: "24px",
  },
  handler: {
    fontSize: "16px",
    color: "#333",
  },
};

export default IconHandler;
