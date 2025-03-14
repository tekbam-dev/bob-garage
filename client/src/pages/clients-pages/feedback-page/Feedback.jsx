/**
 * @author Tek Bam
 * @description Feedback component for feedback client page
 * @version 2.0.0
 */


import { useState } from "react";
import { BannerSection } from "../../../template-parts/clients";
import AllFeedback from "../../../features/feeback/components/AllFeedback";
import FeedbackForm from '../../../template-parts/clients/forms/FeedbackForm';
// import { useSelector } from "react-redux";

const Feedback = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
  
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
  
    const handleFeedbackSubmit = (feedbackData) => {
      console.log("Feedback Submitted:", feedbackData);
      // Handle saving or displaying feedback as needed
    };
  
    return (
      <>
        <BannerSection />
        <div style={{display:'grid',gridTemplateColumns: 'repeat(4, 1fr)',gap: '16px', justifyItems:"center",minHeight:'80dvh',height:'fit-contain'}} >
        <AllFeedback page="client" />
        </div>

       
        <button onClick={handleOpenModal} style={styles.leaveFeedbackButton}>Leave Feedback</button>
  
        {(isModalOpen) && (
          <div style={styles.modalOverlay}>  
            <div style={styles.modalContent}>
              <FeedbackForm onSubmit={handleFeedbackSubmit} onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </>
    );
  };



  const styles = {
    leaveFeedbackButton: {
      position: 'fixed',            
      bottom: '50%',                
      right: '0',                  
      transform: 'translateY(50%)',  
      writingMode: 'vertical-lr',    
      padding: '10px 20px',          
      backgroundColor: '#4CAF50',    
      color: 'white',                
      fontSize: '16px',              
      border: 'none',               
      borderRadius: '5px',          
      cursor: 'pointer',           
      zIndex: 9999        


    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      width: '100%',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    textarea: {
      width: '100%',
      height: '80px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      resize: 'none',
      marginTop: '10px',
    },
    stars: {
      display: 'flex',
      justifyContent: 'center',
      margin: '10px 0',
    },
    star: {
      fontSize: '1.5em',
      cursor: 'pointer',
      padding: '0 5px',
    },
    submitButton: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#4CAF50',
      color: 'white',
      cursor: 'pointer',
      marginTop: '10px',
    },
    cancelButton: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: '#d9534f',
      color: 'white',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };


  export default Feedback;