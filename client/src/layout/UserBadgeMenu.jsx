import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ToggleButton from "../template-parts/clients/Toggle";

import { logout } from "../features/auth/authSlicer";

import bob from "../assets/images/bob.jpg";
import placeholder from "../assets/images/placeholder-profile.jpg";

const UserBadgeMenu = ({ isAdmin, isAuth, currentUser, closeNavbar }) => {
  isAdmin = currentUser.user_isadmin;

  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();

  // create a function to call the logout action.
  const leave = (e) => {
    console.log("Leave click... logging out");

    dispatch(logout());
    window.location.href = "/";
  };

  const image = currentUser.user_pp ? currentUser.user_pp : placeholder;
  return (
    <li
      className="nav-item user-badge"
      style={{ position: "relative", listStyle: "none" }}
    >
      
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
        onMouseEnter={() => setShowMenu(true)} // Show menu on hover
        onMouseLeave={() => setShowMenu(false)} // Hide menu when not hovering
      ></div>

      {/* Dropdown Menu */}
      {showMenu && (
        <ul
          style={{
            position: "absolute",
            top: "45px", // Position below the avatar
            left: "-50px",
            background: "#fff",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            padding: "10px",
            listStyle: "none",
            zIndex: 10,
            width: "max-content",
            display: "flex",
            flexDirection: "column",
          }}
          onMouseEnter={() => setShowMenu(true)} // Keep showing menu while hovering
          onMouseLeave={() => setShowMenu(false)} // Hide menu when leaving
        >
          {isAdmin && isAuth ? (
            <li
              style={{
                padding: "5px 10px",
                cursor: "pointer",
                display: "inline",
              }}
            >
              <Link to="/dashboard" onClick={closeNavbar}>
                Dashboard
              </Link>
            </li>
          ) : null}

          <li
            onClick={(e) => {
              leave(e);
            }}
            style={{
              padding: "5px 10px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "row",
              alignSelf: "baseline",
            }}
          >
            {logout} logout
          </li>

          <li style={{ padding: "5px 10px", cursor: "pointer" }}>
            <div>
              <p>Dark/Light</p>
              <ToggleButton currentUser={currentUser} onClick={closeNavbar} />
            </div>
          </li>
        </ul>
      )}
    </li>
  );
};

export default UserBadgeMenu;
