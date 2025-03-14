import React from 'react'


const Social = ({data}) => {
  console.log(data);
  return (
    <div>
      <h1>{data.social_icon}</h1>
    </div>
  )
}

export default Social
