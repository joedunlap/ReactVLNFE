import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, Button } from '@mui/material';

interface ProjectData {
    name: string;
    description: string;
}

interface CreatedProject extends ProjectData {
    id: string;
    createdAt: string;
}

const CreateProject = () => {
    const [projectData, setProjectData] = useState<ProjectData>({
        name: '',
        description: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [createdProject, setCreatedProject] = useState<CreatedProject | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProjectData(prevState => ({
            ...prevState, [name]: value
        }));
    };

    const handleFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response: AxiosResponse<CreatedProject> = await axios.post('http://localhost:3000/api/v1/projects', projectData);
            console.log('New Project Created', response.data);
            setCreatedProject(response.data);
            setSuccessMessage('Project created successfully!');
            setErrorMessage('');
            setProjectData({ name: '', description: '' });
            setOpenModal(true);
        } catch (err) {
            console.log('Failed to create new project', err);
            setErrorMessage('Failed to create project. Please try again.');
            setSuccessMessage('');
            setOpenModal(true);
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <h1 className="title">Create a New Project</h1>
            <form onSubmit={handleFormSubmit} className="container">
                <div className="projectname">
                    <input className="form-control mb-2" type="text" placeholder="Project Name" onChange={handleFormChange} value={projectData.name} name="name" />
                    <textarea className="form-control mb-2" placeholder="Optional Description of Project. Note: UUID and timestamp will be created once submit button is clicked." onChange={handleFormChange} value={projectData.description} name="description" />
                    <button className="btn btn-success m-1" type="submit">Submit</button>
                    <Link to="/projects" className="btn btn-secondary m-1">Back to Projects</Link>
                </div>
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
                                    <Typography sx={{ color: '#155724' }}>Project was successfully created!</Typography>
                                </Box>
                                <div><strong>Name:</strong> {createdProject?.name}</div>
                                <div><strong>Description:</strong> {createdProject?.description}</div>
                                <div><strong>UUID:</strong> {createdProject?.id}</div>
                                <div><strong>Created At:</strong> {createdProject?.createdAt}</div>
                            </div>
                        )}
                    </Typography>
                    <Button
                        variant="contained"
                        color={errorMessage ? 'error' : 'violet'}
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

export default CreateProject;