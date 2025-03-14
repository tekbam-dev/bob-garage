/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\user\components\AllUsers.jsx
 * Handle displaying all user in the admin dashboard 
 * Form and event handler
 * @version 5.0.0
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {  getAllUsers, getUserStatus, getUserError } from "../userSlice";
import DashboardItemsList from "../../../template-parts/admins/dashboard-items-list/DashboardItemsList";

const AllUsers = () => {

  

  const userList = useSelector(getAllUsers);
  const status = useSelector(getUserStatus);
  const error = useSelector(getUserError);
  
  const [userListState, setUserListState] = useState(userList);

  useEffect(() => {
    if (userList !== userListState) {
     
      setUserListState(userList);
    } 
  }, [userList]);

  return (
    <div className="allUserContainer">
      {status === "loading" && <p>Loading users...</p>}
      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
      {status === "succeeded" && (
        <ul>
          {userListState.map((user) => (
            <DashboardItemsList key={user.user_id} data={user} callerpage="userpage" />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllUsers;
