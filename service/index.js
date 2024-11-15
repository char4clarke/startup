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

// Start the server (only call this once)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});