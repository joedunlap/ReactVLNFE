import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteProjectButton from './deleteprojectbtn';
import UpdateProject from './updateproject';


interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDelete = (projectId: string) => {
        setProjects((prevProjects) => prevProjects.filter(project => project.id !== projectId));
    };

    const handleEditClick = (project: Project) => {
        setSelectedProject(project);
    };

    const handleCancelEdit = () => {
        setSelectedProject(null);
    };

    const handleUpdate = (updatedProject: Project) => {
        setProjects((prevProjects) => 
            prevProjects.map(project => 
                project.id === updatedProject.id ? updatedProject : project
            )
        );
        setSelectedProject(null);
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
                        <th>Actions</th>
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
                            <td>
                                <DeleteProjectButton projectId={project.id} projectName={project.name} onDelete={handleDelete} />
                                <button onClick={() => handleEditClick(project)} className="btn btn-secondary">Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/projects/new" className="btn btn-primary">Create a New Project</Link>
            {selectedProject && (
                <div className="mt-5">
                    <h3>Update Project</h3>
                    <UpdateProject project={selectedProject} onUpdate={handleUpdate} />
                    <button onClick={handleCancelEdit} className="btn btn-secondary mt-3">Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ProjectList;