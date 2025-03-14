/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\service\components\AllService.jsx
 * Handle fetch all service event 
 * Getting the list of service from database and display it depend upon the page it called from 
 * 
 * @version 5.0.0
 */

import { fetchServiceList } from "../serviceSlice.js";
import { useSelector } from "react-redux";
import { ServiceCard } from "../../../template-parts/clients/index.js";

import DashboardItemsList from "../../../template-parts/admins/dashboard-items-list/DashboardItemsList.jsx";

import {
  getAllServices,
  getServiceStatus,
  getServiceError,
} from "../serviceSlice.js";



const AllService = ({ page }) => {
  let content;

  const serviceList = useSelector(getAllServices);
  const serviceStatus = useSelector(getServiceStatus);
  // const serviceError = useSelector(getServiceError);

  if (serviceStatus == "loading") {
    return (content = <p>Loading...</p>);
  } // called from client page 
  else if (serviceStatus == "succeeded" && page == "client") {
    content = serviceList.map((service) => {
      return <ServiceCard key={service.service_id} service={service} />;
    });
    //called from admin page 
  } else if (serviceStatus == "succeeded" && page == "admin") {
    content = serviceList.map((service) => {
      return (
        <DashboardItemsList
          key={service.service_id}
          data={service}
          callerpage="service"
        />
      );
    });
  }

  return content;
};

export default AllService;
