import React from 'react';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete, searchTerm }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="highlight">{part}</mark>
      ) : part
    );
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : 'pending'}`}>
      <div className="task-content">
        <div className="task-main">
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleComplete(task.id)}
              className="checkbox"
            />
          </div>
          
          <div className="task-details">
            <h3 className="task-title">
              {highlightText(task.title, searchTerm)}
            </h3>
            {task.description && (
              <p className="task-description">
                {highlightText(task.description, searchTerm)}
              </p>
            )}
            <div className="task-meta">
              <span className="task-date">
                Created: {formatDate(task.createdAt)}
              </span>
              <span className={`task-status ${task.completed ? 'completed' : 'pending'}`}>
                {task.completed ? ' Completed' : ' Pending'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="task-actions">
          <button
            onClick={() => onEdit(task)}
            className="edit-button"
            title="Edit task"
          >
            Edit️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="delete-button"
            title="Delete task"
          >
            Delete️
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;