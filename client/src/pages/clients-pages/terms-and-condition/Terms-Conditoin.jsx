/**
 * @author Tek Bam
 * @description Terms and condition compoment 
 * @version 2.0.0
 */


import React from "react";
import "./terms.css";

const TermsAndConditions = () => {
  return (
    <div className="terms-container">
      <h1>Terms and Conditions</h1>
      <p>Welcome to Bob’s Garage! These terms and conditions outline the rules and regulations for the use of our services.</p>

      <h2>1. General Terms</h2>
      <p>
        By booking a service with Bob's Garage, you agree to abide by the following terms. These terms apply to all customers, regardless of the type of service provided.
      </p>

      <h2>2. Services</h2>
      <ul>
        <li>All services are carried out with due care and attention to ensure customer satisfaction.</li>
        <li>Quotes provided are estimates and may vary based on the final inspection and additional repairs required.</li>
        <li>Customers will be informed before any additional work is carried out.</li>
      </ul>

      <h2>3. Payments</h2>
      <p>
        Payment for services is required upon completion of the work. We accept cash, credit cards, and online transfers. Failure to pay may result in additional fees or legal action.
      </p>

      <h2>4. Cancellations</h2>
      <p>
        Customers must notify Bob’s Garage at least 24 hours in advance to cancel or reschedule an appointment. Failure to do so may result in a cancellation fee.
      </p>

      <h2>5. Liability</h2>
      <p>
        Bob’s Garage is not responsible for any loss or damage to personal belongings left in the vehicle. We are also not liable for delays caused by circumstances beyond our control.
      </p>

      <h2>6. Warranties</h2>
      <p>
        Services provided by Bob's Garage come with a limited warranty. Please refer to your service receipt for warranty details specific to your repair or maintenance work.
      </p>

      <h2>7. Amendments</h2>
      <p>
        Bob’s Garage reserves the right to amend these terms and conditions at any time without prior notice. Customers will be notified of significant changes.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        For questions or concerns regarding these terms and conditions, please contact us at:
      </p>
      <ul>
        <li>Phone: (+61) 5555-6666-25</li>
        <li>Email: contact@bobgarage.com</li>
        <li>Address: Coburg Station, Melbourne</li>
      </ul>

      <p>By using our services, you acknowledge that you have read and agree to these terms and conditions.</p>
    </div>
  );
};

export default TermsAndConditions;
