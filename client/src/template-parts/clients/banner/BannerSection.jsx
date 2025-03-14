import React from 'react' ;
import './banner-section.css';
import { useSelector } from 'react-redux';
import { getAllOptions } from '../../../features/options/optionSlice';

const BannerSection = () => {

  const {options_banner_image,option_banner_text,option_banner_overlay}  = useSelector(getAllOptions);
  

  return (
    <div className="banner">
    {/* Image as background */}
    <img src={options_banner_image} alt="Banner" className="banner-image" />

    {option_banner_overlay && <div className="banner-overlay"></div>}
    
    {/* Title and optional subtitle */}
    <div className="banner-content">
      <h1 className="banner-title">{option_banner_text}</h1>
      
    </div>
  </div>
  )
}

export default BannerSection;
