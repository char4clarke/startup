const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const path = require('path');
const DB = require('./database.js');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const authCookieName = 'token';

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use('/api', apiRouter);

// Register a new user
apiRouter.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  
  if (await DB.getUser(email)) {
    return res.status(409).json({ msg: 'User already exists' });
  }

  const user = await DB.createUser(email, password);
  setAuthCookie(res, user.token);
  res.status(201).json({ token: user.token });
});

// Login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await DB.getUser(email);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const newToken = await DB.updateUserToken(email);
    setAuthCookie(res, newToken);
    return res.json({ token: newToken, email: user.email });
  }

  return res.status(401).json({ msg: 'Invalid credentials' });
});

// Logout a user
apiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Secure API Router
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).json({ msg: 'Unauthorized' });
  }
});

// Add this to your secureApiRouter
secureApiRouter.get('/user', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  
  if (user) {
    res.json({ _id: user._id, email: user.email });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// Endpoint to store activity data
secureApiRouter.post('/activities', async (req, res) => {
  const { userId, activity, duration, date } = req.body;

  if (!userId || !activity || !duration || !date) {
    return res.status(400).json({ msg: 'Missing required fields' });
  }

  const newActivity = {
    userId,
    activity,
    duration,
    date,
  };

  await DB.addActivity(newActivity);
  res.status(201).json(newActivity);
});

// Endpoint to retrieve all activities for a specific user
secureApiRouter.get('/activities/:userId', async (req, res) => {
  const { userId } = req.params;
  
  const userActivities = await DB.getActivities(userId);
  
  if (!userActivities.length) {
    return res.status(404).json({ msg: 'No activities found for this user' });
  }
  
  res.status(200).json(userActivities);
});

// Endpoint to retrieve weekly data for a specific activity
secureApiRouter.get('/activities/:userId/weekly', async (req, res) => {
  try {
    const { userId } = req.params;
    const { activity } = req.query;

    console.log(`Fetching weekly activities for user ${userId} and activity ${activity}`);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1));
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    console.log(`Week range: ${startOfWeek.toISOString()} to ${endOfWeek.toISOString()}`);

    const userActivities = await DB.getWeeklyActivities(userId, activity, startOfWeek, endOfWeek);

    console.log("Retrieved activities:", userActivities);

    const weeklyTotals = [0, 0, 0, 0, 0, 0, 0];
    userActivities.forEach((activityEntry) => {
      const activityDate = new Date(activityEntry.date);
      console.log('Activity date:', activityDate);
      const dayOfWeek = activityDate.getDay();
      const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      weeklyTotals[dayIndex] += parseFloat(activityEntry.duration);
    });

    console.log(`Weekly totals for ${activity}:`, weeklyTotals);
    res.status(200).json({ [activity]: weeklyTotals });
  } catch (error) {
    console.error("Error in weekly activities endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fallback route to serve index.html for React Router support
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});