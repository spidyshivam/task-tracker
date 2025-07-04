import React from 'react';

const TaskFilter = ({ filter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="task-filter">
      <div className="filter-tabs">
        {filters.map(({ key, label, count }) => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`filter-tab ${filter === key ? 'active' : ''}`}
          >
            <span className="filter-label">{label}</span>
            <span className="filter-count">{count}</span>
          </button>
        ))}
      </div>
      
      <div className="filter-summary">
        <div className="summary-item">
          <span className="summary-label">Total:</span>
          <span className="summary-value">{taskCounts.all}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Pending:</span>
          <span className="summary-value">{taskCounts.pending}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Completed:</span>
          <span className="summary-value">{taskCounts.completed}</span>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;