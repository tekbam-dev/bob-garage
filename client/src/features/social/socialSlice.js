import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// Social URLs
const socialListURL = `${apiUrl}/api/socials`;
const socialURL = `${apiUrl}/api/social`;

// Initial state
const initialState = {
  socialList: [],

  status: "idle",
  message: null,
  error: null,
};

// Async Thunks
// export const fetchSocialList = createAsyncThunk(
//   'Social/fetchSocialList',
//   async () => {
//     try {
//       const response = await axios.get(socialListURL);
      
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

// export const addSocial = createAsyncThunk(
//   'Social/addSocial',
//   async (newSocial, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${socialURL}/add`, newSocial);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const updateSocial = createAsyncThunk(
//   'Social/updateSocial',
//   async ({ social, id }, { rejectWithValue }) => {
//     try {
//       const response = await axios.put(`${socialURL}/edit/${id}`, social);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// export const deleteSocial = createAsyncThunk(
//   'Social/delete',
//   async (id, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${socialListURL}/${id}`);
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Create the slice
const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
//   extraReducers: (builder) => {
//     // Fetch all socialList
//     builder
//       .addCase(fetchSocialList.pending, (state) => {
       
//         state.status = "loading";
//       })
//       .addCase(fetchSocialList.fulfilled, (state, action) => {
       
//         state.status = "succeeded";
//         state.socialList = action.payload;
//       })
//       .addCase(fetchSocialList.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Add social link
//       .addCase(addSocial.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(addSocial.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.socialList.push(action.payload);
//       })
//       .addCase(addSocial.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Update social link
//       .addCase(updateSocial.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(updateSocial.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         const index = state.socialList.findIndex((link) => link.id === action.payload.id);
//         if (index !== -1) {
//           state.socialList[index] = action.payload;
//         }
//       })
//       .addCase(updateSocial.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // Delete social link
//       .addCase(deleteSocial.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(deleteSocial.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.socialList = state.socialList.filter((link) => link.id !== action.payload);
//       })
//       .addCase(deleteSocial.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
});

// // Selectors
// export const getAllSocials = (state) => state.social.socialList;
// export const getSelectLoading = (state) => state.social.status === "loading";
// export const getSelectError = (state) => state.social.error;

export default socialSlice.reducer;
