import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Box, Typography, Button } from '@mui/material';

interface Project {
    priorityLevel: string;
    groupAffiliation: string;
    category: string;
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
        id: project.id,
        category: project.category,
        groupAffiliation: project.groupAffiliation,
        priorityLevel: project.priorityLevel
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setFormData({
            name: project.name,
            description: project.description,
            id: project.id,
            category: project.category,
            groupAffiliation: project.groupAffiliation,
            priorityLevel: project.priorityLevel
        });
    }, [project]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            setOpenModal(true);
            setLoading(false);
        } catch (err) {
            setErrorMessage('Failed to update project. Please try again.');
            setSuccessMessage(null);
            setOpenModal(true);
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSuccessMessage(null);
        setErrorMessage(null);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
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
                <div className="form-group mb-3">
                    <label htmlFor="category">Category:</label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        value={formData.category}
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="groupAffiliation">Group Affiliation:</label>
                    <input
                        id="groupAffiliation"
                        name="groupAffiliation"
                        type="text"
                        value={formData.groupAffiliation}
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="priorityLevel">Priority Level:</label>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityLevel"
                            id="lowPriority"
                            value="Low"
                            checked={formData.priorityLevel === 'Low'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="lowPriority">Low Priority</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityLevel"
                            id="mediumPriority"
                            value="Medium"
                            checked={formData.priorityLevel === 'Medium'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="mediumPriority">Medium Priority</label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="priorityLevel"
                            id="highPriority"
                            value="High"
                            checked={formData.priorityLevel === 'High'}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor="highPriority">High Priority</label>
                    </div>
                </div>
                <div className="form-group mb-3">
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

            {/* Modal for success/error message */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 1
                }}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {errorMessage ? 'Error :(' : 'Success!'}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {errorMessage ? (
                            <div className="alert alert-danger">{errorMessage}</div>
                        ) : (
                            <div>
                                <Box sx={{ bgcolor: '#d4edda', p: 2, borderRadius: 1, mb: 2 }}>
                                    <Typography sx={{ color: '#155724' }}>{successMessage}</Typography>
                                </Box>
                                <div><strong>Name:</strong> {formData.name}</div>
                                <div><strong>Description:</strong> {formData.description}</div>
                                <div><strong>UUID:</strong> {formData.id}</div>
                                <div><strong>Category:</strong> {formData.category}</div>
                                <div><strong>Group Affiliation:</strong> {formData.groupAffiliation}</div>
                                <div><strong>Priority Level:</strong> {formData.priorityLevel}</div>
                            </div>
                        )}
                    </Typography>
                    <Button
                        variant="contained"
                        color={errorMessage ? 'error' : 'primary'}
                        onClick={handleCloseModal}
                        sx={{ mt: 2 }}
                    >
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateProject;