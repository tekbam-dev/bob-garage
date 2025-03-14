import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../features/auth/authSlicer";
import { getIsAuth } from "../../../features/auth/authSlicer";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import signupValidationSchema from "./formvalidation/signupform-validator";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    user_fn: "",
    user_ln: "",
    user_email: "",
    user_pp: "",
    user_password: "",
    passwordCompare: "",
  });

  const [signupErrors, setSignupErrors] = useState({});
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // Validate form data using Yup
      await signupValidationSchema.validate(formData, { abortEarly: false });
      setSignupErrors({}); // Clear errors if validation passes

      // Dispatch registration action
      const { user_fn, user_ln, user_email, user_pp, user_password } = formData;

      

      dispatch(register({ firstName: user_fn, lastName: user_ln, email: user_email, image: user_pp, password: user_password })).unwrap().then(() => {
        return <Navigate to="/" />
      })
    

    } catch (err) {
      // Parse and set validation errors
      const newErrors = err.inner.reduce((acc, error) => {
        console.log(error.path);
         acc[error.path] = error.message;
         return acc;
       }, {});
  
       setSignupErrors(newErrors);
    }
  };

  const { user_fn, user_ln, user_email, user_pp, user_password, passwordCompare } = formData;

  return (
    <div>
      <h1 className="text-primary" style={{textAlign:"center"}}>Register for the System</h1>
      <div className="card mb-3">
    
        <div className="card-body">
          <form  className="form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>First Name Edited </label>
              <input
                type="text"
                name="user_fn"
                
                value={user_fn}
                onChange={handleChange}
              />

              {/* {console.log(errors)} */}
              {signupErrors.user_fn && <div className="text-danger">{signupErrors.user_fn}</div>}
            </div>
            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                name="user_ln"
                
                value={user_ln}
                onChange={handleChange}
              />
              {signupErrors.user_ln && <div className="text-danger">{signupErrors.user_ln}</div>}
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                name="user_email"
               
                value={user_email}
                onChange={handleChange}
              />
              {signupErrors.user_email && <div className="text-danger">{signupErrors.user_email}</div>}
            </div>
            <div className="mb-3">
              <label>Profile Picture URL</label>
              <input
                type="text"
                name="user_pp"
                
                value={user_pp}
                onChange={handleChange}
              />
              {signupErrors.user_pp && <div className="text-danger">{signupErrors.user_pp}</div>}
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="user_password"
               
                value={user_password}
                onChange={handleChange}
              />
              {signupErrors.user_password && <div className="text-danger">{signupErrors.user_password}</div>}
            </div>
            <div className="mb-3">
              <label>Re-enter Password</label>
              <input
                type="password"
                name="passwordCompare"
                
                value={passwordCompare}
                onChange={handleChange}
              />
              {signupErrors.passwordCompare && <div className="text-danger">{signupErrors.passwordCompare}</div>}
            </div>
            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-light">Register</button>
            </div>
            <p className="m-1">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
