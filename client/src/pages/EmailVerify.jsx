import React from "react";
import "../App.css";

function EmailVerify() {
  return (
    <div className="verify-container">
      <div className="verify-box">
        <h2 className="verify-heading">Email Verify OTP</h2>
        <p className="verify-text">Enter 6-digit code sent to your emailid.</p>

        <div className="otp-boxes">
          <input type="text" maxLength="1" className="otp-input" />
          <input type="text" maxLength="1" className="otp-input" />
          <input type="text" maxLength="1" className="otp-input" />
          <input type="text" maxLength="1" className="otp-input" />
          <input type="text" maxLength="1" className="otp-input" />
          <input type="text" maxLength="1" className="otp-input" />
        </div>

        <button className="verify-button">Verify Email</button>
      </div>
    </div>
  );
}

export default EmailVerify;
