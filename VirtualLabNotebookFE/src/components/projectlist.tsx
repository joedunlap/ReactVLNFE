import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Project {
    id: string; 
    name: string;
    description: string;
    createdAt: string; // Include createdAt property
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('Error fetching projects:', error))
    }, []);

    // Function to format date
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='container mt-5'>
            <h2>Projects</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>
                                <Link to={`/projects/${project.id}`}>{project.name}</Link>
                            </td>
                            <td>{project.description}</td>
                            <td>{formatDate(project.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectList;