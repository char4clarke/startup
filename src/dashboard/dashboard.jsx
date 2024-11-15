import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('http://api.quotable.io/random');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        setQuote(data.content);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote('Life is what happens when you\'re busy making other plans.');
        setAuthor('John Lennon');
      }
    };

    fetchQuote();
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const userId = '123'; // Replace this with actual user ID from auth context or localStorage
      const response = await fetch(`/api/activities/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        console.error('Failed to fetch activities');
        setMessage('Failed to fetch activities.');
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setMessage('An error occurred while fetching activities.');
    }
  };

  const filterActivitiesByTimeframe = (activities, timeframe) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0); // Set to start of day

      if (timeframe === 'Today') {
        return activityDate.getTime() === yesterday.getTime();
      } else if (timeframe === 'This Week') {
        const pastWeek = new Date(today);
        pastWeek.setDate(pastWeek.getDate() - 7);
        return activityDate >= pastWeek;
      } else if (timeframe === 'This Month') {
        const pastMonth = new Date(today);
        pastMonth.setMonth(pastMonth.getMonth() - 1);
        return activityDate >= pastMonth;
      }
      return true;
    });
  };

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const calculateTotalTimePerActivity = (filteredActivities) => {
    const totals = {};

    filteredActivities.forEach((activity) => {
      if (!totals[activity.activity]) {
        totals[activity.activity] = 0;
      }
      totals[activity.activity] += parseFloat(activity.duration);
    });

    return totals;
  };

  const filteredActivities = filterActivitiesByTimeframe(activities, timeframe);
  const totalTimes = calculateTotalTimePerActivity(filteredActivities);

  const pieChartData = {
    labels: Object.keys(totalTimes),
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: Object.values(totalTimes),
        backgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
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
        <p><em>~ {author}</em></p>
      </div>
      
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
        <div style={{ width: '100%', margin: '0 auto' }}>
          <Pie key={timeframe} data={pieChartData} />
        </div>
      </div>

      <h3>Activity List</h3>
      {message && <p>{message}</p>}
      
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