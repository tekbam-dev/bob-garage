import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../../features/auth/authSlicer';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './form.css';

const LoginForm = () => {
const navigator = useNavigate();
// set up the state for our login form.
const [ formData, setFormData] = useState({
  email: '',
  password: '',
  errors: {}
});

const [isAuthUser,setIsAuthUser] = useState(true);

// use Dispatch
const dispatch = useDispatch();
// is auth selector

// Navigate

// Destructure our state.
const { email, password, errors } = formData;

// onChange function.
const onChange = e => setFormData({
  ...formData, [e.target.name]: e.target.value
});

// onSubmit 
const onSubmit = e => {
  // prevent refresh
  e.preventDefault();


  // Validation
  // is_empty
  // Dispatch
  dispatch(login({ email, password })).unwrap().then((data)=>{

   
   setIsAuthUser(true);
   navigator('/');

  }).catch((error)=>{
    
 
    setIsAuthUser(false);
      setFormData({
       email: "",
       password: ""
      })
     
      })
}

console.log(isAuthUser);

// Set up the login form.
return (
  <>

    <h1 className='text-primary' style={{textAlign:"center"}}>Login to the System</h1>
    <div className='card mb-3'>
      
      <div className='card-body'>
        {/* Change onSubmit call */}
        <form className = "form" onSubmit={e => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='email'>Email</label>
            <input 
              type='text'
              className={`form-control`}
              id='email'
              placeholder='Email'
              name='email'
              value={email} 
              onChange={e => onChange(e)}
            />
         
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>password</label>
            <input 
              type="password"
              className={`form-control`}
              id='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
            {/* Error message rendering */}
     
          </div>
          {isAuthUser ? null : <p style={{color:'red'}}>Invalid Credential</p> }
          <div className='d-grid gap-2'>
            <input type='submit' value='Login' className='btn btn-light '/>
          </div>
        </form>
      </div>
     
      <p className='m-1'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>  
      </p>
    </div>
  </>
)
}

export default LoginForm
