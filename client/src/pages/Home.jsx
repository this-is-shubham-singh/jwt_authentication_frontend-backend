import React, { useContext } from "react";
import "../App.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-icon">🌐</div>

        {!isLoggedIn ? (
          <button className="login-button" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div className="profile-wrapper">
            <div className="profile-circle">S</div>
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => navigate("/email-verify")}
              >
                Verify Email
              </div>
              <div className="dropdown-item">Logout</div>
            </div>
          </div>
        )}
      </nav>
      <main className="main-content">
        <h1 className="main-heading">Welcome to App</h1>
        <p className="sub-heading">Hey Shubham</p>
      </main>
    </div>
  );
}

export default Home;
