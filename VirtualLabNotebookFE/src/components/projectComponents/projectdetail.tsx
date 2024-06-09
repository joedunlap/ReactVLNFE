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
import ExportToCSVButton from '../exporttocsvbutton';
import './projects.css'

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  category: string;
  groupAffiliation: string;
  priorityLevel: string;
}

interface Sample {
  groupAffiliation: ReactNode;
  priorityLevel: string;
  category: ReactNode;
  id: string;
  name: string;
  description: string;
  projectId: string;
  createdAt: string;
  customFields?: { [key: string]: string };
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
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

  const getPriorityClass = (priorityLevel: string) => {
    switch (priorityLevel) {
        case 'High':
            return 'priority-high';
        case 'Medium':
            return 'priority-medium';
        case 'Low':
            return 'priority-low';
        default:
            return '';
    }
};

  return (
    <div className="container mt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {project ? (
        <>
          <div className="container-fluid mb-4">
          <h2 id="samplesHeader" className={getPriorityClass(project.priorityLevel)}>
                                {project.name}'s Samples</h2>
          
          </div>
          
          {samples.length > 0 ? (
            <table id="projects" className="table table-hover">
            <thead>
                <tr>
                  <th className="tableHead">Sample UUID:</th>
                  <th className="tableHead">Name:</th>
                  <th className="tableHead">Category:</th>
                  <th className="tableHead">Group Affiliation:</th>
                  <th className="tableHead">Priority Level:</th>
                  <th className="tableHead">Description:</th>
                  <th className="tableHead">Date Recorded:</th>
                  <th className="tableHead">Actions:</th>
                </tr>
              </thead>
              <tbody>
                {samples.map(sample => (
                  <tr key={sample.id}>
                    <td>{sample.id}</td>
                    <td>
                      <Link to={`/projects/${id}/samples/${sample.id}`} state={{ sample }}>
                        {sample.name}
                      </Link>
                    </td>
                    <td>{sample.category}</td>
                    <td>{sample.groupAffiliation}</td>
                    <td className={getPriorityClass(sample.priorityLevel)}>
                                {sample.priorityLevel}
                            </td>
                    <td>{sample.description}</td>
                    <td>{new Date(sample.createdAt).toLocaleDateString()}</td>
                    <td>
                      <DeleteSampleButton sampleId={sample.id} sampleName={sample.name} onDelete={handleDelete} projectId={id!} projectName={project.name} />
                      <IconButton onClick={() => handleEditClick(sample)} aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No samples found for this project.</p>
          )}
          
          <ExportToCSVButton project={project} samples={samples} />
          <Link 
            to={`/projects/${id}/create-sample`}
            state={{ 
              projectName: project.name, 
              projectId: project.id,
              category: project.category,
              groupAffiliation: project.groupAffiliation,
              priorityLevel: project.priorityLevel
            }}
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