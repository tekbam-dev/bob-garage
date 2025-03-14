import { BannerSection } from "../../template-parts/clients";


const Home = () => {
  return (
    <>
    <BannerSection/>
      <div className="home" >
        
        {/* Intro Section */}
        <section className="intro-section" >
          <h1>Welcome to Bob Garage</h1>
          <section>
          <p>
            Bob Garage has been providing exceptional car repair services for over 20 years. 
            Our experienced mechanics are dedicated to offering top-quality solutions, from minor repairs 
            to major overhauls. Our mission is to ensure your vehicle runs smoothly and efficiently.
          </p>
          <p>
            Since our founding, we’ve become one of the most trusted names in the industry, winning various awards 
            and providing reliable service to our loyal customers.
          </p>
          </section>
        </section>
  
        {/* Award List Section */}
        <section className="award-list">
          <h2>Awards & Recognition</h2>
          <ul>
            <li>
              <h3>Best Car Service Provider 2023</h3>
              <p>Recognized by the National Car Service Awards for excellence in customer service and technical skills.</p>
            </li>
            <li>
              <h3>Top Mechanic of the Year 2022</h3>
              <p>Our lead mechanic, Bob, received this prestigious award for outstanding dedication and expertise.</p>
            </li>
            <li>
              <h3>Most Trusted Auto Shop 2021</h3>
              <p>Voted by our customers as the most reliable and trustworthy garage in the city.</p>
            </li>
            <li>
              <h3>Innovation in Car Repair 2020</h3>
              <p>Our team was recognized for introducing new diagnostic technology that improves repair efficiency.</p>
            </li>
          </ul>
        </section>
      </div>
      </>
  )
}

export default Home
