/**
 * @author Tek Bam
 * @description Auth slicer to handle all the auth relate axio request and populate redux store 
 * @version 2.0.0
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

// Create the baseURL for our auth requests.
const baseURL = 'http://localhost:3001/api/auth'

// Set up the initial state
const initialState = {
  user: {},
  token: localStorage.getItem('token'),
  isAdmin: false,
  isAuth: false,
  status: 'idle', // idle |  loading | succeeded | failed
  errors: null
}

// NOTE: endpoints:
// /api/auth/login
// /api/auth/register
// /api/auth

// Create the login async function.
export const login = createAsyncThunk('auth/login', async({ email, password},{rejectWithValue}) => {
  // log out the function call

  // Try catch
  try {
    const response = await axios.post(`${baseURL}/login`, ({email, password}));
    // log out the token we get back
   
    // check if we have a response first.
    if(response.data){
      // Check for error code of 401
      if(response.status === 401){
       
        return rejectWithValue(response.data.message);
      }

      // set the token into local storage.
      localStorage.setItem('token', response.data.token);
      // Call the util function to deal with the token.
      setAuthToken(localStorage.token);
      // then get the logged in users details.
      const res = await axios.get(`${baseURL}`);
      
      return res.data;
    }
  } catch (error) {
   
    console.log('Error logging in:', error.response?.status || 'Unknown error');
    return rejectWithValue(error.response ?. data ?. message || "Login Failed ");
  }
});

// Create loadUser function
export const loadUser = createAsyncThunk('auth/loaduser', async() => {
  try {
    const res = await axios.get(`${baseURL}`);

    
    return res.data;
  } catch (error) {
    return error;
  }
});

// Create register async function.
export const register = createAsyncThunk('auth/register', async(newUser) => {
  // log the function
 
  try {
    // endpoint http://localhost:3001/api/auth/register
    const response = await axios.post(`${baseURL}/register`, newUser);
    // log the response
    

    if(response.data){
      // check for 400 status
      if(response.status === 400){
        throw new Error({ message: response.data})
      }

      // Set the token to local storage
      localStorage.setItem('token', response.data.token);
      // Call the util function to deal with the token.
      setAuthToken(localStorage.token);
      // load the current user.
      const res = await axios.get(`${baseURL}`);
      
      return res.data;
    }
  } catch (error) {
    
    return error.message;
  }
});

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
     
      localStorage.removeItem('token')
      localStorage.removeItem('current-toggle-state')
      state.token = null
      state.isAuth = false
      state.isAdmin = false
      state.user = null
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state, action) => {
        state.status = 'loading';
      })
      // pending, fulfilled, rejected.
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succedded'
     
        if(action.payload !== 401 || action.payload !== 400){
        
          state.isAuth = true
          state.user = action.payload
          state.isAdmin = action.payload.user_isadmin
          state.token = localStorage.getItem('token');
        }else{

          state.isAuth = false
        }
       
        
       
       
      })
      .addCase(login.rejected, (state, action) => {

        
        state.status = 'failed',
        state.isAdmin = false
        state.isAuth = false
        state.token = null
        state.user = null
        state.errors= action.payload
      })
      // register.pending
      .addCase(register.pending, (state, action) => {
        state.status = 'loading'
      })
      // register.fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.isAuth = true;
        state.isAdmin = action.payload.isadmin
        // state.token = localStorage.getItem('token')
        state.user = action.payload
      })
      // register.rejected
      .addCase(register.rejected, (state, action) => {
        localStorage.removeItem('token')
        state.status= 'failed'  
        state.isAdmin = false
        state.isAuth = false
        state.user = null
        state.token = null
        state.errors = action.payload
      })
      // loaduser.pending
      .addCase(loadUser.pending, (state, action) => {
        state.status = 'loading'
      })
      // loaduser.fulfilled
      .addCase(loadUser.fulfilled, (state, action) => {
     
        state.status = 'succeeded'
        state.isAuth = true
       
        state.isAdmin = action.payload.user_isadmin
      
        state.user = action.payload
      })

  }   
});

// export selectors
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsAdmin = (state) => state.auth.isAdmin;
export const getAuthUser = (state) => state.auth.user;
export const getError = (state) => state.auth.errors;
export const getStatus = state => state.auth.status;

// Export authSlice actions
export const { logout } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;