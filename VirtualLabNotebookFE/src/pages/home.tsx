import flask from '../assets/images/flasknobg.png'
import './home.css'
const Home = () => {
  return (
    <div>
        <img src ={flask} alt="flask with green bubbly substance" className='flask' />
      <h1>Welcome to the Virtual Lab Notebook</h1>
      <p>This is the home page of your application.</p>
    </div>
  );
};

export default Home;