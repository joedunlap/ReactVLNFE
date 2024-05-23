import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';

interface ProjectData {
    name: string;
    description: string;
}

interface CreatedProject extends ProjectData {
    id: string;
    createdAt: string;
}

const CreateProject = () => {
   const [projectData, setProjectData] = useState({
    name: '',
    description: ''
   });
   const [successMessage, setSuccessMessage] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [createdProject, setCreatedProject] = useState<CreatedProject | null>(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevState => {
            return {
                ...prevState, [name]:value
            }
        })
    }

    const handleFormSubmit = async(e: { preventDefault: () => void; }) => {
        e.preventDefault()
        try {
            const response: AxiosResponse<CreatedProject> = 
            await axios.post('http://localhost:3000/api/v1/projects', projectData)
            console.log('New Project Created', response.data);
            setCreatedProject(response.data);
            setSuccessMessage('Project created successfully!');
            setErrorMessage('');
            setProjectData({
                name:'',
                description: ''
            });
        }
        catch(err) {
            console.log('Failed to create new project', err)
            setErrorMessage('Failed to create project. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h1 className="title">Create a New Project</h1>
            <form onSubmit={handleFormSubmit} className="container">
                <div className="projectname">
                    <input className="form-control mb-2" type="text" placeholder="Project Name" onChange={handleFormChange} value={projectData.name} name="name" />
                    <textarea className="form-control mb-2" placeholder="Description" onChange={handleFormChange} value={projectData.description} name="description" />
                <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>

            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      {createdProject && (
        <div className="created-project">
          <h2>Project Details</h2>
          <p><strong>Name:</strong> {createdProject.name}</p>
          <p><strong>Description:</strong> {createdProject.description}</p>
          <p><strong>UUID:</strong> {createdProject.id}</p>
          <p><strong>Created At:</strong> {createdProject.createdAt}</p>
        </div>
      )}



        </div>
    );
};

export default CreateProject; 