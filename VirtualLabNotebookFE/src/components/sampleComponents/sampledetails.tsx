import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface Sample {
  id: string;
  name: string;
  description: string;
  projectId: string;
  createdAt: string;
  customFields?: { [key: string]: string };
}

const SampleDetail: React.FC = () => {
  const { projectId, sampleId } = useParams<{ projectId: string; sampleId: string }>();
  const [sample, setSample] = useState<Sample | null>(null);
  const [formData, setFormData] = useState<Sample | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    console.log('Fetching sample details for:', { projectId, sampleId });
    // Fetch sample details
    axios.get(`http://localhost:3000/api/v1/projects/${projectId}/samples/${sampleId}`)
      .then(response => {
        console.log('Sample details fetched successfully:', response.data);
        setSample(response.data);
        setFormData(response.data); // Set form data to fetched sample details
      })
      .catch(error => {
        console.error('Error fetching sample details:', error);
        setErrorMessage('Error fetching sample details');
      });
  }, [projectId, sampleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => prevData ? { ...prevData, [name]: value } : null);
  };

  const handleCustomFieldChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setFormData(prevData => {
      if (!prevData) return null;
      return { ...prevData, customFields: { ...prevData.customFields, [field]: value } };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    if (formData) {
      axios.put(`http://localhost:3000/api/v1/projects/${projectId}/samples/${sampleId}`, formData)
        .then(response => {
          console.log('Sample updated successfully:', response.data);
          setSample(response.data);
          setFormData(response.data);
        })
        .catch(error => {
          console.error('Error updating sample:', error);
          setErrorMessage('Error updating sample');
        });
    }
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:3000/api/v1/projects/${projectId}/samples/${sampleId}`)
      .then(() => {
        console.log('Sample deleted successfully');
        navigate(`/projects/${projectId}`);
      })
      .catch(error => {
        console.error('Error deleting sample:', error);
        setErrorMessage('Error deleting sample');
      });
  };

  if (!formData) {
    return (
      <div className="container mt-5">
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : <p>Loading sample details...</p>}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Sample Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="id">ID</label>
          <input type="text" id="id" name="id" className="form-control lg" value={formData.id} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="projectId">Project ID</label>
          <input type="text" id="projectId" name="projectId" className="form-control" value={formData.projectId} readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="createdAt">Date Recorded</label>
          <input type="text" id="createdAt" name="createdAt" className="form-control" value={new Date(formData.createdAt).toLocaleDateString()} readOnly />
        </div>
        {formData.customFields && (
          <>
            <h5>Custom Fields</h5>
            {Object.entries(formData.customFields).map(([key, value]) => (
              <div className="form-group" key={key}>
                <label htmlFor={key}>{key}</label>
                <input type="text" id={key} name={key} className="form-control" value={value} onChange={(e) => handleCustomFieldChange(e, key)} />
              </div>
            ))}
          </>
        )}
        <button type="submit" className="btn btn-primary mt-4">Save Changes</button>
        <button type="button" className="btn btn-danger mt-4 ml-2" onClick={() => setShowModal(true)}>Delete Sample</button>
      </form>
      <Link to={`/projects/${formData.projectId}`} className="btn btn-secondary mt-4">Back to Project</Link>

      {/* Confirmation Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirm Delete</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this sample?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleDetail;