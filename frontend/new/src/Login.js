import React, { useState } from 'react';
import './Login.css'; // Import your CSS file
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const[loggedIn,setLoggedIn]=useState(false)

  const handleLogin = () => {
    const postData = {
      
      email:email,
    
    password:password,
    
    };
    
  fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
        
      },
      body: JSON.stringify(postData), 
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the server responds with JSON data
      })
      .then(data => {
        console.log('POST request successful:', data); 
        // Process the response data
        setLoggedIn(true)
      })
      .catch(error => {
        console.error('There was a problem with the POST request:', error);
      });
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        className="input-field"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="login-button" onClick={handleLogin}>
        Login
        {loggedIn && <Navigate to="/allrecipes" />}
      </button>
    </div>
  );
};

export default Login;
