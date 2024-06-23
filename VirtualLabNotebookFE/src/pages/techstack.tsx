import './pages.css';
import bootstrapIcon  from '../assets/images/bootstrap.png'
import mongoDbIcon from '../assets/images/nobgmongodb.gif'
import reactIcon from '../assets/images/react.png'
import expressIcon from '../assets/images/express-js.png'
import nodeIcon from '../assets/images/node.png'
import muiIcon from '../assets/images/nobgmui.png'


const TechStack = () => {
  return (
    <div className="tech-stack">
      <h1 id="headerVLN">Virtual Lab Notebook Tech Stack</h1>
      <div className="tech-list">
        <div className="tech-item">
          <img src={mongoDbIcon} alt="MongoDB" className="tech-logo" />
          <h2>MongoDB</h2>
          <p>MongoDB is a NoSQL database known for its flexibility and scalability.</p>
        </div>
        <div className="tech-item">
          <img src={reactIcon} alt="React" className="tech-logo" />
          <h2>React</h2>
          <p>React is a JavaScript library for building user interfaces, developed by Facebook.</p>
        </div>
        <div className="tech-item">
          <img src={expressIcon} alt="Express" className="tech-logo" />
          <h2>Express</h2>
          <p>Express is a minimal and flexible Node.js web application framework.</p>
        </div>
        <div className="tech-item">
          <img src={nodeIcon} alt="Node.js" className="tech-logo" />
          <h2>Node.js</h2>
          <p>Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>
        </div>
        <div className="tech-item">
          <img src={muiIcon} alt="Material-UI" className="tech-logo" />
          <h2>Material-UI</h2>
          <p>Material-UI (MUI) provides React components that implement Google's Material Design.</p>
        </div>
        <div className="tech-item">
          <img src={bootstrapIcon} alt="Bootstrap" className="tech-logo" />
          <h2>Bootstrap</h2>
          <p>Bootstrap is a popular CSS framework for building responsive and mobile-first websites.</p>
        </div>
      </div>
    </div>
  );
};

export default TechStack;