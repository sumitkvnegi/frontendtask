import React, { useState } from 'react';

const DraggableElement = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDragStart = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDrag = (event) => {
    if (isDragging) {
      const newPosition = {
        x: position.x + event.movementX,
        y: position.y + event.movementY,
      };
      setPosition(newPosition);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative"
      style={{ left: position.x, top: position.y }}
      draggable="true"
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <div className="relative">
        <span
          className={`absolute bg-red-500 px-2 py-1 text-white rounded-md transition-opacity ${
            isDragging ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ top: '-30px', left: '50%', transform: 'translateX(-50%)' }}
        >
          Delete
        </span>
        <div className="w-20 h-20 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
};

export default DraggableElement;
