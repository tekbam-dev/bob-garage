import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleService,
  singleService,
  getServiceStatus,
} from "../../../features/service/serviceSlice";
import { useParams } from "react-router-dom";
import { useState } from "react";

// import './SingleService.css';

const SingleService = () => {

  const {id} = useParams();
   id = Number(id);
  window.scrollTo(0,0);
 
  const [idState, setIdState] = useState(id);
  let serviceRetn = useSelector(getSingleService(idState));

  const [service, setService] = useState({ serviceRetn });

  const dispatch = useDispatch();

  if (idState !== id && Number.isInteger(id)) {
  
    setIdState(id);
  }

  useEffect(() => {
    
    dispatch(singleService(id)).unwrap();

    setService(serviceRetn);
  }, [idState, serviceRetn]);

console.log(`Single service page`,serviceRetn);

  
  return (
    <div className="single-service-container">
      <div className="service-image">
        <img src={service.service_thumbnail} />
      </div>
      <div className="service-details">
        <h1 >{service.service_title}</h1>
       
        <p className="service-text" style={{whiteSpace:"pre-line"}}>{service.service_text}</p>
        <h4 className="service-price">${service.service_price}</h4>

      
      </div>
    </div>
  );
};

export default SingleService;
