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
import Alert from '@mui/material/Alert';
import ExportToCSVButton from '../exporttocsvbutton';
import './projects.css';


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
  id: string;
  name: string;
  description: string;
  projectId: string;
  createdAt: string;
  customFields?: { [key: string]: string };
  priorityLevel: string;
  groupAffiliation: string;
  category: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [fade, setFade] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState(''); // Default no sorting
  const [searchQuery, setSearchQuery] = useState('');
  const samplesPerPage = 5;
  const [updatedSampleId, setUpdatedSampleId] = useState<string | null>(null);
  const [showSampleUUID, setShowSampleUUID] = useState(true);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setFade(true);
        setTimeout(() => {
          setSuccessMessage(null);
          setFade(false);
        }, 1000); // Duration of the fade-out animation
      }, 3000); // Show the message for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await axios.get(`http://localhost:3000/api/v1/projects/${id}`);
        setProject(projectResponse.data);

        const samplesResponse = await axios.get(`http://localhost:3000/api/v1/projects/${id}/samples`);
        setSamples(samplesResponse.data);
      } catch (error) {
        setErrorMessage('Error fetching project details or samples');
      }
    };

    fetchProjectData();
  }, [id]);

  const handleDelete = (sampleId: string) => {
    setSamples((prevSamples) => prevSamples.filter(sample => sample.id !== sampleId));
    setSuccessMessage('Sample deleted successfully!');
  };

  const handleEditClick = (sample: Sample) => {
    setSelectedSample(sample);
    setOpen(true);
  };

  const handleCancelEdit = () => {
    setSelectedSample(null);
    setOpen(false);
  };
  // TODO: working on highlighting sample when it updates, might remove
  useEffect(() => {
    if (updatedSampleId) {
      const timer = setTimeout(() => {
        setUpdatedSampleId(null);
      }, 3000); // Duration for which the highlight should be visible
      return () => clearTimeout(timer);
    }
  }, [updatedSampleId]);

  const handleUpdate = (updatedSample: Sample) => {
    setSamples((prevSamples) =>
      prevSamples.map(sample =>
        sample.id === updatedSample.id ? updatedSample : sample
      )
    );
    setSelectedSample(null);
    setOpen(false);
    setSuccessMessage('Sample updated successfully!');
    setUpdatedSampleId(updatedSample.id); // Set the updated sample ID

  };

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

  // Collect all unique custom fields from the samples
  const customFieldKeys = Array.from(new Set(samples.flatMap(sample => sample.customFields ? Object.keys(sample.customFields) : [])));

  // Sorting logic
  const sortSamples = (samples: Sample[], criteria: string) => {
    switch (criteria) {
      case 'priority':
        return [...samples].sort((a, b) => {
          const priorityOrder: { [key: string]: number } = { 'High': 1, 'Medium': 2, 'Low': 3 };
          return priorityOrder[a.priorityLevel as keyof typeof priorityOrder] - priorityOrder[b.priorityLevel as keyof typeof priorityOrder];
        });
      case 'createdAt':
        return [...samples].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'category':
        return [...samples].sort((a, b) => a.category.localeCompare(b.category));
      default:
        return samples;
    }
  };

  const sortedSamples = sortCriteria ? sortSamples(samples, sortCriteria) : samples;

  // Filter samples based on search query
  const filterSamples = (samples: Sample[], query: string) => {
    if (!query) return samples;
    return samples.filter(sample =>
      sample.name.toLowerCase().includes(query.toLowerCase()) ||
      sample.category.toLowerCase().includes(query.toLowerCase()) ||
      sample.groupAffiliation.toLowerCase().includes(query.toLowerCase()) ||
      sample.createdAt.includes(query) ||
      (sample.customFields && Object.values(sample.customFields).some(value => value.toLowerCase().includes(query.toLowerCase())))
    );
  };

  const filteredSamples = filterSamples(sortedSamples, searchQuery);

  // Calculate the samples to display for the current page
  const indexOfLastSample = currentPage * samplesPerPage;
  const indexOfFirstSample = indexOfLastSample - samplesPerPage;
  const currentSamples = filteredSamples.slice(indexOfFirstSample, indexOfLastSample);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredSamples.length / samplesPerPage);

  // Handle pagination
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {project ? (
        <>
          {successMessage && (
            <Alert severity="success" className={fade ? 'fade-out' : ''}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <div className="container-fluid mb-4">
            <h2 id="samplesHeader" className={getPriorityClass(project.priorityLevel)}>
              {project.name}'s Samples
            </h2>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search samples"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-md-6 align-right">
              <label htmlFor="sortCriteria">Sort By:</label>
              <select
                id="sortCriteria"
                value={sortCriteria}
                onChange={(e) => setSortCriteria(e.target.value)}
                className="form-control"
                style={{ display: 'inline-block', width: 'auto', marginLeft: '10px' }}
              >
                <option value="">None</option>
                <option value="priority">Priority</option>
                <option value="createdAt">Creation Date</option>
                <option value="category">Category</option>
              </select>
              <div className="form-check form-check-inline show-sample-uuid">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="toggleSampleUUID"
                  checked={showSampleUUID}
                  onChange={() => setShowSampleUUID(!showSampleUUID)}
                />
                <label className="form-check-label" htmlFor="toggleSampleUUID">Show Sample UUID</label>
              </div>
            </div>
          </div>
          {samples.length > 0 ? (
            <div className="container table-responsive">
              <table id="projects" className="table table-hover table-bordered">
                <thead>
                  <tr>
                    {showSampleUUID && <th className="tableHead">Sample UUID</th>}
                    <th className="tableHead">Name:</th>
                    <th className="tableHead">Category:</th>
                    <th className="tableHead">Group Affiliation:</th>
                    <th className="tableHead">Priority Level:</th>
                    <th className="tableHead">Description:</th>
                    <th className="tableHead">Date Recorded:</th>
                    {customFieldKeys.map(key => (
                      <th className="tableHead" key={key}>{key}</th>
                    ))}
                    <th className="tableHead">Actions:</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSamples.map(sample => (
                    <tr key={sample.id} className={sample.id === updatedSampleId ? 'highlight' : ''}>
                      {showSampleUUID && <td>{sample.id}</td>}
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
                      {customFieldKeys.map(key => (
                        <td key={`${sample.id}-${key}`}>{sample.customFields?.[key] || 'N/A'}</td>
                      ))}
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
              <nav>
                <ul className="pagination">
                  {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
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