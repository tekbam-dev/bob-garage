import React from "react";
import "./servicecard.css";
import { FaTimes,FaPencilAlt } from "react-icons/fa";
import { Link } from "react-router-dom";



const ServiceCard = ({service}) => {

  
 const {service_title,service_thumbnail,service_description,service_price} = service;


  return (
    <div className = "service-card-container">
      <Link to = {`/service/${service.service_id}`} style={{textDecoration:'none'}}>
    <div className="service-card">
      {/* Image on top */}
      <img src={service_thumbnail} alt={"title"} className="service-card-image" />

      {/* Title */}
      <h3 className="service-card-title">{service_title}</h3>

      {/* Description */}
      <h6 className="service-card-description">{service_description}</h6>

      {/* Pricing */}
      <div className="service-card-price">{`$${service_price}`}</div>
    </div>
    </Link>
  
    </div>
   
  );
  
};

export default ServiceCard;
