import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DeleteSampleButton from './deletesample';
import UpdateSample from './updatesample';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('Fetching sample details for:', { projectId, sampleId });
    axios.get(`http://localhost:3000/api/v1/projects/${projectId}/samples/${sampleId}`)
      .then(response => {
        console.log('Sample details fetched successfully:', response.data);
        setSample(response.data);
      })
      .catch(error => {
        console.error('Error fetching sample details:', error);
        setErrorMessage('Error fetching sample details');
      });
  }, [projectId, sampleId]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = (updatedSample: Sample) => {
    setSample(updatedSample);
    handleClose();
  };

  if (!sample) {
    return (
      <div className="container mt-5">
        {errorMessage ? <div className="alert alert-danger">{errorMessage}</div> : <p>Loading sample details...</p>}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Sample Details</h2>
          <IconButton onClick={handleOpen} aria-label="edit">
            <EditIcon />
          </IconButton>
          <DeleteSampleButton projectId={projectId} sampleId={sample.id} sampleName={sample.name} onDelete={() => console.log('Deleted')} />
        </div>
        <div className="card-body">
          <p><strong>Sample ID:</strong> {sample.id}</p>
          <p><strong>Project ID:</strong> {sample.projectId}</p>
          <p><strong>Name:</strong> {sample.name}</p>
          <p><strong>Description:</strong> {sample.description}</p>
          <p><strong>Date Recorded:</strong> {new Date(sample.createdAt).toLocaleDateString()}</p>
          {sample.customFields && (
            <>
              <h5>Custom Fields</h5>
              {Object.entries(sample.customFields).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {value}</p>
              ))}
            </>
          )}
        </div>
      </div>
      <Link to={`/projects/${sample.projectId}`} className="btn btn-secondary mt-4">Back to Project</Link>

      <Dialog open={open} onClose={handleClose} aria-labelledby="update-sample-dialog">
        <DialogContent>
          <UpdateSample sample={sample} onUpdate={handleUpdate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SampleDetail;