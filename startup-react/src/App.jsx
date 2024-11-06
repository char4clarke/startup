import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './login/Login';
import Dashboard from './dashboard/Dashboard';
import ActivityLog from './activityLog/ActivityLog';
import Insights from './insights/Insights';

function App() {
  return (
    <BrowserRouter>
      <div className='body'>
        <header>
          <div className="header-content">
            <img src="https://openclipart.org/image/800px/173843" 
                 alt="Simple Clock" 
                 style={{width: '50px', height: 'auto', marginRight: '15px'}} />
            <h1>Time Tracker</h1>
          </div>
          <hr />
          <nav>
            <menu>
              <li><NavLink className='nav-link' to='' end>Login</NavLink></li>
              <li><NavLink className='nav-link' to='dashboard'>Dashboard</NavLink></li>
              <li><NavLink className='nav-link' to='activity-log'>Activity Log</NavLink></li>
              <li><NavLink className='nav-link' to='insights'>Insights</NavLink></li>
            </menu>
          </nav>
          <hr />
        </header>

        <Routes>
          <Route path='/' element={<Login />} exact />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/activity-log' element={<ActivityLog />} />
          <Route path='/insights' element={<Insights />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <footer>
          <hr />
          <span className="text-reset">Charles Clarke</span>
          <br />
          <a href="https://github.com/char4clarke/startup">GitHub</a>
        </footer>
      </div>
    </BrowserRouter>
  );
}


export default App;