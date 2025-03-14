// store.js
//This file allows us to creata store to hold the state for our application 
//We beed to bring in cofigure store from @reduxjs/toolkit
import {configureStore} from '@reduxjs/toolkit';
 import blogReducer from "../features/blog/blogSlice";
import serviceReducer from "../features/service/serviceSlice"
import optionReducer from "../features/options/optionSlice"
import socialReducer from '../features/social/socialSlice';
import userReducer from '../features/user/userSlice';
import feedbackReducer from '../features/feeback/feedbackSlice';
import authReducer from '../features/auth/authSlicer';


//Confiture the store 

const store = configureStore({
    reducer: {
        blog : blogReducer,
        service:serviceReducer,
        option:optionReducer,
        social:socialReducer,
        user: userReducer,
        feedback:feedbackReducer,
        auth:authReducer

    }});
    
    
    export default store;