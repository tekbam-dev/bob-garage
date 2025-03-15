/**
 * @author Tek Bam
 * @description client/src/features/blog/blogSlice.js
 * Handle Request related to blog based on user interaction 
 * 
 * 
 * @version 6.0.0
 */



import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import axios from 'axios';

//Base URLS for blog backend request 
const blogsURL = `${apiUrl}/api/blogs`;
const blogURL = `${apiUrl}/api/blog`;

// Initial state
const initialState = {
    blogList: [],
    blog: {},
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
    message: null,
};

// Thunks for async actions

// Fetch All Blogs
export const fetchBlogList = createAsyncThunk('blog/fetchBlogList', async (sort) => {
    
    try {
        const response = await axios.get(`${blogsURL}?sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

// Fetch Blog by ID
export const fetchBlogById = createAsyncThunk('blog/fetchBlogById', async (id) => {
    try {
        const response = await axios.get(`${blogURL}/${id}`);
        return response.data.blog;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

// Create New Blog
export const createBlog = createAsyncThunk('blog/createBlog', async (newBlog) => {
    try {
        const response = await axios.post(`${blogURL}/add`, newBlog);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

// Update Blog
export const updateBlog = createAsyncThunk('blog/updateBlog', async({ id, updatedBlog }) => {

  

    try {
        const response = await axios.put(`${blogURL}/edit/${id}`, updatedBlog);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

// Delete Blog
export const deleteBlog = createAsyncThunk('blog/deleteBlog', async(id) => {
   
    try {
        const response = await axios.delete(`${blogURL}/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
});

// Blog slice
const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all blogs
            .addCase(fetchBlogList.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogList = action.payload;
            })
            .addCase(fetchBlogList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Fetch blog by ID
            .addCase(fetchBlogById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blog = action.payload;
            })
            .addCase(fetchBlogById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Create new blog
            .addCase(createBlog.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogList.push(action.payload);
            })
            .addCase(createBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Update blog
            .addCase(updateBlog.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.blogList.findIndex(blog => blog.blog_id === action.payload.blog_id);
                if (index >= 0) {
                    state.blogList[index] = action.payload;
                }
            })
            .addCase(updateBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            // Delete blog
            .addCase(deleteBlog.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteBlog.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogList = state.blogList.filter(blog => blog.blog_id !== action.payload.blog_id);
            })
            .addCase(deleteBlog.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

// Selectors to export state values
export const getAllBlogs = (state) => state.blog.blogList;
export const getBlogById = (id) => state => state.blog.blogList.find(blog => blog.blog_id === id);
export const getBlogStatus = (state) => state.blog.status;
export const getBlogError = (state) => state.blog.error;

// Export the reducer
export default blogSlice.reducer;
