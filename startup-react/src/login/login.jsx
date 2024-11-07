import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    // Here you would typically handle the login logic
    // For now, we'll just simulate a successful login
    console.log('Login attempted with:', username, password);
    // Redirect to dashboard after successful login
    navigate('/dashboard');
  };

  return (
    <main>
      <h2>Welcome!</h2>
      <p>Please log in to access your dashboard and track your activities.</p>

      <div>
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
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
        </form>
      </div>
    </main>
  );
}

export default Login;