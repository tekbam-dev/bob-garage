
/**
 * @author Tek Bam
 * @description client\src\pages\admin-pages\Dashboard.jsx
 *  Importing all the component required for the dashboard 
 * Have sidebar and main content which build complete dashboard 
 * Sidebar for Menu and Main content is for editing purpose
 * Main content change to the relevent component based on the sidebar route
 * @version 11.0.0
 */


import React, { useState, useEffect } from "react";
import "../../index.css";
import "./sidebar.css";

import UpdateOptions from "../../features/options/components/UpdateOptions.jsx";

import AllBlogs from "../../features/blog/components/AllBlogs.jsx";

import AddBlog from "../../features/blog/components/AddBlog.jsx";

import EditBlog from "../../features/blog/components/EditBlog.jsx";

import DeleteBlog from "../../features/blog/components/DeleteBlog.jsx";

import AllSocial from "../../features/social/components/AllSocial.jsx";

import AllUsers from "../../features/user/components/AllUsers.jsx";
import EditUser from "../../features/user/components/EditUser.jsx";
import DeleteUser from "../../features/user/components/DeleteUser.jsx";
import AddUser from "../../features/user/components/AddUser.jsx";

import AllService from "../../features/service/components/AllService.jsx";

import EditService from "../../features/service/components/EditService.jsx";

import DeleteService from "../../features/service/components/DeleteService.jsx";

import AllFeedback from "../../features/feeback/components/AllFeedback.jsx";

import AddService from "../../features/service/components/AddService.jsx";

import DeleteFeedback from "../../features/feeback/components/DeleteFeedback.jsx";

const Dashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <MainContent />
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <details>
          <summary>
            <a href="#user">User</a>
          </summary>
          {/* <li><a href="#add-user">Add User</a></li> */}
        </details>

        <details>
          <summary>
            <a href="#service">Service</a>
          </summary>

          <li>
            <a href="#add-service">Add Service</a>
          </li>
        </details>

        <details>
          <summary>
            <a href="#blog">Blog</a>
          </summary>

          <li>
            <a href="#add-blog">Add Blog</a>
          </li>
        </details>

        <details>
          <summary>
            <a href="#feedback">Feedback</a>
          </summary>
        </details>

        {/* <details>
    <summary><a href="#social">Social</a></summary>
 
    <li><a href="#add-social">Add Social</a></li>
   
  </details> */}

        <details>
          <summary>
            <a href="#option">Option</a>
          </summary>

          <li>
            <a href="#edit-option">Edit Option</a>
          </li>
        </details>
      </ul>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  const [activeComponent, setActiveComponent] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveComponent(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  let content = [];
  let heading;
  let subHeading;

  switch (true) {
    case activeComponent === "#service":
      heading = "Service";
      subHeading = "You can Add, Update and Delete Service from here";
      content = <AllService page="admin" />;
      break;

    case activeComponent.includes("edit-service"):
      heading = "Edit Service";
      subHeading = "You can Update user here";
      content = (
        <div>
          <EditService />
        </div>
      );
      break;

    case activeComponent.includes("delete-service"):
      heading = "Delete Service";
      subHeading = "Need to update to service right now it is deleting user";
      content = (
        <div>
          <DeleteService />
        </div>
      );
      break;

    case activeComponent.includes("#add-service"):
      heading = "Add Service";
      subHeading = "Add new service to the page";
      content = (
        <div>
          <AddService />
        </div>
      );
      break;

    case activeComponent === "#blog":
      heading = "Blog";
      subHeading = "You can Add, Update and Delete Blog from here";
      content = <AllBlogs page="admin" />;
      break;

    case activeComponent.includes("add-blog"):
      heading = "Blog";
      subHeading = "You can Add, Update and Delete Blog from here";
      content = <AddBlog page="admin" />;
      break;

    case activeComponent.includes("#edit-blog"):
      heading = "Edit Blog";
      subHeading = "You can Edit Blog here";
      content = <EditBlog page="admin" />;
      break;

    case activeComponent.includes("#delete-blog"):
      heading = "Delete Blog";
      subHeading = "You can Delete Blog here";
      content = <DeleteBlog page="admin" />;
      break;

    case activeComponent === "#feedback":
      heading = "Feedback";
      subHeading = "You can Delete Feedback from here";
      content = (
        <div>
          <AllFeedback page="admin" />
        </div>
      );
      break;

    case activeComponent.includes("#delete-feedback"):
      heading = "Feedback";
      subHeading = "You can Delete Feedback from here";
      content = (
        <div>
          <DeleteFeedback />
        </div>
      );
      break;

    //   case activeComponent === '#feedback':
    // heading = "Feedback";
    // subHeading = "You can Delete Feedback from here";
    // content = <div><AllFeedback /></div>;
    // break;

    // case activeComponent === '#feedback':
    // heading = "Feedback";
    // subHeading = "You can Delete Feedback from here";
    // content = <div><AllFeedback /></div>;
    // break;

    case activeComponent === "#option":
      heading = "Options";
      subHeading = "You can Update banner image, layout, logo etc from here";
      content = (
        <div>
          <UpdateOptions />
        </div>
      );
      break;

    case activeComponent === "#social":
      heading = "Socials";
      subHeading = "You can Update Social";
      content = (
        <div>
          <AllSocial page="admin" />
        </div>
      );
      break;

    case activeComponent === "#user":
      heading = "All Users";
      subHeading = "You can Edit and Delete user here";
      content = (
        <div>
          <AllUsers />
        </div>
      );
      break;

    case activeComponent.includes("edit-user"):
      heading = "Edit User";
      subHeading = "You can Update user here";
      content = (
        <div>
          <EditUser />
        </div>
      );
      break;

    case activeComponent.includes("delete-user"):
      heading = "Delete User";
      subHeading = "You can delete user here";
      content = (
        <div>
          <DeleteUser />
        </div>
      );
      break;

    case activeComponent.includes("#add-user"):
      heading = "Add User";
      subHeading = "You can add new user here";
      content = (
        <div>
          <AddUser />
        </div>
      );
      break;

    default:
      heading = "Admin Edit Ares";
      subHeading =
        "You can Create , Delete , Update differnt section of the site using ";
      content = <div>Default Content</div>;
      break;
  }

  return (
    <div
      className="main-content"
      style={{ margin: "0px 5px", backgroundColor: "whitesmoke" }}
    >
      <h5>{heading}</h5>
      <h6>{subHeading}</h6>
      <div className="content" style={{ margin: "50px 0px" }}>
        {content}
      </div>
    </div>
  );
};

export default Dashboard;
