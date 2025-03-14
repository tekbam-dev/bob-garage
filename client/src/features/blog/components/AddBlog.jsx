/**
 * @author Tek Bam
 * @description Add Blog feature component to handle blog submission
 * @version 3.0.0
 */

import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../blogSlice";

const AddBlog = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    blog_title: "",
    blog_description: "",
    blog_thumbnail: "",
  });

  //Handling on change event

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //Handle submit event
  /**
   * Handle form onchange and submit
   * Create payload for blog
   * dispatch createBlog async function from blogSlice.js
   *
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const { blog_title, blog_description, blog_thumbnail } = formData;

    const newBlog = {
      blog_title: blog_title,
      blog_description: blog_description,
      blog_thumbnail: blog_thumbnail,
    };
    dispatch(createBlog(newBlog));
    window.location.href ="/dashboard#blog";
  };

  return (
    <Fragment>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          {/* Blog Title */}
          <div>
            <label htmlFor="blog_title">Blog Title</label>
            <input
              type="text"
              id="blog_title"
              name="blog_title"
              value={formData.blog_title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Blog Description */}
          <div>
            <label htmlFor="blog_description">Blog Description</label>
            <textarea
              id="blog_description"
              name="blog_description"
              value={formData.blog_description}
              onChange={handleChange}
              placeholder="Enter blog description"
              required
            ></textarea>
          </div>

          {/* Blog Thumbnail */}
          <div>
            <label htmlFor="blog_thumbnail">Blog Thumbnail URL</label>
            <input
              type="text"
              id="blog_thumbnail"
              name="blog_thumbnail"
              value={formData.blog_thumbnail}
              onChange={handleChange}
              placeholder="Enter thumbnail URL"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit">Submit Blog</button>
        </form>
      </div>
    </Fragment>
  );
};

export default AddBlog;
