import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./itemslist.css";

const DashboardItemsList = ({data,callerpage}) => {

 let title;
 let id;
 let pageURL;


  //Datamapping 

   if(callerpage == 'service') {

    id = data.service_id;

    title = data.service_title;
    pageURL = 'service';

  }else if(callerpage == 'blog'){

    id = data.blog_id;

    title = data.blog_title;
    pageURL = 'blog';

   }else if(callerpage == 'feedback'){

    id = data.feedback_id;

    title = data.feedback_body;
    pageURL = 'feedback';

   }else if(callerpage == 'userpage'){

    id = data.user_id;

    title = `${data.user_fn}  ${data.user_ln}`
    pageURL = 'user';
 
   }


 
    
  return (



  <div className="userContainer">
  <span>{`${title}`}</span>
  <div className="iconContainer">
{!(callerpage == 'feedback' ) ?
  
  <a href={`#edit-${pageURL}/${Number(id)}`}>
    <FaEdit
      className="icon"
      title="Edit User"
    />

    </a> : null }

    <a href={`#delete-${pageURL}/${id}`} >

    <FaTrashAlt
      className="icon"
     
      title="Delete User"
    />
    </a>

  </div>
</div>
  );
};

// Inline styles for the component
const styles = {
  userContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #ddd",
  },
  iconContainer: {
    display: "flex",
    gap: "30px", // Adds 30px space between icons
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
    color: "#555",
  },
};

export default DashboardItemsList;
