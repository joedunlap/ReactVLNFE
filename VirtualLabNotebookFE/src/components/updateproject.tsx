import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

interface ProjectData {
  name: string;
  description: string;
  // Add other fields as necessary
}

const UpdateProject: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>(); // Extract projectId from URL parameters
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [projectData, setProjectData] = useState<ProjectData>({
    name: '',
    description: '',
    // Initialize other fields as necessary
  });

  // Fetch existing project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/projects/${projectId}`);
        setProjectData(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProject();
  }, [projectId]);

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Submitting project data:', projectData); // Log the data being sent
    try {
      await axios.patch(`http://localhost:3000/api/v1/projects/${projectId}`, projectData);
      // Handle successful update (e.g., redirect to project detail page or show a success message)
      navigate(`/projects/${projectId}`); // Redirect to project detail page
    } catch (error) {
      console.error('Error updating project:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div>
      <h2>Update Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Project Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={projectData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        {/* Add other fields as necessary */}
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default UpdateProject;