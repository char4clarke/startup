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
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  // WebSocket connection setup
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 3;

    function connect() {
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.host;
      const ws = new WebSocket(`${protocol}//${host}/ws`);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setSocket(ws);
        retryCount = 0;
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'activityUpdate' && data.userId !== user?.email) {
          fetchActivities();
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying connection... Attempt ${retryCount}`);
          setTimeout(connect, 3000);
        }
      };

      return ws;
    }

    const ws = connect();

    return () => {
      if (ws) ws.close();
    };
  }, [user]);

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

  const fetchActivities = async () => {
    try {
      if (!user) {
        console.log('User data not available yet');
        return;
      }
      const userId = user.email;
      const response = await fetch(`/api/activities/${userId}`);
      
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
        // Broadcast activity update
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({
            type: 'activityUpdate',
            userId: userId,
            activities: data
          }));
        }
      } else {
        console.error('Failed to fetch activities');
        setMessage('Failed to fetch activities.');
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
      setMessage('An error occurred while fetching activities.');
    }
  };

  useEffect(() => {
    if (user) {
      fetchActivities();
    }
  }, [user]);

  const filterActivitiesByTimeframe = (activities, timeframe) => {
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