import React from 'react';
import { NavLink } from 'react-router-dom'; // For navigation
import Header from '../../../layout/Header';
import Footer from '../../../layout/Footer';

const NonAuthorised = () => {
    
  return (
   <>
  
    <div style={styles.container}>
      <h1 style={styles.title}>403 - Forbidden</h1>
      <p style={styles.message}>You do not have permission to access this page.</p>
      <NavLink style={styles.link} onClick={e=>window.location.href = '/'}>
          Go back to the homepage
        </NavLink>
    </div>
  
    </>
  );
};

// Optional: Add basic inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    padding: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '60%',
    margin: '20px auto',
    
    height: '60dvh'
  },
  title: {
    fontSize: '3rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};

export default NonAuthorised;
