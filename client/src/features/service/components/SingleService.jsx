// import { useState } from "react";
// import { getSingleService } from "./serviceSlice";
// import { addNewService } from "./serviceSlice";
// import { useDispatch } from "react-redux";


// const SingleService = () => {

// //Use dispatch to work inside the component
// const dispatch  = useDispatch();
// const [formData,setFormData] = useState({

    
//     service_title : "",
     
//      service_description: "",
    
//      service_thumbnail: "",
     
//      service_text: "",
     
//      service_price: 0

// });


// //Handling on change event

// const handleChange = (e) => {
    
//     setFormData({
//         ...formData,[e.target.name] : e.target.value
//     }) ;
//  }
 
//  //Handling onSubmit event 
 
//  const handleSubmit = (e) => {
    
//     console.log("On submit ran");
//     e.preventDefault();
//   const { service_title ,service_description,service_thumbnail,service_text,service_price} = formData;
  
 
//     const newService  = {
//         service_title,
//         service_description,
//         service_thumbnail,
//         service_text,
//         service_price
 
//     }
 
//     dispatch(addNewService(newService));
//  }


//  return (

//     <NewServiceForm handleSubmit={handleSubmit} handleChange ={handleChange} formData={formData}/>
    
        
//  )
// }

// export default SingleService;
