import React, { useContext, useRef, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ResetPassword() {
  const [pageState, setPageState] = useState("email");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const optInputs = useRef([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function emailSubmit() {
    // call the api

    setPageState("otp");
  }

  function otpSubmit() {
    // call the api
    setPageState("newPassword");
  }

  function newPasswordSubmit() {
    // call the api

    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="reset-container">
      {/* Reset Password Email Box */}

      {pageState == "email" && (
        <div className="reset-box">
          <h2 className="reset-heading">Reset Password</h2>
          <p className="reset-text">Enter your registered email address.</p>
          <input
            type="email"
            placeholder="Email Address"
            className="reset-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="reset-button" onClick={emailSubmit}>
            Submit
          </button>
        </div>
      )}

      {pageState == "otp" && (
        <div className="verify-box">
          <h2 className="verify-heading">Email Verify OTP</h2>
          <p className="verify-text">
            Enter 6-digit code sent to your emailid.
          </p>

          <div className="otp-boxes">
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
            <input type="text" maxLength="1" className="otp-input" />
          </div>

          <button className="verify-button" onClick={otpSubmit}>
            Verify Email
          </button>
        </div>
      )}

      {pageState == "newPassword" && (
        <div className="reset-box">
          <h2 className="reset-heading">New Password</h2>
          <p className="reset-text">Enter new password.</p>
          <input
            type="password"
            placeholder="New Password"
            className="reset-input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="reset-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="reset-button" onClick={newPasswordSubmit}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
