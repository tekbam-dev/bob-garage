import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Provider} from 'react-redux';


import {Provider} from 'react-redux';
import store from './store/store.js';

import { fetchServiceList } from './features/service/serviceSlice.js';
import { fetchBlogList } from './features/blog/blogSlice.js';
import {fetchAllOptions} from './features/options/optionSlice.js';
// import {fetchSocialList } from './features/social/socialSlice.js';
import { fetchUserList } from './features/user/userSlice.js';
import { fetchFeedbackList } from './features/feeback/feedbackSlice.js';
import { loadUser } from './features/auth/authSlicer.js';
import setAuthToken from './utils/setAuthToken.js';



store.dispatch(fetchBlogList());
store.dispatch(fetchServiceList());
store.dispatch(fetchAllOptions());
// store.dispatch(fetchSocialList());
store.dispatch(fetchUserList());
store.dispatch(fetchFeedbackList());

// Load in the token from local storage
const token = localStorage.getItem('token');
// Check if we have a token, and load the current user if we do.
if(token){
  setAuthToken(token);
  store.dispatch(loadUser());
}


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
    <App />
    </Provider>
  </StrictMode>,
)
