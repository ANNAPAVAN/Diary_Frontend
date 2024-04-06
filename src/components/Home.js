import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate(); 

  const handleLogOut = async () => {
    localStorage.removeItem("diaryToken"); 
    localStorage.removeItem("diaryUser"); 
    navigate("/"); 
  }

  return (
    <div className="home-container">
      <h1 className="home-heading">Welcome to Your Diary</h1>
      <p className="home-description">
        Your Diary is a place to jot down your thoughts, ideas, and memories.
        Start writing your diary now!
      </p>
      <div className="home-links">
        <Link to="/mydiary" className="home-link">
          Write Diary
        </Link>
        <Link to="/diaryentries" className="home-link">
          Read Diary
        </Link>
        <button onClick={handleLogOut} className="home-logout">
          LogOut
        </button>
      </div>
    </div>
  );
}

export default Home; 
