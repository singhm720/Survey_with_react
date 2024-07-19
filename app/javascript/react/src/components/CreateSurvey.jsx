import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const CreateSurvey = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/v1/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, description}),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = `/EditSurvey/${data.id}`;
    } else {
      alert('Failed to create survey');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Create Survey</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="surveyName" className="form-label">Survey Name</label>
          <input type="text" id="surveyName" className="form-control" placeholder="Survey Name" value={name}
            onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="surveyDescription" className="form-label">Description</label>
          <textarea id="surveyDescription" className="form-control" placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Create Survey</button>
      </form>
    </div>
  );
};
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('Create_Survey');
  if (container) {
    const root = createRoot(container);
    root.render(<CreateSurvey />);
  }
});
export default CreateSurvey;
