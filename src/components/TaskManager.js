import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import { getTasksFromStorage, saveTasksToStorage } from '../utils/localStorage';

const TaskManager = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = getTasksFromStorage();
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
    setIsFormOpen(false);
  };

  const updateTask = (taskId, taskData) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, title: taskData.title, description: taskData.description }
        : task
    ));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || 
      (filter === 'completed' && task.completed) ||
      (filter === 'pending' && !task.completed);
    
    const matchesSearch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length
  };

  return (
    <div className="task-manager">
      <header className="task-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Task Tracker</h1>
            <p className="welcome-message">Welcome back, {user}!</p>
          </div>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="task-content">
        <div className="task-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <button 
            onClick={() => setIsFormOpen(true)}
            className="add-task-button"
          >
            + Add Task
          </button>
        </div>

        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {isFormOpen && (
          <TaskForm
            onSubmit={addTask}
            onCancel={() => setIsFormOpen(false)}
            title="Add New Task"
          />
        )}

        {editingTask && (
          <TaskForm
            onSubmit={(taskData) => updateTask(editingTask.id, taskData)}
            onCancel={() => setEditingTask(null)}
            initialData={editingTask}
            title="Edit Task"
          />
        )}

        <TaskList
          tasks={filteredTasks}
          onToggleComplete={toggleComplete}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          searchTerm={searchTerm}
        />

        {tasks.length === 0 && (
          <div className="empty-state">
            <h3>No tasks yet!</h3>
            <p>Create your first task to get started.</p>
          </div>
        )}

        {tasks.length > 0 && filteredTasks.length === 0 && (
          <div className="empty-state">
            <h3>No tasks match your filter</h3>
            <p>Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManager;