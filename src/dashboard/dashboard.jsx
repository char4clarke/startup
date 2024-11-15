import React, { useState, useEffect } from 'react';
import './Dashboard.css'; // Assuming you'll create a separate CSS file for Dashboard

function Dashboard() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([]); // Initialize as empty array
  const [message, setMessage] = useState(''); // For success/error messages

  // Fetch activities from the backend when the component mounts or when timeframe changes
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userId = '123'; // Replace this with actual user ID from auth context or localStorage
        const response = await fetch(`/api/activities/${userId}`); // Fetch all activities
        
        if (response.ok) {
          const data = await response.json();
          setActivities(data); // Set fetched activities in state
        } else {
          console.error('Failed to fetch activities');
          setMessage('Failed to fetch activities.');
        }
      } catch (error) {
        console.error('Error fetching activities:', error);
        setMessage('An error occurred while fetching activities.');
      }
    };

    fetchActivities();
  }, [timeframe]); // Re-fetch when timeframe changes

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    // Here you would typically fetch or update data based on the selected timeframe
  };

  // Calculate total time spent per activity
  const calculateTotalTimePerActivity = () => {
    const totals = {};

    activities.forEach((activity) => {
      if (!totals[activity.activity]) {
        totals[activity.activity] = 0;
      }
      totals[activity.activity] += parseFloat(activity.duration); // Sum durations
    });

    return totals;
  };

  const totalTimes = calculateTotalTimePerActivity();

  return (
    <main>
      <h2>Dashboard</h2>
      
      <div>
        {/* Timeframe Buttons */}
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
      {message && <p>{message}</p>} {/* Display success/error message */}
      
      {/* Display Total Time Spent Per Activity */}
      <ul>
        {Object.keys(totalTimes).map((activityName, index) => (
          <li key={index}>
            {activityName}: {totalTimes[activityName]} minutes
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Dashboard;