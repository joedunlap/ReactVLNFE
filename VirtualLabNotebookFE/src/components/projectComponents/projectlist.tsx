import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteProjectButton from './deleteprojectbtn';
import UpdateProject from './updateproject';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';

interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

const ProjectList: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [open, setOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        setOpen(true);
    };

    const handleCancelEdit = () => {
        setSelectedProject(null);
        setOpen(false);
    };

    const handleUpdate = (updatedProject: Project) => {
        setProjects((prevProjects) => 
            prevProjects.map(project => 
                project.id === updatedProject.id ? updatedProject : project
            )
        );
        setSelectedProject(null);
        setSuccessMessage('Project Updated Succesfully!')
        setErrorMessage('')
        setTimeout(() => { 
            setOpen(false);
        }, 5000);
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
                                <IconButton onClick={() => handleEditClick(project)} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/projects/new" className="btn btn-primary m-4">Create a New Project</Link>
            <Link to="/" className="btn btn-secondary m-4">Back to Homepage</Link>
            <Dialog open={open} onClose={handleCancelEdit} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
                <DialogTitle id="form-dialog-title">Update Project</DialogTitle>
                <DialogContent>
                    {selectedProject && <UpdateProject project={selectedProject} onUpdate={handleUpdate} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEdit} color="secondary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ProjectList;