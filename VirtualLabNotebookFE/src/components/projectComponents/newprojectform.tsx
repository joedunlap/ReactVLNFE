import { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Link } from 'react-router-dom';
import { Modal, Box, Typography, Button } from '@mui/material';
import DNA from '../../assets/images/dna.png';
import bookStack from '../../assets/images/bookstack.png'
import './projects.css';



interface ProjectData {
    name: string;
    description: string;
    category: string;
    groupAffiliation: string;
    priorityLevel: string;
}

interface CreatedProject extends ProjectData {
    id: string;
    createdAt: string;
}

const CreateProject = () => {
    const [projectData, setProjectData] = useState<ProjectData>({
        name: '',
        description: '',
        category: '',
        groupAffiliation: '',
        priorityLevel: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [createdProject, setCreatedProject] = useState<CreatedProject | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            setProjectData({ name: '', description: '', category: '', groupAffiliation: '', priorityLevel: '' });
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
        <div className="outer-container">
            <div className="inner-container">
                <div className="dna-image-container">
                    <img src={DNA} alt="gold dna strand" className="dna-image" />
                </div>
                
                <div className="form-container">
                    <h1 className="title">Create a New Project</h1>
                    <form onSubmit={handleFormSubmit} className="project-form">
                        <div className="projectname">
                            <input className="form-control mb-2" type="text" placeholder="Project Name" onChange={handleFormChange} value={projectData.name} name="name" />
                            <textarea className="form-control mb-2" placeholder="Optional Description of Project. Note: UUID and timestamp will be created once submit button is clicked." onChange={handleFormChange} value={projectData.description} name="description" />
                            <select className="form-select mb-2" aria-label="Default select example" onChange={handleFormChange} value={projectData.category} name="category">
                                <option value="" disabled selected>Please Choose a Project Category</option>
                                <option value="General Biology">General Biology</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Physics">Physics</option>
                                <option value="Microbiology">Microbiology</option>
                                <option value="Botany">Botany</option>
                                <option value="Other">Other</option>
                            </select>
                            <input className="form-control mb-2" type="text" placeholder="Group/Lab Affiliation" onChange={handleFormChange} value={projectData.groupAffiliation} name="groupAffiliation" />
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="radio" value="Low" onChange={handleFormChange} name="priorityLevel" />
                                <label className="form-check-label" htmlFor="inlineCheckbox1">Low Priority</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineradio2" value="Medium" onChange={handleFormChange} name="priorityLevel" />
                                <label className="form-check-label" htmlFor="inlineCheckbox2">Medium Priority</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" id="inlineradio3" value="High" onChange={handleFormChange} name="priorityLevel" />
                                <label className="form-check-label" htmlFor="inlineCheckbox3">High Priority</label>
                            </div>
                            <div className="container">
                            <button className="btn btn-success m-4" type="submit">Submit</button>
                            <Link to="/projects" className="btn btn-secondary m-4">Back to Projects</Link>
                            </div>
                        </div>
                        
                    </form>
                    
                </div>
                <div className="dna-image-container">
                    <img src={DNA} alt="gold dna strand" className="dna-image" />
                </div>
            </div>

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

export default CreateProject;