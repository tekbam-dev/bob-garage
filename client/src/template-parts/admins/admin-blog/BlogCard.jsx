// // src/components/BlogCard.jsx

// import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FaPencilAlt,FaTrashAlt } from 'react-icons/fa';




// const BlogCard = ({ blog }) => {
//   return (
//     <>
//     </>
//     // <CardContainer>
//     //   <Title>{blog.blog_title}</Title>
//     //   <IconContainer>
//     //     <FaPencilAlt />
//     //     <FaTrashAlt/>
//     //   </IconContainer>
//     // </CardContainer>
//   );
// };

// BlogCard.propTypes = {
//   blog: PropTypes.shape({
//     blog_title: PropTypes.string.isRequired,
//     blog_description: PropTypes.string.isRequired,
//     blog_thumbnail: PropTypes.string.isRequired,
//   }).isRequired,
// };


// const CardContainer = styled.div`
//   background-color: #fff;
//    padding: 5px;
//   margin: 5px;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   position: relative;
//   // max-width: 800px;
//   display:flex;
//   justify-content: space-between;
//   // border:solid ;
//   `;

// const Title = styled.p`
//   font-size: 0.8em;
//   color: #333;
//   margin-bottom: 10px;
// `;

// const IconContainer = styled.div`
//   display:flex;
//   align-items: center;
//   gap: 20px;
//   padding: 0px 30px 0px 0px;

//   .icon {
//     cursor: pointer;
//     color: #007bff;
//     font-size: 1.2em;
//     transition: color 0.3s;

//     &:hover {
//       color: #ff4d4f;
//     }
//   }
// `;

// export default BlogCard;
