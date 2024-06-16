import { Link } from 'react-router-dom';
import flask from '../assets/images/flask.png';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up function
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={flask} alt="flask logo" className="flask" style={{ width: '50px', height: 'auto' }} />
                </Link>
                <Link className="navbar-brand" to="/">Virtual Lab Notebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/projects/new">Create New Project</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/tech-stack">Tech Stack</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className="nav-link" to="/resume">Resume</Link>
                        </li>
                
                        
                    </ul>
                    <span className="navbar-text ms-auto">
                        Current Time: {currentTime.toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;