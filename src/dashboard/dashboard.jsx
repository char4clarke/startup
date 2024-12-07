import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import useWebSocket from './useWebSocket';

Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [timeframe, setTimeframe] = useState('Today');
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState('');
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [user, setUser] = useState(null);

  const { isConnected, sendMessage, ws } = useWebSocket();

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received WebSocket message:', data);
          if (data.type === 'activities') {
            setActivities(data.activities);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
    }
  }, [ws]);

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

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=happiness', {
          headers: {
            'X-Api-Key': 'bjRfbTYRVW5Mvy6LyxQTTg==LaaJNBQUlk2ktKtl'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch quote');
        const [data] = await response.json();
        setQuote(data.quote);
        setAuthor(data.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote('Life is what happens when you\'re busy making other plans.');
        setAuthor('John Lennon');
      }
    };

    fetchQuote();
  }, []);

  useEffect(() => {
    if (user && isConnected) {
      sendMessage(JSON.stringify({ type: 'fetchActivities', userId: user.email }));
    }
  }, [user, isConnected, sendMessage]);

  useEffect(() => {
    if (isConnected) {
      const handleWebSocketMessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received WebSocket message:', data);
          if (data.type === 'activities') {
            setActivities(data.activities);
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
  
      // Use the WebSocket instance directly instead of window.addEventListener
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const url = `${protocol}//${host}/ws`;
      const ws = new WebSocket(url);
      ws.onmessage = handleWebSocketMessage;
  
      return () => {
        ws.close();
      };
    }
  }, [isConnected]);

  const filterActivitiesByTimeframe = (activities, timeframe) => {
    console.log('Filtering activities:', activities, 'Timeframe:', timeframe);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
  
    return activities.filter(activity => {
      const activityDate = new Date(activity.date);
      activityDate.setHours(0, 0, 0, 0);
  
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

  const calculateTotalTimePerActivity = (filteredActivities) => {
    console.log('Calculating totals for filtered activities:', filteredActivities);    
    const totals = {};

    filteredActivities.forEach((activity) => {
      if (!totals[activity.activity]) {
        totals[activity.activity] = 0;
      }
      totals[activity.activity] += parseFloat(activity.duration);
    });

    return totals;
  };

  useEffect(() => {
    if (user && isConnected) {
      console.log('Sending fetchActivities message');
      sendMessage({ type: 'fetchActivities', userId: user.email });
    }
  }, [user, isConnected, sendMessage]);

  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    if (isConnected && user) {
      console.log('Sending updateTimeframe message');
      sendMessage({ type: 'updateTimeframe', userId: user.email, timeframe: newTimeframe });
    }
  };

  const filteredActivities = filterActivitiesByTimeframe(activities, timeframe);
  console.log('Filtered activities:', filteredActivities);

  const totalTimes = calculateTotalTimePerActivity(filteredActivities);
  console.log('Total times:', totalTimes);
  
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
  
  // useEffect(() => {
  //   if (socket) {
  //     socket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.type === 'activityUpdate') {
  //         // Update the pie chart data
  //         const filteredActivities = filterActivitiesByTimeframe(activities, timeframe);
  //         const totals = calculateTotalTimePerActivity(filteredActivities);
  //         setPieChartData({
  //           ...pieChartData,
  //           datasets: [{
  //             ...pieChartData.datasets[0],
  //             data: Object.values(totals)
  //           }]
  //         });
  //       }
  //     };
  //   }
  // }, [socket, activities, timeframe]);

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
          {Object.keys(totalTimes).length > 0 ? (
            <Pie key={timeframe} data={pieChartData} />
          ) : (
            <p>No activities to display</p>
          )}
        </div>
      </div>
      <h3>Activity List</h3>
      <ul>
        {Object.entries(totalTimes).map(([activity, duration], index) => (
          <li key={index}>
            {activity}: {duration} minutes
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Dashboard;