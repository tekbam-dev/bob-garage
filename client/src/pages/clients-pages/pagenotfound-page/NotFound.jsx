import { Link } from "react-router-dom"
import { FaExclamationTriangle } from "react-icons/fa"

const NotFound = () => {


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>
        <span className="text-danger">
          <FaExclamationTriangle />
        </span>
        {' '}  OOPS....  Page not found.
      </h1>
      <p className="lead">This is not the URL you are looking for !</p>
      <Link to='/'> Return to homepage</Link>
    </div>
  )
}

export default NotFound

// Optional: Add basic inline styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
    padding: '50px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '60%',
    margin: '20px auto',
    
    height: '60dvh'
  },
  title: {
    fontSize: '3rem',
    color: '#dc3545',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '20px',
  
  },
  link: {
    fontSize: '1rem',
    color: '#007bff',
    textDecoration: 'none',
  },
};
