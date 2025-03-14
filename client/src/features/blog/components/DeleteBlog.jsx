/**
 * @author Tek Bam
 * @description Delete Blog feature component to handle Delete request for all blog and send the value to different prop
 * based on the page calling this component
 * @version 4.0.0
 */

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, fetchBlogList, getBlogById } from "../blogSlice";

import { useNavigate } from "react-router-dom";

const DeleteBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogId = window.location.hash.split("/").pop();

  const [blogIdState, setBlogIdState] = useState(blogId);

  let blogIdStateNum = parseInt(blogIdState);

  if (blogId !== blogIdState && Number.isInteger(blogIdStateNum)) {
    setBlogIdState(blogId);
  }
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refreshBlogSection, setRefreshBlogSection] = useState(false);

  const blogReturn = useSelector(getBlogById(blogIdStateNum));

  const handleDelete = () => {
    dispatch(deleteBlog(blogIdStateNum))
      .unwrap()
      .then((data) => {
        console.log(data);
        try {
          if (data) {
            dispatch(fetchBlogList());
          }
        } catch (error) {
          console.log(error);
        } finally {
          window.location.href = "/dashboard#blog";
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRefreshBlogSection((prev) => !prev); // Toggle the state to trigger re-render
    setConfirmDelete(false); // Reset confirmation state
  };

  const handleCancel = () => {
  window.location.href ="/dashboard#blog" ; // Redirect back to blogs list
  };

  return (
    <div className="delete-Blog">
      {blogReturn ? (
        <>
          <h4>{`Will delete record - ${blogReturn.blog_fn}   ${blogReturn.blog_ln}`}</h4>
          <p>Are you sure you want to delete this Blog?</p>

          <button onClick={handleDelete}>
            <a href="/dashboard#Blog">Yes, Delete</a>
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <h5>Data not found</h5>
      )}
    </div>
  );
};

export default DeleteBlog;
