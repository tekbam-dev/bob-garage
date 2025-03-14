import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOptionsAsync } from '../../../features/options/optionSlice';
import { getAllOptions, getOptionsStatus } from '../../../features/options/optionSlice';
import { Navigate } from 'react-router-dom';
import './option.css';

const Options = () => {
  const dispatch = useDispatch();
  const [isSave,setIsSave] = useState(false);
  // Getting options values and status 
  const optionList = useSelector(getAllOptions);
  const optionsStatus = useSelector(getOptionsStatus);

  // State to manage form data
  const [formData, setFormData] = useState({
    options_banner_image: optionList.options_banner_image,
    option_banner_text: optionList.option_banner_text,
    option_banner_overlay: optionList.option_banner_overlay,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked }); // For checkbox, update with checked value (true/false)
    } else {
      setFormData({ ...formData, [name]: value }); // For other fields, update with value
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      
      dispatch(updateOptionsAsync(formData)).unwrap()
  
       setIsSave(true);
        window.location.href = "/";
    
    } catch (error) {
      console.log (error)
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit} className='form'>
      <div>
        <label>Banner Image:</label>
        <input
          type="text"
          name="options_banner_image"
          value={formData.options_banner_image}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Banner Text:</label>
        <input
          type="text"
          name="option_banner_text"
          value={formData.option_banner_text}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Banner Overlay:</label>
        <input
          type="checkbox"
          name="option_banner_overlay"
          checked={formData.option_banner_overlay} // Use checked, not value
          onChange={handleChange} // Handle checkbox change
        />
      </div>
      {isSave && (<h1> Data Saved </h1>)}
      <button>Update Options</button>
    </form>

  
    </div>
  );
};

export default Options;
