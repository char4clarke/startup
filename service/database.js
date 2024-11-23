const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url, { tls: true, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });

let db, userCollection, activityCollection;

// This will asynchronously test the connection and exit the process if it fails
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('activityTracker');
    userCollection = db.collection('user');
    activityCollection = db.collection('activity');
    await db.command({ ping: 1 });
    console.log('Database ping successful');
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
}

// Call the connection function
connectToDatabase();

// Rest of your functions remain the same
function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function updateUserToken(email) {
    const newToken = uuid.v4();
    await userCollection.updateOne({ email }, { $set: { token: newToken } });
    return newToken;
  }
  
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);
  return user;
}

async function addActivity(activity) {
  return activityCollection.insertOne(activity);
}

function getActivities(userId) {
  return activityCollection.find({ userId: userId }).toArray();
}

function getWeeklyActivities(userId, activity, startOfWeek, endOfWeek) {
    return activityCollection.find({
      userId: userId,
      activity: activity,
      date: {
        $gte: startOfWeek.toISOString(),
        $lt: endOfWeek.toISOString()
      }
    }).toArray();
  }

  module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addActivity,
    getActivities,
    getWeeklyActivities,
    updateUserToken
  };