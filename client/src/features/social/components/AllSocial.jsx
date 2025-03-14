/**
 * @author Tek Bam
 * @description bob-garage\client\src\features\social\components\AllSocial.jsx
 * Displaying social icon on the footer - (in future it will added to the dashboard )
 * 
 * @version 2.0.0
 */


import IconHandler from "../../../template-parts/clients/icon-with-handler/IconHandler";

import Social from "../../../template-parts/admins/admin-social/Social";

// import { addNewService } from "../serviceSlice";

// import ServiceForm from "../../../template-parts/clients/forms/ServiceForm";

const AllSocials = ({ page }) => {
  const socialList = [
    {
      social_id:1,
      social_icon:
        "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
      social_handler: "https://www.facebook.com/",
    },
    {
      social_id: 2,
      social_icon:
        "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
      social_handler: "https://www.instagram.com/",
    },
  ];

 

  let content = socialList.map((social) =>
    page === "client" ? (
      <IconHandler key={social.social_id} data={social} />
    ) : (
      <Social key={social.social_id} data={social} />
    )
  );

  // let content = [];
  //   content =   socialList.map((social) => {
  //     return(
  //     page == 'admin' ? (
  //         <IconHandler key={social.social_id} data ={social} /> ) : (<Social key={social.social_id} data={social} />))

  //     })

  return <>{content}</>;
};

export default AllSocials;
