import { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
   const [projectData, setProjectData] = useState({
    name: '',
    description: ''
   })

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProjectData(prevState => {
            return {
                ...prevState, [name]:value
            }
        })
    }

    const handleFormSubmit = async(e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:3000/api/v1/projects', projectData)
            console.log('New Project Created')
            window.location.reload()
        }
        catch(err) {
            console.log('Failed to create new project', err)
        }
    }

    return (
        <div>
            <h1 className="title">Create a New Project</h1>
            <form onSubmit={handleFormSubmit} className="container">
                <div className="projectname">
                    <input type="text" placeholder="Project Name" onChange={handleFormChange} value={projectData.name} name='projectName' />
                    <input type="text" placeholder="Description" onChange={handleFormChange} value={projectData.description} name='projectDescription' />
                <button>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreateProject; 