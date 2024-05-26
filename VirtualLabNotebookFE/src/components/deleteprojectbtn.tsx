import axios from "axios";

interface DeleteButtonProps {
    projectId: string;
    onDelete: (projectId: string) => void;
}

const DeleteProjectButton: React.FC<DeleteButtonProps> =
({ projectId, onDelete })=> {
    const deleteProject = async () => {
        console.log('Deleting project with ID:', projectId)
        try{
            await axios.delete(`http://localhost:3000/api/v1/projects/${projectId}`);            onDelete(projectId);
            alert('Project deleted successfully')
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