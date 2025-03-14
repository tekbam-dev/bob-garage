/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\service\components\AddService.jsx
 * Handle add new service request
 * Form and event handler
 * @version 4.0.0
 */

import { useState } from "react";

import { addNewService } from "../serviceSlice";
import { useDispatch } from "react-redux";
import ServiceForm from "../../../template-parts/clients/forms/ServiceForm";

const AddService = () => {
  //Use dispatch to work inside the component
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    service_title: "",

    service_description: "",

    service_thumbnail: "",

    service_text: "",

    service_price: 0,
  });

  //Handling on change event

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

    const newService = {
      service_title,
      service_description,
      service_thumbnail,
      service_text,
      service_price,
    };

    dispatch(addNewService(newService));
  };

  return (
    <ServiceForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      formData={formData}
      submitText="Add Service"
    />
  );
};

export default AddService;
