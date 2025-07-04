import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('Please enter a username');
      return;
    }

    if (trimmedUsername.length < 2) {
      setError('Username must be at least 2 characters long');
      return;
    }

    onLogin(trimmedUsername);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Personal Task Tracker</h1>
          <p>Enter your username to get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username"
              className={error ? 'error' : ''}
              maxLength={30}
            />
            {error && <span className="error-message">{error}</span>}
          </div>
          
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        
        <div className="login-footer">
          <p className="demo-note">
            This is a demo app - no real authentication required
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;