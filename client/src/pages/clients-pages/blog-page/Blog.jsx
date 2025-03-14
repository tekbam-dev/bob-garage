//using team card to display blog 
// import LeftImageRightContent from "../../../template-parts/clients/left-image-right-content/LeftImageRightContent";
import { useState } from "react";
// import AllBlogs from "../../../features/blog/components/AllBlogs";


import { BannerSection } from "../../../template-parts/clients";

import AllBlogs from "../../../features/blog/components/AllBlogs";
import PersonalisedUI from "../../../template-parts/personalise-ui/PersonaliseUI";



const Blog = () => {


//  const allBlogs  = useSelector(selectAllBlogs);
 
  return (
    <div >
 <BannerSection/>
 <PersonalisedUI />
  <h1 className="blog-heading" style={{textAlign:"left", width:"60%",margin:"50px auto"}}>Blogs </h1>

  <AllBlogs page='client' />

      {/* {
        allBlogs.map((blog) => {
          return (
          <LeftImageRightContent key={blog.blog_id} blog= {blog} />
          )
        })
      } */}
  
      
    </div>
  )
}

export default Blog;



