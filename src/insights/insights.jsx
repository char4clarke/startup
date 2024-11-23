import React, { useState, useEffect, useCallback } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import './Insights.css';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Insights() {
  const [selectedActivity, setSelectedActivity] = useState('Studying');
  const [weeklyData, setWeeklyData] = useState({});
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user', {
        credentials: 'include'
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setMessage('Failed to fetch user information.');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setMessage('An error occurred while fetching user information.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchWeeklyData = useCallback(async () => {
    if (!user) return;
  
    try {
      const response = await fetch(`/api/activities/${encodeURIComponent(user.email)}/weekly?activity=${selectedActivity}`, {
        credentials: 'include'
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Weekly Data:", data);
        setWeeklyData(data);
      } else {
        console.error('Failed to fetch weekly data');
        setMessage('Failed to fetch weekly data.');
      }
    } catch (error) {
      console.error('Error fetching weekly data:', error);
      setMessage('An error occurred while fetching weekly data.');
    }
  }, [user, selectedActivity]);

  useEffect(() => {
    if (user) {
      fetchWeeklyData();
    }
  }, [user, selectedActivity, fetchWeeklyData]);

  const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: `${selectedActivity} Time (minutes)`,
        data: weeklyData[selectedActivity] || [],
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes Spent',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Days of the Week',
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const calculateAverage = (data) => {
    if (!data || data.length === 0) return 0;
    return data.reduce((a, b) => a + b, 0) / data.length;
  };

  const calculatePercentageChange = (data) => {
    if (!data || data.length === 0) return 0;
    const firstDay = data[0];
    const weekTotal = data.reduce((a, b) => a + b, 0);
    if (firstDay === 0) return 0;
    return Math.round((1 - (weekTotal / (7 * firstDay))) * 100);
  };

  return (
    <main>
      <h2>Insights</h2>

      <div>
        <h3>Select Activity to Analyze:</h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {['Studying', 'Working Out', 'Entertainment', 'Social Media'].map((activity) => (
            <button 
              key={activity} 
              className="activity-btn" 
              onClick={() => setSelectedActivity(activity)}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3>Time Spent Analysis</h3>
        
        <div style={{ width:'600px', height:'400px', marginTop:'20px', marginLeft:'auto', marginRight:'auto' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      <div>
        <h3>Personalized Insights</h3>
        <ul>
          <li>Most productive time: 9 AM - 11 AM</li>
          <li>Weekly average for {selectedActivity}: {calculateAverage(weeklyData[selectedActivity] || []).toFixed(2)} minutes/day</li>
          <li>Time spent on {selectedActivity} changed by {calculatePercentageChange(weeklyData[selectedActivity] || [])}%</li>
        </ul>
      </div>

      {message && <p>{message}</p>}
    </main>
  );
}

export default Insights;