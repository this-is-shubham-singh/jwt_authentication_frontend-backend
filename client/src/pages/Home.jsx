import React, { useContext, useEffect } from "react";
import "../App.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isLoggedIn, user_logout, send_verify_otp } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await user_logout();

    if (response) {
      navigate("/login");
    }
  };

  const handle_verify_email = async () => {
    const response = await send_verify_otp();
    if (response == true) {
      navigate("/email-verify");
    }
  };

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
                onClick={() => handle_verify_email()}
              >
                Verify Email
              </div>
              <div className="dropdown-item" onClick={() => handleLogout()}>
                Logout
              </div>
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
