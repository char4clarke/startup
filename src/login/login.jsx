import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle login attempt
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        login(data.email); // Update auth context with email
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to dashboard after successful login
      } else if (response.status === 401) {
        setErrorMessage('Invalid credentials. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  // Handle account creation
  const handleCreateAccount = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        login(username); // Update auth context with username
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/dashboard'); // Redirect to dashboard after successful registration
      } else if (response.status === 409) {
        setErrorMessage('User already exists. Please log in.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <main>
      <h2>Welcome!</h2>
      <p>Please log in to access your dashboard and track your activities.</p>

      <div>
        <h3>Login</h3>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <br />
          <button type="submit">Login</button>
          {/* Add Create button next to Login */}
          <button type="button" onClick={handleCreateAccount} style={{ marginLeft: '10px' }}>
            Create Account
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;