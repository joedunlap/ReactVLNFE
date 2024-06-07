import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

interface UpdateProjectProps {
    project: Project;
    onUpdate: (updatedProject: Project) => void;
}

const UpdateProject: React.FC<UpdateProjectProps> = ({ project, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: project.name,
        description: project.description,
        id: project.id
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            name: project.name,
            description: project.description,
            id: project.id
        });
    }, [project]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/projects/${project.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onUpdate(response.data); // Call the onUpdate handler with the updated project
            setSuccessMessage('Project updated successfully!');
            setErrorMessage(null);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setErrorMessage('Failed to update project. Please try again.');
            setSuccessMessage(null);
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (errorMessage) return <p>Error: {errorMessage}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label htmlFor="id">Project ID:</label>
                <input
                    id="id"
                    name="id"
                    type="text"
                    value={formData.id}
                    className="form-control"
                    readOnly
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input
                    id="description"
                    name="description"
                    type="text"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Update Project</button>
        </form>
    );
};

export default UpdateProject;