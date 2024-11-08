import React from 'react';
import './Insights.css'; // Assuming you'll create a separate CSS file for Insights

function Insights() {
  return (
    <main>
      <h2>Insights</h2>
      
      <div>
        <h3>Select Activity to Analyze:</h3>
        <button className="activity-btn">Studying</button>
        <button className="activity-btn">Working Out</button>
        <button className="activity-btn">Entertainment</button>
        <button className="activity-btn">Social Media</button>
        <button className="activity-btn">New</button>
      </div>

      <div>
        <h3>Time Spent Analysis</h3>
        <div style={{width: '500px', height: '330px', backgroundColor: 'lightgray', textAlign: 'center'}}>
          <img src="https://cdn.pixabay.com/photo/2013/07/12/14/18/productivity-148197_640.png" 
               alt="Analysis" 
               style={{width: '400px', height: 'auto', maxHeight: '300px', objectFit: 'contain', marginTop: '10px'}} />
        </div>
      </div>
      
      <div>
        <h3>Personalized Insights</h3>
        <ul>
          <li>Most productive time: 9 AM - 11 AM</li>
          <li>Studying time up 10% from last week</li>
          <li>Weekly average for entertainment: 1.5 hours/day</li>
          <li>Time spent on social media down by 20%</li>
        </ul>
      </div>
    </main>
  );
}

export default Insights;