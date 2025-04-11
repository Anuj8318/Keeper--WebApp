import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // optional styling

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Notes App</h1>
      <p>Please login or sign up to continue</p>
      <div className="home-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/signup"><button>Signup</button></Link>
      </div>
    </div>
  );
};

export default Home;
