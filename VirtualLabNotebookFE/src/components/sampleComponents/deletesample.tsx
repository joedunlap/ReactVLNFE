import React from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

interface DeleteButtonProps {
  projectId: string;
  projectName: string; // Add projectName prop
  onDelete: (sampleId: string) => void;
  sampleId: string; 
  sampleName: string;
}

const DeleteSampleButton: React.FC<DeleteButtonProps> = ({ projectId, onDelete, sampleId, sampleName }) => {
    const { id } = useParams<{ id: string }>();

  const deleteSample = async () => {
    const userConfirmed = window.confirm(`Are you sure you want to delete ${sampleName} (ID: ${sampleId})`);
    if (!userConfirmed) return;

    console.log('Deleting project with ID:', projectId); // Log the project ID
    try {
      await axios.delete(`http://localhost:3000/api/v1/projects/${id}/samples/${sampleId}`);
      onDelete(sampleId);
      alert('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <IconButton aria-label="delete" onClick={deleteSample} color="warning">
      <DeleteIcon />
    </IconButton>
  );
};

export default DeleteSampleButton;