import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import './App.css';

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

function Login() {
  return (
    <main>
      <h2>Welcome!</h2>
      <p>Please log in to access your dashboard and track your activities.</p>

      <div>
        <h3>Login</h3>
        <form action="dashboard.html" method="post">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

function Dashboard() {
  return <main><h2>Dashboard</h2></main>;
}

function ActivityLog() {
  return <main><h2>Activity Log</h2></main>;
}

function Insights() {
  return <main><h2>Insights</h2></main>;
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;