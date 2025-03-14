/**
 * @author Tek Bam
 * @description Toggle component to handle theme change
 * state stored in local storage to handle it while rerendering
 *
 * @version 2.0.0
 */

import React, { useEffect, useState } from "react";

const ToggleButton = ({ currentUser }) => {
  const [isToggled, setIsToggled] = useState(false);
  const [currentToggleState, setCurrentToggleState] = useState(null);

  // Retrieve initial toggle state from localStorage or use currentUser's setting
  useEffect(() => {
    const initialToggle = localStorage.getItem("current-toggle-state");
    const userState = currentUser.user_ismode_dark; // User's dark mode preference

    // Set initial toggle state from localStorage if it exists, otherwise from user state
    if (initialToggle !== null && initialToggle !== "undefined" && initialToggle !== '') {
      setIsToggled(JSON.parse(initialToggle));
      setCurrentToggleState(JSON.parse(initialToggle));
    } else {
      setIsToggled(userState);
      setCurrentToggleState(userState);
      localStorage.setItem("current-toggle-state", JSON.stringify(userState));
    }
  }, [currentUser.user_ismode_dark]);

  // Save current toggle state to localStorage when it changes
  useEffect(() => {
    if (currentToggleState !== null) {
      localStorage.setItem(
        "current-toggle-state",
        JSON.stringify(currentToggleState)
      );
    }
  }, [currentToggleState]);

  // Toggle button handler
  const toggleButton = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    setCurrentToggleState(newState); // Update state and store in localStorage

    if (currentToggleState) {
      setLightTheme();
    }
    if (!currentToggleState) {
      setDarkTheme();
    }
  };

  const setDarkTheme = () => {
    document.body.setAttribute("data-theme", "dark-theme");
  };

  const setLightTheme = () => {
    document.body.setAttribute("data-theme", "light-theme");
  };

  return (
    <div
      onClick={toggleButton}
      style={{
        width: "50px",
        height: "20px",
        borderRadius: "25px",
        backgroundColor: isToggled ? "green" : "blue",
        display: "flex",
        alignItems: "center",
        justifyContent: isToggled ? "flex-end" : "flex-start",
        padding: "0px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, justify-content 0.3s ease",
      }}
    >
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default ToggleButton;
