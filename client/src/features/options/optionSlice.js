/**
 * @author Tek Bam
 * @description optionSlicer to hanlde the fetch and update options
 * @version 4.0.0
 */


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;

// Create a variable to store our base URL for requests
const optionsURL = `${apiUrl}/api/options`;
const optionURL =  `${apiUrl}/api/option`;

// Async thunk for fetching all options data
export const fetchAllOptions = createAsyncThunk('option/fetchAllOptions', async() => {
  const response = await axios.get(optionsURL); // Replace with your API endpoint
 
  return response.data[0];
});

// Async thunk for updating options data
export const updateOptionsAsync = createAsyncThunk(
  'option/updateOptionsAsync',
  async(updatedOptions) => {

    console.dir(updatedOptions);
    const response = await axios.put(`${optionURL}/edit`, updatedOptions); // Replace with your API endpoint
  
    return response.data; // Return updated data from server
  }
);

const initialState = {
  allOptions: [], // Store all options here
  status: 'idle', // Track loading state
  error: null, // Track any error from async actions
};

const optionsSlice = createSlice({
  name: 'option',
  initialState,
  reducers: {}, // No regular reducers, just handle async in extraReducers
  extraReducers: (builder) => {
    builder
      // Handle fetchAllOptions
      .addCase(fetchAllOptions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOptions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allOptions = action.payload; // Store the fetched options
      })
      .addCase(fetchAllOptions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Handle updateOptionsAsync
      .addCase(updateOptionsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOptionsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allOptions = action.payload; // Update options after update
      })
      .addCase(updateOptionsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Selector to get all options
export const getAllOptions = (state) => state.option.allOptions;
export const getOptionsStatus = state => state.option.status
export const getOptionsError = state => state.option.error;

// Option Reducer
export default optionsSlice.reducer;
