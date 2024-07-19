import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createRoot } from 'react-dom/client';
import ComponentItem from './ComponentItem'

const EditSurvey = () => {
  const { id } = useParams();
  const [survey, setSurvey] = useState({ name: '', description: '' });
  const [components, setComponents] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/surveys/9`)
      .then(response => response.json())
      .then(data => {
        setSurvey(data);
        setComponents(data.components || []);
      });
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/v1/surveys/9`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ survey, components }),
    });
    if (response.ok) {
      alert('Survey updated successfully');
    } else {
      alert('Failed to update survey');
    }
  };

  const handleDragEnd = (component, monitor) => {
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(component.left + delta.x);
    const top = Math.round(component.top + delta.y);

    setComponents(prevComponents =>
      prevComponents.map(item =>
        item.id === component.id ? { ...item, left, top } : item
      )
    );
  };

  const handleDrop = (component, monitor) => {
    const offset = monitor.getClientOffset();
    setComponents(prevComponents =>
      prevComponents.map(item =>
        item.id === component.id ? { ...item, left: offset.x, top: offset.y } : item
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mt-5">
        <h2 className="mb-4">Edit Survey</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-3">
            <label htmlFor="surveyName" className="form-label">Survey Name</label>
            <input
              type="text"
              id="surveyName"
              className="form-control"
              value={survey.name}
              onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surveyDescription" className="form-label">Description</label>
            <textarea
              id="surveyDescription"
              className="form-control"
              value={survey.description}
              onChange={(e) => setSurvey({ ...survey, description: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">Update Survey</button>
        </form>
        <div className="survey-editor mt-5">
          <div className="toolbox">
            {/* Add toolbox elements here */}
          </div>
          <div className="survey-container">
            {components.map(component => (
              <ComponentItem key={component.id} component={component} onDragEnd={handleDragEnd} onDrop={handleDrop}/>
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('Edit_Survey');
  if (container) {
    const root = createRoot(container);
    root.render(<EditSurvey />);
  }
});
export default EditSurvey;




