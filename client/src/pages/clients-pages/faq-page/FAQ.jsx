/**
 * @author Tek Bam
 * @description FAQ component for contact page
 * @version 2.0.0
 */

import React, { useState } from 'react';
import './faq.css';
import { BannerSection } from '../../../template-parts/clients';

const faqs = [
  {
    title: 'What services does Bob Garage offer?',
    content: 'Bob Garage offers a full range of services including general maintenance, engine diagnostics, tire replacement, brake repairs, and car detailing. We also provide advanced services like transmission repair and electric vehicle servicing.',
  },
  {
    title: 'Do I need an appointment, or do you accept walk-ins?',
    content: 'We accept both appointments and walk-ins, though we recommend booking in advance to ensure a quicker service. You can book through our website or give us a call.',
  },
  {
    title: 'What are the warranty terms for parts and services?',
    content: 'Bob Garage provides a 12-month warranty on parts and labor for most services. Please check with our staff to confirm warranty eligibility based on the specific service or part used.',
  },
  {
    title: 'How long does a typical service take?',
    content: 'The time depends on the service. General maintenance usually takes around 1-2 hours, while more complex repairs may take longer. Our team will provide an estimated timeframe when you book an appointment.',
  },
  {
    title: 'Does Bob Garage provide roadside assistance?',
    content: 'Yes, we offer roadside assistance within a 20-mile radius of our location. Just call our emergency hotline, and we’ll be on our way to help.',
  },
  {
    title: 'What payment methods are accepted at Bob Garage?',
    content: 'We accept cash, all major credit/debit cards, and digital payments such as Apple Pay and Google Wallet.',
  },
  {
    title: 'Can I get a rental car while my vehicle is serviced?',
    content: 'Yes, we offer rental cars for a nominal fee while your vehicle is in our garage for repair. Availability is limited, so please mention your rental needs when booking.',
  },
  {
    title: 'What are your working hours?',
    content: 'We are open Monday through Saturday from 8:00 AM to 6:00 PM. Closed on Sundays.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
   <>
    <BannerSection />
    <div className="faq-section">
       
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="accordion-item">
          <button className="accordion-title" onClick={() => toggleFAQ(index)}>
            {faq.title}
          </button>
          {openIndex === index && (
            <div className="accordion-content">
              <p>{faq.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </>
  );
};

export default FAQ;
