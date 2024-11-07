import React, { useState } from 'react';
import './ActivityLog.css'; // Assuming you'll create a separate CSS file for ActivityLog

function ActivityLog() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([
    { name: 'Studying', duration: '2 hours' },
    { name: 'Working Out', duration: '1 hour' },
    { name: 'Entertainment', duration: '1.5 hours' },
    { name: 'Social Media', duration: '30 minutes' }
  ]);

  const handleStartLogging = (activity) => {
    // Implement logging logic here
    console.log(`Started logging ${activity}`);
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // Here you would typically fetch or update data based on the selected timeframe
  };

  const handleEdit = (index) => {
    // Implement editing logic here
    console.log(`Editing activity at index ${index}`);
  };

  return (
    <main>
      <h2>Activity Log</h2>

      <div>
        <h3>Start Logging:</h3>
        {['Studying', 'Working Out', 'Entertainment', 'Social Media', 'New'].map((activity) => (
          <button key={activity} className="activity-btn" onClick={() => handleStartLogging(activity)}>
            {activity}
          </button>
        ))}
      </div>
      
      <div>
        <h3>Select Timeframe:</h3>
        {['Today', 'This Week', 'This Month'].map((tf) => (
          <button key={tf} onClick={() => handleTimeframeChange(tf)} className={timeframe === tf ? 'active' : ''}>
            {tf}
          </button>
        ))}
      </div>
      
      <div>
        <h3>Logged Activities</h3>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>
              {activity.name}: {activity.duration} <button onClick={() => handleEdit(index)}>Edit</button>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default ActivityLog;