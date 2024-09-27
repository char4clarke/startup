# startup

# TimeTracker

## Elevator Pitch
Ever wondered how you’re spending your time each day? TimeTracker is a personal time-tracking app that not only helps you log your activities but also provides insightful analytics to elevate how you manage your time. With personalized insights, and engaging visualizations, this app helps you identify exactly how your time is allocated and make adjustments to improve productivity and find balance.

## Design
Below are rough sketches of the application's user interface:

1. **Dashboard**
   - Overview of daily/weekly/monthly time distribution.
   - Graphs and charts for activity analysis.
![Dashboard](assets/Dashboard-mockup.jpg)

2. **Activity Log**
   - Section for manual time entry and editing.
   - Real-time updates for tracked activities.
![Activity Log](assets/ActivityLog-mockup.jpg)

3. **Insights Page**
   - Detailed analytics and user-specific recommendations.
![Insights Page](assets/InsightsPage-mockup.jpg)


## Key Features
- **Customizable Analytics Dashboard**: Visualize time spent on various activities with customizable and interactive charts and graphs.
- **Personalized Insights and Recommendations**: Receive tailored suggestions to improve time management based on tracked data.
- **Seamless Integration**: Sync with calendars and productivity tools for comprehensive tracking.
- **Secure Authentication**: Safe and secure login with user account management.
- **Simple User Inputs**: Log activities and track time effortlessly with simple, one-click buttons.

## Other Possible Features
- **Automated Activity Tracking**: Automatically log activities based on location, device usage, or wearables.
- **Gamification**: Earn rewards and participate in challenges to stay motivated.


## Technologies
### HTML
- **HTML Pages**: I added 4 html pages, one for login, dashboard, activity log, and insights. (once I have the login implementation for authenticating users, I will have the login index.html page automatically link to the dashboard)
- **Links**: Added links at the top to nagigate between the different pages.
- **Login/DB Placeholder**: Index page is a login with an input box and login button, will then pull the user's data from database.
- **Websocket/Charts Placeholder**: The user's individualized data and info will update the charts and visualizations in the dashboard, activity log, and insights page in real time.
- **App Text/Content**: Text on the dashboard, activity log, and insights page to describe the activities and their data from the websocket and database.

### CSS
- **Styling**: Clean, simple design ensuring a good user experience across different screen sizes. Use of color schemes, whitespace, and animations to enhance visual appeal.

### JavaScript/React
- **Interactivity**: Handling user interactions like activity logging, data visualization updates, and real-time analytics display.

### Service
- **Backend Service**: Endpoints for:
  - **Login**: Registering, logging in, and managing user accounts.
  - **Activity Data**: Storing and retrieving time logs and activity details.
  - **Analytics**: Analytics data for visualization.
  - **Third-Party API**: Integration with an external API for additional data, such as location-based information.

### Authentication
- **Login/Signup**: Secure login system allowing users to create accounts and manage their profiles.

### Database
- **Persistent Storage**: Store user data, activity logs, and analytics in a database. Support for user authentication and activity tracking.

### WebSocket
- **Real-Time Updates**: Use WebSockets to provide real-time updates for activity logs and analytics, ensuring users see live data changes.