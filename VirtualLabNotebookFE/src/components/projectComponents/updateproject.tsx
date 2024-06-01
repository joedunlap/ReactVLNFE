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
        name: '',
        description: '',
        id: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                description: project.description,
                id: project.id
            });
        }
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
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
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