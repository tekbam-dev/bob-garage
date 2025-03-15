/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\feeback\feedbackSlice.js
 *  slicer to handle all the axios request
 *  provide action and selector to get feedbacklist from server and component
 * @version 4.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

// Base URL
const feedsURL = `${apiUrl}/api/feedbacks`;
const feedURL = `${apiUrl}/api/feedback`;

// Initial state
const initialState = {
  feedbackList: [],
  feedback: {}, // fixed typo from 'feeback'
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
  message: null,
};


// Fetch All Feedback
export const fetchFeedbackList = createAsyncThunk(
  "feedback/fetchFeedback",
  async () => {
    try {
      const response = await axios.get(feedsURL);

      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Add Feedback
export const addFeedback = createAsyncThunk(
  "feedback/addFeedback",
  async (newFeedback) => {
 
    try {
      const response = await axios.post(`${feedURL}/add`, newFeedback);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Update Feedback
export const updateFeedback = createAsyncThunk(
  "feedback/updateFeedback",
  async (feedback) => {
    try {
      const response = await axios.put(
        `${feedURL}/edit/${feedback.feedId}`,
        feedback
      );
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Delete Feedback
export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (feedback) => {

    try {
      const response = await axios.delete(
        `${feedURL}/delete/${feedback.feedbackIdStateNum}`
      );
      if (response.status === 200) {
        return feedback.feedbackIdStateNum;
      }
      throw new Error(`${response.status} : ${response.statusText}`);
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Get Single Feedback
export const getSingleFeedback = createAsyncThunk(
  "feedback/getSingleFeedback",
  async (id) => {
    try {
      const response = await axios.get(`${feedURL}/${id}`);
      return response.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// Feedback slice
const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbackList.pending, (state) => {
        state.status = "loading";
        state.message = "loading";
      })
      .addCase(fetchFeedbackList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = null;
        state.feedbackList = action.payload;
      })
      .addCase(fetchFeedbackList.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
        state.error = action.error.message;
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.feedbackList = state.feedbackList.filter(
          (item) => item.id !== action.payload
        );
        state.message = "Feedback deleted successfully";
      });
  },
});

// Selectors
export const getAllFeedbacks = (state) => state.feedback.feedbackList;
export const getFeedback = (id) => (state) =>
  state.feedback.feedbackList.find((data) => data.feedback_id == id);
export const getFeedbackStatus = (state) => state.feedback.status;
export const getFeedbackError = (state) => state.feedback.error;
export const getFeedbackMessage = (state) => state.feedback.message;

// Export the reducer
export default feedbackSlice.reducer;
