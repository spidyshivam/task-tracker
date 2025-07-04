import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import { getUserFromStorage, saveUserToStorage, removeUserFromStorage } from './utils/localStorage';
import './styles/App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = getUserFromStorage();
    if (user) {
      setCurrentUser(user);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username) => {
    setCurrentUser(username);
    saveUserToStorage(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    removeUserFromStorage();
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <TaskManager user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;