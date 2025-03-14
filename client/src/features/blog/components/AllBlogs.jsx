/**
 * @author Tek Bam
 * @description All Blog feature component to handle get request for all blog and send the value to different prop
 * based on the page calling this component
 * @version 4.0.0
 */

import React from "react";
import { useSelector } from "react-redux";
// import { BlogCard } from '../../../template-parts/admins/index.js';  // Assuming BlogCard is exported similarly to ServiceCard
import {
  
  getAllBlogs,
  getBlogStatus,
  getBlogError,
} from "../blogSlice.js";
import DashboardItemsList from "../../../template-parts/admins/dashboard-items-list/DashboardItemsList.jsx";
import LeftImageRightContent from "../../../template-parts/clients/left-image-right-content/LeftImageRightContent.jsx";


const AllBlogs = ({ page }) => {
  let content;
  console.log(page);

  const blogList = useSelector(getAllBlogs);
  const blogStatus = useSelector(getBlogStatus);
  const blogError = useSelector(getBlogError);

  if (blogStatus === "loading") {
    content = <p>Loading...</p>;
    // If client page calling the Allblogs
  } else if (blogStatus === "succeeded" && page == "client") {
    content = blogList.map((blog) => {
      return <LeftImageRightContent key={blog.blog_id} blog={blog} />;
    });
    // If client page calling the Allblogs
  } else if (blogStatus === "succeeded" && page == "admin") {
    content = blogList.map((blog) => (
      <DashboardItemsList key={blog.blog_id} data={blog} callerpage="blog" />
    ));
  } else if (blogStatus === "failed") {
    content = <p>{blogError}</p>;
  }

  return content;
};

export default AllBlogs;
