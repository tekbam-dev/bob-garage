/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\service\components\EditService.jsx
 * Handle edit service function
 *
 * @version 7.0.0
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import {
  getSingleService,
  
  updateService,
} from "../serviceSlice";
import { useState } from "react";
import ServiceForm from "../../../template-parts/clients/forms/ServiceForm";

const EditService = () => {
  //Use dispatch to work inside the component
  
  const id = window.location.hash.split("/").pop();
  const service = useSelector(getSingleService(id));

  
  // const serviceExist = useSelector(getSingleService(id));
  

  const [requestStatus, setRequestStatus] = useState("idle");

  const [formData, setFormData] = useState({
    service_title: service?.service_title,

    service_description: service?.service_description,

    service_thumbnail: service?.service_thumbnail,

    service_text: service?.service_text,

    service_price: service?.service_price,
  });

  const dispatch = useDispatch();
  const navigator = useDispatch();


  if (!service && service === undefined) {
    return <section>Service not found </section>;
  }

  //Handling on change event

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const canSave = service !== undefined && requestStatus == "idle";

  //Handling onSubmit event

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      service_title,
      service_description,
      service_thumbnail,
      service_text,
      service_price,
    } = formData;

    const editService = {
      id: id,
      services: {
        service_title,
        service_description,
        service_thumbnail,
        service_text,
        service_price,
      },
    };

    try {
      if (canSave) {
        setRequestStatus("pending");
        dispatch(updateService(editService))
          .then((data) => {
            if (data.payload) {
              window.location.href = "/dashboard#service";
              window.location.reload();
            }
          })
          .catch((error) => {
            return error;
          });
      } else {
        console.log("Cannot update");
      }
    } catch (err) {
      console.log("Failed to udpate feedback ", err);
    } finally {
      setRequestStatus("idle");
      
    }
  };

  return (
    <ServiceForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      submitText="Service Edit"
    />
  );
};

export default EditService;
