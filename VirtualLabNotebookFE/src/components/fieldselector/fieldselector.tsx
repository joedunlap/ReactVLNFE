import React, { useState, ChangeEvent, useEffect } from 'react';
import './fieldselect.css'

interface FieldSelectorProps {
  onChange: (name: string, value: string) => void;
  reset: boolean;
  onResetComplete: () => void;
}

const FieldSelector: React.FC<FieldSelectorProps> = ({ onChange, reset, onResetComplete }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({
    weight: false,
    dilution: false,
    assays: false,
    status: false,
    volume: false,
    treatment: false,
    tags: false,
  });

  useEffect(() => {
    if (reset) {
      setSelectedFields([]);
      setCheckboxState({
        weight: false,
        dilution: false,
        assays: false,
        status: false,
        volume: false,
        treatment: false,
        tags: false,
      });
      onResetComplete();
    }
  }, [reset, onResetComplete]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCheckboxState((prev) => ({
      ...prev,
      [name]: checked,
    }));
    setSelectedFields((prevFields) =>
      checked ? [...prevFields, name] : prevFields.filter((field) => field !== name)
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <div>
      <label>Custom Fields:</label>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="weight" name="weight" checked={checkboxState.weight} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="weight">
          Weight
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="dilution" name="dilution" checked={checkboxState.dilution} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="dilution">
          Dilution
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="assays" name="assays" checked={checkboxState.assays} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="assays">
          Assays
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="status" name="status" checked={checkboxState.status} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="status">
          Status
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="volume" name="volume" checked={checkboxState.volume} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="volume">
          Volume
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="treatment" name="treatment" checked={checkboxState.treatment} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="treatment">
          Treatment
        </label>
      </div>
      <div className="form-check">
        <input type="checkbox" className="form-check-input" id="tags" name="tags" checked={checkboxState.tags} onChange={handleCheckboxChange} />
        <label className="form-check-label" htmlFor="tags">
          Tags
        </label>
      </div>
      {/* Add more checkboxes as needed */}

      {selectedFields.includes('weight') && (
        <div className="mb-3">
          <label htmlFor="weightInput">Weight:</label>
          <input className="form-control" type="text" id="weightInput" name="weight" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('dilution') && (
        <div className="mb-3">
          <label htmlFor="dilutionInput">Dilution:</label>
          <input className="form-control" type="text" id="dilutionInput" name="dilution" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('assays') && (
        <div className="mb-3">
          <label htmlFor="assaysInput">Assays:</label>
          <input className="form-control" type="text" id="assaysInput" name="assays" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('status') && (
        <div className="mb-3">
          <label htmlFor="statusInput">Status:</label>
          <input className="form-control" type="text" id="statusInput" name="status" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('volume') && (
        <div className="mb-3">
          <label htmlFor="volumeInput">Volume:</label>
          <input className="form-control" type="text" id="volumeInput" name="volume" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('treatment') && (
        <div className="mb-3">
          <label htmlFor="treatmentInput">Treatment:</label>
          <input className="form-control" type="text" id="treatmentInput" name="treatment" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('tags') && (
        <div className="mb-3">
          <label htmlFor="tagsInput">Tags:</label>
          <input className="form-control" type="text" id="tagsInput" name="tags" onChange={handleInputChange} />
        </div>
      )}
    </div>
  );
};

export default FieldSelector;