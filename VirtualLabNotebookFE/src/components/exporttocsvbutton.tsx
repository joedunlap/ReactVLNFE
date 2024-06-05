import React from 'react';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface Sample {
  id: string;
  name: string;
  description: string;
  projectId: string;
  createdAt: string;
  customFields?: { [key: string]: string };
}

interface ExportToCSVButtonProps {
  project: Project;
  samples: Sample[];
}

const ExportToCSVButton: React.FC<ExportToCSVButtonProps> = ({ project, samples }) => {
  const exportToCSV = () => {
    if (!project) return;

    // Create headers for the CSV
    const headers = ["Project ID", "Project Name", "Project Description", "Project Created At"];
    const sampleHeaders = ["Sample ID", "Sample Name", "Sample Description", "Sample Created At"];
    const customFieldHeaders = new Set<string>();

    // Flatten project and sample data
    const data: any[] = samples.map(sample => {
      const flattenedSample = {
        "Project ID": project.id,
        "Project Name": project.name,
        "Project Description": project.description,
        "Project Created At": new Date(project.createdAt).toLocaleDateString(),
        "Sample ID": sample.id,
        "Sample Name": sample.name,
        "Sample Description": sample.description,
        "Sample Created At": new Date(sample.createdAt).toLocaleDateString()
      };

      // Add custom fields to the flattened data and headers
      if (sample.customFields) {
        Object.entries(sample.customFields).forEach(([key, value]) => {
          flattenedSample[key] = value;
          customFieldHeaders.add(key);
        });
      }

      return flattenedSample;
    });

    // Combine headers
    const combinedHeaders = [...headers, ...sampleHeaders, ...Array.from(customFieldHeaders)];

    // Convert data to CSV
    const csv = Papa.unparse({
      fields: combinedHeaders,
      data
    });

    // Save CSV file
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `project_${project.id}_samples.csv`);
  };

  return (
    <Button onClick={exportToCSV} variant="contained" color="violet" className="m-4">
      Export to CSV
    </Button>
  );
};

export default ExportToCSVButton;