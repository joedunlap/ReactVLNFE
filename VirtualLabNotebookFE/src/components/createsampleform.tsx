import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import FieldSelector from './fieldselector';
// Define interfaces
interface SampleData {
  name: string;
  description: string;
  customFields: { [key: string]: string };
}

interface CreatedSample extends SampleData {
  id: string;
  createdAt: string;
}

const CreateSample: React.FC = () => {
  const location = useLocation();
  const { id: projectId } = useParams<{ id: string }>();

  const state = location.state as { projectName?: string } || {};
  const projectName = state.projectName || 'Default Project Name';

  const [sampleData, setSampleData] = useState<SampleData>({
    name: '',
    description: '',
    customFields: {}
  });

  const [resetFields, setResetFields] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [createdSample, setCreatedSample] = useState<CreatedSample | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSampleData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCustomFieldChange = (name: string, value: string) => {
    setSampleData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [name]: value
      }
    }));
  };

  const handleResetComplete = () => {
    setResetFields(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response: AxiosResponse<CreatedSample> = await axios.post(
        `http://localhost:3000/api/v1/projects/${projectId}/samples`,
        sampleData
      );
      setCreatedSample(response.data);
      setSuccessMessage('Sample created successfully!');
      setErrorMessage('');
      setSampleData({
        name: '',
        description: '',
        customFields: {}
      });
      setResetFields(true);
    } catch (err) {
      console.error('Error creating sample:', err);
      setErrorMessage('Failed to create sample. Please try again.');
      setSuccessMessage('');
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
            className="form-control mb-2"
            type="text"
            name="name"
            value={sampleData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            className="form-control mb-2"
            placeholder="Optional description of sample. Use custom fields for sample data."
            name="description"
            value={sampleData.description}
            onChange={handleInputChange}
          />
        </div>
        <FieldSelector onChange={handleCustomFieldChange} reset={resetFields} onResetComplete={handleResetComplete} />
        <button className="btn btn-primary" type="submit">Create Sample</button>
        <button className="btn btn-secondary">
          <Link to={`/projects/${projectId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            Back to Current Project
          </Link>
        </button>
      </form>

      {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

      {createdSample && (
        <div className="created-sample">
          <h2>Sample Details</h2>
          <p><strong>Name:</strong> {createdSample.name}</p>
          <p><strong>Description:</strong> {createdSample.description}</p>
          <p><strong>UUID:</strong> {createdSample.id}</p>
          <p><strong>Created At:</strong> {createdSample.createdAt}</p>
        </div>
      )}
    </div>
  );
};

export default CreateSample;