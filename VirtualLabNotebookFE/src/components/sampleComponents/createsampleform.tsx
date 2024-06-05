import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import FieldSelector from '../fieldselector/fieldselector';
import { Modal, Box, Typography, Button } from '@mui/material';

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
  const [openModal, setOpenModal] = useState(false);
  const [createdSample, setCreatedSample] = useState<CreatedSample | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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
        sampleData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setCreatedSample(response.data);
      setOpenModal(true);
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
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
        <button className="btn btn-primary m-4" type="submit">Create Sample</button>
        <Link to={`/projects/${projectId}`} className="btn btn-secondary m-4">
          Back to Current Project
        </Link>
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
          width: 400,
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
                  <Typography sx={{ color: '#155724' }}>Sample was successfully created!</Typography>
                </Box>
                <div><strong>Name:</strong> {createdSample?.name}</div>
                <div><strong>Description:</strong> {createdSample?.description}</div>
                <div><strong>UUID:</strong> {createdSample?.id}</div>
                <div><strong>Created At:</strong> {createdSample?.createdAt}</div>
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

export default CreateSample;