/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\service\components\DeleteService.jsx
 * Handle delete service 
 * 
 * @version 4.0.0
 */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteService,
  fetchServiceList,
  getSingleService,
} from "../serviceSlice";

import { useNavigate } from "react-router-dom";

const DeleteService = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Getting id from url
  const serviceId = window.location.hash.split("/").pop();

  const [serviceIdState, setServiceIdState] = useState(serviceId);

  // Making sure id is in int format
  let serviceIdStateNum = parseInt(serviceIdState);

  if (serviceId !== serviceIdState && Number.isInteger(serviceIdStateNum)) {
    setServiceIdState(serviceId);
  }

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [refreshServiceSection, setRefreshServiceSection] = useState(false);

  const serviceReturn = useSelector(getSingleService(serviceIdStateNum));

  const handleDelete = () => {
    //calling deleteService async function from serviceSlicer
    dispatch(deleteService({ serviceIdStateNum }))
      .unwrap()
      .then((data) => {
        try {
          if (data) {
            dispatch(fetchServiceList());
          }
        } catch (error) {
          console.log(error);
        } finally {
          window.location.href = "/dashboard#service";
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setRefreshServiceSection((prev) => !prev); // Toggle the state to trigger re-render
    setConfirmDelete(false); // Reset confirmation state
    // window.location.href = '/dashboard#Service'; // Full

    //  window.location.href = '/dashboard#Service'; // Full
    //   window.location.reload();//redirect to refresh the page
  };
// Handling confirmation cancle 
  const handleCancel = () => {
    window.location.href = "/dashboard#service";
  };

  return (
    <div className="delete-Service">
      {serviceReturn ? (
        <>
          <h4>{`Will delete record - ${serviceReturn.service_fn}   ${serviceReturn.service_ln}`}</h4>
          <p>Are you sure you want to delete this Service?</p>

          <button onClick={handleDelete}>
            <a href="/dashboard#Service">Yes, Delete</a>
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <h5>Data not found</h5>
      )}
    </div>
  );
};

export default DeleteService;
