import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Project {
    id: string; 
    name: string;
    description: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('Error fetching projects:', error))
    }, []);
    return (
        <div className='container mt-5'>
            <h2>Projects</h2>
            <ul className="list-group">
        {projects.map(project => (
          <li key={project.id} className="list-group-item">
            <Link to={`/projects/${project.id}`}>{project.name}</Link>
          </li>
        ))}
      </ul>
        </div>
    );
};

export default ProjectList;