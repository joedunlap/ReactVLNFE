import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface DeleteButtonProps {
  projectId: string;
  projectName: string;
  onDelete: (projectId: string) => void;
}

const DeleteProjectButton: React.FC<DeleteButtonProps> = ({ projectId, projectName, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteProject = async () => {
    console.log('Deleting project with ID:', projectId);
    try {
      await axios.delete(`http://localhost:3000/api/v1/projects/${projectId}`);
      onDelete(projectId);
      alert('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Please try again.');
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <IconButton aria-label="delete" onClick={handleOpen} color="warning">
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
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
          <Typography id="modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete {projectName} (ID: {projectId})?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={deleteProject} color="error" variant="contained">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteProjectButton;