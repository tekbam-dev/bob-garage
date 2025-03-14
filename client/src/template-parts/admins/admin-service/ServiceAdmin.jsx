import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServices } from '../../../features/service/serviceSlice';
import { FaPencilAlt,FaWindowClose } from 'react-icons/fa';
import './serviceadmin.css';

const ServiceAdmin = () => {
    
    const services = useSelector(getAllServices);

    return (
        <div className="service-admin">
            <h1>Service List</h1>
            <ul className="service-list">
            {services.map((service) => (
    <li key={service.service_id} className="service-item">
        <h3>{service.service_title}</h3>
        <div className="icon-group">
            
            <span>{<FaPencilAlt />}</span>
            <span>{<FaWindowClose />}</span>
        </div>
    </li>
))}

                
            </ul>
        </div>
    );
};

export default ServiceAdmin;
