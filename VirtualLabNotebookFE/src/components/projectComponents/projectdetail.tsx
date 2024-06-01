import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DeleteSampleButton from '../sampleComponents/deletesample';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Sample {
  createdAt: ReactNode;
  id: string;
  name: string;
  description: string;
  projectId: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [samples, setSamples] = useState<Sample[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleDelete = (sampleId: string) => {
    setSamples((prevSamples) => prevSamples.filter(sample => sample.id !== sampleId));
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
                  <tr key={sample.id}>
                    <td>{sample.id}</td>
                    <td>{sample.name}</td>
                    <td>{sample.description}</td>
                    <td>{sample.createdAt}</td>
                    <DeleteSampleButton sampleId={sample.id} sampleName={sample.name} onDelete={handleDelete} projectId={''} projectName={''} />

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No samples found for this project.</p>
          )}
          
          {console.log('Link State:', { projectName: project.name, projectId: project.id })}
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
    </div>
  );
};

export default ProjectDetail;