//Importing react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import nobkgroundlogo from "./assets/images/logo-no-background.png";

// Import custom component
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { About } from "./pages/clients-pages/index.js";
// import Feedback from "./pages/clients-pages/feedback-page/Feedback.jsx";
import Feedback from "./pages/clients-pages/feedback-page/Feedback.jsx";
// import AddFeedback from "./features/feeback/components/AddFeedback.jsx";
// import EditFeedback from "./features/feeback/components/EditFeedback.jsx";
// import SingleFeedback from "./features/feeback/components/SingleFeedback.jsx";
import Home from "./pages/clients-pages/Home.jsx";
import { Staff } from "./pages/clients-pages/index.js";
import { Services } from "./pages/clients-pages/index.js";
import AddService from "./features/service/components/AddService.jsx";
import { SingleService } from "./pages/clients-pages/index.js";
import { ServiceAdmin } from "./template-parts/admins/index.js";

import EditService from "./features/service/components/EditService.jsx";
// import Login from "./login/Login";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { Blog } from "./pages/clients-pages/index.js";
// import Product from "./pages/clients-pages/product-page/Product.jsx";
import Contact from "./pages/clients-pages/contact/Contact.jsx";

import NotFound from "./pages/clients-pages/pagenotfound-page/NotFound.jsx";

import FAQ from "./pages/clients-pages/faq-page/FAQ.jsx";

import NonAuthorised from "./pages/clients-pages/not-authorised/NotAuthorised.jsx";

import TermsAndConditions from "./pages/clients-pages/terms-and-condition/Terms-Conditoin.jsx";

// Importing admin pages
import Dashboard from "./pages/admin-pages/Dashboard.jsx";
//Importing Feedback Provider
//This allows our app to subscribe to state changes.

import {
  getAuthUser,
  getIsAdmin,
  getIsAuth,
} from "./features/auth/authSlicer.js";
import { useEffect, useState } from "react";
import ScrollToTop from "./utils/ScrollTop.jsx";

import { useSelector } from "react-redux";
import { Spin } from "@holmesdev/ponder-spinners";

function App() {
  // Router need to wrap the applicatation for it to work

  const [isLoading, setIsLoading] = useState(true);

  const isAdmin = useSelector(getIsAdmin);
  const isAuth = useSelector(getIsAuth);
  const currentUser = useSelector(getAuthUser);
  const localStorageMode = localStorage.getItem("current-toggle-state");

  useEffect(() => {
    if (isAuth !== "") {
      setIsLoading(false);
    }
  }, [isAdmin, isAuth]);

  const setDarkTheme = () => {
    document.body.setAttribute("data-theme", "dark-theme");
  };

  const setLightTheme = () => {
    document.body.setAttribute("data-theme", "light-theme");
  };

  if (localStorageMode !== null) {
    if (localStorageMode == "true") {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  } else {
    if (currentUser !== null || currentUser?.user_ismode_dark !== undefined) {
      if (currentUser.user_ismode_dark) {
        setDarkTheme();
      } else {
        setLightTheme();
      }
    }
  }

  return (
    <Router>
      <Header branding={nobkgroundlogo} />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/services" element={<Services />} />
        <Route path="/addservice" element={<AddService />} />
        <Route path="/service/:id" element={<SingleService />} />

        <Route path="/editservice/:id" element={<EditService />} />

        <Route path="/admin/service" element={<ServiceAdmin />} />

        <Route path="/terms" element={<TermsAndConditions />} />

        <Route path="/feedback" element={<Feedback isAuth={isAuth} />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/noauth" element={<NonAuthorised />} />

        <Route path="*" element={<NotFound />} />

        {/* {protective route } */}

        <Route
          path="/dashboard"
          element={
            isLoading ? (
              <Spin
                color1="#FF6F61"
                color2="#ffa9a1"
                opacity1={0.5}
                opacity2={1}
                speed="1s"
                direction="360deg"
                size={200}
              />
            ) : isAdmin && isAuth ? (
              <Dashboard />
            ) : (
              <NonAuthorised />
            )
          }
        />

        {/* {(isAdmin && isAuth.user) ? <Route path="/dashboard" element= {<Dashboard />} /> : <Route path="/nonauth" element= {<NonAuthorised />} /> } */}
      </Routes>

      <Footer branding={nobkgroundlogo} />
    </Router>
  );
}

export default App;
