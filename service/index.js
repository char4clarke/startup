const express = require('express');
const uuid = require('uuid');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

let users = {}; // In-memory user storage

// Register a new user
app.post('/api/auth/register', (req, res) => {
  console.log('Registering user:', req.body);
  const { email, password } = req.body;

  // Check if the user already exists
  if (users[email]) {
    console.log('User already exists:', email);
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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Register a new user
app.post('/api/auth/register', (req, res) => {
    const { email, password } = req.body;
  
    // Check if user already exists
    if (users[email]) {
      return res.status(409).json({ msg: 'User already exists' });
    }
  
    // Create new user with a token
    const user = { email, password, token: uuid.v4() };
    users[email] = user;
  
    res.status(201).json({ token: user.token });
});