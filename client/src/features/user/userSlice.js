/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\user\userSlice.js
 * User slicer to make axios request ,provide action and state to store
 * Form and event handler
 * @version 10.0.0
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Base user urls
const baseUsersURL = `${apiUrl}/api/users`;

const baseUserURL = `${apiUrl}/api/user`;
/**
 * Creating initial state
 */

const initialState = {
  userList: [], // to store user object in array
  singleUserObj: {}, // Single user is object tive
  status: "idle",
  error: null,
  message: null,
};

//Creating Action for the user slicer to handle all the required function

//Get all user ()
export const fetchUserList = createAsyncThunk(
  "user/fetchUserList",
  async () => {
    try {
      const user = await axios.get(baseUsersURL);
      //   console.log(user.data);
      return user.data;
    } catch (error) {
      throw error.message;
    }
  }
);

//Add New User
export const addNewUser = createAsyncThunk(
  "user/addNewUser",
  async (newUserData) => {
   
    try {
      const response = await axios.post(`${baseUserURL}/add`, newUserData);

      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
);

// Delete User

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  if (id.userIdStateNum == id.user_id) {
    alert("Deleting own account not allowed ");
    return;
  }
  try {
    const deletedUser = await axios.delete(
      `${baseUserURL}/delete/${id.userIdStateNum}`
    );
 
    return deletedUser.data;
  } catch (error) {
    return id;
  }
});

// Update user

export const updateUser = createAsyncThunk("user/updateUser", async (user) => {

  // console.log(user);
  try {
    
    const userRequiredUpdate = await axios.put(
      `${baseUserURL}/edit/${user.userIdStateNum}`,
      user.users
    );

    return userRequiredUpdate.data;
  } catch (error) {
    console.log(error);
    throw error.message;
  }
});

// Get sing user

export const singleUser = createAsyncThunk("user/singleUser", async (id) => {

  try {
    const singleUserReturn = await axios.get(`${baseUserURL}/${id.userIdStateNum}`);

    // console.log(singleUserReturn);
    return singleUserReturn.data;
  } catch (error) {
    throw error.message;
  }
});

// Creating user slider

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state, action) => {
        state.status = "loading";
        state.message = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = null;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.error.message;
        state.error = action.error.message;
      })
      .addCase(addNewUser.pending, (state, action) => {
        (state.status = "loading"), (state.message = "loading");
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.message = null;
        state.userList.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (!action.payload) {
          console.log("Upload could not complete ");
          state.message = "Update could not complete";
          return;
        }

        state.message = null;
        state.status = "succeeded";
        const list = state.userList.map((user) => {
          user.user_id === action.payload.user_id
            ? (user = action.payload)
            : user;
        });

        state.user = action.payload;
        // state.userList = list;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (!action.payload.id) {
          state.message = "Delete could not complete";
          return;
        }

        state.message = null;
        state.status = "succeeded";

        const { user_id } = action.payload;

        const list = state.userList.filter((user) => user.user_id !== user_id);

        state.userList = list;
      })
      .addCase(singleUser.pending, (state, action) => {
        state.status = "loading";
        state.message = "loading";
      })
      .addCase(singleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = null;

        //  state.userList = action.payload;
        // state.user = action.payload;
        // state.status = "completed";
      });
  },
});
// Create selector

export const getAllUsers = (state) => {
  // console.log(state);
  // state.then((data) => { console.log(data)})

  return state.user.userList;
};
export const getUserStatus = (state) => state.user.status;
export const getUserError = (state) => state.user.error;
export const getSingleUser = (id) => (state) =>
  state.user.userList.find((data) => data.user_id == id);

//  return state.user.singleUserObj;

export default userSlice.reducer;
