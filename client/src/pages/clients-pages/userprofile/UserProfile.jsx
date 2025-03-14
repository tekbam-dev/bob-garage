
// This file is created in future version 

// import React, { useEffect } from "react";
// import { useState } from "react";
// import { is_Empty } from "../../../utils/validation";
// import { useDispatch, useSelector } from "react-redux";
// import { updateUser } from "../../../features/user/userSlice";
// import { getIsAuth, getAuthUser } from "../../../features/auth/authSlicer";

// import { Link } from "react-router-dom";
// // import { loadUser } from "../../../features/auth/authSlicer";

// const UserProfile = () => {

//   console.log(`UserProfile `)
//   // use our selector to see if the user is already logged in
//   const dispatch = useDispatch();

//   //Getting is Auth
 
//   const authUser = useSelector(getAuthUser);

//   // const user = dispatch(loadUser())
//   // Password field toggle

  
//   const { user_fn, user_ln, user_pp, user_email, user_id } = authUser;

  

//   const userIdStateNum = Number(user_id);

   
//   //Set up the form state.
//   const [formData, setFormData] = useState({
//     firstName: user_fn,
//     lastName: user_ln,
//     email: user_email,
//     image: user_pp,
   
//   });

//   // If the user is logged in, redirect to '/'
//   //   if(isAuth){
//   //     return <Navigate to='/login' />
//   //   }

//   // Destructure the state.
//   const {
//     firstName,
//     lastName,
//     email,
//     image,
   
//   } = formData;

//   // On Change
//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   // onSumbit function
//   const onSubmit = (e) => {
//     e.preventDefault();

//     console.log("On sumbit - Profile Page");

//     const newUser = {
//       user_fn: formData.firstName,
//       user_ln: formData.lastName,
//       user_pp: formData.image,
//       user_isadmin: false,
//       user_email: formData.email,
  
//     };

//     // If we can save, change the registerStatus and dispatch our register function.
//     try {
//       console.log("Saving update profile....");
//       // Change the registerstatus

//       // dispatch the register action
//       dispatch(updateUser({ userIdStateNum, users: newUser}))
//       .unwrap()
//       .then(() => {
//         // history.push("/dashboard#user"); // Redirect to user list page after update
//         console.log('Record udpated');
       
//         window.location.reload();
//         window.location.href= "/dashboard#user";
        
//       })
//       .catch((error) => {
//         console.error("Failed to update user:", error);
//       });

//       window.location.href = "/";
//     } catch (error) {
//       console.log("Error: ", error);
//       return;
//     }
//   };

//   return (
//     <>
//       <h1 className="text-primary "> {user_fn} Profile</h1>
//       <div className="card mb-3">
//         <div className="card-body">
//           <form className="needs-validation" onSubmit={(e) => onSubmit(e)}>
//             <div className="mb-3">
//               <label htmlFor="firstName">First Name</label>
//               <input
//                 type="text"
//                 className={`form-control`}
//                 id="firstName"
//                 placeholder="First Name"
//                 name="firstName"
//                 value={firstName}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="lastName">Last Name</label>
//               <input
//                 type="text"
//                 className={`form-control`}
//                 id="lastName"
//                 placeholder="Last Name"
//                 name="lastName"
//                 value={lastName}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="text"
//                 className={`form-control`}
//                 id="email"
//                 placeholder="email@somewhere.com"
//                 name="email"
//                 value={email}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="image">Image</label>
//               <input
//                 className={`form-control`}
//                 id="image"
//                 placeholder="image"
//                 name="image"
//                 value={image}
//                 onChange={(e) => onChange(e)}
//               />
//             </div>

//             <div className="d-grid gap-2">
//               <input
//                 type="submit"
//                 value="Update"
//                 className="btn btn-light "
                
//               />
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserProfile;
