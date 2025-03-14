
import './layout.css';
import privacy_policy from "../assets/docs/Bobs_Garage_Privacy_Policy_Demo.pdf";
import AllBlogs from '../features/blog/components/AllBlogs';
import AllSocials from '../features/social/components/AllSocial';

const Footer = (props)=>{
  const{branding} = props;

    const date = new Date();

    return (

        <footer className="footer">
        <div className="footer-column logo-column" style={{width: '150px',height:'150px'}}>
          
          <img src = {branding} alt="logo" style={{width:'100%',height:'100%', objectFit:'contain'}} />
        </div>
  
        <div className="footer-column">
          <h3>Menu</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/feedback">Feedback</a></li>
            <li><a href="/contact">Contact</a></li>

          </ul>
        </div>
  
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/terms">Terms & Condition</a></li>
           
            <li><a href={privacy_policy} target="_self"  download >Download Privacy Policy</a></li>
          </ul>
        </div>
  
        <div className="footer-column social-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {
                <AllSocials page = {'client'} />
            }
            
          </div>
          <div className="contactFooter">
    
           <p>Coburg Station, Melbourne</p>
           <p>(+61) 5555-6666-25</p>
            <p>contact@bobgarage.com</p>
            </div>
          
        </div>
      </footer>
        
    )
}

export default Footer ;