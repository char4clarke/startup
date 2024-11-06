import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-content">
          <img 
            src="https://openclipart.org/image/800px/173843" 
            alt="Simple Clock" 
            style={{ width: '50px', height: 'auto', marginRight: '15px' }}
          />
          <h1>Time Tracker</h1>
        </div>
        <hr />
        
        {/* Navigation */}
        <nav>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/dashboard" className="active">Dashboard</Link></li>
            <li><Link to="/activity-log">Activity Log</Link></li>
            <li><Link to="/insights">Insights</Link></li>
          </ul>
        </nav>
        <hr />
      </header>

      {/* Main Content */}
      <main>
        <h2>Dashboard</h2>
        
        {/* Timeframe selection buttons */}
        <div>
          <button>Today</button>
          <button>This Week</button>
          <button>This Month</button>
        </div>
        
        {/* Placeholder for pie chart */}
        <div>
          <h3>Time Spent Breakdown</h3>
          <div style={{ width: '10px', height: '10px', textAlign: 'center' }}></div>
          <img 
            src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/pie-chart-example.svg" 
            alt="Time Spent Breakdown Pie Chart (PLACEHOLDER)" 
            style={{ width: '50%', height: '50%', objectFit: 'contain' }}
          />
        </div>
  
        {/* List of activities */}
        <h3>Activity List</h3>
        <ul>
          <li>Studying: 2 hours</li>
          <li>Working Out: 1 hour</li>
          <li>Entertainment: 1.5 hours</li>
          <li>Social Media: 30 minutes</li>
        </ul>
      </main>

      {/* Footer */}
      <footer>
        <hr />
        <span className="text-reset">Charles Clarke</span>
        <br />
        <a href="https://github.com/char4clarke/startup">GitHub</a>
      </footer>
    </div>
  );
}

export default Dashboard;
