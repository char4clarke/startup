import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie chart component from react-chartjs-2
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'; // Import required Chart.js components
import './Dashboard.css'; // Assuming you'll create a separate CSS file for Dashboard

// Register the required components
Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([]); // Initialize as empty array
  const [message, setMessage] = useState(''); // For success/error messages
  
  // State for random quote data
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  // Fetch random quote from third-party API when component mounts
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote('Life is what happens when you’re busy making other plans.'); // Default quote
        setAuthor('John Lennon'); // Default author
      }
    };
  
    // Fetch new quote and activities when the timeframe changes
    fetchQuote();
    fetchActivities();
  }, [timeframe]); // Add timeframe to the dependency array
  

  // Fetch activities from the backend when the component mounts or when timeframe changes
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

  // Handle timeframe change and filter activities based on last X days
  const filterActivitiesByTimeframe = (timeframe) => {
    const today = new Date();
    let filteredActivities = [];

    if (timeframe === 'Today') {
      filteredActivities = activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate.toDateString() === today.toDateString();
      });
    } else if (timeframe === 'This Week') {
      const pastWeek = new Date(today.setDate(today.getDate() - 7)); // Last 7 days
      filteredActivities = activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= pastWeek;
      });
    } else if (timeframe === 'This Month') {
      const pastMonth = new Date(today.setDate(today.getDate() - 30)); // Last 30 days
      filteredActivities = activities.filter(activity => {
        const activityDate = new Date(activity.date);
        return activityDate >= pastMonth;
      });
    }

    return filteredActivities;
  };

  // Update handleTimeframeChange function
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    const filteredActivities = filterActivitiesByTimeframe(newTimeframe);
    setActivities(filteredActivities); 
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

  // Prepare data for the Pie chart
  const pieChartData = {
    labels: Object.keys(totalTimes), // Activity names
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: Object.values(totalTimes), // Total time per activity
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ]
      }
    ]
  };

  return (
    <main>
      <h2>Dashboard</h2>
      <div>
        <h3>Random Quote</h3>
        <p>{quote}</p>
        <p><em>{author}</em></p>
      </div>
      
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
        
        {/* Pie Chart */}
        <div style={{ width: '100%', margin: '0 auto' }}>
          <Pie data={pieChartData} />
        </div>
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