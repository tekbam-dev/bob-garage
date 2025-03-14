import { Link } from 'react-router-dom';
import {TeamCard} from '../../../template-parts/clients/index.js';
import './staff.css';
import image from '../../../assets/images/test.jpg';
import {BannerSection} from '../../../template-parts/clients/index.js';
import whilly from '../../../assets/images/whilly.jpg';
import bob from '../../../assets/images/bob.jpg';
import brand from '../../../assets/images/brand.jpg';



const Staff = () => {

  const urlBase =  window.location.protocol + "//" + window.location.host;

  console.log(urlBase);
  // Sample team data
  const teamMembers = [
    { name: 'Bob Screw', role: 'Car Expert', image: `${bob}`,description: '55 Years of experience in 50 years of age. This is enough to say  Nothing I can not fix !! ' },
    { name: 'Whilly Wheel', role: 'Wheel Expert', image: `${whilly}`,description: 'He can align your tyre while doing whilly in the wheel.Do not even need to touch the tools. Just give him a key to donut your car to fix your wheel alignment' },
    { name: 'Brand BMW', role: 'Engine Expert', image: `${brand}`, description: 'Engine expert , but not going to look at your car if you drive cheaper than BMW . Brandy BMW !!!'},
    { name: 'Janny Hellooo', role: 'Receptionist/Office Worker', image: `https://img.freepik.com/free-photo/businesswoman-happy-be-back-work_23-2148727621.jpg?t=st=1731802236~exp=1731805836~hmac=c4ca3d159c7e6737df21249d91cd6bf032cee5bfda7e3562ddda01271f8d9485&w=740`,description: 'I am Janny and love to Hellooo. Please do not call me if you need Maccs or KFC . I can only suggest Tyre which resemble to burger.'},
  
  ];

  return (
    <>
    <BannerSection/>
    
    <div className="staff-container">
     
      <h1>Our Perfect Team</h1>
      <h2>Meet Our Expert Team
At BoB garage, we believe that our success is driven by the passion, expertise, and dedication of our team. Each member is carefully selected for their skills, experience, and commitment to providing top-notch car care. Together, we work hard to ensure that every vehicle that comes through our doors receives the best possible service.

Our team consists of certified mechanics, customer service professionals, and automotive experts who are here to ensure that your car is not just repaired but maintained to perform at its best. Whether it's a routine oil change, a complex engine repair, or anything in between, our team works together seamlessly to deliver high-quality, reliable solutions that you can trust.
</h2>
      <div className="team-section">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} name={member.name} role={member.role} image={member.image} description={member.description} />
        ))}
      </div>
    </div>
    </>
  );
};

export default Staff;
