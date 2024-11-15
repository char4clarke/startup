const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

let users = {}; // In-memory user storage
let activities = []; // In-memory storage for activities

// Register a new user
app.post('/api/auth/register', (req, res) => {
  const { email, password } = req.body;
  
  // Check if the user already exists
  if (users[email]) {
    return res.status(409).json({ msg: 'User already exists' });
  }

  // Create a new user with a token
  const user = { email, password, token: uuid.v4() };
  users[email] = user;

  console.log('User created:', user);
  res.status(201).json({ token: user.token });
});

// Login an existing user
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  const user = users[email];
  
  if (user && user.password === password) {
    // Generate a new token for the session
    user.token = uuid.v4();
    return res.json({ token: user.token });
  }

  return res.status(401).json({ msg: 'Invalid credentials' });
});

// Logout a user by deleting their token
app.delete('/api/auth/logout', (req, res) => {
  const { token } = req.body;

  // Find the user by token and remove it
  const user = Object.values(users).find(u => u.token === token);
  
  if (user) {
    delete user.token;
    return res.status(204).end();
  }

  return res.status(400).json({ msg: 'Invalid token' });
});

// Endpoint to store activity data
app.post('/api/activities', (req, res) => {
  const { userId, activity, duration } = req.body;

  // Validate input
  if (!userId || !activity || !duration) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  const newActivity = {
    id: uuid.v4(),
    userId,
    activity,
    duration,
    date: new Date().toISOString(),
  };

  activities.push(newActivity);
  console.log('Activity logged:', newActivity);
  
  res.status(201).json(newActivity);
});

// Endpoint to retrieve all activities for a specific user
app.get('/api/activities/:userId', (req, res) => {
  const { userId } = req.params;
  
  const userActivities = activities.filter(activity => activity.userId === userId);
  
  if (!userActivities.length) {
    return res.status(404).json({ msg: 'No activities found for this user' });
  }
  
  res.status(200).json(userActivities);
});

// Endpoint to retrieve weekly data for a specific activity
app.get('/api/activities/:userId/weekly', (req, res) => {
    const { userId } = req.params;
    const { activity } = req.query;
  
    // Get today's date and calculate the start of the week (Monday)
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Monday of this week
  
    // Filter activities by userId, activity, and date within this week
    const userActivities = activities.filter((activityEntry) => {
      const activityDate = new Date(activityEntry.date);
      return (
        activityEntry.userId === userId &&
        activityEntry.activity === activity &&
        activityDate >= startOfWeek
      );
    });
  
    // Initialize an array with zeros for each day of the week (Monday to Sunday)
    const weeklyTotals = [0, 0, 0, 0, 0, 0, 0];
  
    // Populate the array with total time spent on each day
    userActivities.forEach((activityEntry) => {
      const dayOfWeek = new Date(activityEntry.date).getDay(); // Get day of the week (0=Sunday, ..., 6=Saturday)
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert Sunday (0) to index 6
      weeklyTotals[dayIndex] += parseFloat(activityEntry.duration); // Add up durations for each day
    });
  
    res.status(200).json({ [activity]: weeklyTotals });
  });

// Start the server (only call this once)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});