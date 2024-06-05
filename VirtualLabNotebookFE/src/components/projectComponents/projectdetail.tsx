import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DeleteSampleButton from '../sampleComponents/deletesample';
import UpdateSample from '../sampleComponents/updatesample';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { Collapse } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Sample {
  id: string;
  name: string;
  description: string;
  projectId: string;
  createdAt: string;
  customFields?: { [key: string]: string }; // Add custom fields as an optional property
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [expandedSampleId, setExpandedSampleId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleDelete = (sampleId: string) => {
    setSamples((prevSamples) => prevSamples.filter(sample => sample.id !== sampleId));
  };

  const handleEditClick = (sample: Sample) => {
    setSelectedSample(sample);
    setOpen(true);
  };

  const handleCancelEdit = () => {
    setSelectedSample(null);
    setOpen(false);
  };

  const handleUpdate = (updatedSample: Sample) => {
    setSamples((prevSamples) => 
      prevSamples.map(sample => 
        sample.id === updatedSample.id ? updatedSample : sample
      )
    );
    setSelectedSample(null);
    setOpen(false);
  };

  const toggleExpandSample = (sampleId: string) => {
    setExpandedSampleId(expandedSampleId === sampleId ? null : sampleId);
  };

  useEffect(() => {
    // Fetch project details
    axios.get(`http://localhost:3000/api/v1/projects/${id}`)
      .then(response => setProject(response.data))
      .catch(error => setErrorMessage('Error fetching project details'));

    // Fetch samples affiliated with the project
    axios.get(`http://localhost:3000/api/v1/projects/${id}/samples`)
      .then(response => setSamples(response.data))
      .catch(error => setErrorMessage('Error fetching samples'));
  }, [id]);

  const exportToCSV = () => {
    if (!project) return;

    // Create headers for the CSV
    const headers = ["Project ID", "Project Name", "Project Description", "Project Created At"];
    const sampleHeaders = ["Sample ID", "Sample Name", "Sample Description", "Sample Created At"];
    const customFieldHeaders = new Set<string>();

    // Flatten project and sample data
    const data: any[] = samples.map(sample => {
      const flattenedSample = {
        "Project ID": project.id,
        "Project Name": project.name,
        "Project Description": project.description,
        "Project Created At": new Date(project.createdAt).toLocaleDateString(),
        "Sample ID": sample.id,
        "Sample Name": sample.name,
        "Sample Description": sample.description,
        "Sample Created At": new Date(sample.createdAt).toLocaleDateString()
      };
      
      // Add custom fields to the flattened data and headers
      if (sample.customFields) {
        Object.entries(sample.customFields).forEach(([key, value]) => {
          flattenedSample[key] = value;
          customFieldHeaders.add(key);
        });
      }

      return flattenedSample;
    });

    // Combine headers
    const combinedHeaders = [...headers, ...sampleHeaders, ...Array.from(customFieldHeaders)];

    // Convert data to CSV
    const csv = Papa.unparse({
      fields: combinedHeaders,
      data
    });

    // Save CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `project_${project.id}_samples.csv`);
  };

  return (
    <div className="container mt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {project ? (
        <>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}</p>
          
          <h3>Samples</h3>
          {samples.length > 0 ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Date Recorded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {samples.map(sample => (
                  <React.Fragment key={sample.id}>
                    <tr onClick={() => toggleExpandSample(sample.id)} style={{ cursor: 'pointer' }}>
                      <td>{sample.id}</td>
                      <td>{sample.name}</td>
                      <td>{sample.description}</td>
                      <td>{new Date(sample.createdAt).toLocaleDateString()}</td>
                      <td>
                        <DeleteSampleButton sampleId={sample.id} sampleName={sample.name} onDelete={handleDelete} projectId={id!} projectName={project.name} />
                        <IconButton onClick={(e) => { e.stopPropagation(); handleEditClick(sample); }} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={5}>
                        <Collapse in={expandedSampleId === sample.id} timeout="auto" unmountOnExit>
                          <div className="p-3">
                            <p><strong>ID:</strong> {sample.id}</p>
                            <p><strong>Name:</strong> {sample.name}</p>
                            <p><strong>Description:</strong> {sample.description}</p>
                            <p><strong>Date Recorded:</strong> {new Date(sample.createdAt).toLocaleDateString()}</p>
                            {sample.customFields && (
                              <>
                                <h5>Custom Fields</h5>
                                <ul>
                                  {Object.entries(sample.customFields).map(([key, value]) => (
                                    <li key={key}><strong>{key}:</strong> {value}</li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No samples found for this project.</p>
          )}
          
          <Button onClick={exportToCSV} variant="contained" color="violet" className="m-4">
            Export to CSV
          </Button>
          <Link 
            to={`/projects/${id}/create-sample`}
            state={{ projectName: project.name, projectId: project.id }}
            className="btn btn-primary m-4"
          >
            Create Sample
          </Link>
          <Link to="/projects" className='btn btn-secondary m-4'>Go Back to List of Projects</Link>
        </>
      ) : (
        <p>Loading project details...</p>
      )}
      <Dialog open={open} onClose={handleCancelEdit} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
        <DialogTitle id="form-dialog-title">Update Sample</DialogTitle>
        <DialogContent>
          {selectedSample && <UpdateSample sample={selectedSample} onUpdate={handleUpdate} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;