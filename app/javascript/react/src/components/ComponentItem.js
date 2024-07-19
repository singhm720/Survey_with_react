import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ComponentItem = ({ component, onDragEnd, onDrop }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'COMPONENT', component },
    end: (item, monitor) => onDragEnd(item.component, monitor),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'COMPONENT',
    drop: (item, monitor) => onDrop(item.component, monitor),
  });

  return (
    <div ref={(node) => drag(drop(node))}
      style={{
        position: 'absolute',
        left: component.left,
        top: component.top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {component.type === 'label' ? (
        <label>{component.text}</label>
      ) : (
        <input type="text" placeholder={component.placeholder} />
      )}
    </div>
  );
};

export default ComponentItem;
