import React from 'react';
import axios from 'axios';

interface DeleteButtonProps {
  projectId: string;
  projectName: string; // Add projectName prop
  onDelete: (projectId: string) => void;
}

const DeleteProjectButton: React.FC<DeleteButtonProps> = ({ projectId, projectName, onDelete }) => {
  const deleteProject = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to delete the project "${projectName}" with ID: ${projectId}?`);
    if (!userConfirmed) return;

    console.log('Deleting project with ID:', projectId); // Log the project ID
    try {
      await axios.delete(`http://localhost:3000/api/v1/projects/${projectId}`);
      onDelete(projectId);
      alert('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <button onClick={deleteProject} className="btn btn-danger">Delete</button>
  );
};

export default DeleteProjectButton;