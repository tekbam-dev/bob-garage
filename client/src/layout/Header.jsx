import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { getIsAdmin, getIsAuth, getAuthUser } from "../features/auth/authSlicer";
import UserBadgeMenu from "./UserBadgeMenu";
// Import Bootstrap CSS in your main JS or App.js file
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS for components like navbar toggler
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const Header = (props) => {
  const { branding } = props;
  const isAuthUser = useSelector(getAuthUser);
  const isAdmin = useSelector(getIsAdmin);
  const isAuth = useSelector(getIsAuth);


  // Function to close the navbar on menu item click
  const closeNavbar = () => {
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }
  };

  // Create user badge
  const userBadge = (
    <Fragment key={"2"}>
      <li className="nav-item user-badge">
        <UserBadgeMenu isAdmin={isAdmin} isAuth={isAuth} currentUser={isAuthUser} closeNavbar={closeNavbar} />
      </li>
    </Fragment>
  );

  // Create login/register links
  const loginLinks = (
    <Fragment key={"3"}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <li className="nav-item signup">
          <Link className="nav-link" aria-disabled="true" to="/login">
            Sign in
          </Link>
        </li>
        <li className="nav-item login">
          <Link className="nav-link" aria-disabled="true" to="/signup">
            Register
          </Link>
        </li>
      </div>
    </Fragment>
  );

  

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-fluid">
          <div className="logo">
            <img src={branding} alt="logo" />
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto" style={{alignItems:"flex-end",marginRight:"30px"}}>
              <li className="nav-item">
                <Link className="nav-link" to="/about" onClick={closeNavbar}>
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/services" onClick={closeNavbar}>
                  Service
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/feedback" onClick={closeNavbar}>
                Feedback
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/staff" onClick={closeNavbar}>
                  Team
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/contact" onClick={closeNavbar}>
                  Contact
                </Link>
              </li>

              {/* When user is authenticated */}
              <li className="nav-item" >
                {isAuth ? userBadge : loginLinks}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
