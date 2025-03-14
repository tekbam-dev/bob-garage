/**
 * @author Tek Bam
 * @description PersonalUI component to handle the sort functionality in blog page
 * @version 2.0.0
 */



import React, { useState,useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { fetchBlogList} from "../../features/blog/blogSlice";

const PersonalisedUI = () => {
  const [sortOrder, setSortOrder] = useState('ASC'); // Default sort order
  
  let  localstorageSortValue  = localStorage.getItem('sort',sortOrder) || 'ASC';
  const dispatch = useDispatch();

  const handleSort =(e) => {

    setSortOrder(e.target.value);
    localStorage.setItem('sort',sortOrder);

  }

  useEffect(()=> {
    console.log(`inside dispatch`);
     dispatch(fetchBlogList(localstorageSortValue));
    
     },[sortOrder])
  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',margin: "20px 100px" }}>
      {/* Controls */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Sort Dropdown */}
        <select
          value={sortOrder}
          onChange={handleSort}
          style={{ padding: '5px' }}
        >
          <option value="ASC">Sort Descending</option>
          <option value="DESC">Sort Ascending</option>
        </select>

        
      </div>
    </div>
  );
};

export default PersonalisedUI;
