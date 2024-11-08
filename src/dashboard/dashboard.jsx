import React, { useState } from 'react';
import './Dashboard.css'; // Assuming you'll create a separate CSS file for Dashboard

function Dashboard() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([
    { name: 'Studying', duration: '2 hours' },
    { name: 'Working Out', duration: '1 hour' },
    { name: 'Entertainment', duration: '1.5 hours' },
    { name: 'Social Media', duration: '30 minutes' }
  ]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // Here you would typically fetch or update data based on the selected timeframe
  };

  return (
    <main>
      <h2>Dashboard</h2>
      
      <div>
        {['Today', 'This Week', 'This Month'].map((tf) => (
          <button 
            key={tf} 
            onClick={() => handleTimeframeChange(tf)}
            className={timeframe === tf ? 'active' : ''}
          >
            {tf}
          </button>
        ))}
      </div>
      
      <div>
        <h3>Time Spent Breakdown</h3>
        <div style={{width: '10px', height: '10px', textAlign: 'center'}}></div>
        <img 
          src="https://www.jaspersoft.com/content/dam/jaspersoft/images/graphics/infographics/pie-chart-example.svg" 
          alt="Time Spent Breakdown Pie Chart (PLACEHOLDER)" 
          style={{width: '50%', height: '50%', objectFit: 'contain'}}
        />
      </div>

      <h3>Activity List</h3>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity.name}: {activity.duration}</li>
        ))}
      </ul>
    </main>
  );
}

export default Dashboard;