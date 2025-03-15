//Creating reducer for service to handle all the action for service state
/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\service\serviceSlice.js
 * Service slicer to handle all the axios request and provide action and selector allow to call the dispatch and other data
 * Form and event handler
 * @version 8.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;
//Base URL's fro service
const baseServicesURL = `${apiUrl}/api/services`;

const baseServiceURL = `${apiUrl}/api/service`;
/**
 * Creating initial state
 */

const initialState = {
  serviceList: [], // to store service object in array
  singleServiceObj: {}, // Single service is object tive
  status: "idle",
  error: null,
  message: null,
};

//Creating Action for the service slicer to handle all the required function

//Get all service ()
export const fetchServiceList = createAsyncThunk(
  "service/fetchServiceList",
  async () => {
    try {
      const service = await axios.get(baseServicesURL);
      //   console.log(service.data);
      return service.data;
    } catch (error) {
      throw error.message;
    }
  }
);

//Add New Service
export const addNewService = createAsyncThunk(
  "service/addNewService",
  async (newService) => {
    try {
      const response = await axios.post(`${baseServiceURL}/add`, newService);

      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Delete Service

export const deleteService = createAsyncThunk(
  "service/deleteService",
  async (id) => {
 
    try {
      const response = await axios.delete(
        `${baseServiceURL}/delete/${id.serviceIdStateNum}`
      );

      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Update service

export const updateService = createAsyncThunk(
  "service/updateService",
  async (editService) => {
    try {
      const serviceRequiredUpdate = await axios.put(
        `${baseServiceURL}/edit/${editService.id}`,
        editService.services
      );

      return serviceRequiredUpdate.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Get sing service

export const singleService = createAsyncThunk(
  "service/singleService",
  async (id) => {
    try {
      const singleServiceReturn = await axios.get(`${baseServiceURL}/${id}`);

      // console.log(singleServiceReturn);
      return singleServiceReturn.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Creating service slider

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceList.pending, (state, action) => {
        state.status = "loading";
        state.message = "loading";
      })
      .addCase(fetchServiceList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = null;
        state.serviceList = action.payload;
      })
      .addCase(fetchServiceList.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
        state.error = action.error.message;
      })
      .addCase(addNewService.pending, (state, action) => {
        (state.status = "loading"), (state.message = "loading");
      })
      .addCase(addNewService.fulfilled, (state, action) => {
        state.service = action.payload;
        state.message = null;
        state.serviceList.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateService.fulfilled, (state, action) => {
        if (!action.payload) {
          // console.log("Upload could not complete ");
          state.message = "Update could not complete";
          return;
        }

        state.message = null;
        state.status = "succeeded";
        const list = state.serviceList.map((service) => {
          service.service_id === action.payload.service_id
            ? (service = action.payload)
            : service;
        });

        state.service = action.payload;
        // state.serviceList = list;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.message = "Delete could not complete";
          return;
        }

        state.message = null;
        state.status = "succeeded";

        const { service_id } = action.payload;

        const list = state.serviceList.filter(
          (service) => service.service_id !== service_id
        );

        state.serviceList = list;
      })
      .addCase(singleService.pending, (state, action) => {
        state.status = "loading";
        state.message = "loading";
      })
      .addCase(singleService.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = null;

        state.singleServiceObj = action.payload;
        // state.service = action.payload;
        // state.status = "completed";
      });
  },
});
// Create selector

export const getAllServices = (state) => {
  // console.log(state);
  // state.then((data) => { console.log(data)})

  return state.service.serviceList;
};
export const getServiceStatus = (state) => state.service.status;
export const getServiceError = (state) => state.service.error;
export const getSingleService = (id) => (state) =>
  state.service.serviceList.find((data) => data.service_id == id);

//  return state.service.singleServiceObj;

export default serviceSlice.reducer;
