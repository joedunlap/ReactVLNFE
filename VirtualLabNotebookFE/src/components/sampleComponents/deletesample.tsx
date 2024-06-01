import React, { useState } from 'react';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';

interface DeleteButtonProps {
  projectId: string;
  onDelete: (sampleId: string) => void;
  sampleId: string; 
  sampleName: string;
}

const DeleteSampleButton: React.FC<DeleteButtonProps> = ({  onDelete, sampleId, sampleName }) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteSample = async () => {
    console.log('Deleting sample with ID:', sampleId);
    try {
      await axios.delete(`http://localhost:3000/api/v1/projects/${id}/samples/${sampleId}`);
      onDelete(sampleId);
      alert('Sample deleted successfully');
    } catch (err) {
      console.error('Error deleting sample:', err);
      alert('Failed to delete sample. Please try again.');
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
            Are you sure you want to delete {sampleName} (ID: {sampleId})?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button onClick={deleteSample} color="error" variant="contained">
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteSampleButton;