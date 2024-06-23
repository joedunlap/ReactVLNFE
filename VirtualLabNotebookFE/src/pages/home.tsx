import { Link } from 'react-router-dom';
import flask from '../assets/images/flasknobg.png'
import './pages.css'
import Footer from '../components/footer';
const Home = () => {
  return (
    <div className="container-fluid">
        <img src ={flask} alt="flask with green bubbly substance" className='flask' />
      <h1>Welcome to the Virtual Lab Notebook!</h1>
      <p>A digital platform to manage scientific research projects and data.</p>
      <p>This is the home page of the application.</p>

      <Link to="/projects" className="btn btn-primary m-4">View Your Projects</Link>
      <Link to="/projects/new" className="btn btn-success m-4">Create a New Project</Link>
      <Footer />
    </div>
  );
};

export default Home;