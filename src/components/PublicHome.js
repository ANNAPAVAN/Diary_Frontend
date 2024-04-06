import React from "react";
import { Link } from "react-router-dom";

function PublicHome() {
  return (
    <div className="public-home-container">
      <div className="public-home-content">
        <h1>Welcome to Your Diary</h1>
        <p>
          Your Diary is a simple and secure way to keep track of your thoughts,
          ideas, and memories.
        </p>
        <p>
          Sign up now to start journaling and unlock all the features
          available.
        </p>
        <div className="public-home-links">
          <Link to="/register" className="public-home-link">
            Register
          </Link>
          <Link to="/login" className="public-home-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PublicHome;
