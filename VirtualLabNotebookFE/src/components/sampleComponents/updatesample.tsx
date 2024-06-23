import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import FieldSelector from '../fieldselector/fieldselector';

interface Sample {
    id: string;
    name: string;
    description: string;
    projectId: string;
    customFields?: { [key: string]: string };
    priorityLevel: string;
    category: string;
    groupAffiliation: string;
    createdAt: string;
}

interface UpdateSampleProps {
    sample: Sample;
    onUpdate: (updatedSample: Sample) => void;
}

const UpdateSample: React.FC<UpdateSampleProps> = ({ sample, onUpdate }) => {
    const [formData, setFormData] = useState<Sample>({
        id: '',
        name: '',
        description: '',
        createdAt: '',
        projectId: '',
        customFields: {},
        priorityLevel: '',
        category: '',
        groupAffiliation: ''
    });
    const [resetFields, setResetFields] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        setFormData({
            name: sample.name,
            description: sample.description,
            id: sample.id,
            createdAt: sample.createdAt,
            projectId: sample.projectId,
            customFields: sample.customFields || {},
            priorityLevel: sample.priorityLevel,
            category: sample.category,
            groupAffiliation: sample.groupAffiliation
        });
    }, [sample]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

    const handleCustomFieldChange = (name: string, value: string) => {
        setFormData(prevData => ({
            ...prevData,
            customFields: {
                ...prevData.customFields,
                [name]: value
            }
        }));
    };

    const handleResetComplete = () => {
        setResetFields(false);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.patch<Sample>(`http://localhost:3000/api/v1/projects/${sample.projectId}/samples/${sample.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            onUpdate(response.data);
            setSuccessMessage("Sample updated successfully!");
            setLoading(false);
            setTimeout(() => {
                setSuccessMessage(null); 
            }, 5000);   // Automatically clear the message after 5 seconds
        } catch (err) {
            const error = err as AxiosError;
            setError(error.message);
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <form onSubmit={handleSubmit}>
            {successMessage && <div className="alert alert-success">Sample was successfully updated!</div>}
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <input id="description" name="description" type="text" value={formData.description} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="priorityLevel">Priority Level:</label>
                <select id="priorityLevel" name="priorityLevel" value={formData.priorityLevel} onChange={handleChange} className="form-control">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input id="category" name="category" type="text" value={formData.category} readOnly className="form-control" />
            </div>
            <div className="form-group">
                <label htmlFor="groupAffiliation">Group Affiliation:</label>
                <input id="groupAffiliation" name="groupAffiliation" type="text" value={formData.groupAffiliation} readOnly className="form-control" />
            </div>
            {Object.entries(formData.customFields || {}).map(([key, value]) => (
                <div className="form-group" key={key}>
                    <label htmlFor={`customFields.${key}`}>{key}:</label>
                    <input id={`customFields.${key}`} name={`customFields.${key}`} type="text" value={value} onChange={handleChange} className="form-control" />
                </div>
            ))}
            <FieldSelector onChange={handleCustomFieldChange} reset={resetFields} onResetComplete={handleResetComplete} />
            <button type="submit" className="btn btn-primary mt-3">Update Sample</button>
        </form>
    );
};

export default UpdateSample;