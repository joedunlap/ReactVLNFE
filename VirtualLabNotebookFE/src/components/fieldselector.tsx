import React, { useState, ChangeEvent, useEffect } from 'react';

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
      <div>
        <label>
          <input type="checkbox" name="weight" checked={checkboxState.weight} onChange={handleCheckboxChange} />
          Weight
        </label>
        <label>
          <input type="checkbox" name="dilution" checked={checkboxState.dilution} onChange={handleCheckboxChange} />
          Dilution
        </label>
        <label>
          <input type="checkbox" name="assays" checked={checkboxState.assays} onChange={handleCheckboxChange} />
          Assays
        </label>
        <label>
          <input type="checkbox" name="status" checked={checkboxState.status} onChange={handleCheckboxChange} />
          Status
        </label>
        <label>
          <input type="checkbox" name="volume" checked={checkboxState.volume} onChange={handleCheckboxChange} />
          Volume
        </label>
        <label>
          <input type="checkbox" name="treatment" checked={checkboxState.treatment} onChange={handleCheckboxChange} />
          Treatment
        </label>
        <label>
          <input type="checkbox" name="tags" checked={checkboxState.tags} onChange={handleCheckboxChange} />
          Tags
        </label>
        {/* Add more checkboxes as needed */}
      </div>

      {selectedFields.includes('weight') && (
        <div>
          <label>Weight:</label>
          <input className="form-control mb-2" type="text" name="weight" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('dilution') && (
        <div>
          <label>Dilution:</label>
          <input className="form-control mb-2" type="text" name="dilution" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('assays') && (
        <div>
          <label>Assays:</label>
          <input className="form-control mb-2" type="text" name="assays" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('status') && (
        <div>
          <label>Status:</label>
          <input className="form-control mb-2" type="text" name="status" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('volume') && (
        <div>
          <label>Volume:</label>
          <input className="form-control mb-2" type="text" name="volume" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('treatment') && (
        <div>
          <label>Treatment:</label>
          <input className="form-control mb-2" type="text" name="treatment" onChange={handleInputChange} />
        </div>
      )}
      {selectedFields.includes('tags') && (
        <div>
          <label>Tags:</label>
          <input className="form-control mb-2" type="text" name="tags" onChange={handleInputChange} />
        </div>
      )}
    </div>
  );
};

export default FieldSelector;