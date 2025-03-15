/**
 * @author Tek Bam
 * @description Contact component for contact page
 * @version 2.0.0
 */
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import logo from '../../../assets/images/logo-black.png';
import './contact.css';

const Contact = () => {
  return (
    <div className="contact">
      {/* Map Section */}
      <section className="map-section">
        <iframe
         title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3155.034270425333!2d144.96088497586496!3d-37.74234022995955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad644b37b2df3cd%3A0x1d04567609f4eaf0!2sCoburg%20Station!5e0!3m2!1sen!2sau!4v1731126780240!5m2!1sen!2sau"
          allowFullScreen=""
          loading="lazy"
        ></iframe>


      </section>

      {/* Contact Info Section */}
      <section className="contact-info">
        <div className="contact-details">
          <h2>Contact Information</h2>
          <div className="address">
            <FaMapMarkerAlt />
            <span>Coburg Station, Melbourne</span>
          </div>
          <div className="phone">
            <FaPhone />
            <span>(+61) 5555-6666-25</span>
          </div>
          <div className="email">
            <FaEnvelope />
            <span>contact@bobgarage.com</span>
          </div>
        </div>

        {/* Image Section */}
        <div className="contact-image">
          <img
            src= {logo}
            alt="Bob Garage"
            className="contact-img"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
