import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, searchTerm }) => {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="task-list">
      <div className="task-list-header">
        <h2>
          {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'}
          {searchTerm && (
            <span className="search-result">
              {' '}matching "{searchTerm}"
            </span>
          )}
        </h2>
      </div>
      
      <div className="task-list-content">
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;