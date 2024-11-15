import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; // Import required components
import './Insights.css'; // Assuming you'll create a separate CSS file for Insights

// Register necessary components for Bar chart
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Insights() {
  const [selectedActivity, setSelectedActivity] = useState('Studying'); // Default selected activity
  const [weeklyData, setWeeklyData] = useState({}); // Initialize as empty object
  const [message, setMessage] = useState(''); // For success/error messages

  // Fetch weekly data for the selected activity when component mounts or when selectedActivity changes
  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const userId = '123'; // Replace this with actual user ID from auth context or localStorage
        const response = await fetch(`/api/activities/${userId}/weekly?activity=${selectedActivity}`); // Fetch weekly data for selected activity
        
        if (response.ok) {
          const data = await response.json();
          setWeeklyData(data); // Set fetched weekly data in state
        } else {
          console.error('Failed to fetch weekly data');
          setMessage('Failed to fetch weekly data.');
        }
      } catch (error) {
        console.error('Error fetching weekly data:', error);
        setMessage('An error occurred while fetching weekly data.');
      }
    };

    fetchWeeklyData();
  }, [selectedActivity]); // Re-fetch when selectedActivity changes

  // Prepare data for Bar chart
  const barChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
    datasets: [
      {
        label: `${selectedActivity} Time (minutes)`,
        data: weeklyData[selectedActivity] || [], // Data for selected activity (default to empty array if no data)
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
        
        {/* Bar Chart */}
        <div style={{ width:'600px', height:'400px', marginTop:'20px', marginLeft:'auto', marginRight:'auto' }}>
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      <div>
        <h3>Personalized Insights</h3>
        <ul>
          <li>Most productive time: 9 AM - 11 AM</li>
          {/* Example insights based on fetched data */}
          <li>Weekly average for entertainment: {weeklyData.Entertainment ? (weeklyData.Entertainment.reduce((a,b) => a + b) / weeklyData.Entertainment.length) : 0} minutes/day</li>
          <li>Time spent on social media down by {weeklyData['Social Media'] ? Math.round((1 - (weeklyData['Social Media'].reduce((a,b) => a + b) / (7 * weeklyData['Social Media'][0]))) *100):0}%</li>
        </ul>
      </div>

      {message && <p>{message}</p>} {/* Display success/error message */}
      
    </main>
  );
}

export default Insights;