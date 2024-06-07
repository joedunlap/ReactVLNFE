import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Sample {
    id: string;
    name: string;
    description: string;
    projectId: string;
    customFields?: { [key: string]: string };
}

interface UpdateSampleProps {
    sample: Sample;
    onUpdate: (updatedSample: Sample) => void;
}

const UpdateSample: React.FC<UpdateSampleProps> = ({ sample, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        id: '',
        projectId: '',
        customFields: {}
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            name: sample.name,
            description: sample.description,
            id: sample.id,
            projectId: sample.projectId,
            customFields: sample.customFields || {}
        });
    }, [sample]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name.startsWith('customFields.')) {
            const fieldName = name.split('.')[1];
            setFormData(prevData => ({
                ...prevData,
                customFields: {
                    ...prevData.customFields,
                    [fieldName]: value
                }
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch(`http://localhost:3000/api/v1/projects/${sample.projectId}/samples/${sample.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onUpdate(response.data);
            setSuccessMessage("Sample updated successfully!");
            console.log('success message set')
            setLoading(false);
            setTimeout(() => {
                console.log('clearing success message')
            setSuccessMessage(null); }, 5000);   // Automatically clear the message after 5 seconds
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <div className="alert alert-success">Sample was succesfully updated!</div>}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input id="description" name="description" type="text" value={formData.description} onChange={handleChange} className="form-control" />
            </div>
            {Object.entries(formData.customFields).map(([key, value]) => (
                <div className="form-group" key={key}>
                    <label htmlFor={`customFields.${key}`}>{key}:</label>
                    <input id={`customFields.${key}`} name={`customFields.${key}`} type="text" value={value} onChange={handleChange} className="form-control" />
                </div>
            ))}
            <button type="submit" className="btn btn-primary mt-3">Update Sample</button>
        </form>
    );
};

export default UpdateSample;