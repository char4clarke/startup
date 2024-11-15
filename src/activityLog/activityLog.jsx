import React, { useState, useEffect } from 'react';
import './ActivityLog.css'; // Assuming you'll create a separate CSS file for ActivityLog

function ActivityLog() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([]); // Initialize as empty array
  const [message, setMessage] = useState(''); // For success/error messages

  // Fetch activities from the backend when the component mounts
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const userId = '123'; // Replace this with actual user ID from auth context or localStorage
        const response = await fetch(`/api/activities/${userId}`);
        
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
  }, []); // Empty dependency array means this runs once when the component mounts

  // Helper function to get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  // Validate if a string is a valid date in YYYY-MM-DD format
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  // Handle starting an activity log for predefined activities
  const handleStartLogging = async (activityName) => {
    try {
      const userId = '123'; // Replace with actual user ID from auth context or localStorage
      const duration = prompt(`Enter duration for ${activityName} in minutes:`); // Prompt for duration

      if (!duration) return; // If no duration is entered, exit function

      let date = prompt(`Enter the date (YYYY-MM-DD) for ${activityName} (default: today):`, getTodayDate()); // Prompt for date, defaulting to today
      
      if (!isValidDate(date)) {
        alert("Invalid date format. Please enter a valid date in YYYY-MM-DD format.");
        return;
      }

      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          activity: activityName,
          duration,
          date,
        }),
      });

      if (response.ok) {
        const newActivity = await response.json();
        setActivities([...activities, newActivity]); // Add new activity to state
        setMessage('Activity logged successfully!');
      } else {
        setMessage('Failed to log activity.');
      }
    } catch (error) {
      console.error('Error logging activity:', error);
      setMessage('An error occurred while logging activity.');
    }
  };

  // Handle logging a custom "New" activity
  const handleNewActivityLogging = async () => {
    try {
      const userId = '123'; // Replace with actual user ID from auth context or localStorage
      
      // Prompt for custom activity name and duration
      const activityName = prompt("Enter the name of the new activity:");
      if (!activityName) return; // Exit if no activity name is entered

      const duration = prompt(`Enter duration for ${activityName} in minutes:`);
      if (!duration) return; // Exit if no duration is entered

      let date = prompt(`Enter the date (YYYY-MM-DD) for ${activityName} (default: today):`, getTodayDate()); // Prompt for date, defaulting to today
      
      if (!isValidDate(date)) {
        alert("Invalid date format. Please enter a valid date in YYYY-MM-DD format.");
        return;
      }

      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          activity: activityName,
          duration,
          date,
        }),
      });

      if (response.ok) {
        const newActivity = await response.json();
        setActivities([...activities, newActivity]); // Add new custom activity to state
        setMessage('Custom activity logged successfully!');
      } else {
        setMessage('Failed to log custom activity.');
      }
    } catch (error) {
      console.error('Error logging custom activity:', error);
      setMessage('An error occurred while logging custom activity.');
    }
  };

  return (
    <main>
      <h2>Activity Log</h2>

      <div>
        <h3>Start Logging:</h3>
        
        {/* Predefined Activity Buttons */}
        {['Studying', 'Working Out', 'Entertainment', 'Social Media'].map((activity) => (
          <button key={activity} className="activity-btn" onClick={() => handleStartLogging(activity)}>
            {activity}
          </button>
        ))}

        {/* New Activity Button */}
        <button className="activity-btn" onClick={handleNewActivityLogging}>
          New Activity
        </button>
      </div>

      <div>
        <h3>Logged Activities</h3>
        {message && <p>{message}</p>} {/* Display success/error message */}
        
        {/* Display Logged Activities */}
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>
              {activity.activity}: {activity.duration} minutes on {new Date(activity.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default ActivityLog;