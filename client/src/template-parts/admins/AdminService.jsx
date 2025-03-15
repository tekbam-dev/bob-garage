import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import AddService from "../../features/service/components/AddService.jsx";
import { FaTimes,FaPencilAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;


const AdminService = () => {

  const [servicesArray,setServicesArray] = useState([]);

  const endpoint = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
      "Content-Type": "application/json",
    },
  });


  useEffect(() => {


    try {
      endpoint
         .get("./services")
         .then((data) => {
         
           
          setServicesArray([...servicesArray,data.data]);
          
        
         
         })
         .catch((error) => {
           console.log(error.message);
         });
       
       
     } catch (error) {
       console.log(error);
     }
   
    
  },[]);


  // const deleteServiceFromList = (e,id) => {
  //   e.preventDefault();
  //   console.log(id);
  //   console.log("Delete Feedback - FeedbackCOntext.jsx ", id);
  //   const newList = servicesArray.filter((feedback) => feedback.id != id);
  //    console.log(feedbackList);
  //   setFeedbackList(newList);
  // };

  const deleteService = (e,id) => {
    let serviceReturn ;
    e.preventDefault();
    servicesArray.forEach((element) => {
       serviceReturn = element.filter((service) => service.service_id != id);
    });
    
    setServicesArray([serviceReturn]);

  }


  const editService = (e,id) => {
    console.log(`edit service  ${id}`);

  }


  return (
    <>
      <div style={{display:'flex',flexDirection:"column", justifyContent:"space-between",width: "700px",gap:"5px"}}>
      
        {servicesArray.map((service) => {

          return service.map((data) => {
            return(
            <div style={{display:"flex", justifyContent:"space-between",border: "solid grey 2px",padding: "20px 40px",borderRadius:"5px"}}>
            <div id={data.service_id}>{data.service_title}{data.service_id}</div>
            <div  style={{display:"flex", gap: "35px"}}>
              <Link key={data.service_id} to={`/editservice/${data.service_id}`}>
            <FaPencilAlt />
            </Link>
            <FaTimes onClick={(e) =>deleteService(e,data.service_id)}/>
            </div>
            </div>)
            // console.log(data.service_title);
          })

        
            })}
        
       
      </div>
      <div>
        <AddService />
      </div>
    </>
  );

};

export default AdminService;
