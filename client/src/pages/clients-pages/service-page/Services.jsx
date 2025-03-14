import {Link} from 'react-router-dom';
// import ServiceCard from '../template-parts/service/servicecard/ServiceCard';
import BannerSection from '../../../template-parts/clients/banner/BannerSection';
import AllService from '../../../features/service/components/AllService';
import './service.css';

const Services = () => {
  window.scrollTo(0,0);
  return (
    <>
    <BannerSection/>
  
    <div className='services-container'>
     
       
     
      <p>
      At <strong>BOB Garage</strong>, we are committed to providing top-tier automotive services that ensure your vehicle runs smoothly, efficiently, and safely. Our experienced technicians offer a comprehensive range of services, from routine maintenance like oil changes and tyre alignments to more complex repairs and diagnostics. Whether you're looking to improve your car's performance, extend its lifespan, or simply keep it in peak condition, we have the expertise and tools to handle all your needs. We understand the importance of a reliable vehicle, and our goal is to deliver the highest quality care to keep you on the road with peace of mind. </p>

     <p>With a customer-first approach, we pride ourselves on transparency, affordability, and exceptional service. Each vehicle is treated with the utmost care, and we use only the best parts and products to ensure long-lasting results. From brake checks and comprehensive servicing to detailed diagnostics and repairs, we aim to exceed expectations every time. We don't just service your car; we provide a complete experience that focuses on your vehicle’s performance, safety, and overall well-being, so you can drive with confidence knowing your car is in expert hands.
      </p>
      <h1>Services</h1>
      <div className="service-cards-section">
      <AllService page = 'client'/>
      </div>
    </div>
    </>
  )
}

export default Services
