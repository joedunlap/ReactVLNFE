import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateSample = () => {
  const location = useLocation();
  const { projectName, projectId } = location.state || { projectName: '', projectId: '' };

  const [sampleData, setSampleData] = useState({
    name: '',
    projectId: '',
    briefdescription: '',
    customFields: {}
  });

  useEffect(() => {
    // Set the projectId in the state from the location state
    setSampleData((prev) => ({
      ...prev,
      projectId: projectId
    }));
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSampleData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setSampleData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [name]: { value }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/samples', sampleData);
      console.log('Sample created:', response.data);
    } catch (err) {
      console.error('Error creating sample:', err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Create Sample for {projectName}</h1>
      <p>Project ID: {projectId}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={sampleData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Project ID:</label>
          <input
            type="text"
            name="projectId"
            value={sampleData.projectId}
            onChange={handleInputChange}
            required
            readOnly
          />
        </div>
        <div>
          <label>Brief Description:</label>
          <textarea
            placeholder="optional description of sample. use custom fields for sample data."
            name="briefdescription"
            value={sampleData.briefdescription}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Custom Fields:</label>
          <input
            type="text"
            name="weight"
            placeholder="Weight"
            onChange={handleCustomFieldChange}
          />
          <input
            type="text"
            name="dilution"
            placeholder="Dilution"
            onChange={handleCustomFieldChange}
          />
          {/* Add more custom fields as needed */}
        </div>
        <button type="submit">Create Sample</button>
      </form>
    </div>
  );
};

export default CreateSample;