import React from 'react';
import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import ActivityLog from './activityLog/ActivityLog';
import Insights from './insights/Insights';
import { useAuth } from './login/AuthContext';

function App() {
  const auth = useAuth();
  const isAuthenticated = auth?.user != null;

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <div className='body bg-dark text-light'>
      <header>
        <div className="header-top">
          <div className="header-content">
            <img src="https://openclipart.org/image/800px/173843" 
                 alt="Simple Clock" 
                 style={{width: '50px', height: 'auto', marginRight: '15px'}} />
            <h1>Time Tracker</h1>
          </div>
          {isAuthenticated && (
            <button onClick={auth.logout} className='btn-logout'>Logout</button>
          )}
        </div>
        <hr />
        <nav>
          <menu>
            {!isAuthenticated ? (
              <li><NavLink to="/" end>Login</NavLink></li>
            ) : (
              <>
                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                <li><NavLink to="/activity-log">Activity Log</NavLink></li>
                <li><NavLink to="/insights">Insights</NavLink></li>
              </>
            )}
          </menu>
        </nav>
        <hr />
      </header>

      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/activity-log' element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
        <Route path='/insights' element={<ProtectedRoute><Insights /></ProtectedRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className='bg-dark text-dark text-muted'>
        <div className='container-fluid'>
          <span className='text-reset'>Charles Clarke</span>
          <br />
          <a className='text-reset' href='https://github.com/char4clarke/startup'>GitHub</a>
        </div>
      </footer>
    </div>
  );
}

function NotFound() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      404: Return to sender. Address unknown.
    </main>
  );
}

export default App;