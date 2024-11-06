// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import ActivityLog from './components/ActivityLog';
import Insights from './components/Insights';

function App() {
  return (
    <div>
      <h1>My Startup App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/activity-log" element={<ActivityLog />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </div>
  );
}

export default App;
