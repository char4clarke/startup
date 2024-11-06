import React from 'react';

function Login() {
    return (
      <main>
        <h2>Welcome!</h2>
        <p>Please log in to access your dashboard and track your activities.</p>
  
        <div>
          <h3>Login</h3>
          <form action="dashboard.html" method="post">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
            <br />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
            <br />
            <button type="submit">Login</button>
          </form>
        </div>
      </main>
    );
  }

  export default Login;